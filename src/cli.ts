/**
 * CLI entry point.
 *
 * Usage:
 *   bun src/cli.ts ask "What did I conclude about lean inventory in the Carrington engagement?"
 *
 * Output:
 *   - Top 5 hits ranked by cosine similarity
 *   - For each: source surface (notion/gmail/drive/slack), file path,
 *     score, and a 240-char snippet
 */
import { embed } from "./embed";
import { search } from "./search";

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (cmd !== "ask" || args.length < 2) {
    console.error("Usage: bun src/cli.ts ask \"<your question>\"");
    process.exit(1);
  }

  const query = args.slice(1).join(" ").trim();
  if (!query) {
    console.error("Empty query. Wrap your question in quotes.");
    process.exit(1);
  }

  console.log(`\n  ▸ ${query}\n`);

  const queryEmbedding = await embed(query);
  const hits = await search(queryEmbedding, 5);

  if (hits.length === 0) {
    console.log("  (no hits — corpus may be empty; run `bun src/ingest.ts` first)");
    return;
  }

  for (let i = 0; i < hits.length; i++) {
    const hit = hits[i];
    if (!hit) continue;
    const score = (hit.score * 100).toFixed(1);
    const sourceTag = `[${hit.source}]`.padEnd(8);
    console.log(`  ${(i + 1).toString().padStart(2)}. ${sourceTag} ${hit.path}`);
    console.log(`      score: ${score}%`);
    console.log(`      ${hit.snippet}`);
    console.log();
  }

  console.log(`  ${hits.length} hits returned. Top match: ${hits[0]?.source}/${hits[0]?.path}\n`);
}

main().catch((err) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`Error: ${message}`);
  process.exit(1);
});
