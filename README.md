# $HEIST — 抢劫池

A 3-role gambling pool on BNB Chain via Flap. Bilingual (EN / 中文) landing page.

Built with **Vite + React + Tailwind CSS**.

---

## 🦊 MetaMask wallet integration

The site has built-in MetaMask wallet support (`src/useWallet.js`):

- **Connect button** in the top-right nav and at the bottom CTA
- Auto-detects if MetaMask is installed; if not, opens the install page
- Auto-prompts to switch to BNB Smart Chain (chainId `0x38` / 56)
- If user is on a different chain, shows a red "⚠ SWITCH NETWORK" button
- Listens for account/network changes and updates the UI live
- Click connected pill to disconnect

Works out of the box — no extra config needed. Pre-launch, the wallet still connects, but there's no contract to interact with yet.

To add token-buying functionality after launch, hook into `useWallet()` from any component:

```jsx
import { useWallet } from './useWallet'

function BuyButton() {
  const { account, isOnBSC } = useWallet()
  // call your contract here using window.ethereum...
}
```

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

---

## 🔧 Pre-launch → Live Mode

The site has **two modes**, controlled by a single boolean in `src/config.js`:

### Before launch (default)

```js
// src/config.js
export const config = {
  IS_LIVE: false,
  TOKEN_CA: '',
  // ...
}
```

In this mode:
- CA pill in nav shows **"COMING SOON"**
- Hero vault timer shows **"STARTING SOON"**
- Vault BNB amount shows **"—"**
- Footer contract link shows **"COMING SOON"**
- "Connect Wallet" button is replaced with **"Coming Soon / 即将上线"**

### After launch

```js
// src/config.js
export const config = {
  IS_LIVE: true,
  TOKEN_CA: '0x4E157b...your real CA',
  VAULT_CONTRACT: '0x91a3...your vault',
  TREASURY_CONTRACT: '0x2bfd...your treasury',
  // ...
}
```

Flip `IS_LIVE` to `true`, paste your real addresses, redeploy. Done.

---

## 📦 Build for production

```bash
npm run build
```

Output goes to `dist/`. That's what Netlify serves.

---

## 🌐 Deploy to Netlify

### Option A — via GitHub (recommended)

1. Push this repo to GitHub:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/heist-pool.git
   git push -u origin main
   ```

2. Go to [netlify.com](https://app.netlify.com) → **Add new site → Import from GitHub**

3. Pick your repo. Netlify auto-detects Vite and uses these settings (already in `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`

4. Click **Deploy**. Done.

### Option B — Netlify CLI

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Custom domain

In Netlify dashboard → **Domain settings → Add custom domain** → point your domain's DNS to Netlify's nameservers (or add an A/CNAME record).

---

## 📁 Project structure

```
heist-pool/
├── public/
│   └── favicon.svg          # 4-square logo favicon
├── src/
│   ├── App.jsx              # all sections (Hero, Roles, Rules, Sim, etc.)
│   ├── config.js            # ⭐ EDIT THIS to flip pre-launch → live
│   ├── index.css            # Tailwind + paper grain + grid texture
│   └── main.jsx             # entry point
├── index.html
├── tailwind.config.js       # custom colors + fonts
├── postcss.config.js
├── vite.config.js
├── netlify.toml             # Netlify build settings
└── package.json
```

---

## 🎨 Customization

- **Colors / fonts**: `tailwind.config.js` (paper, blood, gold, getaway, vault, etc.)
- **All copy (EN + 中文)**: `src/App.jsx` (each section is its own component)
- **Game parameters**: `src/config.js` (round duration, splits, role odds, etc.)
- **Twitter/Telegram links**: `src/config.js`

---

## ⚠️ Disclaimer

This is a gambling primitive. High risk. The site copy explicitly warns players. Make sure you comply with applicable regulations in your jurisdiction.
