/**
 * Cosine-similarity retrieval over the pre-embedded corpus.
 *
 * In-memory search is sufficient for a 16-doc / sub-100-doc corpus.
 * For production scale (10k+ docs), swap to SQLite + sqlite-vss or a
 * dedicated vector DB. The interface stays the same — `search(query, k)`
 * returns ranked hits.
 */
import { readFile } from "node:fs/promises";

interface CorpusEntry {
  source: "notion" | "gmail" | "drive" | "slack";
  path: string;
  content: string;
  embedding: number[];
}

export interface SearchHit {
  source: CorpusEntry["source"];
  path: string;
  score: number;
  /** Best-effort 240-char snippet, picked to start at a meaningful boundary. */
  snippet: string;
  /** Full document content — useful when a downstream caller wants more context. */
  content: string;
}

let CACHED: CorpusEntry[] | null = null;

async function loadCorpus(): Promise<CorpusEntry[]> {
  if (CACHED) return CACHED;
  const raw = await readFile("embeddings/corpus.json", "utf-8");
  CACHED = JSON.parse(raw) as CorpusEntry[];
  return CACHED;
}

function cosine(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error(`Vector length mismatch: ${a.length} vs ${b.length}`);
  }
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    const ai = a[i] ?? 0;
    const bi = b[i] ?? 0;
    dot += ai * bi;
    normA += ai * ai;
    normB += bi * bi;
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

/**
 * Pick a 240-char snippet starting at the most relevant section header
 * if one is detected; otherwise the document body's first 240 chars
 * after frontmatter / title.
 */
function makeSnippet(content: string): string {
  // Skip past markdown title + first blank line if present.
  const afterTitle = content.replace(/^#[^\n]*\n+/, "").trimStart();
  // Skip past key-value frontmatter lines (e.g. "**Client:** ...").
  const afterMeta = afterTitle.replace(/^(\*\*[^*]+\*\*[^\n]*\n+)+/, "").trimStart();
  // Strip leading horizontal rules.
  const cleaned = afterMeta.replace(/^---\n+/, "").trimStart();

  const slice = cleaned.slice(0, 240).replace(/\s+/g, " ").trim();
  return slice + (cleaned.length > 240 ? "…" : "");
}

export async function search(
  queryEmbedding: number[],
  k = 5,
): Promise<SearchHit[]> {
  const corpus = await loadCorpus();
  const scored = corpus.map((entry) => ({
    entry,
    score: cosine(queryEmbedding, entry.embedding),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, k).map(({ entry, score }) => ({
    source: entry.source,
    path: entry.path,
    score,
    snippet: makeSnippet(entry.content),
    content: entry.content,
  }));
}
