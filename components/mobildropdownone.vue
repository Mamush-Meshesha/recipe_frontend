<template>
  <div>
    <div class="">
      <div class="flex justify-between py-3 px-4">
        <!-- search icon -->
        <div>
          <svg
            class="w-8 h-8 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <div>
          <h1 class="text-4xl font-extrabold font-sacre text-center">
            Testibite
          </h1>
        </div>
        <!-- end -->
        <!-- menu icon -->
        <div>
          <button @click="showMenu">
            <svg
            class="w-8 h-8 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
          </button>
        </div>
        <!-- end of menu -->
      </div>
      <!-- showed menu -->
      <div v-if="menu">
        <div class="flex flex-col gap-4 px-6">
          <NuxtLink to="/" class="font-fractul font-semibold capitalize text-xl">Home</NuxtLink>
          <NuxtLink to="/" class="font-fractul font-semibold capitalize text-xl">recipe</NuxtLink>
          <NuxtLink to="/" class="font-fractul font-semibold capitalize text-xl">pages</NuxtLink>
          <NuxtLink to="/" class="font-fractul font-semibold capitalize text-xl">Buy</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const menu = ref(false)

const showMenu = () => {
  return menu.value = !menu.value
}

</script>
