<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// --- Navigation ---
function logout()        { router.push('/') }
function acceptMission() { router.push('/arena') }

// --- Mock Data ---
const operative = {
  name:       'Zydan',
  rank:       'Script Kiddie',
  vibeScore:  420,
  missions:   7,
  successRate: '71%',
}

const missions = [
  {
    id: 1,
    code: '#001',
    title: 'Fix the Broken Loop',
    description: 'A legacy for-loop corrupts the dataset on every third iteration. Trace the off-by-one error and revive the pipeline.',
    difficulty: 'EASY',
    xp: 150,
    language: 'JS',
  },
  {
    id: 2,
    code: '#002',
    title: 'Decrypt the Legacy Token',
    description: 'A base64-encoded JWT with a flipped signing algorithm is blocking the auth gateway. Reverse-engineer and patch it.',
    difficulty: 'HARD',
    xp: 500,
    language: 'PY',
  },
  {
    id: 3,
    code: '#003',
    title: 'Sort From The Ashes',
    description: 'The production sort function was overwritten with dead code. Reconstruct an O(n log n) solution from the unit test hints.',
    difficulty: 'MEDIUM',
    xp: 250,
    language: 'JS',
  },
  {
    id: 4,
    code: '#004',
    title: 'Null Pointer Uprising',
    description: 'A cascading null dereference is crashing the legacy C module. Add safe guards and restore runtime stability.',
    difficulty: 'MEDIUM',
    xp: 300,
    language: 'C',
  },
  {
    id: 5,
    code: '#005',
    title: 'Race Condition Requiem',
    description: 'Two async threads mutate shared state without a mutex. Identify the critical section and implement a lock-free fix.',
    difficulty: 'HARD',
    xp: 600,
    language: 'GO',
  },
  {
    id: 6,
    code: '#006',
    title: 'The Infinite Recursion',
    description: 'A recursive function has no base case. Every call leads to a stack overflow. Add the termination condition.',
    difficulty: 'EASY',
    xp: 100,
    language: 'PY',
  },
]

const difficultyConfig = {
  EASY:   { color: '#39ff14', bg: '#001a00' },
  MEDIUM: { color: '#ffe600', bg: '#1a1500' },
  HARD:   { color: '#ff5555', bg: '#1a0000' },
}
</script>

<template>
  <div
    class="min-h-screen flex flex-col"
    style="background-color:#0f172a; font-family:'JetBrains Mono',monospace;"
  >

    <!-- ══════════════════════════════════════════════
         NAVBAR
    ══════════════════════════════════════════════ -->
    <header
      id="dashboard-navbar"
      class="flex items-center justify-between px-6 py-4 border-b-4"
      style="border-color:#39ff14; background-color:#0d0d0d; box-shadow: 0 4px 0 #39ff14;"
    >
      <!-- Logo + Title -->
      <div class="flex items-center gap-4">
        <div
          class="flex-shrink-0 w-10 h-10 border-2 flex items-center justify-center font-bold"
          style="border-color:#ff00ff; color:#ff00ff; background:#1a0020; box-shadow:3px 3px 0 #ff00ff; font-family:'Press Start 2P',monospace; font-size:0.6rem;"
        >LR</div>
        <div>
          <h1
            style="font-family:'Press Start 2P',monospace; color:#39ff14; letter-spacing:0.05em; font-size:0.7rem;"
          >AGENT DASHBOARD</h1>
          <p style="color:#475569; font-size:0.7rem; margin-top:2px;">THE LEGACY REVIVER // MISSION HUB</p>
        </div>
      </div>

      <!-- Logout -->
      <button
        id="logout-btn"
        @click="logout"
        class="border-2 px-5 py-2 cursor-pointer transition-all duration-100"
        style="border-color:#ff5555; background:#1a0000; color:#ff5555; font-family:'Press Start 2P',monospace; font-size:0.55rem; letter-spacing:0.1em; box-shadow:4px 4px 0 #ff5555;"
        @mouseenter="e => { e.currentTarget.style.transform='translate(2px,2px)'; e.currentTarget.style.boxShadow='2px 2px 0 #ff5555'; e.currentTarget.style.background='#ff5555'; e.currentTarget.style.color='#0d0d0d'; }"
        @mouseleave="e => { e.currentTarget.style.transform='translate(0,0)';   e.currentTarget.style.boxShadow='4px 4px 0 #ff5555'; e.currentTarget.style.background='#1a0000'; e.currentTarget.style.color='#ff5555'; }"
      >
        LOGOUT
      </button>
    </header>

    <!-- ══════════════════════════════════════════════
         USER STATS BAR
    ══════════════════════════════════════════════ -->
    <div
      id="stats-bar"
      class="flex items-center flex-wrap gap-0 border-b-2"
      style="border-color:#1e2d1e; background-color:#0d0d0d;"
    >
      <!-- Operative -->
      <div class="flex items-center gap-3 px-6 py-3 border-r-2" style="border-color:#1e2d1e;">
        <span style="color:#475569; font-size:0.72rem; letter-spacing:0.08em;">OPERATIVE</span>
        <span style="color:#39ff14; font-size:0.72rem; font-weight:700; letter-spacing:0.05em;">{{ operative.name }}</span>
      </div>

      <!-- Rank -->
      <div class="flex items-center gap-3 px-6 py-3 border-r-2" style="border-color:#1e2d1e;">
        <span style="color:#475569; font-size:0.72rem; letter-spacing:0.08em;">RANK</span>
        <span
          class="px-2 py-0.5 border"
          style="border-color:#ff00ff; color:#ff00ff; background:#1a001a; font-size:0.7rem; letter-spacing:0.05em; font-family:'VT323',monospace; font-size:1rem;"
        >{{ operative.rank }}</span>
      </div>

      <!-- Total Vibe Score -->
      <div class="flex items-center gap-3 px-6 py-3 border-r-2" style="border-color:#1e2d1e;">
        <span style="color:#475569; font-size:0.72rem; letter-spacing:0.08em;">TOTAL VIBE SCORE</span>
        <span style="color:#ffe600; font-size:0.72rem; font-weight:700;">{{ operative.vibeScore }}</span>
      </div>

      <!-- Missions Cleared -->
      <div class="flex items-center gap-3 px-6 py-3 border-r-2" style="border-color:#1e2d1e;">
        <span style="color:#475569; font-size:0.72rem; letter-spacing:0.08em;">MISSIONS CLEARED</span>
        <span style="color:#f8fafc; font-size:0.72rem; font-weight:700;">{{ operative.missions }}</span>
      </div>

      <!-- Success Rate -->
      <div class="flex items-center gap-3 px-6 py-3">
        <span style="color:#475569; font-size:0.72rem; letter-spacing:0.08em;">SUCCESS RATE</span>
        <span style="color:#39ff14; font-size:0.72rem; font-weight:700;">{{ operative.successRate }}</span>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════
         MAIN CONTENT
    ══════════════════════════════════════════════ -->
    <main class="flex-1 p-6 flex flex-col gap-6">

      <!-- Section Header -->
      <div class="flex items-center justify-between">
        <div>
          <h2
            style="font-family:'Press Start 2P',monospace; color:#f8fafc; font-size:0.7rem; letter-spacing:0.06em;"
          >AVAILABLE MISSIONS</h2>
          <p style="color:#475569; font-size:0.75rem; margin-top:6px;">{{ missions.length }} targets in the breach queue.</p>
        </div>
        <!-- Filter strip (decorative) -->
        <div class="hidden sm:flex items-center gap-3">
          <span class="px-3 py-1 border text-xs" style="border-color:#39ff14; color:#39ff14; font-family:'VT323',monospace; font-size:1rem;">ALL</span>
          <span class="px-3 py-1 border text-xs" style="border-color:#334155; color:#475569; font-family:'VT323',monospace; font-size:1rem;">EASY</span>
          <span class="px-3 py-1 border text-xs" style="border-color:#334155; color:#475569; font-family:'VT323',monospace; font-size:1rem;">MEDIUM</span>
          <span class="px-3 py-1 border text-xs" style="border-color:#334155; color:#475569; font-family:'VT323',monospace; font-size:1rem;">HARD</span>
        </div>
      </div>

      <!-- ── CHALLENGE GRID ── -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="mission in missions"
          :key="mission.id"
          class="flex flex-col border-2"
          :style="`border-color:${difficultyConfig[mission.difficulty].color}; box-shadow:6px 6px 0 ${difficultyConfig[mission.difficulty].color}; background:#0d0d0d;`"
        >

          <!-- Card Header -->
          <div
            class="flex items-center justify-between px-4 py-2 border-b-2"
            :style="`border-color:${difficultyConfig[mission.difficulty].color}; background:${difficultyConfig[mission.difficulty].bg};`"
          >
            <span style="color:#475569; font-size:0.7rem; letter-spacing:0.08em;">{{ mission.code }}</span>
            <div class="flex items-center gap-2">
              <!-- Language tag -->
              <span
                class="px-2 py-0.5 border text-xs"
                style="border-color:#334155; color:#94a3b8; font-family:'VT323',monospace; font-size:0.95rem;"
              >{{ mission.language }}</span>
              <!-- Difficulty badge -->
              <span
                class="px-2 py-0.5 border text-xs font-bold"
                :style="`border-color:${difficultyConfig[mission.difficulty].color}; color:${difficultyConfig[mission.difficulty].color}; background:${difficultyConfig[mission.difficulty].bg}; font-family:'VT323',monospace; font-size:0.95rem;`"
              >{{ mission.difficulty }}</span>
            </div>
          </div>

          <!-- Card Body -->
          <div class="flex flex-col flex-1 p-4 gap-3">
            <h3
              style="font-family:'Press Start 2P',monospace; color:#f8fafc; font-size:0.6rem; line-height:1.7; letter-spacing:0.04em;"
            >{{ mission.title }}</h3>
            <p style="color:#94a3b8; font-size:0.75rem; line-height:1.6; flex:1;">
              {{ mission.description }}
            </p>

            <!-- XP reward -->
            <div class="flex items-center gap-2">
              <span style="color:#475569; font-size:0.7rem;">REWARD:</span>
              <span style="color:#ffe600; font-size:0.7rem; font-weight:700;">+{{ mission.xp }} XP</span>
            </div>
          </div>

          <!-- Card Footer: CTA -->
          <div class="px-4 pb-4">
            <button
              :id="`accept-mission-${mission.id}`"
              @click="acceptMission"
              class="w-full border-2 py-3 cursor-pointer transition-all duration-100"
              :style="`border-color:${difficultyConfig[mission.difficulty].color}; background:#0d0d0d; color:${difficultyConfig[mission.difficulty].color}; font-family:'Press Start 2P',monospace; font-size:0.5rem; letter-spacing:0.1em; box-shadow:4px 4px 0 ${difficultyConfig[mission.difficulty].color};`"
              @mouseenter="e => {
                const c = difficultyConfig[mission.difficulty].color;
                e.currentTarget.style.transform='translate(2px,2px)';
                e.currentTarget.style.boxShadow=`2px 2px 0 ${c}`;
                e.currentTarget.style.background=c;
                e.currentTarget.style.color='#0d0d0d';
              }"
              @mouseleave="e => {
                const c = difficultyConfig[mission.difficulty].color;
                e.currentTarget.style.transform='translate(0,0)';
                e.currentTarget.style.boxShadow=`4px 4px 0 ${c}`;
                e.currentTarget.style.background='#0d0d0d';
                e.currentTarget.style.color=c;
              }"
            >
              ACCEPT_MISSION
            </button>
          </div>
        </article>
      </div>
    </main>

    <!-- ══════════════════════════════════════════════
         FOOTER
    ══════════════════════════════════════════════ -->
    <footer
      class="border-t-2 px-6 py-3 flex items-center justify-between text-xs"
      style="border-color:#1e2d1e; background:#0d0d0d; color:#475569; font-family:'JetBrains Mono',monospace;"
    >
      <span>THE LEGACY REVIVER <span style="color:#39ff14;">v2.4.1</span></span>
      <span>CTF PLATFORM © 2026</span>
      <span style="color:#ff00ff;">SESSION: <span style="color:#f8fafc;">{{ operative.name.toUpperCase() }}</span></span>
    </footer>

  </div>
</template>
