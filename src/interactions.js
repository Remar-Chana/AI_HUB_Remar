
    // Presets for the Live Workbench
    const workbenchPresets = {
      sql: {
        text: "Optimize this SQL query & explain execution plan: SELECT u.id, count(o.id) FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE o.created_at > NOW() - INTERVAL '30 days' GROUP BY u.id HAVING count(o.id) > 5;",
        sonnet: {
          ttft: "118 ms",
          tps: "84.2 tps",
          cost: "$0.0019",
          html: '<p class="text-slate italic">-- Rewrite using pre-filtered subquery index scan:</p><p class="text-emerald-400">WITH active_orders AS (<br/>&nbsp;&nbsp;SELECT user_id, count(id) as total<br/>&nbsp;&nbsp;FROM orders<br/>&nbsp;&nbsp;WHERE created_at &gt; NOW() - INTERVAL \'30 days\'<br/>&nbsp;&nbsp;GROUP BY user_id HAVING count(id) &gt; 5<br/>)<br/>SELECT u.id, ao.total FROM users u<br/>INNER JOIN active_orders ao ON u.id = ao.user_id;</p><p class="text-ash text-xs">Plan: Avoids full left join table scan; leverages composite index on (created_at, user_id). Scan cost drops ~82%.</p>'
        },
        gpt: {
          ttft: "94 ms",
          tps: "102.5 tps",
          cost: "$0.0016",
          html: '<p class="text-slate italic">-- Optimized INNER JOIN aggregate:</p><p class="text-secondary-fixed">SELECT o.user_id, count(o.id) AS order_volume<br/>FROM orders o<br/>WHERE o.created_at &gt; NOW() - INTERVAL \'30 DAY\'<br/>GROUP BY o.user_id<br/>HAVING count(o.id) &gt; 5;</p><p class="text-ash text-xs">Observation: Left join on `users` is redundant if `o.user_id` matches foreign keys. Eliminates join hash buffer.</p>'
        }
      },
      code: {
        text: "Implement an async rate-limited worker pool in Python using asyncio.Queue with backpressure and graceful SIGINT shutdown.",
        sonnet: {
          ttft: "132 ms",
          tps: "88.6 tps",
          cost: "$0.0028",
          html: '<p class="text-slate italic"># Async Worker Pool with asyncio.Event cancellation</p><p class="text-emerald-400">class WorkerPool:<br/>&nbsp;&nbsp;def __init__(self, concurrency=10):<br/>&nbsp;&nbsp;&nbsp;&nbsp;self.queue = asyncio.Queue(maxsize=100)<br/>&nbsp;&nbsp;&nbsp;&nbsp;self.stop_event = asyncio.Event()<br/><br/>&nbsp;&nbsp;async def worker(self):<br/>&nbsp;&nbsp;&nbsp;&nbsp;while not self.stop_event.is_set():<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;item = await self.queue.get()<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;try: await self.process(item)<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;finally: self.queue.task_done()</p>'
        },
        gpt: {
          ttft: "101 ms",
          tps: "98.1 tps",
          cost: "$0.0024",
          html: '<p class="text-slate italic"># Semaphore-governed task consumer</p><p class="text-secondary-fixed">async def run_pool(tasks, limit=10):<br/>&nbsp;&nbsp;sem = asyncio.Semaphore(limit)<br/>&nbsp;&nbsp;async def bounded(t):<br/>&nbsp;&nbsp;&nbsp;&nbsp;async with sem:<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return await t()<br/>&nbsp;&nbsp;return await asyncio.gather(*(bounded(t) for t in tasks))</p>'
        }
      },
      math: {
        text: "Prove that every connected graph with n vertices and n-1 edges is a tree by structural induction.",
        sonnet: {
          ttft: "140 ms",
          tps: "81.0 tps",
          cost: "$0.0031",
          html: '<p class="text-slate italic">Base step (n=1): 1 vertex, 0 edges is vacuously connected &amp; acyclic. Inductive step: Assume true for k. Consider G with k+1 vertices and k edges. Sum of degrees = 2k &lt; 2(k+1), hence there exists a vertex v with degree 1. Removing v yields a connected graph with k vertices and k-1 edges...</p>'
        },
        gpt: {
          ttft: "110 ms",
          tps: "95.4 tps",
          cost: "$0.0029",
          html: '<p class="text-slate italic">By standard tree characterization: Connected implies at least n-1 edges. If G has any cycle, removing a cycle edge leaves G connected. Continuing yields a spanning tree with n-1 edges. Since |E| = n-1 already, no edges could have been removed without disconnecting G; thus G contains no cycles.</p>'
        }
      }
    };

    export function setWorkbenchPrompt(key) {
      ['sql', 'code', 'math'].forEach(k => {
        const btn = document.getElementById('prompt-btn-' + k);
        if (k === key) {
          btn.className = 'px-3 py-0.5 rounded-full text-xs font-mono text-porcelain bg-steel';
        } else {
          btn.className = 'px-3 py-0.5 rounded-full text-xs font-mono text-ash hover:text-porcelain';
        }
      });

      const preset = workbenchPresets[key];
      document.getElementById('workbench-input').value = preset.text;
      
      document.getElementById('sonnet-stream-content').innerHTML = preset.sonnet.html;
      document.getElementById('sonnet-ttft').innerText = preset.sonnet.ttft;
      document.getElementById('sonnet-tps').innerText = preset.sonnet.tps;
      document.getElementById('sonnet-cost').innerText = preset.sonnet.cost;

      document.getElementById('gpt-stream-content').innerHTML = preset.gpt.html;
      document.getElementById('gpt-ttft').innerText = preset.gpt.ttft;
      document.getElementById('gpt-tps').innerText = preset.gpt.tps;
      document.getElementById('gpt-cost').innerText = preset.gpt.cost;
    }

    export function executeDualStream() {
      const sonnetStatus = document.getElementById('sonnet-status');
      const gptStatus = document.getElementById('gpt-status');
      sonnetStatus.innerText = 'Streaming (chunk 12/84)...';
      sonnetStatus.className = 'px-2 py-0.5 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse';
      gptStatus.innerText = 'Streaming (chunk 18/84)...';
      gptStatus.className = 'px-2 py-0.5 rounded-full text-xs font-mono bg-electric-link/20 text-electric-link border border-electric-link/30 animate-pulse';

      setTimeout(() => {
        sonnetStatus.innerText = 'Stream Finished';
        sonnetStatus.className = 'px-2 py-0.5 rounded-full text-xs font-mono bg-graphite border border-steel text-slate';
        gptStatus.innerText = 'Stream Finished';
        gptStatus.className = 'px-2 py-0.5 rounded-full text-xs font-mono bg-graphite border border-steel text-slate';
      }, 1000);
    }

    export function clearStream() {
      document.getElementById('workbench-input').value = '';
      document.getElementById('sonnet-stream-content').innerHTML = '<span class="text-ash italic">Waiting for prompt submission...</span>';
      document.getElementById('gpt-stream-content').innerHTML = '<span class="text-ash italic">Waiting for prompt submission...</span>';
    }

    export function copyStreamOutput(model) {
      const text = model === 'sonnet' ? document.getElementById('sonnet-stream-content').innerText : document.getElementById('gpt-stream-content').innerText;
      navigator.clipboard.writeText(text);
      alert('Copied ' + model + ' stream output payload to clipboard.');
    }

    export function deployToProxy(modelId) {
      alert('Model [' + modelId + '] added to your default AI Hub routing proxy configuration.');
    }

    // Dynamic Matrix by Use Case switcher
    const matrixData = {
      code: [
        { name: "Claude 3.5 Sonnet", provider: "anthropic/claude-3-5-sonnet", tag: "Primary Leader", tagClass: "bg-tertiary-container/20 text-optical-yellow border-tertiary-container/30", price: "$3.00 / 1M In", metricName: "HumanEval Python", metricVal: "93.7%", width1: "93.7%", speed: "84 tps", width2: "82%", context: "200K tokens", width3: "60%" },
        { name: "GPT-4o", provider: "openai/gpt-4o", tag: "Omni Engine", tagClass: "bg-primary-container/20 text-electric-link border-primary-container/30", price: "$2.50 / 1M In", metricName: "HumanEval Python", metricVal: "90.2%", width1: "90.2%", speed: "104 tps", width2: "95%", context: "128K tokens", width3: "45%" },
        { name: "Llama 3.3 70B", provider: "meta/llama-3.3-70b-instruct", tag: "Open Weights Edge", tagClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", price: "$0.35 / 1M In", metricName: "HumanEval Python", metricVal: "85.4%", width1: "85.4%", speed: "128 tps", width2: "100%", context: "128K tokens", width3: "45%" }
      ],
      reasoning: [
        { name: "DeepSeek R1", provider: "deepseek/deepseek-r1", tag: "Reasoning Leader", tagClass: "bg-copper-new/20 text-copper-new border-copper-new/30", price: "$0.55 / 1M In", metricName: "AIME 2024 Math", metricVal: "79.8%", width1: "79.8%", speed: "62 tps", width2: "60%", context: "64K tokens", width3: "30%" },
        { name: "o1-preview", provider: "openai/o1-preview", tag: "CoT Specialist", tagClass: "bg-primary-container/20 text-electric-link border-primary-container/30", price: "$15.00 / 1M In", metricName: "AIME 2024 Math", metricVal: "83.3%", width1: "83.3%", speed: "42 tps", width2: "45%", context: "128K tokens", width3: "45%" },
        { name: "Claude 3.5 Sonnet", provider: "anthropic/claude-3-5-sonnet", tag: "Analytical Hybrid", tagClass: "bg-tertiary-container/20 text-optical-yellow border-tertiary-container/30", price: "$3.00 / 1M In", metricName: "AIME 2024 Math", metricVal: "78.0%", width1: "78.0%", speed: "84 tps", width2: "82%", context: "200K tokens", width3: "60%" }
      ],
      search: [
        { name: "Gemini 1.5 Pro", provider: "google/gemini-1.5-pro", tag: "2M Context King", tagClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", price: "$1.25 / 1M In", metricName: "Needle in Haystack", metricVal: "99.9%", width1: "99.9%", speed: "92 tps", width2: "88%", context: "2,048K tokens", width3: "100%" },
        { name: "Claude 3.5 Sonnet", provider: "anthropic/claude-3-5-sonnet", tag: "High Precision", tagClass: "bg-tertiary-container/20 text-optical-yellow border-tertiary-container/30", price: "$3.00 / 1M In", metricName: "Needle in Haystack", metricVal: "99.6%", width1: "99.6%", speed: "84 tps", width2: "82%", context: "200K tokens", width3: "60%" },
        { name: "Llama 3.1 405B", provider: "meta/llama-3.1-405b", tag: "Massive Open", tagClass: "bg-primary-container/20 text-electric-link border-primary-container/30", price: "$2.00 / 1M In", metricName: "Needle in Haystack", metricVal: "98.1%", width1: "98.1%", speed: "55 tps", width2: "55%", context: "128K tokens", width3: "45%" }
      ],
      vision: [
        { name: "GPT-4o Vision", provider: "openai/gpt-4o", tag: "Multimodal #1", tagClass: "bg-primary-container/20 text-electric-link border-primary-container/30", price: "$2.50 / 1M In", metricName: "MMMU Multi-discipline", metricVal: "69.1%", width1: "69.1%", speed: "104 tps", width2: "95%", context: "128K tokens", width3: "45%" },
        { name: "Claude 3.5 Sonnet", provider: "anthropic/claude-3-5-sonnet", tag: "Diagram & Chart", tagClass: "bg-tertiary-container/20 text-optical-yellow border-tertiary-container/30", price: "$3.00 / 1M In", metricName: "MMMU Multi-discipline", metricVal: "68.3%", width1: "68.3%", speed: "84 tps", width2: "82%", context: "200K tokens", width3: "60%" },
        { name: "Gemini 1.5 Flash", provider: "google/gemini-1.5-flash", tag: "Ultra Low Cost", tagClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", price: "$0.075 / 1M In", metricName: "MMMU Multi-discipline", metricVal: "56.8%", width1: "56.8%", speed: "160 tps", width2: "100%", context: "1,024K tokens", width3: "80%" }
      ]
    };

    export function switchMatrixTab(cat) {
      ['code', 'reasoning', 'search', 'vision'].forEach(c => {
        const btn = document.getElementById('tab-' + c);
        if (c === cat) {
          btn.setAttribute('aria-selected', 'true');
          btn.tabIndex = 0;
          btn.className = 'matrix-tab px-4 py-1.5 rounded-full text-porcelain bg-steel font-label-sm-strong text-xs whitespace-nowrap transition-all';
        } else {
          btn.tabIndex = -1;
          btn.setAttribute('aria-selected', 'false');
          btn.className = 'matrix-tab px-4 py-1.5 rounded-full text-ash hover:text-porcelain font-label-sm text-xs whitespace-nowrap transition-all';
        }
      });

      const cards = matrixData[cat];
      const container = document.getElementById('matrix-cards-container');
      container.setAttribute('aria-labelledby', 'tab-' + cat);
      container.innerHTML = cards.map((c, i) => `
        <div class="rounded-[28px] bg-carbon border border-steel p-6 flex flex-col justify-between hover:border-slate transition-all group">
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="px-2.5 py-0.5 rounded-full ${c.tagClass} font-mono text-xs">${c.tag}</span>
              <span class="font-mono text-xs text-ash">${c.price}</span>
            </div>
            <h3 class="font-title-md text-title-md text-porcelain mb-1">${c.name}</h3>
            <p class="font-mono text-xs text-slate mb-4">${c.provider}</p>
            
            <div class="space-y-3 p-4 rounded-2xl bg-graphite border border-steel mb-6">
              <div>
                <div class="flex justify-between text-xs font-mono mb-1">
                  <span class="text-ash">${c.metricName}</span>
                  <span class="text-porcelain font-bold">${c.metricVal}</span>
                </div>
                <div class="w-full h-1.5 bg-steel rounded-full overflow-hidden">
                  <div class="h-full bg-electric-link rounded-full" style="width: ${c.width1}"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs font-mono mb-1">
                  <span class="text-ash">Throughput Speed</span>
                  <span class="text-porcelain font-bold">${c.speed}</span>
                </div>
                <div class="w-full h-1.5 bg-steel rounded-full overflow-hidden">
                  <div class="h-full bg-emerald-400 rounded-full" style="width: ${c.width2}"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-xs font-mono mb-1">
                  <span class="text-ash">Context Window</span>
                  <span class="text-porcelain font-bold">${c.context}</span>
                </div>
                <div class="w-full h-1.5 bg-steel rounded-full overflow-hidden">
                  <div class="h-full bg-tertiary rounded-full" style="width: ${c.width3}"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2 pt-4 border-t border-steel/60">
            <button class="w-full py-2.5 rounded-full ${i === 0 ? 'bg-primary-container hover:bg-electric-link text-white' : 'bg-graphite hover:bg-steel border border-steel text-porcelain'} font-body-md-strong text-xs transition-all flex items-center justify-center gap-1.5" onclick="deployToProxy('${c.provider}')">
              <span class="material-symbols-outlined text-[15px]">rocket_launch</span> Deploy to Proxy
            </button>
          </div>
        </div>
      `).join('');
    }
  