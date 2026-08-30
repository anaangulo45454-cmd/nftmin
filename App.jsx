import React, {useEffect, useMemo, useState} from 'react';
import './App.css';

const miners=[
 {id:'common',name:'COMMON',speed:'33.4 MH/s',freq:'1443 MHz',liveTemp:'56.2°C',vram:'8 / 12 GB',hash:'32 MH/s',clock:'1450 MHz',temp:'58°C',power:'40',bonus:'0',c:'common'},
 {id:'uncommon',name:'UNCOMMON',speed:'48.4 MH/s',freq:'1568 MHz',liveTemp:'60.2°C',vram:'10 / 16 GB',hash:'48 MH/s',clock:'1600 MHz',temp:'61°C',power:'52',bonus:'+8',c:'uncommon'},
 {id:'rare',name:'RARE',speed:'69.7 MH/s',freq:'1849 MHz',liveTemp:'66.4°C',vram:'16 / 24 GB',hash:'70 MH/s',clock:'1800 MHz',temp:'65°C',power:'65',bonus:'+15',c:'rare'},
 {id:'legendary',name:'LEGENDARY',speed:'114.7 MH/s',freq:'2107 MHz',liveTemp:'74.1°C',vram:'24 / 48 GB',hash:'120 MH/s',clock:'2100 MHz',temp:'73°C',power:'88',bonus:'+28',c:'legendary'}
];

function PixelGPU({type='common',small=false}){
 return <div className={`pgpu ${type} ${small?'small':''}`}>
   <div className="gpu-top"></div><div className="gpu-body">
    <div className="fan f1"><i/><i/><i/><i/></div><div className="fan f2"><i/><i/><i/><i/></div>
    <div className="gpu-word">VRAM</div><div className="gpu-rail"></div><div className="gpu-pin"></div>
   </div><div className="gpu-side"></div>
 </div>
}
function Panel({title,children,className=''}){return <section className={`panel ${className}`}><div className="panel-title"><span>{title}</span><b></b></div>{children}</section>}

export default function App(){
 const [boot,setBoot]=useState(true),[active,setActive]=useState('MINER'),[selected,setSelected]=useState('common'),[wallet,setWallet]=useState(''),[copied,setCopied]=useState(false),[seconds,setSeconds]=useState(0);
 const current=useMemo(()=>miners.find(x=>x.id===selected),[selected]);
 useEffect(()=>{const t=setTimeout(()=>setBoot(false),1700);return()=>clearTimeout(t)},[]);
 useEffect(()=>{const t=setInterval(()=>setSeconds(s=>s>=299?0:s+1),1000);return()=>clearInterval(t)},[]);
 const go=(id,label)=>{setActive(label);document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'})};
 const connect=async()=>{if(wallet){setWallet('');return} if(!window.ethereum){alert('No Web3 wallet detected.');return} try{const a=await window.ethereum.request({method:'eth_requestAccounts'});if(a?.[0])setWallet(a[0])}catch{}};
 const copy=async()=>{await navigator.clipboard?.writeText('0x8c87b9ec8dc181d16f68f7942ea5e41a2a3698f172');setCopied(true);setTimeout(()=>setCopied(false),1200)};
 if(boot)return <div className="boot"><div className="boot-grid"></div><div className="boot-box"><div>VRAM MINER OS</div><span>INITIALIZING...</span><div className="bootbar"><i/></div><button onClick={()=>setBoot(false)}>SKIP BOOT</button></div></div>;
 return <div className="site">
  <div className="stars"></div><div className="scan"></div>
  <div className="ticker"><div>◆ $VRAM &nbsp; TRADING LIVE ON BONDING CURVE — LAUNCHPAD &nbsp;&nbsp; MINE ON /MINE TO EARN CREDITS, REDEEMABLE ONCE REDEMPTION OPENS &nbsp;&nbsp; ◆ $VRAM &nbsp; TRADING LIVE ON BONDING CURVE — LAUNCHPAD &nbsp;&nbsp; MINE ON /MINE TO EARN CREDITS, REDEEMABLE ONCE REDEMPTION OPENS &nbsp;&nbsp;</div></div>
  <header><button className="logo" onClick={()=>go('miner','MINER')}>▦ <strong>VRAM·MINER</strong></button><nav>{['MINER','MINT','$VRAM','MINE','COLLECTION','DOCS'].map(x=><button className={active===x?'on':''} key={x} onClick={()=>go(x==='MINER'?'miner':x==='MINT'?'mint':x==='MINE'?'mine':'onchain',x)}>{x}</button>)}</nav><div className="net">▮ ROBINHOOD MAINNET / 4663</div><button className="connect" onClick={connect}>{wallet?wallet.slice(0,6)+'…'+wallet.slice(-4):'CONNECT WALLET'}</button></header>
  <main id="miner">
   <div className="top-grid">
    <Panel title="ROBINHOOD MAINNET / CHAIN 4663" className="hero-panel"><div className="hero-inner"><h1>VRAM MINER</h1><div className="tagline">BUILD YOUR RIG.<br/>POWER YOUR VRAM.<br/>MINE YOUR PIXELS.</div><p>5,090 pixel-powered mining machines built for an onchain computing universe. Every NFT is a working piece of mining hardware — not a static collectible.</p><div className="buy"><button onClick={()=>go('mint','MINT')}>BUY $VRAM</button><button onClick={()=>go('mint','MINT')}>BUY ON OPENSEA</button></div></div><div className="hero-stats"><div><small>TOTAL MINERS</small><b>5,090</b></div><div><small>PAID MINT</small><b>0.0005090 <em>ETH</em></b></div><div><small>FREE MINT</small><b>EVERY 5<br/>MINUTES</b></div><div><small>MAX / WALLET</small><b>15</b></div></div></Panel>
    <div className="right-stack">
      <Panel title="HARDWARE CLASSES" className="hardware"><div className="hardware-grid">{miners.map(m=><button key={m.id} className={`h-card ${m.c} ${selected===m.id?'sel':''}`} onClick={()=>setSelected(m.id)}><small>{m.name}</small><PixelGPU type={m.id}/><span>{m.name}</span></button>)}</div></Panel>
      <Panel title="VRAM_MINER_OS v1.0" className="terminal"><div className="terminal-body"><div>&gt; VRAM ALLOCATION: READY</div><div>&gt; COOLING SYSTEM: ONLINE</div><div>&gt; HASH MODULE: STANDBY</div><div>&gt; AWAITING CONTRACT CONNECTION...</div><div>&gt; BOOTING GPU CORE...</div><div>&gt; MEMORY BANKS DETECTED</div><div className="green">&gt; VRAM ALLOCATION: READY</div><div className="caret">_</div></div></Panel>
    </div>
   </div>

   <section className="hardware-info" id="collection"><div className="sect-title"><span>01</span><h2>YOUR NFT IS YOUR HARDWARE.</h2></div><p>Each VRAM MINER carries its own VRAM capacity, mining power, hash rate and 8 hardware traits.<br/>Power it on, keep it cool, and it generates Mining Credits — a gameplay and progression<br/>utility, never a financial return.</p><div className="spec-cards">{miners.map(m=><div className={`spec-card ${m.c}`} key={m.id}><div className="spec-head"><b>{m.name}</b><span>{m.name}</span></div><PixelGPU type={m.id}/><div className="live-row"><span>SPEED<br/><b>{m.speed}</b></span><span>FREQ<br/><b>{m.freq}</b></span><span>TEMP<br/><b>{m.liveTemp}</b></span></div><div className="rows"><div><span>BASE POWER</span><b>{m.power}</b></div><div><span>RARITY BONUS</span><b>{m.bonus}</b></div><div><span>VRAM</span><b>{m.vram}</b></div><div><span>HASH RATE</span><b>{m.hash}</b></div><div><span>CORE CLOCK</span><b>{m.clock}</b></div><div><span>TEMP</span><b>{m.temp}</b></div></div></div>)}</div></section>

   <section className="split" id="mine"><Panel title="FREE MINING DROP" className="drop"><p>One shared slot for the whole collection — whoever claims first wins it, then a fresh 5-minute<br/>window opens. Each wallet can win at most once, ever.</p><div className="endbox"><small>DROP ENDED</small><strong>END</strong><div className="redbar"><i/><i/><i/><i/><i/><i/><i/><i/></div></div><small>ONE FREE MINER, LIFETIME CAP OF ONE PER WALLET</small><small>FREE + PAID SHARE THE SAME LIMIT: 0 / 15</small><button>END</button><footer-note>The slot timing and lifetime cap are enforced by the smart contract using block time. This interface only displays it.</footer-note></Panel><Panel title="MINING NETWORK" className="network"><div className="empty">NO ONCHAIN EVENTS YET.</div><small>Live onchain mining events appear here once the contracts are connected.</small></Panel></section>

   <section className="onchain" id="onchain"><div className="sect-title"><span>02</span><h2>ONCHAIN STATUS</h2></div><p>Supply, price, cooldown and wallet limits are enforced by the contract. Numbers below come<br/>from protocol configuration; live telemetry appears once the contract address is set.</p><div className="chain-grid"><div><small>NETWORK</small><b>ROBINHOOD<br/>MAINNET</b></div><div><small>CHAIN ID</small><b>4663</b></div><div><small>SUPPLY</small><b>5,090 /<br/>5,090</b></div><div><small>MINT PRICE</small><b>0.0005090<br/>ETH</b></div><div><small>FREE MINT</small><b>EVERY 300<br/>SEC</b></div><div><small>RIG RATE</small><b>+0 <em>CR/HR</em></b></div></div><div className="contract"><span>NFT CONTRACT:</span><code>0x8c87b9ec8dc181d16f68f7942ea5e41a2a3698f172</code><button onClick={copy}>{copied?'COPIED':'READ THE PROTOCOL'}</button></div></section>
  </main>
  <footer className="footer"><div><b>VRAM MINER</b><span>5,090 PIXEL MINING MACHINES</span><span>POWER YOUR RIG. MINE YOUR PIXELS.</span></div><div><span>X</span><span>OPENSEA</span><span>EXPLORER</span><span>PROTOCOL</span></div><div><span>NFT CONTRACT: 0x8c87b9ec8dc181d16f68f7942ea5e41a2a3698f172</span><b>BUILT ON ROBINHOOD MAINNET</b><small>Not affiliated with, endorsed by, or operated by Robinhood. Mining Credits are a gameplay and progression utility — not an investment, yield, or income product.</small></div></footer>
  <div className="mobile-nav">{['MINER','MINT','$VRAM','MINE'].map(x=><button key={x} onClick={()=>go(x==='MINER'?'miner':x==='MINT'?'mint':x==='MINE'?'mine':'onchain',x)}>{x}</button>)}<button>MENU</button></div>
 </div>
}
