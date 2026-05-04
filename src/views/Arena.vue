<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// --- Reactive State ---
const currentTime  = ref('')
const missionStatus = ref('ACTIVE')
const vibeScore    = ref(0)
const isSubmitting = ref(false)
const submitDone   = ref(false)

const codeValue = ref(`// === MISSION: REVIVE THE LEGACY FUNCTION ===
// STATUS: CORRUPTED — Fix the broken logic below.
// VIBE SCORE starts at 0. AI will evaluate your fix.

function legacySort(arr) {
  // BUG: This is not a valid sort algorithm.
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i] * 0; // ← Something is very wrong here
  }
  return arr;
}

// Test case:
const data = [42, 7, 99, 1, 23];
console.log(legacySort(data));
// Expected: [1, 7, 23, 42, 99]
`)

const terminalLogs = ref([
  { type: 'system', text: 'SYSTEM BOOT... OK' },
  { type: 'system', text: 'THE LEGACY REVIVER v2.4.1 — INITIALIZED' },
  { type: 'divider', text: '─────────────────────────────────────' },
  { type: 'info',   text: '> MISSION LOADED: "Sort From The Ashes"' },
  { type: 'info',   text: '> DIFFICULTY: [████░░░░] MEDIUM' },
  { type: 'warn',   text: '> WARNING: Legacy code detected. 3 bugs found.' },
  { type: 'divider', text: '─────────────────────────────────────' },
  { type: 'muted',  text: '> Awaiting submission...' },
  { type: 'muted',  text: '> AI evaluator: ONLINE' },
])

// --- Clock ---
let clockInterval = null
function updateClock() {
  const now = new Date()
  const h = String(now.getHours()).padStart(2, '0')
  const m = String(now.getMinutes()).padStart(2, '0')
  const s = String(now.getSeconds()).padStart(2, '0')
  currentTime.value = `${h}:${m}:${s}`
}

onMounted(()  => { updateClock(); clockInterval = setInterval(updateClock, 1000) })
onUnmounted(() => clearInterval(clockInterval))

// --- Submit Logic ---
async function handleSubmit() {
  if (isSubmitting.value) return
  isSubmitting.value = true
  submitDone.value   = false
  vibeScore.value    = 0

  terminalLogs.value.push(
    { type: 'divider', text: '─────────────────────────────────────' },
    { type: 'system',  text: '> SUBMIT_CODE received. Parsing AST...' },
  )

  const steps = [
    { delay: 600,  type: 'info',  text: '> Linting: 0 errors, 1 warning.' },
    { delay: 1200, type: 'info',  text: '> Running test suite... [3/3 passed]' },
    { delay: 1800, type: 'warn',  text: '> Complexity score: O(n log n) — Acceptable.' },
    { delay: 2400, type: 'info',  text: '> AI semantic analysis: COMPLETE.' },
    { delay: 3000, type: 'score', text: '> VIBE SCORE: 87 / 100' },
    { delay: 3400, type: 'good',  text: '> VERDICT: LEGACY REVIVED ✓ Mission Complete.' },
  ]

  for (const step of steps) {
    await new Promise(r => setTimeout(r, step.delay))
    terminalLogs.value.push({ type: step.type, text: step.text })
    if (step.type === 'score') {
      let v = 0
      const target = 87
      const tick = setInterval(() => {
        v = Math.min(v + 3, target)
        vibeScore.value = v
        if (v >= target) clearInterval(tick)
      }, 30)
    }
  }

  isSubmitting.value  = false
  submitDone.value    = true
  missionStatus.value = 'COMPLETE'
}
</script>

<template>
  <div class="min-h-screen flex flex-col" style="background-color:#0f172a; font-family:'JetBrains Mono',monospace;">

    <!-- NAVBAR -->
    <header
      id="navbar"
      class="flex items-center justify-between px-6 py-4 border-b-4"
      style="border-color:#39ff14; background-color:#0d0d0d; box-shadow: 0 4px 0 #39ff14;"
    >
      <div class="flex items-center gap-4">
        <div
          class="flex-shrink-0 w-10 h-10 border-2 flex items-center justify-center text-base font-bold"
          style="border-color:#ff00ff; color:#ff00ff; background:#1a0020; box-shadow:3px 3px 0 #ff00ff; font-family:'Press Start 2P',monospace;"
        ><span>LR</span></div>
        <h1
          class="text-xs sm:text-sm leading-tight"
          style="font-family:'Press Start 2P',monospace; color:#39ff14; letter-spacing:0.05em;"
        >THE LEGACY<br class="sm:hidden" /><span style="color:#ff00ff;"> REVIVER</span></h1>
      </div>

      <div class="flex items-center gap-6">
        <div
          class="hidden sm:flex items-center gap-2 border-2 px-3 py-1"
          :style="`border-color:${missionStatus==='COMPLETE'?'#39ff14':'#ff5555'}; box-shadow:3px 3px 0 ${missionStatus==='COMPLETE'?'#39ff14':'#ff5555'};`"
        >
          <span class="w-2 h-2 animate-pulse inline-block" :style="`background:${missionStatus==='COMPLETE'?'#39ff14':'#ff5555'};`"></span>
          <span style="font-family:'VT323',monospace; font-size:1.1rem; letter-spacing:0.1em;" :style="`color:${missionStatus==='COMPLETE'?'#39ff14':'#ff5555'};`">
            MISSION: {{ missionStatus }}
          </span>
        </div>
        <div class="border-2 px-3 py-1" style="border-color:#00ffff; box-shadow:3px 3px 0 #00ffff; color:#00ffff; font-family:'VT323',monospace; font-size:1.4rem; letter-spacing:0.15em;">
          {{ currentTime }}
        </div>
      </div>
    </header>

    <!-- MAIN -->
    <main class="flex-1 flex flex-col p-6" style="gap:1.5rem;">

      <!-- Mission Banner -->
      <div class="border-2 px-5 py-3 flex items-center justify-between flex-wrap gap-3"
        style="border-color:#ffe600; background-color:#1a1500; box-shadow:5px 5px 0 #ffe600;">
        <div>
          <p class="text-xs mb-1" style="font-family:'Press Start 2P',monospace; color:#ffe600;">MISSION #042</p>
          <p style="color:#f8fafc; font-size:1rem;">"Sort From The Ashes" — Revive the corrupted sort function.</p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs px-2 py-1 border" style="border-color:#ff5555; color:#ff5555; font-family:'VT323',monospace; font-size:1rem;">DIFFICULTY: MEDIUM</span>
          <span class="text-xs px-2 py-1 border" style="border-color:#ffe600; color:#ffe600; font-family:'VT323',monospace; font-size:1rem;">XP: +250</span>
        </div>
      </div>

      <!-- Editor + Terminal -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">

        <!-- LEFT: CODE EDITOR -->
        <section id="code-editor-panel" class="flex flex-col border-2" style="border-color:#39ff14; box-shadow:6px 6px 0 #39ff14; min-height:480px;">
          <div class="flex items-center justify-between px-4 py-2 border-b-2" style="border-color:#39ff14; background-color:#0d1a0d;">
            <div class="flex items-center gap-2">
              <button class="w-4 h-4 border cursor-pointer" style="border-color:#ff5555; background:#ff5555;" title="Close"></button>
              <button class="w-4 h-4 border cursor-pointer" style="border-color:#ffe600; background:#ffe600;" title="Minimize"></button>
              <button class="w-4 h-4 border cursor-pointer" style="border-color:#39ff14; background:#39ff14;" title="Maximize"></button>
            </div>
            <span class="text-xs" style="color:#39ff14; font-family:'VT323',monospace; font-size:1.05rem; letter-spacing:0.1em;">legacy_sort.js — THE WORKSPACE</span>
            <span class="text-xs" style="color:#475569;">{{ codeValue.split('\n').length }} LINES</span>
          </div>

          <div class="flex flex-1 overflow-hidden" style="background-color:#0d0d0d;">
            <div class="flex flex-col pt-4 px-3 text-right select-none" style="color:#39ff1440; font-family:'JetBrains Mono',monospace; font-size:0.75rem; min-width:2.5rem; border-right:1px solid #1e2d1e; line-height:1.6;">
              <span v-for="n in codeValue.split('\n').length" :key="n">{{ n }}</span>
            </div>
            <textarea
              id="code-textarea"
              v-model="codeValue"
              spellcheck="false"
              class="flex-1 p-4 resize-none outline-none border-none w-full"
              style="background:transparent; color:#f8fafc; font-family:'JetBrains Mono',monospace; font-size:0.82rem; line-height:1.6; caret-color:#39ff14;"
            ></textarea>
          </div>

          <div class="flex items-center gap-4 px-4 py-1 border-t-2 text-xs" style="border-color:#1e3a1e; background:#0d1a0d; color:#475569; font-family:'JetBrains Mono',monospace;">
            <span style="color:#39ff14;">JS</span>
            <span>UTF-8</span>
            <span class="ml-auto" style="color:#39ff14;">{{ isSubmitting ? '[ EVALUATING... ]' : submitDone ? '[ REVIVED ✓ ]' : '[ READY ]' }}</span>
          </div>
        </section>

        <!-- RIGHT: TERMINAL -->
        <section id="terminal-panel" class="flex flex-col border-2" style="border-color:#ff00ff; box-shadow:6px 6px 0 #ff00ff; min-height:480px;">
          <div class="flex items-center justify-between px-4 py-2 border-b-2" style="border-color:#ff00ff; background-color:#1a001a;">
            <span class="text-xs" style="color:#ff00ff; font-family:'Press Start 2P',monospace; font-size:0.6rem; letter-spacing:0.08em;">AI EVALUATOR // OUTPUT</span>
            <div class="border px-3 py-0.5" style="border-color:#ff00ff; box-shadow:3px 3px 0 #ff00ff;">
              <span style="font-family:'VT323',monospace; font-size:1.2rem; color:#ff00ff; letter-spacing:0.1em;">
                VIBE SCORE: <span :style="`color:${vibeScore >= 80 ? '#39ff14' : vibeScore >= 50 ? '#ffe600' : '#ff5555'};`">{{ vibeScore }}</span>/100
              </span>
            </div>
          </div>

          <div class="px-4 py-2 border-b" style="border-color:#2d002d; background:#120012;">
            <div class="flex justify-between text-xs mb-1" style="color:#475569; font-family:'JetBrains Mono',monospace;">
              <span>VIBE METER</span>
              <span :style="`color:${vibeScore >= 80 ? '#39ff14' : vibeScore >= 50 ? '#ffe600' : '#ff5555'};`">{{ vibeScore }}%</span>
            </div>
            <div class="w-full h-3 border" style="border-color:#2d002d; background:#0d0d0d;">
              <div class="h-full transition-all"
                :style="`width:${vibeScore}%; background:${vibeScore >= 80 ? '#39ff14' : vibeScore >= 50 ? '#ffe600' : '#ff5555'}; box-shadow: 0 0 8px ${vibeScore >= 80 ? '#39ff14' : '#ff5555'};`"
              ></div>
            </div>
          </div>

          <div id="terminal-log" class="flex-1 overflow-y-auto p-4 flex flex-col gap-1"
            style="background:#0d0d0d; font-family:'JetBrains Mono',monospace; font-size:0.78rem; line-height:1.7;">
            <template v-for="(log, i) in terminalLogs" :key="i">
              <p v-if="log.type === 'divider'" style="color:#1e3a2e; user-select:none;">{{ log.text }}</p>
              <p v-else-if="log.type === 'system'" style="color:#39ff14;">{{ log.text }}</p>
              <p v-else-if="log.type === 'info'"   style="color:#f8fafc;">{{ log.text }}</p>
              <p v-else-if="log.type === 'warn'"   style="color:#ffe600;">{{ log.text }}</p>
              <p v-else-if="log.type === 'good'"   style="color:#39ff14; font-weight:700;">{{ log.text }}</p>
              <p v-else-if="log.type === 'score'"  style="color:#ff00ff; font-weight:700; font-size:0.9rem;">{{ log.text }}</p>
              <p v-else                             style="color:#475569;">{{ log.text }}</p>
            </template>
            <span class="inline-block w-2.5 h-4 align-middle animate-pulse" style="background:#39ff14;"></span>
          </div>
        </section>
      </div>

      <!-- SUBMIT CTA -->
      <div class="flex justify-center pt-2 pb-4">
        <button
          id="submit-btn"
          @click="handleSubmit"
          :disabled="isSubmitting"
          class="group relative border-4 px-10 py-5 cursor-pointer transition-all duration-150 select-none w-full max-w-xl"
          :style="`border-color:${submitDone?'#39ff14':'#ff00ff'}; background:${isSubmitting?'#1a001a':submitDone?'#001a00':'#1a001a'}; box-shadow:8px 8px 0 ${submitDone?'#39ff14':'#ff00ff'};`"
          @mouseenter="e => { if(!isSubmitting){e.currentTarget.style.transform='translate(4px,4px)';e.currentTarget.style.boxShadow=`4px 4px 0 ${submitDone?'#39ff14':'#ff00ff'}`;e.currentTarget.style.background=submitDone?'#39ff14':'#ff00ff';e.currentTarget.querySelector('.btn-label').style.color='#0d0d0d';} }"
          @mouseleave="e => { e.currentTarget.style.transform='translate(0,0)';e.currentTarget.style.boxShadow=`8px 8px 0 ${submitDone?'#39ff14':'#ff00ff'}`;e.currentTarget.style.background=submitDone?'#001a00':'#1a001a';e.currentTarget.querySelector('.btn-label').style.color=submitDone?'#39ff14':'#ff00ff'; }"
        >
          <span class="btn-label block text-center transition-colors"
            :style="`font-family:'Press Start 2P',monospace; font-size:clamp(0.65rem,2vw,0.9rem); letter-spacing:0.1em; color:${submitDone?'#39ff14':'#ff00ff'};`">
            <template v-if="isSubmitting">[ EVALUATING... ]</template>
            <template v-else-if="submitDone">✓ LEGACY_REVIVED</template>
            <template v-else>SUBMIT_CODE</template>
          </span>
          <span class="block text-center mt-2" style="font-family:'JetBrains Mono',monospace; font-size:0.7rem; color:#475569;">
            {{ isSubmitting ? 'AI is analyzing your fix...' : 'Execute AI Evaluation Pipeline' }}
          </span>
        </button>
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="border-t-2 px-6 py-3 flex items-center justify-between text-xs" style="border-color:#1e2d1e; background:#0d0d0d; color:#475569; font-family:'JetBrains Mono',monospace;">
      <span>THE LEGACY REVIVER <span style="color:#39ff14;">v2.4.1</span></span>
      <span>CTF PLATFORM © 2026</span>
      <span style="color:#ff00ff;">SESSION: <span style="color:#f8fafc;">OPERATOR</span></span>
    </footer>
  </div>
</template>
