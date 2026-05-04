/**
 * Ingest pipeline. Walks the data/ directory, reads each markdown file,
 * embeds it with OpenAI, writes the resulting vectors to embeddings/corpus.json.
 *
 * Run once after cloning: `bun src/ingest.ts`
 *
 * Re-run any time the corpus changes (add/edit/remove files in data/).
 *
 * Cost: ~$0.02 against your OpenAI account for the 16-doc sample corpus.
 */
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { embed } from "./embed";

type Source = "notion" | "gmail" | "drive" | "slack";

interface CorpusEntry {
  /** Source surface — matches the directory name. */
  source: Source;
  /** Path relative to data/<source>/. */
  path: string;
  /** Full file content (for snippet rendering). */
  content: string;
  /** Embedding vector (1536 dims for text-embedding-3-small). */
  embedding: number[];
}

const DATA_ROOT = "data";
const OUTPUT = "embeddings/corpus.json";
const SOURCES: Source[] = ["notion", "gmail", "drive", "slack"];

async function main(): Promise<void> {
  const entries: CorpusEntry[] = [];

  for (const source of SOURCES) {
    const dir = join(DATA_ROOT, source);
    let files: string[];
    try {
      files = await readdir(dir);
    } catch {
      console.warn(`Skipping ${dir} — directory not found.`);
      continue;
    }
    const mdFiles = files.filter((f) => f.endsWith(".md"));
    console.log(`[${source}] ${mdFiles.length} files…`);

    for (const file of mdFiles) {
      const path = join(dir, file);
      const content = await readFile(path, "utf-8");
      try {
        const vector = await embed(content);
        entries.push({
          source,
          path: file,
          content,
          embedding: vector,
        });
        console.log(`  ✓ ${file} (${content.length} chars → ${vector.length} dims)`);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`  ✗ ${file} — ${message}`);
        throw err;
      }
    }
  }

  console.log(`\nEmbedded ${entries.length} documents.`);

  await mkdir("embeddings", { recursive: true });
  await writeFile(OUTPUT, JSON.stringify(entries, null, 2));

  const sizeMb = ((JSON.stringify(entries).length / 1024 / 1024)).toFixed(2);
  console.log(`Wrote ${OUTPUT} (${sizeMb} MB).`);
  console.log(`\nNow run a query:`);
  console.log(`  bun src/cli.ts ask "What did I conclude about lean inventory in the Carrington engagement?"`);
}

main().catch((err) => {
  console.error("Ingest failed:", err);
  process.exit(1);
});
