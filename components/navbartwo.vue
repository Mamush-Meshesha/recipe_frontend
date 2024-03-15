<template>
  <div class="overflow-x-hidden">
    <div class="container mx-auto">
      <div class="hidden md:block">
        <h1 class="text-6xl font-extrabold font-sacre text-center py-4">
          Testibite
        </h1>
      </div>
      <div class="flex justify-between border border-l-0 border-r-0 py-3">
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
        <!-- end -->
        <div class="md:flex hidden gap-16 items-center">
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/">recipe</NuxtLink>
          <NuxtLink to="/">pages</NuxtLink>
          <NuxtLink to="/">Buy</NuxtLink>
        </div>
        <div class="flex md:hidden">
          <h1 class="text-3xl font-bold font-sacre text-center">
            Testibite
          </h1>
        </div>
        <!-- menu icon -->
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
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style></style>
