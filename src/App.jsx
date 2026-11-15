"use client";

import { useEffect } from "react";
import { copyStreamOutput, clearStream, deployToProxy, executeDualStream, setWorkbenchPrompt, switchMatrixTab } from "./interactions";

const actions = { setWorkbenchPrompt, clearStream, deployToProxy, executeDualStream, copyStreamOutput, switchMatrixTab };

function handleAction(action) {
  if (action === "copy-cli" || action.startsWith("navigator.clipboard.writeText")) { navigator.clipboard?.writeText("npx @aihub/cli login && aihub proxy start"); return; }
  const alertMatch = action.match(/^alert\(['\"](.*)['\"]\)$/);
  if (alertMatch) { window.alert(alertMatch[1]); return; }
  const match = action.match(/^(\w+)\((?:'([^']*)'|\"([^\"]*)\")?\)$/);
  if (!match) return;
  const fn = actions[match[1]];
  if (fn) fn(match[2] ?? match[3]);
}

function handleKeyDown(event) {
  if (!event.target.matches('[role="tab"]') || !['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const current = tabs.indexOf(event.target);
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
  tabs[next].focus();
  tabs[next].click();
}

export default function App() {
  useEffect(() => { window.deployToProxy = deployToProxy; return () => { delete window.deployToProxy; }; }, []);
  return <div onKeyDown={handleKeyDown} className="min-h-screen bg-obsidian text-porcelain">








<a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-black">Skip to main content</a>
<header className="fixed top-0 left-0 right-0 z-50 w-full bg-graphite/90 backdrop-blur-xl border-b border-steel">


<div className="h-14 max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between gap-space-md">


<div className="flex items-center gap-space-md shrink-0">


<a className="flex items-center gap-space-sm " href="#">


<img alt="AI Hub Logo" className="h-8 w-auto object-contain" src="/ai-hub-logo.png" />


<span className="font-title-md text-title-md tracking-tight text-porcelain hidden sm:inline-block">
AI Hub
</span>


</a>


<span className="px-2 py-0.5 rounded-full text-xs font-mono bg-carbon border border-steel text-ash hidden lg:inline">
Workbench v2
</span>


</div>


<nav aria-label="Primary navigation" className="hidden md:flex items-center gap-space-lg">


<a aria-current="page" className="transition-colors text-porcelain font-body-md-strong" href="#interactive-workbench">
Playground
</a>


<a className="font-body-md text-body-md text-on-surface-variant hover:text-porcelain transition-colors" href="#models-matrix">
Benchmarks
</a>


<a className="font-body-md text-body-md text-on-surface-variant hover:text-porcelain transition-colors" href="#developer-journey">
Architecture
</a>


<a className="font-body-md text-body-md text-on-surface-variant hover:text-porcelain transition-colors" href="#agent-workflows">
Workflows
</a>


<a className="font-body-md text-body-md text-on-surface-variant hover:text-porcelain transition-colors" href="#observability">
Telemetry
</a>


</nav>


<div className="flex items-center gap-space-md shrink-0">


<div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-carbon border border-steel text-ash font-mono text-[12px]">


<span className="w-1.5 h-1.5 rounded-full bg-emerald-400">
</span>


<span>
gateway.aihub.io
</span>


</div>


<a className="inline-flex items-center justify-center bg-primary-container hover:bg-electric-link text-white font-body-md-strong text-body-md-strong px-space-md py-space-xs rounded-full transition-colors border border-transparent shadow-sm" href="#get-started">

          Deploy Proxy
        
</a>


</div>


</div>


</header>


<main id="main-content" tabIndex="-1" className="w-full pt-14 bg-obsidian min-h-screen">


<div className="flex flex-col w-full text-porcelain selection:bg-primary-container selection:text-white">








<section className="relative w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop pt-10 md:pt-16 pb-16 overflow-hidden" id="interactive-workbench">




<div className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-electric-link/15 rounded-full blur-[140px] pointer-events-none -z-10">
</div>




<div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10">


<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-carbon border border-steel mb-5 shadow-inner">


<span className="font-mono text-emerald-400 text-xs">
$
</span>


<span className="font-mono text-xs text-porcelain">
curl api.aihub.io/v1/chat/completions
</span>


<span className="w-2 h-3.5 bg-electric-link inline-block ml-0.5">
</span>


</div>


<h1 className="font-display-sm md:font-headline-xl lg:font-display-lg text-display-sm md:text-headline-xl lg:text-[72px] lg:leading-[76px] text-porcelain tracking-[-1.2px] mb-4 max-w-3xl">

            One Endpoint. Zero Vendor Lock-in. 
<span className="bg-gradient-to-r from-porcelain via-primary-fixed-dim to-electric-link bg-clip-text text-transparent">
Instant Failover
</span>
 for Any LLM.
          
</h1>


<p className="font-body-lg text-body-lg text-ash max-w-2xl mb-6">

            100% OpenAI SDK compatible drop-in gateway. Route queries dynamically across 50+ models, stream comparisons simultaneously, and eliminate rate-limit downtime forever.
          
</p>


<div className="flex flex-wrap items-center justify-center gap-3 text-ash font-mono text-xs">


<span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-carbon border border-steel">


<span className="material-symbols-outlined text-[14px] text-emerald-400" aria-hidden="true">
check
</span>
 100% OpenAI SDK Parity
            
</span>


<span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-carbon border border-steel">


<span className="material-symbols-outlined text-[14px] text-electric-link" aria-hidden="true">
bolt
</span>
 Automated Fallback &lt; 35ms
            
</span>


<span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-carbon border border-steel">


<span className="material-symbols-outlined text-[14px] text-tertiary" aria-hidden="true">
tune
</span>
 Unified Token Ledger
            
</span>


</div>


</div>








<div className="w-full max-w-5xl mx-auto rounded-[28px] bg-carbon border border-steel shadow-2xl overflow-hidden">




<div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-graphite border-b border-steel gap-3">


<div className="flex items-center gap-2">


<span className="w-3 h-3 rounded-full bg-[#ff5f56]/90 inline-block">
</span>


<span className="w-3 h-3 rounded-full bg-[#ffbd2e]/90 inline-block">
</span>


<span className="w-3 h-3 rounded-full bg-[#27c93f]/90 inline-block">
</span>


<span className="ml-2 font-mono text-xs text-porcelain font-semibold">
Dual-Model Stream Workbench
</span>


<span className="px-2 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
LIVE PROXY
</span>


</div>




<div className="flex items-center gap-2">


<span className="font-label-sm text-ash text-xs hidden sm:inline">
Scenario:
</span>


<div className="inline-flex p-1 rounded-full bg-obsidian border border-steel">


<button className="px-3 py-0.5 rounded-full text-xs font-mono text-porcelain bg-steel" id="prompt-btn-sql" onClick={() => handleAction("setWorkbenchPrompt('sql')")}>
SQL Tuning
</button>


<button className="px-3 py-0.5 rounded-full text-xs font-mono text-ash hover:text-porcelain" id="prompt-btn-code" onClick={() => handleAction("setWorkbenchPrompt('code')")}>
Async Python
</button>


<button className="px-3 py-0.5 rounded-full text-xs font-mono text-ash hover:text-porcelain" id="prompt-btn-math" onClick={() => handleAction("setWorkbenchPrompt('math')")}>
Math Proof
</button>


</div>


</div>


</div>




<div className="p-5 bg-obsidian/70 border-b border-steel">


<div className="text-xs font-mono text-ash mb-2 flex items-center justify-between">


<span className="flex items-center gap-1.5 text-primary-fixed-dim">


<span className="material-symbols-outlined text-[14px]" aria-hidden="true">
terminal
</span>
 SYSTEM PROMPT / USER INPUT
              
</span>


<span className="text-slate">
POST /v1/chat/completions (Stream: true)
</span>


</div>


<div className="flex flex-col sm:flex-row items-stretch gap-3">


<div className="flex-1 bg-graphite border border-steel rounded-2xl px-4 py-3 flex items-start gap-2 focus-within:border-electric-link transition-colors">


<span className="font-mono text-electric-link text-sm">
&gt;
</span>


<textarea className="w-full bg-transparent font-mono text-sm text-porcelain resize-none  h-14" id="workbench-input" aria-label="System prompt and user input" placeholder="Enter custom prompt to stream side-by-side...">
Optimize this SQL query & explain execution plan: SELECT u.id, count(o.id) FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE o.created_at &gt; NOW() - INTERVAL '30 days' GROUP BY u.id HAVING count(o.id) &gt; 5;
</textarea>


</div>


<div className="flex sm:flex-col justify-end gap-2 shrink-0">


<button className="px-5 py-2.5 rounded-2xl bg-primary-container hover:bg-electric-link text-white font-body-md-strong text-xs font-mono flex items-center justify-center gap-2 transition-all shadow-[0_0_18px_rgba(0,113,227,0.4)]" onClick={() => handleAction("executeDualStream()")}>


<span className="material-symbols-outlined text-[16px]" aria-hidden="true">
play_arrow
</span>
 Run Dual Stream
                
</button>


<button className="px-3 py-2 rounded-2xl bg-graphite hover:bg-steel border border-steel text-ash hover:text-porcelain text-xs font-mono transition-colors flex items-center justify-center gap-1" onClick={() => handleAction("clearStream()")}>


<span className="material-symbols-outlined text-[14px]" aria-hidden="true">
restart_alt
</span>
 Reset
                
</button>


</div>


</div>


</div>




<div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-steel bg-carbon">




<div className="p-6 flex flex-col justify-between">


<div>




<div className="flex items-center justify-between pb-4 border-b border-steel/60 mb-4">


<div className="flex items-center gap-2.5">


<div className="w-7 h-7 rounded-lg bg-tertiary-container/30 border border-tertiary/40 flex items-center justify-center text-optical-yellow">


<span className="material-symbols-outlined text-[16px]" aria-hidden="true">
psychology
</span>


</div>


<div>


<div className="font-body-md-strong text-porcelain text-xs flex items-center gap-1.5">

                        anthropic/claude-3-5-sonnet
                        
<span className="w-1.5 h-1.5 rounded-full bg-emerald-400">
</span>


</div>


<span className="font-mono text-xs text-ash">
Temp: 0.2 • Top_p: 0.95
</span>


</div>


</div>


<span className="px-2 py-0.5 rounded-full text-xs font-mono bg-graphite border border-steel text-slate" id="sonnet-status" aria-live="polite" aria-atomic="true">
Stream Finished
</span>


</div>




<div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-graphite border border-steel mb-4 text-center font-mono">


<div>


<div className="text-xs text-ash uppercase">
TTFT
</div>


<div className="text-xs font-semibold text-emerald-400" id="sonnet-ttft">
118 ms
</div>


</div>


<div>


<div className="text-xs text-ash uppercase">
Tokens/sec
</div>


<div className="text-xs font-semibold text-porcelain" id="sonnet-tps">
84.2 tps
</div>


</div>


<div>


<div className="text-xs text-ash uppercase">
Cost
</div>


<div className="text-xs font-semibold text-electric-link" id="sonnet-cost">
$0.0019
</div>


</div>


</div>




<div className="p-4 rounded-xl bg-obsidian border border-steel/80 min-h-[190px] font-mono text-xs leading-relaxed text-on-surface">


<div className="text-slate text-xs pb-1 border-b border-steel/40 mb-2 flex items-center justify-between">


<span>
TOKEN STREAM (#864)
</span>


<span className="text-emerald-400">
200 chunk_ack
</span>


</div>


<div className="space-y-2 text-porcelain" id="sonnet-stream-content" aria-live="polite">


<p className="text-slate italic">
-- Rewrite using pre-filtered subquery index scan:
</p>


<p className="text-emerald-400">
WITH active_orders AS (
<br />
  SELECT user_id, count(id) as total
<br />
  FROM orders
<br />
  WHERE created_at &gt; NOW() - INTERVAL '30 days'
<br />
  GROUP BY user_id HAVING count(id) &gt; 5
<br />
)
<br />
SELECT u.id, ao.total FROM users u
<br />
INNER JOIN active_orders ao ON u.id = ao.user_id;
</p>


<p className="text-ash text-xs">
Plan: Avoids full left join table scan; leverages composite index on (created_at, user_id). Scan cost drops ~82%.
</p>


</div>


</div>


</div>




<div className="pt-4 mt-4 border-t border-steel/60 flex items-center justify-between text-xs">


<span className="font-mono text-ash text-xs">
Tokens Used: 
<strong className="text-porcelain">
148
</strong>
 (in: 42, out: 106)
</span>


<button className="text-electric-link hover:underline font-mono text-xs flex items-center gap-1" onClick={() => handleAction("copyStreamOutput('sonnet')")}>


<span className="material-symbols-outlined text-[13px]" aria-hidden="true">
content_copy
</span>
 Copy Raw JSON
                
</button>


</div>


</div>




<div className="p-6 flex flex-col justify-between">


<div>




<div className="flex items-center justify-between pb-4 border-b border-steel/60 mb-4">


<div className="flex items-center gap-2.5">


<div className="w-7 h-7 rounded-lg bg-primary-container/20 border border-primary-container/40 flex items-center justify-center text-electric-link">


<span className="material-symbols-outlined text-[16px]" aria-hidden="true">
smart_toy
</span>


</div>


<div>


<div className="font-body-md-strong text-porcelain text-xs flex items-center gap-1.5">

                        openai/gpt-4o
                        
<span className="w-1.5 h-1.5 rounded-full bg-emerald-400">
</span>


</div>


<span className="font-mono text-xs text-ash">
Temp: 0.2 • Seed: 42
</span>


</div>


</div>


<span className="px-2 py-0.5 rounded-full text-xs font-mono bg-graphite border border-steel text-slate" id="gpt-status" aria-live="polite" aria-atomic="true">
Stream Finished
</span>


</div>




<div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-graphite border border-steel mb-4 text-center font-mono">


<div>


<div className="text-xs text-ash uppercase">
TTFT
</div>


<div className="text-xs font-semibold text-emerald-400" id="gpt-ttft">
94 ms
</div>


</div>


<div>


<div className="text-xs text-ash uppercase">
Tokens/sec
</div>


<div className="text-xs font-semibold text-porcelain" id="gpt-tps">
102.5 tps
</div>


</div>


<div>


<div className="text-xs text-ash uppercase">
Cost
</div>


<div className="text-xs font-semibold text-electric-link" id="gpt-cost">
$0.0016
</div>


</div>


</div>




<div className="p-4 rounded-xl bg-obsidian border border-steel/80 min-h-[190px] font-mono text-xs leading-relaxed text-on-surface">


<div className="text-slate text-xs pb-1 border-b border-steel/40 mb-2 flex items-center justify-between">


<span>
TOKEN STREAM (#865)
</span>


<span className="text-emerald-400">
200 chunk_ack
</span>


</div>


<div className="space-y-2 text-porcelain" id="gpt-stream-content" aria-live="polite">


<p className="text-slate italic">
-- Optimized INNER JOIN aggregate:
</p>


<p className="text-secondary-fixed">
SELECT o.user_id, count(o.id) AS order_volume
<br />
FROM orders o
<br />
WHERE o.created_at &gt; NOW() - INTERVAL '30 DAY'
<br />
GROUP BY o.user_id
<br />
HAVING count(o.id) &gt; 5;
</p>


<p className="text-ash text-xs">
Observation: Left join on `users` is redundant if `o.user_id` matches foreign keys. Eliminates join hash buffer.
</p>


</div>


</div>


</div>




<div className="pt-4 mt-4 border-t border-steel/60 flex items-center justify-between text-xs">


<span className="font-mono text-ash text-xs">
Tokens Used: 
<strong className="text-porcelain">
124
</strong>
 (in: 42, out: 82)
</span>


<button className="text-electric-link hover:underline font-mono text-xs flex items-center gap-1" onClick={() => handleAction("copyStreamOutput('gpt')")}>


<span className="material-symbols-outlined text-[13px]" aria-hidden="true">
content_copy
</span>
 Copy Raw JSON
                
</button>


</div>


</div>


</div>




<div className="px-6 py-3.5 bg-graphite border-t border-steel flex flex-wrap items-center justify-between gap-3 text-xs font-mono">


<div className="flex items-center gap-2 text-ash">


<span className="material-symbols-outlined text-[15px] text-electric-link" aria-hidden="true">
alt_route
</span>


<span>
Proxy rule: Routing fallback order: 
<span className="text-porcelain">
claude-3-5-sonnet &gt; gpt-4o &gt; deepseek-r1
</span>
</span>


</div>


<a className="text-porcelain hover:text-electric-link font-body-md-strong flex items-center gap-1 transition-colors" href="#models-matrix">

              Explore Full Model Matrix 
<span className="material-symbols-outlined text-[14px]" aria-hidden="true">
arrow_forward
</span>


</a>


</div>


</div>


</section>








<section className="w-full bg-graphite border-y border-steel py-4">


<div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">


<div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-steel/80">


<div className="flex items-center gap-3.5 px-3 py-1">


<div className="w-9 h-9 rounded-xl bg-carbon border border-steel flex items-center justify-center text-electric-link shrink-0">


<span className="material-symbols-outlined text-[18px]" aria-hidden="true">
speed
</span>


</div>


<div>


<div className="font-mono text-xs text-ash uppercase">
Average Latency
</div>


<div className="font-mono text-sm md:text-base font-bold text-porcelain">
14 ms 
<span className="text-xs text-emerald-400 font-normal">
p95
</span>
</div>


</div>


</div>


<div className="flex items-center gap-3.5 px-3 py-1">


<div className="w-9 h-9 rounded-xl bg-carbon border border-steel flex items-center justify-center text-emerald-400 shrink-0">


<span className="material-symbols-outlined text-[18px]" aria-hidden="true">
verified
</span>


</div>


<div>


<div className="font-mono text-xs text-ash uppercase">
Global Uptime SLA
</div>


<div className="font-mono text-sm md:text-base font-bold text-porcelain">
99.995% 
<span className="text-xs text-slate font-normal">
SLA
</span>
</div>


</div>


</div>


<div className="flex items-center gap-3.5 px-3 py-1">


<div className="w-9 h-9 rounded-xl bg-carbon border border-steel flex items-center justify-center text-optical-yellow shrink-0">


<span className="material-symbols-outlined text-[18px]" aria-hidden="true">
public
</span>


</div>


<div>


<div className="font-mono text-xs text-ash uppercase">
Edge Locations
</div>


<div className="font-mono text-sm md:text-base font-bold text-porcelain">
48 PoPs 
<span className="text-xs text-ash font-normal">
Anycast
</span>
</div>


</div>


</div>


<div className="flex items-center gap-3.5 px-3 py-1">


<div className="w-9 h-9 rounded-xl bg-carbon border border-steel flex items-center justify-center text-secondary shrink-0">


<span className="material-symbols-outlined text-[18px]" aria-hidden="true">
memory
</span>


</div>


<div>


<div className="font-mono text-xs text-ash uppercase">
Active Models
</div>


<div className="font-mono text-sm md:text-base font-bold text-porcelain">
50+ Engines 
<span className="text-xs text-emerald-400 font-normal">
1 API
</span>
</div>


</div>


</div>


</div>


</div>


</section>








<section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-20" id="models-matrix">


<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">


<div>


<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-carbon border border-steel text-ash font-mono text-[12px] mb-3">


<span className="material-symbols-outlined text-[14px] text-electric-link" aria-hidden="true">
data_object
</span>

              Model Benchmark Matrix
            
</div>


<h2 className="font-headline-xl text-headline-xl text-porcelain">
Compare & Deploy by Workload
</h2>


<p className="font-body-md text-body-md text-ash mt-2 max-w-xl">

              Inspect latency distributions, context capacity, and automated fallback routing cards tailored by specific engineering domain.
            
</p>


</div>




<div role="tablist" aria-label="Model benchmark categories" className="inline-flex p-1 rounded-full bg-carbon border border-steel overflow-x-auto max-w-full">


<button className="matrix-tab px-4 py-1.5 rounded-full text-porcelain bg-steel font-label-sm-strong text-xs whitespace-nowrap transition-all" id="tab-code" role="tab" tabIndex="0" aria-selected="true" aria-controls="matrix-cards-container" onClick={() => handleAction("switchMatrixTab('code')")}>
Code Synthesis
</button>


<button className="matrix-tab px-4 py-1.5 rounded-full text-ash hover:text-porcelain font-label-sm text-xs whitespace-nowrap transition-all" id="tab-reasoning" role="tab" tabIndex="-1" aria-selected="false" aria-controls="matrix-cards-container" onClick={() => handleAction("switchMatrixTab('reasoning')")}>
Reasoning & Math
</button>


<button className="matrix-tab px-4 py-1.5 rounded-full text-ash hover:text-porcelain font-label-sm text-xs whitespace-nowrap transition-all" id="tab-search" role="tab" tabIndex="-1" aria-selected="false" aria-controls="matrix-cards-container" onClick={() => handleAction("switchMatrixTab('search')")}>
Long-Context Search
</button>


<button className="matrix-tab px-4 py-1.5 rounded-full text-ash hover:text-porcelain font-label-sm text-xs whitespace-nowrap transition-all" id="tab-vision" role="tab" tabIndex="-1" aria-selected="false" aria-controls="matrix-cards-container" onClick={() => handleAction("switchMatrixTab('vision')")}>
Vision & OCR
</button>


</div>


</div>




<div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="matrix-cards-container" role="tabpanel" aria-labelledby="tab-code" aria-live="polite" tabIndex="0">




<div className="rounded-[28px] bg-carbon border border-steel p-6 flex flex-col justify-between hover:border-slate transition-all group">


<div>


<div className="flex items-center justify-between mb-4">


<span className="px-2.5 py-0.5 rounded-full bg-tertiary-container/20 text-optical-yellow border border-tertiary-container/30 font-mono text-xs">
Primary Leader
</span>


<span className="font-mono text-xs text-ash">
$3.00 / 1M In
</span>


</div>


<h3 className="font-title-md text-title-md text-porcelain mb-1">
Claude 3.5 Sonnet
</h3>


<p className="font-mono text-xs text-slate mb-4">
anthropic/claude-3-5-sonnet
</p>




<div className="space-y-3 p-4 rounded-2xl bg-graphite border border-steel mb-6">


<div>


<div className="flex justify-between text-xs font-mono mb-1">


<span className="text-ash">
HumanEval Python
</span>


<span className="text-porcelain font-bold">
93.7%
</span>


</div>


<div className="w-full h-1.5 bg-steel rounded-full overflow-hidden">


<div className="h-full bg-electric-link rounded-full" style={{"width":"93.7%"}}>
</div>


</div>


</div>


<div>


<div className="flex justify-between text-xs font-mono mb-1">


<span className="text-ash">
Throughput Speed
</span>


<span className="text-porcelain font-bold">
84 tps
</span>


</div>


<div className="w-full h-1.5 bg-steel rounded-full overflow-hidden">


<div className="h-full bg-emerald-400 rounded-full" style={{"width":"82%"}}>
</div>


</div>


</div>


<div>


<div className="flex justify-between text-xs font-mono mb-1">


<span className="text-ash">
Context Window
</span>


<span className="text-porcelain font-bold">
200K tokens
</span>


</div>


<div className="w-full h-1.5 bg-steel rounded-full overflow-hidden">


<div className="h-full bg-tertiary rounded-full" style={{"width":"60%"}}>
</div>


</div>


</div>


</div>


</div>


<div className="flex items-center gap-2 pt-4 border-t border-steel/60">


<button className="w-full py-2.5 rounded-full bg-primary-container hover:bg-electric-link text-white font-body-md-strong text-xs transition-all flex items-center justify-center gap-1.5" onClick={() => handleAction("deployToProxy('anthropic/claude-3-5-sonnet')")}>


<span className="material-symbols-outlined text-[15px]" aria-hidden="true">
rocket_launch
</span>
 Deploy to Proxy
              
</button>


</div>


</div>




<div className="rounded-[28px] bg-carbon border border-steel p-6 flex flex-col justify-between hover:border-slate transition-all group">


<div>


<div className="flex items-center justify-between mb-4">


<span className="px-2.5 py-0.5 rounded-full bg-primary-container/20 text-electric-link border border-primary-container/30 font-mono text-xs">
Omni Engine
</span>


<span className="font-mono text-xs text-ash">
$2.50 / 1M In
</span>


</div>


<h3 className="font-title-md text-title-md text-porcelain mb-1">
GPT-4o
</h3>


<p className="font-mono text-xs text-slate mb-4">
openai/gpt-4o
</p>




<div className="space-y-3 p-4 rounded-2xl bg-graphite border border-steel mb-6">


<div>


<div className="flex justify-between text-xs font-mono mb-1">


<span className="text-ash">
HumanEval Python
</span>


<span className="text-porcelain font-bold">
90.2%
</span>


</div>


<div className="w-full h-1.5 bg-steel rounded-full overflow-hidden">


<div className="h-full bg-electric-link rounded-full" style={{"width":"90.2%"}}>
</div>


</div>


</div>


<div>


<div className="flex justify-between text-xs font-mono mb-1">


<span className="text-ash">
Throughput Speed
</span>


<span className="text-porcelain font-bold">
104 tps
</span>


</div>


<div className="w-full h-1.5 bg-steel rounded-full overflow-hidden">


<div className="h-full bg-emerald-400 rounded-full" style={{"width":"95%"}}>
</div>


</div>


</div>


<div>


<div className="flex justify-between text-xs font-mono mb-1">


<span className="text-ash">
Context Window
</span>


<span className="text-porcelain font-bold">
128K tokens
</span>


</div>


<div className="w-full h-1.5 bg-steel rounded-full overflow-hidden">


<div className="h-full bg-tertiary rounded-full" style={{"width":"45%"}}>
</div>


</div>


</div>


</div>


</div>


<div className="flex items-center gap-2 pt-4 border-t border-steel/60">


<button className="w-full py-2.5 rounded-full bg-graphite hover:bg-steel border border-steel text-porcelain font-body-md-strong text-xs transition-all flex items-center justify-center gap-1.5" onClick={() => handleAction("deployToProxy('openai/gpt-4o')")}>


<span className="material-symbols-outlined text-[15px]" aria-hidden="true">
rocket_launch
</span>
 Deploy to Proxy
              
</button>


</div>


</div>




<div className="rounded-[28px] bg-carbon border border-steel p-6 flex flex-col justify-between hover:border-slate transition-all group">


<div>


<div className="flex items-center justify-between mb-4">


<span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs">
Open Weights Edge
</span>


<span className="font-mono text-xs text-ash">
$0.35 / 1M In
</span>


</div>


<h3 className="font-title-md text-title-md text-porcelain mb-1">
Llama 3.3 70B
</h3>


<p className="font-mono text-xs text-slate mb-4">
meta/llama-3.3-70b-instruct
</p>




<div className="space-y-3 p-4 rounded-2xl bg-graphite border border-steel mb-6">


<div>


<div className="flex justify-between text-xs font-mono mb-1">


<span className="text-ash">
HumanEval Python
</span>


<span className="text-porcelain font-bold">
85.4%
</span>


</div>


<div className="w-full h-1.5 bg-steel rounded-full overflow-hidden">


<div className="h-full bg-electric-link rounded-full" style={{"width":"85.4%"}}>
</div>


</div>


</div>


<div>


<div className="flex justify-between text-xs font-mono mb-1">


<span className="text-ash">
Throughput Speed
</span>


<span className="text-porcelain font-bold">
128 tps
</span>


</div>


<div className="w-full h-1.5 bg-steel rounded-full overflow-hidden">


<div className="h-full bg-emerald-400 rounded-full" style={{"width":"100%"}}>
</div>


</div>


</div>


<div>


<div className="flex justify-between text-xs font-mono mb-1">


<span className="text-ash">
Context Window
</span>


<span className="text-porcelain font-bold">
128K tokens
</span>


</div>


<div className="w-full h-1.5 bg-steel rounded-full overflow-hidden">


<div className="h-full bg-tertiary rounded-full" style={{"width":"45%"}}>
</div>


</div>


</div>


</div>


</div>


<div className="flex items-center gap-2 pt-4 border-t border-steel/60">


<button className="w-full py-2.5 rounded-full bg-graphite hover:bg-steel border border-steel text-porcelain font-body-md-strong text-xs transition-all flex items-center justify-center gap-1.5" onClick={() => handleAction("deployToProxy('meta/llama-3.3-70b')")}>


<span className="material-symbols-outlined text-[15px]" aria-hidden="true">
rocket_launch
</span>
 Deploy to Proxy
              
</button>


</div>


</div>


</div>


</section>








<section className="w-full bg-graphite border-y border-steel py-20" id="developer-journey">


<div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">


<div className="max-w-2xl mb-14">


<span className="font-label-sm-strong text-label-sm-strong text-electric-link uppercase tracking-wider">
Zero Architecture Rewrite
</span>


<h2 className="font-headline-xl text-headline-xl text-porcelain mt-2">
The 3-Step Integration Pipeline
</h2>


<p className="font-body-md text-body-md text-ash mt-3">

              Designed as an invisible reverse proxy layer. If your application already uses OpenAI, changing one line of configuration gives you access to every LLM.
            
</p>


</div>




<div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">




<div className="rounded-[28px] bg-carbon border border-steel p-7 flex flex-col justify-between relative overflow-hidden">


<div className="absolute top-4 right-5 font-mono text-3xl font-extrabold text-steel/50">
01
</div>


<div>


<div className="w-10 h-10 rounded-xl bg-graphite border border-steel flex items-center justify-center text-electric-link mb-5">


<span className="material-symbols-outlined text-[22px]" aria-hidden="true">
link
</span>


</div>


<h3 className="font-title-md text-title-md text-porcelain mb-2">
Drop-in Base URL
</h3>


<p className="font-body-md text-body-md text-ash mb-4">

                  Keep your existing OpenAI client instantiation. Replace the host URL with our regional edge gateway.
                
</p>




<div className="p-3.5 rounded-xl bg-obsidian border border-steel/80 font-mono text-xs text-porcelain code-scroll overflow-x-auto">


<span className="text-ash">
// Python SDK Configuration
</span>
<br />

                  client = OpenAI(
<br />

                    
<span className="text-tertiary">
base_url
</span>
=
<span className="text-emerald-400">
"https://api.aihub.io/v1"
</span>
,
<br />

                    api_key=
<span className="text-electric-link">
os.getenv("AIHUB_KEY")
</span>
<br />

                  )
                
</div>


</div>


<div className="mt-6 pt-4 border-t border-steel/60 text-xs font-mono text-slate">

                ✓ Compatible with LangChain, LlamaIndex, Vercel AI SDK
              
</div>


</div>




<div className="rounded-[28px] bg-carbon border border-steel p-7 flex flex-col justify-between relative overflow-hidden">


<div className="absolute top-4 right-5 font-mono text-3xl font-extrabold text-steel/50">
02
</div>


<div>


<div className="w-10 h-10 rounded-xl bg-graphite border border-steel flex items-center justify-center text-optical-yellow mb-5">


<span className="material-symbols-outlined text-[22px]" aria-hidden="true">
alt_route
</span>


</div>


<h3 className="font-title-md text-title-md text-porcelain mb-2">
Configure Smart Fallbacks
</h3>


<p className="font-body-md text-body-md text-ash mb-4">

                  Declare fallback priority chains directly in request headers or gateway dashboard presets to prevent 429/500 downtime.
                
</p>




<div className="p-3.5 rounded-xl bg-obsidian border border-steel/80 font-mono text-xs text-porcelain code-scroll overflow-x-auto">


<span className="text-ash">
// Fallback parameter header
</span>
<br />

                  extra_headers=&#123;
<br />

                    
<span className="text-tertiary">
"x-aihub-fallback"
</span>
: 
<span className="text-emerald-400">
"claude-3-5,gpt-4o"
</span>
,
<br />

                    
<span className="text-tertiary">
"x-aihub-timeout-ms"
</span>
: 
<span className="text-copper-new">
"3500"
</span>
<br />

                  &#125;
                
</div>


</div>


<div className="mt-6 pt-4 border-t border-steel/60 text-xs font-mono text-slate">

                ✓ Automatic retries across multi-cloud availability zones
              
</div>


</div>




<div className="rounded-[28px] bg-carbon border border-steel p-7 flex flex-col justify-between relative overflow-hidden">


<div className="absolute top-4 right-5 font-mono text-3xl font-extrabold text-steel/50">
03
</div>


<div>


<div className="w-10 h-10 rounded-xl bg-graphite border border-steel flex items-center justify-center text-emerald-400 mb-5">


<span className="material-symbols-outlined text-[22px]" aria-hidden="true">
monitoring
</span>


</div>


<h3 className="font-title-md text-title-md text-porcelain mb-2">
Monitor Unified Analytics
</h3>


<p className="font-body-md text-body-md text-ash mb-4">

                  Track per-request token consumption, cache hit savings, and end-to-end TTFT latency across all upstream providers.
                
</p>




<div className="p-3.5 rounded-xl bg-obsidian border border-steel/80 font-mono text-xs text-porcelain code-scroll overflow-x-auto">


<span className="text-ash">
// Telemetry in response headers
</span>
<br />

                  X-AIHub-Upstream: 
<span className="text-emerald-400">
anthropic.us-east-1
</span>
<br />

                  X-AIHub-Latency-Route: 
<span className="text-electric-link">
12ms
</span>
<br />

                  X-AIHub-Cache: 
<span className="text-tertiary">
HIT (semantic-sim: 0.98)
</span>


</div>


</div>


<div className="mt-6 pt-4 border-t border-steel/60 text-xs font-mono text-slate">

                ✓ Real-time webhooks, Datadog & OpenTelemetry exporter
              
</div>


</div>


</div>


</div>


</section>








<section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-20" id="agent-workflows">


<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">


<div>


<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-carbon border border-steel text-ash font-mono text-[12px] mb-3">


<span className="material-symbols-outlined text-[14px] text-electric-link" aria-hidden="true">
account_tree
</span>

              Workflow Wireframe Blueprints
            
</div>


<h2 className="font-headline-xl text-headline-xl text-porcelain">
Modular Autonomous Agent Blueprints
</h2>


<p className="font-body-md text-body-md text-ash mt-2 max-w-xl">

              Connected multi-step node topologies ready for deployment. Route each stage of an agent workflow to the optimal cost/speed engine.
            
</p>


</div>


<a className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-carbon border border-steel hover:border-slate text-porcelain text-xs font-body-md-strong transition-all" href="#">


<span>
Open Workflow Canvas
</span>


<span className="material-symbols-outlined text-[15px]" aria-hidden="true">
open_in_new
</span>


</a>


</div>


<div className="grid grid-cols-1 md:grid-cols-3 gap-6">




<div className="rounded-[28px] bg-carbon border border-steel p-6 flex flex-col justify-between hover:border-slate transition-all relative">


<div>


<div className="flex items-center justify-between mb-4">


<span className="px-2.5 py-0.5 rounded-full bg-graphite border border-steel text-xs font-mono text-porcelain">
Pipeline 01
</span>


<span className="text-emerald-400 font-mono text-xs">
Node Chain: 3 Steps
</span>


</div>


<h3 className="font-title-md text-title-md text-porcelain mb-2">
Automated PR Auditor
</h3>


<p className="font-body-md text-body-md text-ash mb-6">

                Parse git diffs, perform static vulnerability scan, and generate in-line security comments.
              
</p>




<div className="p-4 rounded-2xl bg-graphite border border-steel space-y-3 font-mono text-xs mb-6 relative">




<div className="flex items-center gap-3">


<div className="w-6 h-6 rounded-full bg-primary-container/30 border border-electric-link flex items-center justify-center text-xs text-electric-link shrink-0">
1
</div>


<div className="p-2 rounded-lg bg-carbon border border-steel flex-1 flex justify-between">


<span className="text-ash">
Diff Ingest
</span>


<span className="text-porcelain font-semibold">
Llama 3.3 (Fast)
</span>


</div>


</div>




<div className="w-0.5 h-3 bg-steel ml-3">
</div>




<div className="flex items-center gap-3">


<div className="w-6 h-6 rounded-full bg-tertiary-container/30 border border-optical-yellow flex items-center justify-center text-xs text-optical-yellow shrink-0">
2
</div>


<div className="p-2 rounded-lg bg-carbon border border-steel flex-1 flex justify-between">


<span className="text-ash">
Security Analysis
</span>


<span className="text-porcelain font-semibold">
Claude 3.5 Sonnet
</span>


</div>


</div>




<div className="w-0.5 h-3 bg-steel ml-3">
</div>




<div className="flex items-center gap-3">


<div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-xs text-emerald-400 shrink-0">
3
</div>


<div className="p-2 rounded-lg bg-carbon border border-steel flex-1 flex justify-between">


<span className="text-ash">
Inline GitHub Push
</span>


<span className="text-porcelain font-semibold">
Octokit REST
</span>


</div>


</div>


</div>


</div>


<button className="w-full py-2.5 rounded-full bg-graphite hover:bg-steel border border-steel text-porcelain text-xs font-mono transition-all flex items-center justify-center gap-2" onClick={() => handleAction("alert('Cloning PR Auditor blueprint into your workspace...')")}>


<span className="material-symbols-outlined text-[15px]" aria-hidden="true">
fork_right
</span>
 Fork Blueprint
            
</button>


</div>




<div className="rounded-[28px] bg-carbon border border-steel p-6 flex flex-col justify-between hover:border-slate transition-all relative">


<div>


<div className="flex items-center justify-between mb-4">


<span className="px-2.5 py-0.5 rounded-full bg-graphite border border-steel text-xs font-mono text-porcelain">
Pipeline 02
</span>


<span className="text-emerald-400 font-mono text-xs">
Node Chain: 3 Steps
</span>


</div>


<h3 className="font-title-md text-title-md text-porcelain mb-2">
Deep Research Synthesizer
</h3>


<p className="font-body-md text-body-md text-ash mb-6">

                Multi-query search retrieval, cross-source citation deduplication, and thesis generation.
              
</p>




<div className="p-4 rounded-2xl bg-graphite border border-steel space-y-3 font-mono text-xs mb-6 relative">




<div className="flex items-center gap-3">


<div className="w-6 h-6 rounded-full bg-primary-container/30 border border-electric-link flex items-center justify-center text-xs text-electric-link shrink-0">
1
</div>


<div className="p-2 rounded-lg bg-carbon border border-steel flex-1 flex justify-between">


<span className="text-ash">
Web Crawler
</span>


<span className="text-porcelain font-semibold">
Tavily / Serper API
</span>


</div>


</div>




<div className="w-0.5 h-3 bg-steel ml-3">
</div>




<div className="flex items-center gap-3">


<div className="w-6 h-6 rounded-full bg-tertiary-container/30 border border-optical-yellow flex items-center justify-center text-xs text-optical-yellow shrink-0">
2
</div>


<div className="p-2 rounded-lg bg-carbon border border-steel flex-1 flex justify-between">


<span className="text-ash">
Reasoning Engine
</span>


<span className="text-porcelain font-semibold">
DeepSeek R1
</span>


</div>


</div>




<div className="w-0.5 h-3 bg-steel ml-3">
</div>




<div className="flex items-center gap-3">


<div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-xs text-emerald-400 shrink-0">
3
</div>


<div className="p-2 rounded-lg bg-carbon border border-steel flex-1 flex justify-between">


<span className="text-ash">
Report Formatter
</span>


<span className="text-porcelain font-semibold">
GPT-4o Markdown
</span>


</div>


</div>


</div>


</div>


<button className="w-full py-2.5 rounded-full bg-graphite hover:bg-steel border border-steel text-porcelain text-xs font-mono transition-all flex items-center justify-center gap-2" onClick={() => handleAction("alert('Cloning Research Synthesizer blueprint...')")}>


<span className="material-symbols-outlined text-[15px]" aria-hidden="true">
fork_right
</span>
 Fork Blueprint
            
</button>


</div>




<div className="rounded-[28px] bg-carbon border border-steel p-6 flex flex-col justify-between hover:border-slate transition-all relative">


<div>


<div className="flex items-center justify-between mb-4">


<span className="px-2.5 py-0.5 rounded-full bg-graphite border border-steel text-xs font-mono text-porcelain">
Pipeline 03
</span>


<span className="text-emerald-400 font-mono text-xs">
Node Chain: 3 Steps
</span>


</div>


<h3 className="font-title-md text-title-md text-porcelain mb-2">
Multimodal Document OCR
</h3>


<p className="font-body-md text-body-md text-ash mb-6">

                Parse complex invoices, receipts, and technical diagrams directly into validated JSON schemas.
              
</p>




<div className="p-4 rounded-2xl bg-graphite border border-steel space-y-3 font-mono text-xs mb-6 relative">




<div className="flex items-center gap-3">


<div className="w-6 h-6 rounded-full bg-primary-container/30 border border-electric-link flex items-center justify-center text-xs text-electric-link shrink-0">
1
</div>


<div className="p-2 rounded-lg bg-carbon border border-steel flex-1 flex justify-between">


<span className="text-ash">
High-Res OCR
</span>


<span className="text-porcelain font-semibold">
Gemini 1.5 Pro
</span>


</div>


</div>




<div className="w-0.5 h-3 bg-steel ml-3">
</div>




<div className="flex items-center gap-3">


<div className="w-6 h-6 rounded-full bg-tertiary-container/30 border border-optical-yellow flex items-center justify-center text-xs text-optical-yellow shrink-0">
2
</div>


<div className="p-2 rounded-lg bg-carbon border border-steel flex-1 flex justify-between">


<span className="text-ash">
Zod Schema Validation
</span>


<span className="text-porcelain font-semibold">
Edge Worker Node
</span>


</div>


</div>




<div className="w-0.5 h-3 bg-steel ml-3">
</div>




<div className="flex items-center gap-3">


<div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-xs text-emerald-400 shrink-0">
3
</div>


<div className="p-2 rounded-lg bg-carbon border border-steel flex-1 flex justify-between">


<span className="text-ash">
ERP Integration
</span>


<span className="text-porcelain font-semibold">
Database Upsert
</span>


</div>


</div>


</div>


</div>


<button className="w-full py-2.5 rounded-full bg-graphite hover:bg-steel border border-steel text-porcelain text-xs font-mono transition-all flex items-center justify-center gap-2" onClick={() => handleAction("alert('Cloning Document OCR blueprint...')")}>


<span className="material-symbols-outlined text-[15px]" aria-hidden="true">
fork_right
</span>
 Fork Blueprint
            
</button>


</div>


</div>


</section>








<section className="w-full bg-graphite border-y border-steel py-20" id="observability">


<div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">


<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">


<div>


<span className="font-label-sm-strong text-label-sm-strong text-electric-link uppercase tracking-wider">
Live Control Plane
</span>


<h2 className="font-headline-xl text-headline-xl text-porcelain mt-2">
Enterprise Observability & Latency Cockpit
</h2>


<p className="font-body-md text-body-md text-ash mt-2 max-w-xl">

                Continuous tracing across upstream providers with automated error-budget alerting, semantic cache ratios, and live failover logs.
              
</p>


</div>


<div className="flex items-center gap-3">


<span className="px-3 py-1.5 rounded-full bg-carbon border border-steel text-xs font-mono text-ash flex items-center gap-2">


<span className="w-2 h-2 rounded-full bg-emerald-400">
</span>

                Buffer Sync: 240ms ago
              
</span>


</div>


</div>




<div className="w-full rounded-[28px] bg-carbon border border-steel p-6 sm:p-8 shadow-2xl">




<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">


<div className="p-5 rounded-2xl bg-graphite border border-steel">


<div className="flex items-center justify-between text-xs font-mono text-ash mb-2">


<span>
ERROR BUDGET
</span>


<span className="text-emerald-400">
99.98% REMAINING
</span>


</div>


<div className="font-metric-stat text-2xl font-bold text-porcelain">
0.008%
</div>


<div className="text-xs text-slate font-mono mt-1">
Total 5xx across 24h
</div>


</div>


<div className="p-5 rounded-2xl bg-graphite border border-steel">


<div className="flex items-center justify-between text-xs font-mono text-ash mb-2">


<span>
SEMANTIC CACHE
</span>


<span className="text-electric-link">
ACTIVE
</span>


</div>


<div className="font-metric-stat text-2xl font-bold text-electric-link">
68.4%
</div>


<div className="text-xs text-ash font-mono mt-1">
Saved $4,120 in upstream calls
</div>


</div>


<div className="p-5 rounded-2xl bg-graphite border border-steel">


<div className="flex items-center justify-between text-xs font-mono text-ash mb-2">


<span>
AUTO-FAILOVERS
</span>


<span className="text-tertiary">
RESOLVED
</span>


</div>


<div className="font-metric-stat text-2xl font-bold text-porcelain">
2,840
</div>


<div className="text-xs text-emerald-400 font-mono mt-1">
0 user impact downtime
</div>


</div>


<div className="p-5 rounded-2xl bg-graphite border border-steel">


<div className="flex items-center justify-between text-xs font-mono text-ash mb-2">


<span>
EDGE OVERHEAD
</span>


<span className="text-emerald-400">
NOMINAL
</span>


</div>


<div className="font-metric-stat text-2xl font-bold text-porcelain">
11.8 
<span className="text-xs text-ash font-normal">
ms
</span>
</div>


<div className="text-xs text-slate font-mono mt-1">
Anycast routing latency
</div>


</div>


</div>




<div className="p-6 rounded-2xl bg-graphite border border-steel mb-6">


<div className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-steel/60 gap-4">


<div className="flex items-center gap-4 text-xs font-mono">


<span className="flex items-center gap-1.5 text-porcelain font-semibold">


<span className="w-2.5 h-2.5 rounded-full bg-electric-link">
</span>
 p95 Latency (ms)
                  
</span>


<span className="flex items-center gap-1.5 text-ash">


<span className="w-2.5 h-2.5 rounded-full bg-emerald-400">
</span>
 Cache Hits (req/s)
                  
</span>


<span className="flex items-center gap-1.5 text-copper-new">


<span className="w-2.5 h-2.5 rounded-full bg-copper-new">
</span>
 Fallback Triggered
                  
</span>


</div>


<div className="flex items-center gap-2">


<span className="px-2.5 py-1 rounded-full bg-carbon border border-steel text-xs font-mono text-porcelain">
Cluster: Global Anycast
</span>


</div>


</div>




<div className="w-full h-52 relative overflow-hidden">


<svg className="w-full h-full" fill="none" preserveaspectratio="none" viewbox="0 0 900 200">


<defs>


<lineargradient id="latencyGlow" x1="0" x2="0" y1="0" y2="1">


<stop offset="0%" stop-color="#2997ff" stop-opacity="0.3">
</stop>


<stop offset="100%" stop-color="#2997ff" stop-opacity="0.0">
</stop>


</lineargradient>


<lineargradient id="cacheGlow" x1="0" x2="0" y1="0" y2="1">


<stop offset="0%" stop-color="#34d399" stop-opacity="0.2">
</stop>


<stop offset="100%" stop-color="#34d399" stop-opacity="0.0">
</stop>


</lineargradient>


</defs>




<line stroke="#333336" stroke-dasharray="3 3" stroke-width="1" x1="0" x2="900" y1="40" y2="40">
</line>


<line stroke="#333336" stroke-dasharray="3 3" stroke-width="1" x1="0" x2="900" y1="90" y2="90">
</line>


<line stroke="#333336" stroke-dasharray="3 3" stroke-width="1" x1="0" x2="900" y1="140" y2="140">
</line>




<path d="M0,150 Q150,110 300,130 T600,100 T750,70 T900,90 L900,200 L0,200 Z" fill="url(#cacheGlow)">
</path>


<path d="M0,150 Q150,110 300,130 T600,100 T750,70 T900,90" stroke="#34d399" stroke-width="2">
</path>




<path d="M0,110 Q140,80 280,65 T560,75 T720,40 T900,55 L900,200 L0,200 Z" fill="url(#latencyGlow)">
</path>


<path d="M0,110 Q140,80 280,65 T560,75 T720,40 T900,55" stroke="#2997ff" stroke-width="2.5">
</path>




<circle cx="720" cy="40" fill="#2997ff" r="5">
</circle>


<circle cx="720" cy="40" fill="#ffffff" r="2.5">
</circle>


</svg>


</div>


<div className="flex items-center justify-between text-xs font-mono text-ash pt-3 border-t border-steel/60">


<span>
00:00:00
</span>


<span>
06:00:00
</span>


<span>
12:00:00
</span>


<span>
18:00:00
</span>


<span className="text-emerald-400">
Live (Sub-second buffer)
</span>


</div>


</div>




<div className="rounded-xl bg-obsidian border border-steel p-4 font-mono text-xs text-on-surface-variant space-y-1.5">


<div className="text-slate text-xs pb-1 border-b border-steel/50 flex justify-between">


<span>
EVENT STREAM LOGS
</span>


<span>
LEVEL: INFO / WARN
</span>


</div>


<div className="flex items-center gap-2">


<span className="text-slate">
[14:32:01.102]
</span>


<span className="text-emerald-400">
200 OK
</span>


<span className="text-porcelain">
POST /chat/completions
</span>


<span className="text-ash">
→ routed to
</span>


<span className="text-tertiary">
anthropic/claude-3-5-sonnet
</span>


<span className="text-slate">
(118ms)
</span>


</div>


<div className="flex items-center gap-2">


<span className="text-slate">
[14:32:02.418]
</span>


<span className="text-tertiary">
CACHE_HIT
</span>


<span className="text-porcelain">
POST /chat/completions
</span>


<span className="text-ash">
→ vector cosine 0.991 match returned from memory
</span>


<span className="text-emerald-400">
(4ms)
</span>


</div>


<div className="flex items-center gap-2">


<span className="text-slate">
[14:32:04.880]
</span>


<span className="text-copper-new">
429_INTERCEPT
</span>


<span className="text-porcelain">
Upstream rate limit
</span>


<span className="text-ash">
→ transparent reroute to fallback
</span>


<span className="text-secondary">
openai/gpt-4o
</span>


<span className="text-emerald-400">
(32ms failover recovery)
</span>


</div>


</div>


</div>


</div>


</section>








<section className="w-full bg-graphite border-t border-steel py-20 relative overflow-hidden" id="get-started">


<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[220px] bg-electric-link/20 rounded-full blur-[130px] pointer-events-none">
</div>


<div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop relative z-10 text-center">


<div className="max-w-3xl mx-auto rounded-[32px] bg-carbon border border-steel p-8 sm:p-12 shadow-2xl">


<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-graphite border border-steel text-electric-link font-mono text-xs uppercase tracking-wider mb-5">


<span className="material-symbols-outlined text-[15px]" aria-hidden="true">
terminal
</span>
 Instant Sandbox Provisioning
            
</span>


<h2 className="font-display-sm text-[34px] sm:text-[46px] leading-tight font-semibold text-porcelain mb-3">

              Deploy Your Proxy in 30 Seconds.
            
</h2>


<p className="font-body-lg text-body-lg text-ash max-w-xl mx-auto mb-8">

              No credit card required. Receive $10 in complimentary sandbox tokens to benchmark and stream Claude, GPT-4o, and DeepSeek in production.
            
</p>


<div className="flex flex-wrap items-center justify-center gap-4">


<a className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-primary-container hover:bg-electric-link text-white font-body-md-strong text-body-md-strong transition-all shadow-[0_0_24px_rgba(0,113,227,0.4)]" href="#">

                Generate API Key Free
              
</a>


<a className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-graphite hover:bg-steel border border-steel text-porcelain font-body-md-strong text-body-md-strong transition-all" href="#">


<span>
Read Gateway Specs
</span>


<span className="material-symbols-outlined text-[16px] text-electric-link" aria-hidden="true">
menu_book
</span>


</a>


</div>




<div className="mt-8 p-3 rounded-xl bg-obsidian border border-steel/60 font-mono text-xs text-ash max-w-md mx-auto flex items-center justify-between">


<span>
npx @aihub/cli login && aihub proxy start
</span>


<button className="text-electric-link hover:text-white min-h-11 min-w-11" aria-label="Copy CLI command" onClick={() => handleAction("copy-cli")}>


<span className="material-symbols-outlined text-[15px]" aria-hidden="true">
content_copy
</span>


</button>


</div>


</div>


</div>


</section>








<footer className="w-full bg-graphite border-t border-steel mt-auto">


<div className="max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">


<div className="grid grid-cols-2 md:grid-cols-5 gap-space-lg mb-space-xl">


<div className="flex flex-col gap-space-sm">


<span className="font-label-sm-strong text-label-sm-strong text-porcelain uppercase tracking-wider mb-space-xs">
Gateway Engine
</span>


<a className="font-body-md text-body-md text-ash hover:text-porcelain transition-colors" href="#">
Anycast Router
</a>


<a className="font-body-md text-body-md text-ash hover:text-porcelain transition-colors" href="#">
Failover Guard
</a>


<a className="font-body-md text-body-md text-ash hover:text-porcelain transition-colors" href="#">
Semantic Cache
</a>


<a className="font-body-md text-body-md text-ash hover:text-porcelain transition-colors" href="#">
Rate Limiter Vault
</a>


</div>


<div className="flex flex-col gap-space-sm">


<span className="font-label-sm-strong text-label-sm-strong text-porcelain uppercase tracking-wider mb-space-xs">
Model Engines
</span>


<a className="font-body-md text-body-md text-ash hover:text-porcelain transition-colors" href="#">
Anthropic Claude 3.5
</a>


<a className="font-body-md text-body-md text-ash hover:text-porcelain transition-colors" href="#">
OpenAI GPT-4o
</a>


<a className="font-body-md text-body-md text-ash hover:text-porcelain transition-colors" href="#">
DeepSeek R1 / V3
</a>


<a className="font-body-md text-body-md text-ash hover:text-porcelain transition-colors" href="#">
Meta Llama 3.3
</a>


</div>


<div className="flex flex-col gap-space-sm">


<span className="font-label-sm-strong text-label-sm-strong text-porcelain uppercase tracking-wider mb-space-xs">
Developers
</span>


<a className="font-body-md text-body-md text-ash hover:text-porcelain transition-colors" href="#">
Interactive Workbench
</a>


<a className="font-body-md text-body-md text-ash hover:text-porcelain transition-colors" href="#">
OpenAI SDK Wrapper
</a>


<a className="font-body-md text-body-md text-ash hover:text-porcelain transition-colors" href="#">
Python SDK
</a>


<a className="font-body-md text-body-md text-ash hover:text-porcelain transition-colors" href="#">
CLI Architecture
</a>


</div>


<div className="flex flex-col gap-space-sm">


<span className="font-label-sm-strong text-label-sm-strong text-porcelain uppercase tracking-wider mb-space-xs">
Company
</span>


<a className="font-body-md text-body-md text-ash hover:text-porcelain transition-colors" href="#">
Routing Architecture
</a>


<a className="font-body-md text-body-md text-ash hover:text-porcelain transition-colors" href="#">
Network Edge Status
</a>


<a className="font-body-md text-body-md text-ash hover:text-porcelain transition-colors" href="#">
Security Center
</a>


<a className="font-body-md text-body-md text-ash hover:text-porcelain transition-colors" href="#">
Careers
</a>


</div>


<div className="flex flex-col gap-space-sm">


<span className="font-label-sm-strong text-label-sm-strong text-porcelain uppercase tracking-wider mb-space-xs">
Legal & SLAs
</span>


<a className="font-body-md text-body-md text-ash hover:text-porcelain transition-colors" href="#">
99.995% SLA Terms
</a>


<a className="font-body-md text-body-md text-ash hover:text-porcelain transition-colors" href="#">
Privacy & Zero Retention
</a>


<a className="font-body-md text-body-md text-ash hover:text-porcelain transition-colors" href="#">
SOC 2 Type II
</a>


<a className="font-body-md text-body-md text-ash hover:text-porcelain transition-colors" href="#">
HIPAA BAA
</a>


</div>


</div>


<div className="pt-space-md border-t border-steel flex flex-col sm:flex-row items-center justify-between gap-space-md">


<div className="flex items-center gap-space-md">


<div className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-carbon border border-steel">


<span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]">
</span>


<span className="font-label-sm text-label-sm text-porcelain">
All 48 Edge Nodes Operational
</span>


</div>


<span className="font-label-sm text-label-sm text-ash">
© 2025 AI Hub Gateway Inc.
</span>


</div>


<div className="flex items-center gap-space-md text-ash font-mono text-xs">


<span>
Zero Vendor Lock-in
</span>


<span className="text-steel">
•
</span>


<span>
San Francisco • Zurich • Tokyo
</span>


</div>


</div>


</div>


</footer>


</div>


</main>









  </div>;
}
