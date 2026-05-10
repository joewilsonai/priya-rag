<div align="center">

# 🧠 priya-rag

**A working Personal Knowledge Agent — RAG over your private corpus.**

Built as the **Sprint 02 / Code / Advanced** sample for [AI Builders Club](https://aibuildersclub.ai). Claude Code builds a full retrieval pipeline over your Notion, Gmail, Drive, and Slack exports. *Private. Local. Yours.* Ask anything — get real answers.

[![Built_for](https://img.shields.io/badge/Built_for-AI_Builders_Club-d97757)](https://aibuildersclub.ai)
[![Sprint](https://img.shields.io/badge/Sprint-02_Capstone-22c55e)]()
[![Runtime](https://img.shields.io/badge/Runtime-Bun-000000?logo=bun)](https://bun.sh)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)

[**Frontend repo →**](https://github.com/joewilsonai/priya-rag-web)

</div>

---

## The use case

Priya is a solo management consultant — 8 years independent, focused on operations and process improvement for mid-market manufacturers. Across those 8 years she has accumulated:

- ~10 client engagement notes in **Notion**
- ~8 email threads in **Gmail**
- ~6 deliverables (slide decks, process maps, RFP responses) in **Google Drive**
- ~3 **Slack** workspaces from current and recent engagements

When a new RFP comes in, Priya wants to answer:

> *"What did I conclude about lean inventory in the Carrington Industries engagement?"*
> *"Which client engagements involved a TMS migration?"*
> *"What did the project team flag as the top three operational risks for Westmont?"*

This RAG agent answers those questions by **retrieving the most relevant snippets from her personal corpus, with citations to the original source files.**

Not a chatbot. Not a workflow tool. A **searchable second-brain for one knowledge worker.**

## Why it's a sample build

Everything in `data/` is **fictional sample content**. No real client engagements, no real PII, no real correspondence. The fake-company contexts (Hartwell Logistics, Carrington Industries, Westmont Industrial) are deliberately threaded so the demo feels like a real consultant's archive rather than synthetic templates.

The architecture is portable: replace `data/` with your own export from Notion + Gmail + Drive + Slack, re-run `bun src/ingest.ts`, and the pipeline indexes your real corpus the same way.

## Quick start

```bash
git clone https://github.com/joewilsonai/priya-rag
cd priya-rag
bun install
cp .env.example .env   # add OPENAI_API_KEY
bun src/ingest.ts      # embed the sample corpus
bun src/cli.ts ask "What did I conclude about lean inventory at Carrington?"
```

Top 5 hits + composed answer print to your terminal with source paths.

## Stack

- **Runtime:** [Bun](https://bun.sh) (TypeScript, no transpile step)
- **Embeddings:** OpenAI `text-embedding-3-small` (~$0.02 to embed the full sample corpus)
- **Vector store:** In-memory cosine similarity (corpus is small; SQLite + sqlite-vss is the swap when corpus grows past ~10k docs)
- **Retrieval CLI:** `bun src/cli.ts ask "<your question>"`

**Future-pure-local swap:** replace OpenAI embeddings with `@xenova/transformers` running `Xenova/all-MiniLM-L6-v2` locally. No API key needed. Annotated comment in `src/embed.ts` shows the swap.

## Companion frontend

🌐 **[priya-rag-web](https://github.com/joewilsonai/priya-rag-web)** — the Next.js chat UI that wraps this backend.

## License

MIT

Built by [Joe Wilson](https://github.com/joewilsonai) for [AI Builders Club](https://aibuildersclub.ai).
