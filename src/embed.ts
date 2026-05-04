/**
 * Embedding wrapper. Wraps OpenAI text-embedding-3-small.
 *
 * Cost: roughly $0.02 per 1M tokens. The 16-doc sample corpus runs
 * ~30k tokens of content; ingest cost is ~$0.0006. Each user query
 * costs ~$0.0001 in embedding calls.
 *
 * To go fully local (no API key needed at all), swap this module
 * to @xenova/transformers running Xenova/all-MiniLM-L6-v2:
 *
 *   import { pipeline } from "@xenova/transformers";
 *   const extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
 *   const out = await extractor(text, { pooling: "mean", normalize: true });
 *   return Array.from(out.data);
 *
 * Local embeddings are 384-dim (vs 1536 for text-embedding-3-small),
 * slightly less expressive for nuanced retrieval but plenty for an
 * 8-year personal corpus of one knowledge worker. Tradeoff: model
 * download (~50MB) cached on first run.
 */
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function embed(text: string): Promise<number[]> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OPENAI_API_KEY not set. Copy .env.example to .env and fill in your key.",
    );
  }
  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error("Cannot embed an empty string.");
  }
  const res = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: trimmed,
    encoding_format: "float",
  });
  const v = res.data[0]?.embedding;
  if (!v) {
    throw new Error("OpenAI returned no embedding vector.");
  }
  return v;
}
