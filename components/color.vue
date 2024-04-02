<template>
  <div class="dark:bg-[#0F172A]"> 
    <button @click="toggleColor" class="text-yellow-800 pr-[500px] pt-10 pb-0 transition-all duration-1000 ease-in transform translate-x-10">
 <Icon name="solar:sun-line-duotone" v-if="colorMode.preference === 'light'"/>
      <!-- moon -->
    <Icon name="ph:moon-thin" v-else/>
    </button>
  </div>
</template>

<script setup>

const colorMode = useColorMode();

const toggleColor = () => {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
};
</script>