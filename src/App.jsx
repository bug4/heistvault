import { useState, useEffect } from 'react'
import { config, displayCA } from './config'
import { useWallet, shortAddr } from './useWallet'

// ──────────────────────────────────────────────────────────────
//  WALLET BUTTON — used in nav and CTAs
// ──────────────────────────────────────────────────────────────
function WalletButton({ variant = 'primary', className = '' }) {
  const { account, connecting, error, isOnBSC, connect, disconnect, switchToBSC } = useWallet()
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-alt'
  const fullClass = `${baseClass} ${className}`

  if (!account) {
    return (
      <div className="flex flex-col items-start gap-1.5">
        <button onClick={connect} disabled={connecting} className={fullClass}>
          {connecting ? 'Connecting... / 连接中...' : '🦊 Connect Wallet / 连接钱包'}
        </button>
        {error && <div className="font-mono text-[11px] text-blood">{error}</div>}
      </div>
    )
  }
  if (!isOnBSC) {
    return (
      <div className="flex flex-col items-start gap-1.5">
        <button onClick={switchToBSC} className={fullClass} style={{ background: '#d63031', color: '#f3ead6', borderColor: '#141210' }}>
          ⚠ Switch to BNB Chain / 切换到 BNB
        </button>
        <div className="font-mono text-[11px] opacity-70">{shortAddr(account)}</div>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-start gap-1.5">
      <button onClick={disconnect} className={fullClass}>
        ✓ {shortAddr(account)} / 已连接
      </button>
      <div className="font-mono text-[11px] opacity-70">BNB Chain · click to disconnect</div>
    </div>
  )
}

function WalletPill() {
  const { account, connecting, isOnBSC, connect, switchToBSC } = useWallet()
  if (!account) {
    return (
      <button onClick={connect} disabled={connecting}
        className="bg-blood text-paper px-3 py-1.5 border-2 border-ink font-mono text-[11px] tracking-wide hover:bg-ink transition-colors disabled:opacity-60 cursor-pointer">
        {connecting ? 'CONNECTING...' : '🦊 CONNECT'}
      </button>
    )
  }
  if (!isOnBSC) {
    return (
      <button onClick={switchToBSC}
        className="bg-blood text-paper px-3 py-1.5 border-2 border-ink font-mono text-[11px] tracking-wide cursor-pointer">
        ⚠ SWITCH NETWORK
      </button>
    )
  }
  return (
    <div className="bg-ink text-paper px-3 py-1.5 border-2 border-ink font-mono text-[11px] tracking-wide">
      <span className="text-gold font-bold">●</span> {shortAddr(account)}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
//  LOGO
// ──────────────────────────────────────────────────────────────
function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 bg-ink p-1 grid grid-cols-2 grid-rows-2 gap-0.5 -rotate-3">
        <span className="bg-blood" /><span className="bg-gold" /><span className="bg-paper" /><span className="bg-getaway" />
      </div>
      <div>
        <div className="font-bungee text-xl tracking-wide">$HEIST</div>
        <div className="font-sc text-[11px] font-bold tracking-[4px] text-blood -mt-0.5">抢劫池</div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
//  NAVBAR
// ──────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="sticky top-[18px] z-50 bg-paper border-b-2 border-ink px-8 py-3.5 flex justify-between items-center max-md:px-5 max-md:py-3">
      <Logo />
      <ul className="flex gap-7 items-center font-mono text-[13px] font-medium max-md:hidden">
        <li><a href="#how" className="border-b-2 border-transparent hover:border-blood pb-0.5 transition-colors">How / 流程</a></li>
        <li><a href="#mechanic" className="border-b-2 border-transparent hover:border-blood pb-0.5 transition-colors">Mechanic / 机制</a></li>
        <li><a href="#rules" className="border-b-2 border-transparent hover:border-blood pb-0.5 transition-colors">Rules / 规则</a></li>
        <li><a href="#calc" className="border-b-2 border-transparent hover:border-blood pb-0.5 transition-colors">Calculator / 计算器</a></li>
        <li><a href="#faq" className="border-b-2 border-transparent hover:border-blood pb-0.5 transition-colors">FAQ</a></li>
      </ul>
      <div className="flex items-center gap-2.5">
        <div className="bg-ink text-paper px-3 py-1.5 border-2 border-ink font-mono text-[11px] tracking-wide max-sm:hidden">
          <span className="text-blood font-bold">CA </span>{displayCA()}
        </div>
        <WalletPill />
      </div>
    </nav>
  )
}

// ──────────────────────────────────────────────────────────────
//  LIVE VAULT CARD (hero right)
// ──────────────────────────────────────────────────────────────
function VaultCard() {
  const [secs, setSecs] = useState(167)
  const [vault, setVault] = useState(12.84)
  const [winners, setWinners] = useState(34)

  useEffect(() => {
    if (!config.IS_LIVE) return
    const i = setInterval(() => {
      setSecs((s) => (s <= 0 ? 180 : s - 1))
      setVault((v) => +(12 + Math.random() * 6).toFixed(2))
      if (Math.random() > 0.7) setWinners(20 + Math.floor(Math.random() * 40))
    }, 1000)
    return () => clearInterval(i)
  }, [])

  const m = String(Math.floor(secs / 60)).padStart(2, '0')
  const s = String(secs % 60).padStart(2, '0')

  return (
    <div className="relative">
      <div className="bg-vault border-[3px] border-ink p-6 rotate-2 relative" style={{ boxShadow: '12px 12px 0 #d63031' }}>
        <div className="absolute -top-3.5 left-5 bg-blood text-paper px-3 py-1 font-bungee text-[11px] tracking-wide border-2 border-ink">
          {config.IS_LIVE ? 'LIVE — 实况' : 'PRE-LAUNCH — 即将上线'}
        </div>
        <div className="flex justify-between items-center mb-4 text-paper font-mono text-xs mt-1">
          <span className="flex items-center">
            <span className="inline-block w-2 h-2 bg-blood rounded-full mr-2 animate-flicker" />
            ROUND <span className="text-gold font-bold ml-1">#{config.IS_LIVE ? '001' : '???'}</span>
          </span>
          <span className="text-blood font-mono font-bold">
            {config.IS_LIVE ? `${m}:${s}` : config.STARTING_SOON}
          </span>
        </div>
        <div className="text-gold font-display text-[56px] tracking-tight leading-none mb-1">
          {config.IS_LIVE ? `${vault.toFixed(2)} BNB` : config.PLACEHOLDER_AMOUNT}
        </div>
        <div className="text-paper opacity-60 font-mono text-[11px] tracking-[2px] mb-6">
          NEXT ROUND PAYOUT / 下轮派彩
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-paper text-ink p-3 border-2 border-paper">
            <div className="font-mono text-[10px] tracking-wider opacity-70">ELIGIBLE HOLDERS</div>
            <div className="font-mono text-[9px] opacity-60">符合条件持有者</div>
            <div className="font-bungee text-2xl mt-1">{config.IS_LIVE ? winners : '—'}</div>
          </div>
          <div className="bg-gold text-ink p-3 border-2 border-gold">
            <div className="font-mono text-[10px] tracking-wider opacity-80">VAULT RESERVES</div>
            <div className="font-mono text-[9px] opacity-70">金库储备</div>
            <div className="font-bungee text-2xl mt-1">{config.IS_LIVE ? '142.7 BNB' : '—'}</div>
          </div>
        </div>

        <div className="mt-4 p-3 border-2 border-paper border-dashed text-paper font-mono text-[11px] leading-relaxed">
          ▸ Hold $HEIST → auto-play every round<br />
          ▸ 持有 $HEIST → 自动参与每轮
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
//  HERO
// ──────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="grid grid-cols-[1.2fr_1fr] gap-14 items-center px-8 pt-14 pb-20 min-h-[calc(100vh-100px)] max-lg:grid-cols-1 max-lg:gap-10 max-md:px-5 max-md:pt-10">
      <div>
        <h1 className="font-display uppercase leading-[0.85] tracking-tight mb-2" style={{ fontSize: 'clamp(64px, 9vw, 140px)' }}>
          Hold the bag.<br />
          Get <span className="text-blood">paid</span><br />
          <span className="line-through" style={{ textDecorationColor: '#d63031', textDecorationThickness: '8px' }}>every</span> 3 minutes.
        </h1>
        <div className="font-sc font-black leading-[0.9] mb-8 tracking-tight" style={{ fontSize: 'clamp(48px, 7vw, 110px)' }}>
          持币就 <span className="text-blood">分赃</span>。
        </div>
        <div className="font-type text-lg leading-relaxed max-w-md mb-9 px-5 py-4 border-l-4 border-blood" style={{ background: 'rgba(214, 48, 49, 0.06)' }}>
          No betting. No staking. No clicking.<br />
          Just hold $HEIST. Every 3 minutes, the vault picks winners. Square-root weighted, whale-resistant.
          <span className="block font-sc text-[15px] opacity-80 mt-1.5">不用下注，不用质押，不用点击。持有 $HEIST，每 3 分钟金库自动分赃。平方根权重，抗鲸鱼。</span>
        </div>
        <div className="flex gap-3.5 mb-10 flex-wrap">
          <a href="#calc" className="btn-primary">▶ Calculate Earnings / 计算收益</a>
          <a href="#how" className="btn-alt">How it works / 流程</a>
        </div>
        <StatStrip />
      </div>
      <VaultCard />
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
//  STATS STRIP
// ──────────────────────────────────────────────────────────────
function StatStrip() {
  const stats = [
    ['Round / 轮次', config.ROUND_DURATION],
    ['Genesis Vault', config.GENESIS_PCT],
    ['Per Round', config.ROUND_RELEASE_PCT],
    ['Chain / 链', 'BNB'],
  ]
  return (
    <div className="grid grid-cols-4 border-2 border-ink bg-paper-dark max-sm:grid-cols-2">
      {stats.map(([label, val], i) => (
        <div key={i} className={`p-3.5 px-4 ${i < 3 ? 'border-r-2 border-ink' : ''} max-sm:border-r-0 max-sm:border-b-2 max-sm:[&:nth-child(2n)]:border-r-0 ${i < 2 ? 'max-sm:border-b-2 max-sm:border-ink' : ''}`}>
          <div className="font-mono text-[10px] tracking-[2px] opacity-60 uppercase">{label}</div>
          <div className="font-bungee text-lg mt-1">{val}</div>
        </div>
      ))}
    </div>
  )
}

// ──────────────────────────────────────────────────────────────
//  SECTION HEADER
// ──────────────────────────────────────────────────────────────
function SectionHead({ label, children, zh }) {
  return (
    <>
      <div className="font-mono text-[11px] font-bold tracking-[4px] text-blood uppercase mb-6">[{label}]</div>
      <h2 className="font-display uppercase leading-[0.9] tracking-tight mb-2" style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}>
        {children}
      </h2>
      <div className="font-sc font-black leading-none opacity-85 mb-10" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
        {zh}
      </div>
    </>
  )
}

// ──────────────────────────────────────────────────────────────
//  HOW IT WORKS
// ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { en: 'Buy $HEIST', zh: '买入 $HEIST', desc: 'Get any amount of $HEIST on Flap. There is no minimum to buy — but a holder threshold to qualify for round payouts.', descZh: '在 Flap 上买入任意数量的 $HEIST。买入无门槛，但参与开奖有持仓门槛。' },
    { en: 'Hold the bag', zh: '持币不动', desc: 'No staking, no locking. Just keep $HEIST in your wallet. The contract reads balances every round.', descZh: '不用质押，不用锁仓。$HEIST 留在钱包里就行，合约每轮自动读取余额。' },
    { en: 'Get paid', zh: '领取分赃', desc: 'Every 3 minutes the vault picks winners and routes BNB to their wallets. Claim anytime within 24 hours.', descZh: '每 3 分钟金库选出中奖者，BNB 直接进钱包。24 小时内领取即可。' },
  ]
  return (
    <section id="how" className="px-8 py-20 border-b-2 border-ink relative z-10 max-md:px-5 max-md:py-14">
      <SectionHead label="01 / HOW IT WORKS / 流程" zh="买入，持有，分赃。">
        Buy. Hold. <span className="text-blood">Get paid.</span>
      </SectionHead>
      <div className="grid grid-cols-3 border-2 border-ink mt-10 max-md:grid-cols-1">
        {steps.map((s, i) => (
          <div key={i} className={`p-7 px-7 bg-paper relative min-h-[280px] ${i < 2 ? 'border-r-2 border-ink max-md:border-r-0 max-md:border-b-2' : ''}`}>
            <div className="absolute top-3 right-3.5 font-bungee text-[56px] text-blood opacity-15 leading-none">
              {String(i + 1).padStart(2, '0')}
            </div>
            <h3 className="font-bungee text-[22px] mt-4 mb-2">{s.en}</h3>
            <div className="font-sc font-black text-lg mb-4 text-blood">{s.zh}</div>
            <p className="text-sm leading-relaxed mb-2.5">{s.desc}</p>
            <p className="font-sc opacity-75 border-t border-dashed border-ink pt-2.5 mt-3">{s.descZh}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
//  THE MECHANIC (replaces ROLES)
// ──────────────────────────────────────────────────────────────
function Mechanic() {
  return (
    <section id="mechanic" className="px-8 py-20 border-b-2 border-ink relative z-10 max-md:px-5 max-md:py-14">
      <SectionHead label="02 / MECHANIC / 机制" zh="平方根分配，鲸鱼无优势。">
        The bigger your bag, <span className="text-blood">the bigger your cut.</span> But not by much.
      </SectionHead>

      <div className="grid grid-cols-2 gap-12 items-center mt-10 max-lg:grid-cols-1 max-lg:gap-8">
        <div>
          <div className="bg-blood text-paper border-[3px] border-ink p-7 mb-6" style={{ boxShadow: '8px 8px 0 #141210' }}>
            <div className="font-mono text-[11px] tracking-wider opacity-80 uppercase mb-2">SQUARE-ROOT WEIGHTING</div>
            <div className="font-bungee text-4xl mb-3">Whale-resistant.</div>
            <div className="font-sc font-black text-2xl mb-4 opacity-95">抗鲸鱼分配。</div>
            <p className="text-[15px] leading-relaxed">
              Your share of the round payout = √(your balance) ÷ Σ √(all eligible balances). A holder with 100× the bag wins only ~10× the share. Big bags still win more, but not in proportion to their size.
            </p>
            <p className="font-sc text-sm mt-3 opacity-90">
              你的分成 = √(你的余额) ÷ Σ √(所有合格余额)。100 倍持仓只拿 ~10 倍奖励。鲸鱼优势被压缩。
            </p>
          </div>

          <div className="bg-paper border-[3px] border-ink p-7" style={{ boxShadow: '8px 8px 0 #d63031' }}>
            <div className="font-mono text-[11px] tracking-wider text-blood uppercase mb-2">VAULT RELEASE</div>
            <div className="font-bungee text-3xl mb-3">{config.ROUND_RELEASE_PCT} per round</div>
            <div className="font-sc font-black text-xl mb-4">每轮释放 {config.ROUND_RELEASE_PCT}</div>
            <p className="text-[15px] leading-relaxed">
              Each round releases {config.ROUND_RELEASE_PCT} of the HeistVault's BNB reserves to winners. The vault refills from trade tax buybacks, so the prize pool stays funded as long as $HEIST keeps trading.
            </p>
            <p className="font-sc text-sm mt-3 opacity-85">
              每轮释放金库 BNB 储备的 {config.ROUND_RELEASE_PCT} 给中奖者。交易税回购持续补池，只要有交易，奖池就在。
            </p>
          </div>
        </div>

        <div>
          {/* Visual: bar chart showing sqrt curve vs linear */}
          <div className="bg-paper-dark border-[3px] border-ink p-7" style={{ boxShadow: '8px 8px 0 #141210' }}>
            <div className="font-bungee text-lg mb-1">Linear vs Square-Root</div>
            <div className="font-sc font-bold text-sm text-blood mb-5">线性 vs 平方根</div>

            {[
              { name: 'Holder A', zh: '持有者 A', bal: '1× bag', linear: 5, sqrt: 18 },
              { name: 'Holder B', zh: '持有者 B', bal: '4× bag', linear: 20, sqrt: 36 },
              { name: 'Holder C', zh: '持有者 C', bal: '25× bag', linear: 100, sqrt: 90 },
              { name: 'Holder D', zh: '持有者 D', bal: '100× bag', linear: 100, sqrt: 100 },
            ].map((row, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span><strong>{row.name}</strong> · {row.bal}</span>
                  <span className="opacity-60">{row.zh}</span>
                </div>
                <div className="grid grid-cols-[1fr_1fr] gap-2">
                  <div>
                    <div className="font-mono text-[10px] opacity-70">LINEAR</div>
                    <div className="h-3 border border-ink bg-paper relative overflow-hidden">
                      <div className="h-full bg-ink" style={{ width: `${row.linear}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-blood opacity-90">SQRT</div>
                    <div className="h-3 border border-ink bg-paper relative overflow-hidden">
                      <div className="h-full bg-blood" style={{ width: `${row.sqrt}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <p className="font-mono text-[11px] mt-5 pt-4 border-t border-dashed border-ink opacity-75 leading-relaxed">
              ▸ Bigger bag = bigger cut, but compressed.<br />
              ▸ 100× the bag ≠ 100× the payout.<br />
              ▸ 大持仓更多奖励，但不成正比。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
//  RULES
// ──────────────────────────────────────────────────────────────
function Rules() {
  const rules = [
    { num: '01 / SUPPLY', en: 'No new minting', zh: '不增发代币', desc: 'The HeistVault holds the BNB rewards. No $HEIST is ever minted to fund payouts.', descZh: '奖励来自金库 BNB 储备，不会增发 $HEIST。' },
    { num: '02 / GENESIS', en: '5% seed vault', zh: 'Genesis 入池 5%', desc: 'At launch, ~5% of supply is sold and the BNB raised seeds the HeistVault as the initial prize pool.', descZh: '启动时约 5% 供应量出售，BNB 进入 HeistVault 作为初始奖池。' },
    { num: '03 / BUYBACKS', en: 'Tax → buyback → refill', zh: '交易税回购补池', desc: 'Trade tax goes to the Treasury. Treasury periodically swaps to BNB and tops up the HeistVault.', descZh: '交易税进 Treasury，定期换成 BNB 补回 HeistVault。' },
    { num: '04 / RELEASE', en: '2% per round', zh: '每轮释放 2%', desc: `Each round releases ${config.ROUND_RELEASE_PCT} of the HeistVault's current BNB balance to winners. The vault never empties in one round.`, descZh: `每轮释放金库 BNB 余额的 ${config.ROUND_RELEASE_PCT}，永不归零。` },
    { num: '05 / WEIGHTING', en: 'Square-root distribution', zh: '平方根分配', desc: 'Your share = √(your balance) ÷ Σ √(eligible balances). Compresses whale advantage without removing it.', descZh: '你的分成 = √(你的余额) ÷ Σ √(合格余额)，压缩鲸鱼优势但不消除。' },
    { num: '06 / SNAPSHOT', en: 'Per-round balance check', zh: '每轮快照', desc: 'Eligibility is read fresh at the start of each round. No snapshots, no locking — your current balance is what counts.', descZh: '每轮开始时读取余额，无快照，无锁仓，当前持仓即生效。' },
    { num: '07 / CLAIMS', en: '24h claim window', zh: '24 小时领取窗口', desc: 'Winnings accumulate in your claim balance. Pull anytime within 24 hours of the round end. Unclaimed BNB returns to the vault.', descZh: '中奖累积在你的领取余额，24 小时内自取，未领部分回流金库。' },
    { num: '08 / TREASURY', en: 'Treasury is separate', zh: 'Treasury 单独管理', desc: 'Tax never directly enters the HeistVault. Treasury holds tax tokens, executes buybacks, then refills.', descZh: '交易税不直接进金库，Treasury 收税并执行回购补池。' },
    { num: '09 / PROVABLE', en: 'On-chain randomness', zh: '链上随机', desc: 'Round seeds use commit-reveal + chain entropy. Published after each round so anyone can verify outcomes.', descZh: 'commit-reveal + 链上熵源，每轮种子公开可验证。' },
  ]
  const params = [
    ['ROUND', config.ROUND_DURATION], ['VAULT RELEASE', config.ROUND_RELEASE_PCT],
    ['GENESIS', config.GENESIS_PCT], ['CLAIM WINDOW', config.CLAIM_COOLDOWN],
    ['WEIGHTING', '√ BAL'], ['CHAIN', 'BNB'],
  ]
  return (
    <section id="rules" className="px-8 py-20 border-b-2 border-ink relative z-10 max-md:px-5 max-md:py-14">
      <SectionHead label="03 / RULES / 规则" zh="规则尽量简单，结果按合约结算。">
        Rules are <span className="text-blood">simple.</span><br />The contract decides.
      </SectionHead>
      <div className="grid grid-cols-3 gap-4 mt-10 max-md:grid-cols-1">
        {rules.map((r, i) => (
          <div key={i} className="bg-paper-dark border-2 border-ink p-6 relative">
            <div className="font-bungee text-[11px] text-blood tracking-wider mb-1.5 uppercase">{r.num}</div>
            <h4 className="font-bungee text-lg mb-2 leading-tight">{r.en}</h4>
            <div className="font-sc font-black text-base mb-3">{r.zh}</div>
            <p className="text-[13px] leading-relaxed">{r.desc}</p>
            <p className="font-sc mt-2 pt-2 border-t border-dashed border-ink opacity-80 text-[13px]">{r.descZh}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-6 border-2 border-ink mt-8 bg-ink text-paper max-md:grid-cols-2">
        {params.map(([label, val], i) => (
          <div key={i} className={`p-3.5 px-4 ${i < 5 ? 'border-r-2 border-paper' : ''} max-md:border-r-0 max-md:border-b max-md:border-paper`}>
            <div className="font-mono text-[9px] tracking-[2px] text-gold uppercase">{label}</div>
            <div className="font-bungee text-base mt-1 text-paper">{val}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
//  EARNINGS CALCULATOR (replaces simulator)
// ──────────────────────────────────────────────────────────────
function Calculator() {
  const [bagSize, setBagSize] = useState('1000000')   // user's $HEIST holdings
  const [totalEligible, setTotalEligible] = useState('500000000') // assumed total eligible $HEIST
  const [vaultBnb, setVaultBnb] = useState(config.IS_LIVE ? 142.7 : 0)

  useEffect(() => {
    if (!config.IS_LIVE) return
    const i = setInterval(() => {
      setVaultBnb((v) => {
        let n = v + (Math.random() - 0.5) * 2
        if (n < 50) n = 80
        if (n > 250) n = 200
        return n
      })
    }, 2500)
    return () => clearInterval(i)
  }, [])

  // Math: sqrt-weighted share
  const myBag = parseFloat(bagSize) || 0
  const totalBag = parseFloat(totalEligible) || 1
  const sqrtShare = totalBag > 0 ? Math.sqrt(myBag) / Math.sqrt(totalBag) : 0
  const perRoundReleaseFraction = parseFloat(config.ROUND_RELEASE_PCT) / 100
  const roundPayout = config.IS_LIVE ? vaultBnb * perRoundReleaseFraction * sqrtShare : 0
  const dailyPayout = roundPayout * 480 // 480 rounds per day (3-min)
  const weeklyPayout = dailyPayout * 7

  const fmt = (n) => {
    if (!config.IS_LIVE) return '0 BNB'
    if (n < 0.0001) return '< 0.0001 BNB'
    if (n < 1) return `${n.toFixed(5)} BNB`
    return `${n.toFixed(3)} BNB`
  }
  const fmtUsd = (n) => config.IS_LIVE ? `≈ $${(n * 630).toFixed(2)}` : 'Updates after launch'

  return (
    <section id="calc" className="px-8 py-20 border-b-2 border-ink relative z-10 max-md:px-5 max-md:py-14">
      <div className="font-mono text-[11px] font-bold tracking-[4px] text-blood uppercase mb-6">[04 / EARNINGS CALCULATOR / 收益计算器]</div>
      <div className="grid grid-cols-2 gap-12 mt-10 items-start max-lg:grid-cols-1 max-lg:gap-8">
        <div>
          <h3 className="font-display uppercase leading-[0.9] tracking-tight mb-2" style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}>
            How big <span className="text-blood">is your cut?</span>
          </h3>
          <div className="font-sc font-black leading-tight opacity-85 mb-6" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
            你能分到多少？
          </div>
          <p className="text-sm leading-relaxed mb-3">
            Punch in your $HEIST bag. We'll show your expected payout per round, per day, per week — assuming the vault stays at its current size.
          </p>
          <p className="font-sc opacity-80 text-[13px] mb-5">
            输入你的 $HEIST 持仓，估算每轮 / 每日 / 每周的预期收益（按当前金库规模计算）。
          </p>
          <div className="font-mono text-xs opacity-70 leading-relaxed">
            ▸ Math: √(your bag) ÷ √(total eligible) × {config.ROUND_RELEASE_PCT} × vault<br />
            ▸ 480 rounds per day (3 min each)<br />
            ▸ Estimates only — real outcomes vary<br />
            ▸ 仅供估算，实际结果会有波动
          </div>
        </div>

        <div className="bg-paper-dark border-[3px] border-ink p-7">
          <div className="flex justify-between items-center mb-5 pb-4 border-b-2 border-ink">
            <div className="font-bungee text-lg">CALCULATOR <span className="text-blood">/ 计算器</span></div>
            <div className="font-mono text-[11px] tracking-wide">EST. ONLY / 仅估算</div>
          </div>

          <div className="bg-vault text-gold p-5 mb-5 border-2 border-ink text-center">
            <div className="font-mono text-[11px] tracking-[2px] text-paper opacity-70 mb-2">CURRENT VAULT / 当前金库</div>
            <div className="font-display text-[52px] tracking-tight leading-none">
              {config.IS_LIVE ? `${vaultBnb.toFixed(1)} BNB` : '0 BNB'}
            </div>
            <div className="font-mono text-xs mt-2 text-paper opacity-60">
              {config.IS_LIVE ? `≈ $${(vaultBnb * 630).toFixed(0)} USD` : 'Updates after launch / 上线后更新'}
            </div>
          </div>

          <div className="mb-3.5">
            <label className="font-mono text-[11px] tracking-wider opacity-70 uppercase block mb-1.5">YOUR $HEIST BAG / 你的持仓</label>
            <input type="number" value={bagSize} onChange={(e) => setBagSize(e.target.value)}
              className="bg-paper border-2 border-ink px-3.5 py-3 font-mono text-base w-full focus:outline-none focus:ring-2 focus:ring-blood" />
            <div className="font-mono text-[10px] opacity-60 mt-1">
              {parseFloat(bagSize || 0).toLocaleString()} $HEIST · {((parseFloat(bagSize || 0) / 1_000_000_000) * 100).toFixed(4)}% of supply
            </div>
          </div>

          <div className="mb-5">
            <label className="font-mono text-[11px] tracking-wider opacity-70 uppercase block mb-1.5">TOTAL ELIGIBLE / 合格总持仓</label>
            <input type="number" value={totalEligible} onChange={(e) => setTotalEligible(e.target.value)}
              className="bg-paper border-2 border-ink px-3.5 py-3 font-mono text-base w-full focus:outline-none focus:ring-2 focus:ring-blood" />
            <div className="font-mono text-[10px] opacity-60 mt-1">Sum of all eligible holders' bags · 所有合格持有者总持仓</div>
          </div>

          <div className="bg-ink text-paper p-4 font-mono text-[13px] leading-loose border-2 border-ink">
            <div className="flex justify-between border-b border-paper border-opacity-15 pb-2 mb-2">
              <span className="opacity-70">PER ROUND / 每轮</span>
              <span className="text-gold font-bold">{fmt(roundPayout)}</span>
            </div>
            <div className="flex justify-between border-b border-paper border-opacity-15 pb-2 mb-2">
              <span className="opacity-70">PER DAY / 每日</span>
              <span className="text-gold font-bold">{fmt(dailyPayout)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="opacity-70">PER WEEK / 每周</span>
              <span className="text-gold font-bold">{fmt(weeklyPayout)}</span>
            </div>
            <div className="text-[11px] opacity-50 mt-2 pt-2 border-t border-paper border-opacity-15">
              {fmtUsd(weeklyPayout)} per week
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
//  TOKENOMICS
// ──────────────────────────────────────────────────────────────
function Tokenomics() {
  const rows = [
    { color: '#d63031', name: 'Liquidity / LP', zh: '初始流动性', pct: 30 },
    { color: '#2a4d8f', name: 'HeistVault Seed / 金库初始', zh: '5% sold → BNB seeds vault', pct: 5 },
    { color: '#f4c430', name: 'Treasury / 国库', zh: '用于回购补池', pct: 25 },
    { color: '#141210', name: 'Marketing & CEX', zh: '营销 + 上所储备', pct: 30 },
    { color: '#e8dcc0', name: 'Team / 团队', zh: '12 个月线性解锁', pct: 10 },
  ]
  const pieGradient = `conic-gradient(${rows.map((r, i) => {
    const start = rows.slice(0, i).reduce((a, b) => a + b.pct, 0)
    return `${r.color} ${start}% ${start + r.pct}%`
  }).join(', ')})`

  return (
    <section id="tok" className="px-8 py-20 border-b-2 border-ink relative z-10 max-md:px-5 max-md:py-14">
      <SectionHead label="05 / TOKENOMICS / 代币分配" zh="钱在哪里。">
        Where the <span className="text-blood">bag</span> sits.
      </SectionHead>
      <div className="grid grid-cols-[1.5fr_1fr] gap-12 items-center mt-10 max-lg:grid-cols-1">
        <div className="flex flex-col gap-3.5">
          {rows.map((r, i) => (
            <div key={i} className="grid grid-cols-[auto_1fr_auto] gap-3.5 items-center p-3 px-4 border-2 border-ink bg-paper">
              <div className="w-7 h-7 border-2 border-ink" style={{ background: r.color }} />
              <div>
                <div className="font-bungee text-sm">{r.name}</div>
                <div className="font-sc text-[11px] font-bold opacity-70 mt-0.5">{r.zh}</div>
              </div>
              <div className="font-mono font-bold text-base">{r.pct}%</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <div className="w-[280px] h-[280px] rounded-full border-4 border-ink relative" style={{ background: pieGradient, boxShadow: '8px 8px 0 #141210' }}>
            <div className="absolute inset-[30%] bg-paper border-[3px] border-ink rounded-full flex flex-col justify-center items-center">
              <div className="font-display text-4xl leading-none">1B</div>
              <div className="font-mono text-[10px] tracking-[2px] mt-1 text-center">$HEIST<br />SUPPLY</div>
            </div>
          </div>
          <p className="mt-5 font-mono text-xs text-center leading-relaxed">
            BUY/SELL TAX: <strong className="text-blood">3% / 5%</strong><br />
            买/卖税：3% / 5%<br />
            ↓ all to Treasury → buybacks → vault refill
          </p>
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
//  ROADMAP
// ──────────────────────────────────────────────────────────────
function Roadmap() {
  const phases = [
    { num: 'PHASE 01 — NOW', en: 'Genesis Heist', desc: 'Launch on Flap. HeistVault seeded. 3-min rounds, sqrt-weighted payouts to all holders.', zh: 'Flap 上发币，金库注资，3 分钟一轮，平方根分配给持币者。', active: true },
    { num: 'PHASE 02', en: 'Buyback Engine', desc: 'Treasury auto-buyback bot live. Tax → BNB → HeistVault refill. Public dashboard showing every refill tx.', zh: 'Treasury 自动回购上线，全程公开每笔补池交易。' },
    { num: 'PHASE 03', en: 'Holder Tiers', desc: 'Top 100 holders unlock bonus rounds. Whale Defense rounds where small holders get priority.', zh: '前 100 大户解锁加奖轮，鲸鱼防御轮里小持仓者优先。' },
    { num: 'PHASE 04', en: 'Big Job Mode', desc: 'Weekly mega-rounds with bigger vault releases. Themed targets, bigger prizes.', zh: '每周大案：更大释放比例，主题奖池，更刺激。' },
  ]
  return (
    <section id="road" className="px-8 py-20 border-b-2 border-ink relative z-10 max-md:px-5 max-md:py-14">
      <SectionHead label="06 / ROADMAP / 路线图" zh="从基础矿池开始，逐步扩展玩法。">
        Start <span className="text-blood">small.</span><br />Pull bigger jobs.
      </SectionHead>
      <div className="grid grid-cols-4 border-2 border-ink mt-10 max-md:grid-cols-1">
        {phases.map((p, i) => (
          <div key={i} className={`p-7 ${i < 3 ? 'border-r-2 border-ink max-md:border-r-0 max-md:border-b-2' : ''} ${p.active ? 'bg-blood text-paper' : 'bg-paper'}`}>
            <div className={`font-mono text-[11px] tracking-[2px] ${p.active ? 'text-paper' : 'text-blood'}`}>{p.num}</div>
            <h4 className="font-bungee text-lg mt-2 mb-3 leading-tight">{p.en}</h4>
            <p className="text-[13px] leading-relaxed">{p.desc}</p>
            <p className="font-sc mt-1.5 opacity-85 text-xs">{p.zh}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
//  FAQ
// ──────────────────────────────────────────────────────────────
function FAQ() {
  const items = [
    { q: 'Do I need to bet or stake anything?', qZh: '需要下注或质押吗？', a: 'No. Just hold $HEIST in your wallet. The contract reads balances every round automatically.', aZh: '不需要。$HEIST 留在钱包里就行，合约每轮自动读取。' },
    { q: 'Will the game mint new tokens?', qZh: '挖矿会不会增发代币？', a: 'No. Payouts are in BNB from the HeistVault. No new $HEIST is ever minted.', aZh: '不会。奖励是 BNB，来自 HeistVault，不增发 $HEIST。' },
    { q: 'Can whales just dominate?', qZh: '鲸鱼会不会通吃？', a: 'No. Square-root weighting compresses big bags. A 100× holder wins ~10× a small one — still more, but far from proportional.', aZh: '不会。平方根权重压缩大持仓，100 倍持仓只拿 ~10 倍奖励。' },
    { q: 'How often can I claim?', qZh: '多久可以领取一次？', a: `Winnings accumulate in your claim balance. You can pull anytime within ${config.CLAIM_COOLDOWN.toLowerCase()} of any round you won. Unclaimed BNB returns to the vault.`, aZh: `中奖累积，每轮 ${config.CLAIM_COOLDOWN} 内自取，未领部分回流金库。` },
    { q: 'What happens if I sell?', qZh: '卖币会怎样？', a: 'You stop being eligible the moment your balance drops below the holder threshold. Sell tax also hits — funding the next buyback.', aZh: '余额低于持仓门槛后停止参与。卖出还要扣税，反过来补池。' },
    { q: "What's the risk?", qZh: '有什么风险？', a: "It's a memecoin with a holder game on top. Token price can go to zero. Holding doesn't guarantee profit — it just makes you eligible to win BNB if there's anything in the vault.", aZh: '这是带玩法的 memecoin，币价可能归零。持有不保证盈利，只让你有资格分赃。' },
    { q: 'Does the trade tax go straight into the game?', qZh: '交易税会直接进游戏合约吗？', a: 'No. Tax → Treasury → buyback → HeistVault. The two contracts are separate so accounting stays clean.', aZh: '不会。税先进 Treasury，再回购补回金库。两个合约分开管理。' },
    { q: 'How does randomness work?', qZh: '随机性怎么实现？', a: "Round seeds use commit-reveal + chain entropy. Each round's seed is published after settlement so anyone can verify outcomes.", aZh: 'commit-reveal + 链上熵源，每轮种子公开可验证。' },
  ]
  const [open, setOpen] = useState(null)
  return (
    <section id="faq" className="px-8 py-20 border-b-2 border-ink relative z-10 max-md:px-5 max-md:py-14">
      <SectionHead label="07 / FAQ / 常见问题" zh="参与前，请看清楚规则。">
        Read before <span className="text-blood">you buy.</span>
      </SectionHead>
      <div className="mt-10 border-t-2 border-ink">
        {items.map((it, i) => (
          <div key={i} onClick={() => setOpen(open === i ? null : i)} className="border-b-2 border-ink py-6 cursor-pointer">
            <div className="grid grid-cols-[60px_1fr_auto] gap-4 items-center">
              <div className="font-bungee text-sm text-blood tracking-wider">{String(i + 1).padStart(2, '0')}</div>
              <div className="font-bungee text-lg leading-tight">
                {it.q}
                <span className="block font-sc font-black text-[15px] mt-1 opacity-85">{it.qZh}</span>
              </div>
              <div className={`font-bungee text-2xl text-blood transition-transform ${open === i ? 'rotate-45' : ''}`}>+</div>
            </div>
            <div className={`overflow-hidden transition-all ${open === i ? 'max-h-80 pt-4' : 'max-h-0'} pl-[76px] text-sm leading-relaxed max-md:pl-0`}>
              {it.a}
              <span className="block font-sc mt-2 pt-2 border-t border-dashed border-ink opacity-80">{it.aZh}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
//  FINAL CTA
// ──────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="text-center px-8 py-20 bg-ink text-paper relative z-10 max-md:px-5 max-md:py-14">
      <div className="font-mono text-[11px] font-bold tracking-[4px] text-blood uppercase mb-6">[ 08 / JOIN ]</div>
      <h2 className="font-display uppercase leading-[0.9] tracking-tight mb-2 text-paper" style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}>
        Hold the bag. <span className="text-blood">Get paid.</span>
      </h2>
      <div className="font-sc font-black leading-none opacity-70 mb-8" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
        持币就分赃。
      </div>
      <div className="flex gap-3.5 justify-center flex-wrap mt-8 items-start">
        <WalletButton variant="primary" />
        <a href={config.TWITTER_URL} className="btn-alt">Follow on X</a>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────
//  FOOTER
// ──────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-paper px-8 pt-14 pb-10 border-t-2 border-ink grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 relative z-10 max-md:grid-cols-2 max-md:px-5 max-md:gap-6">
      <div>
        <div className="mb-4"><Logo /></div>
        <p className="text-sm leading-relaxed mt-3.5 opacity-80">
          A holder-game memecoin on BNB Chain via Flap. Buy, hold, get paid every 3 minutes.
          <span className="block font-sc mt-2">BNB 链上的持币玩法 memecoin，Flap 发行。买、持、3 分钟分赃。</span>
        </p>
      </div>
      <div>
        <h5 className="font-bungee text-[13px] text-blood tracking-wide mb-3.5">PROJECT / 项目</h5>
        <ul className="list-none space-y-2 text-sm">
          <li><a href="#how" className="hover:border-b hover:border-ink">How it Works</a></li>
          <li><a href="#mechanic" className="hover:border-b hover:border-ink">Mechanic</a></li>
          <li><a href="#rules" className="hover:border-b hover:border-ink">Rules</a></li>
          <li><a href="#tok" className="hover:border-b hover:border-ink">Tokenomics</a></li>
        </ul>
      </div>
      <div>
        <h5 className="font-bungee text-[13px] text-blood tracking-wide mb-3.5">LINKS / 链接</h5>
        <ul className="list-none space-y-2 text-sm">
          <li><a href={config.FLAP_URL} className="hover:border-b hover:border-ink">Flap App</a></li>
          <li><a href={config.TWITTER_URL} className="hover:border-b hover:border-ink">Twitter / X</a></li>
          <li><a href={config.TELEGRAM_URL} className="hover:border-b hover:border-ink">Telegram</a></li>
          <li><a href="#" className="hover:border-b hover:border-ink">Contract: {displayCA()}</a></li>
        </ul>
      </div>
      <div>
        <h5 className="font-bungee text-[13px] text-blood tracking-wide mb-3.5">WARNING / 警告</h5>
        <p className="text-xs leading-relaxed opacity-75">
          High-risk memecoin with on-chain game mechanics. Token price can go to zero. Holding does not guarantee profit. Not financial advice.
          <span className="block font-sc mt-2">高风险 memecoin，价格可能归零，持有不保证盈利，非投资建议。</span>
        </p>
      </div>
    </footer>
  )
}

// ──────────────────────────────────────────────────────────────
//  ROOT APP
// ──────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <div className="fixed top-0 inset-x-0 h-[18px] tape-strip border-b-2 border-ink z-[100]" />
      <div className="relative z-[3] py-[18px]">
        <Nav />
        <Hero />
        <HowItWorks />
        <Mechanic />
        <Rules />
        <Calculator />
        <Tokenomics />
        <Roadmap />
        <FAQ />
        <FinalCTA />
        <Footer />
      </div>
      <div className="fixed bottom-0 inset-x-0 h-[18px] tape-strip border-t-2 border-ink z-[100]" />
    </>
  )
}
