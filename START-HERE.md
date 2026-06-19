# 🌅 Start here

Welcome to **AprilDawn** — _the everything store for memories_. This is the
one-minute guide to running it and putting it online.

## ▶️ Run it on your computer

In a terminal (Git Bash, VS Code terminal, etc.):

```bash
git clone https://github.com/showoffjp/AprilDawn.git
cd AprilDawn
npm install
npm run dev
```

Then open **http://localhost:3000**. Edit any file in `src/` and the page
updates instantly. Press `Ctrl+C` in the terminal to stop it.

## ☁️ Put it on the internet (Vercel — ~1 minute)

1. Go to **https://vercel.com** and sign in with GitHub.
2. **Add New → Project**, then **Import** `showoffjp/AprilDawn`.
3. Don't change any settings — Vercel detects Next.js automatically. Click **Deploy**.
4. In ~1 minute you get a live link like `april-dawn.vercel.app`.

Every time you push to the `main` branch, Vercel rebuilds and updates the live
site automatically. No keys are needed for the demo to work.

## 🧭 Where everything lives

- **Pages & API:** `src/app/**`
- **Reusable UI:** `src/components/**`
- **Content/data (services, products, occasions):** `src/lib/**`
- **Design tokens (the "April Dawn" palette):** `src/app/globals.css`
- **Strategy & plans:** `docs/**`
- **Big picture & features:** `README.md`

## ✅ Before you commit changes

```bash
npm run lint && npm run typecheck && npm run build
```

If those three pass, it'll build on Vercel too. 💛
