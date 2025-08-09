# SigmaGPT

![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg) ![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg) ![MongoDB Atlas](https://img.shields.io/badge/mongoDB-Atlas-47A248.svg?logo=mongodb) ![Deploy: Vercel](https://img.shields.io/badge/deploy-vercel-black.svg?logo=vercel) ![Deploy: Render](https://img.shields.io/badge/deploy-render-ff6f61.svg?logo=render)

---

> **SigmaGPT** — a small full‑stack chat demo app (React + Vite frontend, Express + Mongoose backend) that integrates with a conversational AI provider for assistant replies and persists chat threads to MongoDB Atlas.

---

## 🚀 Quick Snapshot

* **Frontend:** React + Vite, lightweight chat UI with thread history, typing animation and Markdown/code highlighting.
* **Backend:** Express (ES Modules), single REST router (`/api`) that manages threads and forwards messages to an AI provider.
* **DB:** MongoDB Atlas via Mongoose (Thread + Message schema).
* **Auth / AI:** Uses an API key set via `SIGMAGPT_KEY` environment variable to call the AI provider.

---

## ✨ Features

* Create and manage multiple chat threads
* Persistent message storage (MongoDB)
* Markdown rendering with syntax highlighting for assistant responses
* Streaming-like typing animation (front-end) for replies
* Easy local dev & deploy to Render (backend) and Vercel (frontend)

---

## 📁 Repo structure (important files)

```
SigmaGPT-main/
├─ Backend/
│  ├─ server.js                # Express server + route mounting
│  ├─ routes/chat.js           # API endpoints (thread, chat)
│  ├─ utils/openai.js          # AI provider call (getOpenAIAPIResponse)
│  └─ models/Thread.js         # Mongoose schema (Thread + Message)
├─ Frontend/
│  ├─ public/blacklogo.png
│  └─ src/
│     ├─ App.jsx
│     ├─ Sidebar.jsx           # Thread list + create/delete
│     ├─ ChatWindow.jsx        # Input + send logic
│     └─ Chat.jsx              # Chat rendering, typing animation
└─ README.md
```

---

## 🧩 Prerequisites

* Node.js >= 18
* npm (or yarn)
* MongoDB Atlas cluster (or a MongoDB URI)
* An API key for your conversational AI provider (set as `SIGMAGPT_KEY`)

---

## 🔧 Environment variables

Create a `.env` file inside the **Backend/** folder (or set them in your host/platform):

```
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<DatabaseName>?retryWrites=true&w=majority
SIGMAGPT_KEY=sk-xxxxxxxxxxxxxxxxxxxx
PORT=8080                  # optional — in cloud use process.env.PORT
```

> **Important:** When deploying (Render), make sure you set `MONGODB_URI` in Render’s Environment Variables and **whitelist Render's IPs** (or temporarily use `0.0.0.0/0` in Atlas network access while testing).

---

## 🛠️ Local development

**1. Start Backend**

```bash
cd Backend
npm install
# for local dev you can use nodemon (package included)
npm run start   # runs node server.js (or use nodemon if you prefer)
```

**2. Start Frontend**

```bash
cd Frontend
npm install
npm run dev
# Open http://localhost:5173 (or the Vite dev url)
```

> If your frontend is still using hard-coded `http://localhost:8080` endpoints, change them to use a single base constant (recommended):

```js
// Frontend/src/config.js
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";
```

Then use: `fetch(`\${API\_BASE\_URL}/api/thread`)` etc.

---

## 🔌 API Endpoints

* `GET /api/thread` — returns **array** of threads
* `GET /api/thread/:threadId` — returns messages for a thread
* `DELETE /api/thread/:threadId` — delete a thread
* `POST /api/chat` — send a message and receive assistant reply (body: `{ threadId, message }`)

**Example (send a chat)**

```bash
curl -X POST https://localhost:8080/api/chat \
  -H "Content-Type: application/json" \
  -d '{"threadId":"<id>","message":"Hello"}'
```

---

## ⚠️ Security & Ethics note (PLEASE READ)

While exploring the `Backend/utils/openai.js` file you will find the project includes a system-style prompt that instructs the Assistant to use abusive or threatening behavior. This is **dangerous** and **not recommended**:

* It may violate platform policies of any AI provider you use.
* It can produce offensive, harassing, or harmful outputs.

**Recommendation:** Sanitize or remove any prompt that instructs the model to harass, bully, or threaten users. Replace it with a neutral assistant persona or a safe conversational style.

---

## 🧪 Tests / Debugging tips

* Use `curl` to test endpoints directly (`/api/thread`, `/api/chat`)
* Inspect Render/Vercel logs on deployment for `MONGODB` or `PORT` errors
* Verify your backend binds to the platform-provided port: in `server.js`, use `const PORT = process.env.PORT || 8080;` so Render/Vercel can assign a port

---

## 🙌 Contribution

Feel free to open issues, send PRs, or ask for help. Suggested improvements:

* Add proper error handling & retry logic for AI calls
* Add pagination/limit for threads
* Improve UX for long responses (streaming or chunked display)
* Remove/replace harmful system prompt in `openai.js`

---

## 📜 License

MIT — feel free to reuse and adapt, but **do not** use the abusive prompt in production.

---
