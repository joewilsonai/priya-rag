# priya-rag

A working Personal Knowledge Agent (RAG pipeline) for Priya Banerjee, a fictional independent management consultant — built as the **Sprint 02 / Code / Advanced** sample build for [AI Builders Club](https://aibuildersclub.ai).

> Claude Code builds a full retrieval pipeline over your Notion, Gmail, Google Drive, Slack export. Private. Local. Yours. Ask anything — get real answers.

---

## What this is

Priya is a solo management consultant — 8 years independent, focuses on operations and process improvement for mid-market manufacturers. Across those 8 years she has accumulated:

- ~10 client engagement notes in Notion
- ~8 email threads with clients, prospects, and reference contacts
- ~6 deliverables (slide decks, process maps, RFP responses) in Google Drive
- ~3 Slack workspaces from current and recent engagements

When a new RFP comes in (e.g., a regional 3PL wants help on lane-utilization optimization), Priya wants to answer questions like:

- *"What did I conclude about lean inventory in the Carrington Industries engagement?"*
- *"Which client engagements involved a TMS migration?"*
- *"What did the project team flag as the top three operational risks for Westmont?"*

This RAG agent answers those questions by retrieving the most relevant snippets from her personal corpus, with **citations to the original source files**.

The use case: not a chatbot. Not a workflow tool. A **searchable second-brain for one knowledge worker** that respects "Private. Local. Yours." — the corpus is Priya's, the embedding is local, the retrieval runs on her laptop.

---

## Why this is a sample build, not the real Priya

Everything in `data/` is fictional sample content. No real client engagements, no real PII, no real correspondence. The fake-company contexts (Hartwell Logistics, Carrington Industries, Westmont Industrial, etc.) are deliberately threaded so the demo feels like a real consultant's archive rather than synthetic templates.

The architecture is portable: replace `data/` with your own export from Notion + Gmail + Drive + Slack, re-run `bun src/ingest.ts`, and the pipeline indexes your real corpus the same way.

---

## Stack

- **Runtime:** Bun (TypeScript, no transpile step)
- **Embeddings:** OpenAI `text-embedding-3-small` (cheap — ~$0.00002 per 1k tokens; ~$0.02 to embed the entire 27-doc sample corpus)
- **Vector store:** In-memory cosine similarity (corpus is small enough; SQLite + sqlite-vss is the production swap when corpus grows past ~10k docs)
- **Retrieval CLI:** `bun src/cli.ts ask "<your question>"` → top 5 hits with snippets + source paths + composed answer

Future-pure-local swap: replace OpenAI embeddings with `@xenova/transformers` running a local `Xenova/all-MiniLM-L6-v2` model. No API key needed at all. Annotated comment in `src/embed.ts` shows the swap.

---

## Setup

1. Clone this repo
2. `cp .env.example .env` and fill in your `OPENAI_API_KEY`
3. `bun install`
4. `bun src/ingest.ts` — embeds the 27-doc sample corpus, writes `embeddings/corpus.json`. Takes ~10 seconds, costs ~$0.02 against your OpenAI account.
5. `bun src/cli.ts ask "What did I conclude about lean inventory in the Carrington engagement?"`

---

## Sample queries

See `samples/queries.md` for a curated list of 8 queries the corpus is designed to answer well, along with expected retrieval shape.

---

## License

MIT. Fork, modify, swap your data in, ship. The whole point.

Built by [AI Builders Club](https://aibuildersclub.ai) as the Sprint 02 / Code / Advanced sample build.
