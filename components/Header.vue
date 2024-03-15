<template>
  <div class="relative mb-44">
    <div class="fixed top-0  w-screen border-b shadow-lg bg-white bg-opacity-10 z-50 backdrop-filter backdrop-blur-md">
      <div
        class="flex py-4 justify-between w-screen container mx-auto md:px-0"
      >
        <div>
          <h1 class="sm:text-5xl text-4xl font-sacre font-bold">Testibite</h1>
        </div>
        <!-- hidden for mobile devices -->
        <div class="sm:flex gap-16 hidden">
          <h1 class="font-fractul text-2xl">Home</h1>
          <h1 class="font-fractul text-2xl">Recipe</h1>
          <h1 class="font-fractul text-2xl">Pages</h1>
          <h1 class="font-fractul text-2xl">Buy</h1>
        </div>
        <div class="flex items-center gap-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Outline"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            <path
              d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"
            />
          </svg>
          <img
            src="https://cdn-icons-png.freepik.com/512/3135/3135715.png"
            alt=""
            class="w-12 h-12 rounded-full object-cover"
          />
          <button @click="showMenu">
            <svg
              class="w-8 h-8 block sm:hidden pr-0 text-gray-800 dark:text-white"
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
      </div>
      <!-- hidden for large devices -->
      <div
        v-if="menu"
        class="absolute top-0 left-0 pt-[80px] w-[100vw] max-h-[100vh] pb-6 bg-[#272b2a] opacity-90"
      >
        <div class="flex justify-between">
          <div class="flex text-white flex-col gap-4 px-6">
            <NuxtLink
              to="/"
              class="font-fractul font-semibold capitalize text-xl"
              >Home</NuxtLink
            >
            <NuxtLink
              to="/"
              class="font-fractul font-semibold capitalize text-xl"
              >recipe</NuxtLink
            >
            <NuxtLink
              to="/"
              class="font-fractul font-semibold capitalize text-xl"
              >pages</NuxtLink
            >
            <NuxtLink
              to="/"
              class="font-fractul font-semibold capitalize text-xl"
              >Buy</NuxtLink
            >
          </div>
          <div>
            <button
              @click="menu = false"
              class="text-white px-4 border rounded-md"
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const menu = ref(false);

const showMenu = () => {
  return (menu.value = !menu.value);
};
</script>
