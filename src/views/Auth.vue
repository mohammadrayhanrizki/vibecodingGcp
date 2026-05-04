<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// --- Mode Toggle ---
const isLoginView = ref(true)

// --- Form Refs ---
const email    = ref('')
const username = ref('')
const password = ref('')

// --- State ---
const isLoading     = ref(false)
const errorMessage  = ref('')
const successMessage = ref('')

// --- Computed label helpers ---
const headingLabel = computed(() => isLoginView.value ? 'ACCESS_TERMINAL' : 'CREATE_OPERATIVE')
const ctaLabel     = computed(() => isLoginView.value ? '> LOGIN'         : '> REGISTER')
const togglePrompt = computed(() =>
  isLoginView.value
    ? 'No credentials? ↗ Create Operative'
    : 'Already enlisted? ↗ Access Terminal'
)

// --- Toggle mode ---
function toggleMode() {
  isLoginView.value    = !isLoginView.value
  errorMessage.value   = ''
  successMessage.value = ''
  email.value    = ''
  username.value = ''
  password.value = ''
}

// --- Submit ---
async function submitAuth(e) {
  e.preventDefault()
  if (isLoading.value) return

  errorMessage.value   = ''
  successMessage.value = ''

  if (!email.value || !password.value) {
    errorMessage.value = 'ERROR_401: Email and password fields are required.'
    return
  }
  if (!isLoginView.value && !username.value) {
    errorMessage.value = 'ERROR_400: Operative handle (username) is required.'
    return
  }

  isLoading.value = true

  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email.value === 'fail@test.com') reject(new Error('CONN_REFUSED'))
        else resolve()
      }, 2000)
    })

    successMessage.value = isLoginView.value
      ? 'AUTH_OK: Access granted. Redirecting to mission hub...'
      : 'REGISTERED: Operative profile created. You may now access the terminal.'

    email.value    = ''
    username.value = ''
    password.value = ''

    // Navigate to arena after short delay so user sees success message
    setTimeout(() => router.push('/arena'), 800)
  } catch {
    errorMessage.value = 'ERROR_500: Server rejected the handshake. Try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative"
    style="background-color:#121212; font-family:'JetBrains Mono',monospace;"
  >
    <!-- Grid background texture -->
    <div
      aria-hidden="true"
      class="pointer-events-none fixed inset-0"
      style="background-image:linear-gradient(rgba(57,255,20,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(57,255,20,0.04) 1px,transparent 1px);background-size:36px 36px;z-index:0;"
    ></div>

    <!-- CARD -->
    <div
      class="relative z-10 w-full max-w-md border-4 flex flex-col"
      style="border-color:#39ff14; background-color:#0d0d0d; box-shadow:8px 8px 0 #39ff14;"
    >
      <!-- Card Header -->
      <div class="border-b-4 px-6 py-5" style="border-color:#39ff14; background-color:#0a180a;">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-9 h-9 border-2 flex items-center justify-center text-xs font-bold flex-shrink-0"
            style="border-color:#ff00ff; color:#ff00ff; background:#1a0020; box-shadow:3px 3px 0 #ff00ff; font-family:'Press Start 2P',monospace;">LR</div>
          <span class="text-xs leading-tight" style="font-family:'Press Start 2P',monospace; color:#39ff14; letter-spacing:0.04em;">
            THE LEGACY<span style="color:#ff00ff;"> REVIVER</span>
          </span>
        </div>
        <h1 id="auth-heading" class="text-sm leading-snug"
          style="font-family:'Press Start 2P',monospace; color:#f8fafc; letter-spacing:0.06em;">
          {{ headingLabel }}
        </h1>
        <p class="mt-2 text-xs" style="color:#475569;">
          {{ isLoginView ? 'Enter your credentials to gain system access.' : 'Forge your operative identity in the network.' }}
        </p>
      </div>

      <!-- FORM -->
      <form id="auth-form" @submit="submitAuth" class="flex flex-col gap-5 px-6 py-7" novalidate autocomplete="off">

        <!-- Email -->
        <div class="flex flex-col gap-1">
          <label for="auth-email" class="text-xs" style="color:#94a3b8; letter-spacing:0.1em;">EMAIL_ADDRESS</label>
          <input id="auth-email" v-model="email" type="email" placeholder="operative@legacynet.io"
            autocomplete="email" :disabled="isLoading"
            class="w-full px-4 py-3 border-2 outline-none text-sm disabled:opacity-50"
            style="background:#121212; color:#f8fafc; border-color:#334155; font-family:'JetBrains Mono',monospace; caret-color:#39ff14;"
            @focus="e => e.target.style.borderColor='#39ff14'"
            @blur="e  => e.target.style.borderColor='#334155'"
          />
        </div>

        <!-- Username (Register only) -->
        <Transition name="slide">
          <div v-if="!isLoginView" class="flex flex-col gap-1">
            <label for="auth-username" class="text-xs" style="color:#94a3b8; letter-spacing:0.1em;">OPERATIVE_HANDLE</label>
            <input id="auth-username" v-model="username" type="text" placeholder="e.g. ghost_r3v1v3r"
              autocomplete="username" :disabled="isLoading"
              class="w-full px-4 py-3 border-2 outline-none text-sm disabled:opacity-50"
              style="background:#121212; color:#f8fafc; border-color:#334155; font-family:'JetBrains Mono',monospace; caret-color:#ff00ff;"
              @focus="e => e.target.style.borderColor='#ff00ff'"
              @blur="e  => e.target.style.borderColor='#334155'"
            />
          </div>
        </Transition>

        <!-- Password -->
        <div class="flex flex-col gap-1">
          <label for="auth-password" class="text-xs" style="color:#94a3b8; letter-spacing:0.1em;">PASSPHRASE</label>
          <input id="auth-password" v-model="password" type="password" placeholder="••••••••••••"
            autocomplete="current-password" :disabled="isLoading"
            class="w-full px-4 py-3 border-2 outline-none text-sm disabled:opacity-50"
            style="background:#121212; color:#f8fafc; border-color:#334155; font-family:'JetBrains Mono',monospace; caret-color:#39ff14;"
            @focus="e => e.target.style.borderColor='#39ff14'"
            @blur="e  => e.target.style.borderColor='#334155'"
          />
        </div>

        <!-- Error -->
        <Transition name="fade">
          <div v-if="errorMessage" role="alert" class="border-2 px-4 py-3 text-xs"
            style="border-color:#ff5555; background:#1a0000; color:#ff5555; box-shadow:4px 4px 0 #ff5555;">
            {{ errorMessage }}
          </div>
        </Transition>

        <!-- Success -->
        <Transition name="fade">
          <div v-if="successMessage" role="status" class="border-2 px-4 py-3 text-xs"
            style="border-color:#39ff14; background:#001a00; color:#39ff14; box-shadow:4px 4px 0 #39ff14;">
            {{ successMessage }}
          </div>
        </Transition>

        <!-- Submit CTA -->
        <button
          id="auth-submit-btn"
          type="submit"
          :disabled="isLoading"
          class="w-full border-4 px-6 py-4 font-bold transition-all duration-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 mt-1"
          style="font-family:'Press Start 2P',monospace; letter-spacing:0.1em; font-size:0.65rem; border-color:#ff00ff; background:#1a001a; color:#ff00ff; box-shadow:8px 8px 0 #ff00ff;"
          @mouseenter="e => { if(!isLoading){e.currentTarget.style.transform='translate(4px,4px)';e.currentTarget.style.boxShadow='4px 4px 0 #ff00ff';e.currentTarget.style.background='#ff00ff';e.currentTarget.style.color='#0d0d0d';} }"
          @mouseleave="e => { e.currentTarget.style.transform='translate(0,0)';e.currentTarget.style.boxShadow='8px 8px 0 #ff00ff';e.currentTarget.style.background='#1a001a';e.currentTarget.style.color='#ff00ff'; }"
        >
          <span v-if="isLoading" class="flex items-center justify-center gap-2">
            <span class="inline-block w-2 h-2 animate-pulse" style="background:#ff00ff;"></span>
            AUTHENTICATING...
            <span class="inline-block w-2 h-2 animate-pulse" style="background:#ff00ff;"></span>
          </span>
          <span v-else>{{ ctaLabel }}</span>
        </button>
      </form>

      <!-- Toggle Mode -->
      <div class="border-t-2 px-6 py-4 text-center" style="border-color:#1e2d1e; background:#0a0a0a;">
        <button id="auth-toggle-btn" type="button" @click="toggleMode" :disabled="isLoading"
          class="text-xs disabled:opacity-50 cursor-pointer underline underline-offset-4"
          style="color:#475569; font-family:'JetBrains Mono',monospace; letter-spacing:0.05em;"
          @mouseenter="e => e.currentTarget.style.color='#39ff14'"
          @mouseleave="e => e.currentTarget.style.color='#475569'"
        >
          {{ togglePrompt }}
        </button>
      </div>
    </div>

    <p class="relative z-10 mt-8 text-xs" style="color:#1e3a2e; font-family:'JetBrains Mono',monospace; letter-spacing:0.1em;">
      THE LEGACY REVIVER <span style="color:#39ff14;">v2.4.1</span> // SECURE NODE
    </p>
  </div>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.2s ease; overflow: hidden; }
.slide-enter-from,  .slide-leave-to      { opacity: 0; max-height: 0; margin: 0; }
.slide-enter-to,    .slide-leave-from    { opacity: 1; max-height: 120px; }
.fade-enter-active, .fade-leave-active   { transition: opacity 0.2s ease; }
.fade-enter-from,   .fade-leave-to       { opacity: 0; }
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px #121212 inset !important;
  -webkit-text-fill-color: #f8fafc !important;
}
</style>
