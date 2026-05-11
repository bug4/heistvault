// ════════════════════════════════════════════════════════════════
//  $HEIST CONFIG  —  edit this file to switch from pre-launch → live
// ════════════════════════════════════════════════════════════════
//
//  HOW TO USE:
//  1. Before launch  →  IS_LIVE = false
//     • CA, vault contract, treasury all show "COMING SOON"
//     • Hero vault timer shows "STARTING SOON"
//     • Vault BNB amount shows "—"
//     • Calculator shows 0 BNB placeholders
//
//  2. After launch   →  IS_LIVE = true
//     • Fill in TOKEN_CA, VAULT_CONTRACT, TREASURY_CONTRACT
//     • Vault numbers go live (animated demo numbers until you wire on-chain data)
//     • Timer counts down 3-min rounds
//     • Calculator shows live demo expected payouts
//
// ════════════════════════════════════════════════════════════════

export const config = {
  // ─── LAUNCH STATE ──────────────────────────────────────────────
  IS_LIVE: true,

  // ─── CONTRACT ADDRESSES ────────────────────────────────────────
  TOKEN_CA: '0x421bbbb40afb51aa625a10f0c59b0fd901f37777',
  VAULT_CONTRACT: '0x421bbbb40afb51aa625a10f0c59b0fd901f37777',
  TREASURY_CONTRACT: '0x75d13310bed23c3cf8ae844e2d069e688ecaf310',

  // ─── SOCIAL LINKS ──────────────────────────────────────────────
  TWITTER_URL: 'https://x.com/heist_pool',
  TELEGRAM_URL: 'https://x.com/heist_pool',
  FLAP_URL: 'https://flap.sh/',
  WEBSITE: 'https://heistgame.fun/',

  // ─── DISPLAY STRINGS ───────────────────────────────────────────
  COMING_SOON: 'COMING SOON',
  COMING_SOON_ZH: '即将上线',
  STARTING_SOON: 'STARTING SOON',
  STARTING_SOON_ZH: '即将开始',
  PLACEHOLDER_AMOUNT: '—',

  // ─── GAME PARAMETERS ──────────────────────────────────────────
  ROUND_DURATION: '3 MIN',
  GENESIS_PCT: '5%',
  ROUND_RELEASE_PCT: '2%',
  CLAIM_COOLDOWN: '24 HRS',
  TOTAL_SUPPLY: '1,000,000,000',
}

// Helper: returns the CA shortened, or COMING SOON
export const displayCA = () => {
  if (!config.IS_LIVE || !config.TOKEN_CA) return config.COMING_SOON
  const ca = config.TOKEN_CA
  return `${ca.slice(0, 6)}...${ca.slice(-4)}`
}
