# 2026 Engineering Reference — Complete Edition

> One document: foundations, systems, engineering, security, AI, frontend, language, and golden rules. For use in Notion: import this file or paste by section.

---

## 00 · Overview

**Purpose:** Move from “coder” to **system architect** — orchestrating AI, infrastructure, security, and environment standards.

| Group | Sections | Topics |
|-------|----------|--------|
| Foundations | 01–05 | CS, data structures, algorithms, OS, networking |
| Systems | 06–10 | Architecture, data, APIs, distributed systems, concurrency |
| Engineering | 11–15 | Environment, testing, CI/CD, performance, observability |
| Security & AI | 16–19 | ZTA, crypto, AI collaboration, ML fundamentals |
| Frontend & language | 20–22 | Browser/runtime, language theory, compilers |
| Reference | 23–24 | Design patterns, golden rules |

**How to use:** Treat each `##` section as a standalone note. The **Golden Rules** section is the TL;DR for daily work.

---

## 01 · CS Fundamentals

### Number systems

| System | Base | Example (=10) | Use |
|--------|------|-----------------|-----|
| Binary | 2 | `1010` | CPU, bitwise |
| Octal | 8 | `012` | Unix permissions |
| Decimal | 10 | `10` | Human-readable |
| Hex | 16 | `0xA` | Addresses, colors |

- **Two’s complement:** negation = flip bits + 1; watch overflow (`INT_MAX + 1` → `INT_MIN`).
- **IEEE 754:** avoid floats for money; use integer cents or `Decimal`.

### Bitwise (essentials)

```text
n & (n-1)     // clear lowest set bit; power-of-2 test
n | (1<<k)    // set bit k
lo + ((hi-lo)>>1)  // safe midpoint (no overflow)
```

### Memory hierarchy (latency, rough order)

Registers → L1 → L2 → L3 → RAM → NVMe → HDD → network. **Cache locality:** prefer arrays / sequential access over pointer-chasing when hot paths matter.

### CPU essentials

Control unit (fetch–decode–execute), ALU, virtual memory (MMU, page faults), interrupts.

---

## 02 · Data Structures

| Structure | Typical ops | Notes |
|-----------|---------------|--------|
| Array | O(1) index | Default; cache-friendly |
| Hash map | O(1) avg lookup | Bad for ordered iteration / range queries |
| Heap | O(log n) push/pop | K-largest, scheduling |
| Balanced BST | O(log n) | Ordered data, ranges |
| Trie | O(k) key length | Prefix search |
| Union–Find | ~O(1) α(n) | Components, Kruskal |

**Hash tables:** open addressing vs chaining; use strong hashes for untrusted keys (SipHash) to reduce hash-flooding DoS.

---

## 03 · Algorithms

### Big-O intuition

O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)

### Sorting (summary)

| Algorithm | Stable | Notes |
|-----------|--------|--------|
| Merge | Yes | Predictable n log n |
| Quick | No | Fast in practice; random pivot |
| TimSort | Yes | Python/Java default |

### Graphs

- **BFS:** shortest path unweighted, levels.
- **DFS:** cycles, topo sort, components.
- **Dijkstra:** non-negative weights.
- **Bellman–Ford:** negative edges; detects negative cycles.
- **Topo sort:** DAGs only — dependencies, builds.

### Patterns

Two pointers, sliding window, binary search on answer space, DP (state → recurrence → base → direction).

---

## 04 · Operating Systems

- **Process vs thread vs coroutine:** isolation vs shared memory vs user-space scheduling.
- **Scheduling:** FCFS, SJF, round robin, priority + aging, Linux CFS (vruntime).
- **Virtual memory:** pages, TLB, page faults; layout: text, data, BSS, heap, mmap, stack.
- **Page replacement:** LRU / clock; OPT is theoretical optimum.
- **IPC:** pipes, UDS, shared memory, sockets, signals.
- **Filesystems:** inodes, journaling/WAL, VFS, copy-on-write.

---

## 05 · Networking

### OSI (conceptual)

Application → … → Transport (TCP/UDP, ports) → Network (IP) → Data link (Ethernet, MAC) → Physical.

### TCP vs UDP

TCP: reliable, ordered, HoL blocking on stream. UDP: best-effort; good for latency-sensitive or QUIC/HTTP3 stacks.

### HTTP evolution

HTTP/1.1 (parallel connections), HTTP/2 (multiplexed on TCP), HTTP/3/QUIC (UDP, per-stream no TCP HoL).

### DNS records

A, AAAA, CNAME, MX, TXT, NS, SOA — understand resolution chain (stub → recursive → root → TLD → authoritative).

### TLS 1.3

1-RTT, forward secrecy (ECDHE), 0-RTT caveat (replay risk on non-idempotent ops).

---

## 06 · Architecture

- **Start with modular monolith**; extract services when boundaries and ops justify it.
- **SOLID:** single responsibility, open/closed, Liskov, interface segregation, dependency inversion.
- **DDD:** bounded context, aggregate root, domain events, repositories, value objects, context map.
- **Hexagonal:** domain in center; ports/adapters; framework is outside.
- **CQRS / event sourcing:** separate reads/writes; event log as source of truth where appropriate.
- **2026 stack (example):** typed languages, containers, IaC, Vault-class secrets, Kafka/Rabbit/NATS, mTLS, trunk-based + spec-driven workflow.

---

## 07 · Data Layer

- **Defaults:** PostgreSQL, Redis for cache/sessions, object store for blobs, Kafka/Rabbit for queues — match tool to access pattern.
- **ACID** vs **BASE:** transactions vs eventual consistency.
- **Isolation:** know READ COMMITTED vs REPEATABLE READ vs SERIALIZABLE.
- **Normalization:** 1NF–BCNF; denormalize only when measured need.
- **Indexes:** FKs, selective WHERE/JOIN columns, partial indexes, composite column order, `EXPLAIN (ANALYZE, BUFFERS)`.
- **N+1:** fix with joins / batch / eager loading.
- **Migrations:** expand–contract; backward compatible; migrate before app deploy.

---

## 08 · API Design

| Style | When |
|-------|------|
| REST+JSON | Public APIs, caching |
| GraphQL | Complex client shapes |
| gRPC | Internal services |
| tRPC | TS monorepo only |
| WebSocket / SSE | Push / streaming |

- REST: nouns, plural resources, correct verbs, RFC 7807 errors, idempotency keys for POST.
- Version in URL or headers; sunset/deprecation headers for consumers.

---

## 09 · Distributed Systems

- **Fallacies of distributed computing:** network is not reliable or free; latency and bandwidth matter.
- **CAP / PACELC:** partition happens; choose consistency vs availability deliberately.
- **Consistency ladder:** eventual → read-your-writes → linearizable (expensive).
- **Raft:** leader election, replicated log, odd node counts for quorum.
- **Partitioning:** range vs hash; consistent hashing for elasticity.
- **Patterns:** circuit breaker, saga (+ compensation), outbox for reliable publish.

---

## 10 · Concurrency

- **Concurrency vs parallelism** (Pike).
- **Primitives:** mutex, RWMutex, semaphore, condvar, channels (Go), atomics, `sync.Once`.
- **Deadlock:** Coffman conditions; global lock ordering; race detectors.
- **Go:** worker pools, `context` cancellation, `errgroup`.
- **JS:** async/await = promises + microtasks; parallelize independent awaits with `Promise.all`.

---

## 11 · Environment & Config

Tiers: local → dev/preview → staging → prod.

**Config priority (low → high):** code defaults → `.env` / `.env.local` (gitignored) → CI secrets → Vault/KMS.

**Twelve-factor highlights:** config in env, stateless processes, logs to stdout, admin tasks as one-off processes.

**Secrets:** never in git; gitleaks; rotate on leak; `git filter-repo` if needed.

---

## 12 · Testing Strategy

**Testing trophy:** static analysis + some unit + **most integration** + few E2E.

- TDD + AI: failing test is the spec; paste failures back into the loop.
- **AAA** arrange / act / assert.
- Don’t mock the system under test; mock boundaries.
- Property-based tests for invariants (`fast-check`, etc.).

---

## 13 · CI/CD & GitOps

Pipeline: lint → types → unit → build → image scan → integration → deploy staging → E2E → approval → **migrate DB** → deploy prod.

**Strategies:** rolling, blue/green, canary, feature flags.

**Security gates:** secret scan, dependency audit, container scan, pin action SHAs, SBOM, signing (maturity-dependent).

**Trunk-based:** short branches, merge daily, flags for incomplete work.

---

## 14 · Performance

- **Profile first** (pprof, perf, browser Performance).
- **Latency budget:** one cross-region RTT dwarfs millions of cache hits — reduce round trips.
- **Caching:** cache-aside default; know invalidation cost.
- **Web vitals:** LCP, INP, CLS.
- **DB:** `EXPLAIN`, avoid `SELECT *`, avoid wrapping indexed columns in functions, pooling, keyset pagination.

---

## 15 · Observability

**Three pillars:** structured logs, metrics (RED for services, USE for resources), traces (OpenTelemetry).

**SLO / error budget:** alert on burn rate; every alert needs a runbook.

---

## 16 · Security (ZTA)

- Never trust network location; least privilege; assume breach; continuous validation.
- **OWASP Top 10 (themes):** access control, crypto, injection, design, misconfig, vulnerable components, auth/session, integrity, logging, SSRF.
- **Auth:** short-lived access tokens, refresh rotation, httpOnly cookies where appropriate; Argon2id for passwords.
- **Injection:** parameterized queries; `execFile` with args array, not shell strings.
- **Headers:** HSTS, CSP, `X-Content-Type-Options`, `X-Frame-Options` / CSP `frame-ancestors`, `Permissions-Policy`.

---

## 17 · Cryptography

**Use:** AES-GCM, ChaCha20-Poly1305, X25519, Ed25519, SHA-256/SHA-3, Argon2id, TLS 1.3.

**Avoid:** ECB, unauthenticated CBC, MD5/SHA-1 for security, homemade crypto, timing-unsafe string compare for secrets.

**PKI:** short-lived certs, CT logs, chain validation.

---

## 18 · AI Collaboration

- **Pilot / navigator:** you own quality and merges; AI executes scoped tasks.
- **Spec-driven:** PRD/spec → plan → tests → implement → review → atomic commits.
- **Slop checklist:** hallucinated APIs, N+1, empty catches, hardcoded secrets, missing authz, wrong async sequencing.
- **Prompting:** role + constraints, I/O contract, failing test paste, plan-before-code, negative constraints.

---

## 19 · ML Fundamentals

- Supervised / unsupervised / RL — know when each applies.
- Metrics: precision, recall, F1, ROC-AUC, PR-AUC (imbalanced), MAE/RMSE.
- Transformers: tokens, self-attention O(n²) memory, training vs inference cost.
- Bias–variance; train/val/test discipline; no shuffle on time series.

---

## 20 · Frontend Systems

- Event loop: stack → microtasks (drain) → render → macrotasks.
- CRP: DOM + CSSOM → layout → paint → composite; **only** `transform`/`opacity` for cheap animation.
- React: keys, memoization, avoid waterfall fetches, virtualization for long lists.
- Bundlers: prefer ESM + Vite; tree-shaking needs static imports.

---

## 21 · Language Theory

- Static vs dynamic typing; strong vs weak (avoid `==` footguns).
- Structural vs nominal typing; ADTs (sum/product).
- Memory: manual vs GC vs Rust ownership.
- Execution: AOT vs JIT vs interpreted vs transpiled.
- Chomsky hierarchy: regex ⊂ CFG ⊂ … — parsers use CFGs (BNF/EBNF).

---

## 22 · Compilers & runtimes

Pipeline: lex → parse (AST) → semantic analysis → IR → optimize → codegen.

Practical: ESLint/Babel/Prettier are AST transforms; TS is a compiler frontend; LLVM shared backend; WASM as portable IR.

---

## 23 · Design Patterns

**Creational:** singleton (careful), factory, abstract factory, builder, prototype.

**Structural:** adapter, decorator, proxy, facade, composite, flyweight.

**Behavioral:** observer, strategy, command, iterator, template method, chain of responsibility, state, mediator.

**Meta:** DRY, YAGNI, KISS, separation of concerns, Law of Demeter, composition over inheritance.

---

## 24 · Golden Rules

1. **No secrets in git** — ever; rotate if leaked.
2. **No god files** — split by responsibility (~300 lines warning).
3. **No manual prod deploys** — Git → CI → deploy.
4. **No blind trust in AI commands** — read before run (`sudo`, `rm`, `curl | bash`).
5. **No untyped production code** — strict TS / Go / Rust.
6. **No unbounded queries** — LIMIT / pagination everywhere.
7. **No alert without a runbook.**
8. **No merging AI code without reading every line.**
9. **No floats for money** — integers or decimal types.
10. **No roll-your-own crypto** — use vetted libraries.
11. **No optimization before profiling.**
12. **No external call without timeout + circuit breaker (+ backoff).**
13. **No incompatible migrations** — expand–contract; migrate before app.
14. **No “internal network is safe”** — Zero Trust, mTLS, least privilege.

### Coder → architect (mindset)

| Coder | Architect |
|-------|-----------|
| “How do I write this function?” | “What is the correct module boundary?” |
| Fixes the line | Fixes the system that allowed the bug |
| Deploys when it feels ready | Deploys when CI is green |
| Security as last checkbox | Threat model at design time |

---

*End of reference.md — import into Notion or keep as plain Markdown.*
