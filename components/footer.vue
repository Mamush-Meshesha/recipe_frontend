<template>
  <div class="overflow-hidden">
    <div
      class="bg-[#f7f7f7] flex dark:bg-[#0f0f25] dark:text-white transition-colors ease-in-out duration-1000 pt-10 md:pt-20"
    >
      <div class="container mx-auto">
        <div class="flex justify-between">
          <div class="pb-4 flex flex-col gap-2">
            <h1 class="text-xl font-bold">pages</h1>
            <h1>about</h1>
            <h1>recipe</h1>
            <h1>home</h1>
          </div>
          <div>
            <div class="flex flex-col gap-2">
              <h1 class="text-2xl font-bold">contact us</h1>
              <div class="flex gap-2 items-center">
                <Icon name="iconamoon:email-thin" class="text-2xl" />
                <h1>mam@gmail.com</h1>
              </div>
              <a
                href="https://www.linkedin.com/in/mamush-meshesha-25a829223"
                class="flex gap-2 items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="ph:linkedin-logo-thin" class="text-2xl" />
                <h1>LinkedIn</h1>
              </a>

              <NuxtLink
                to="https://t.me/mam1620shgmail"
                class="flex gap-2 items-center"
              >
                <Icon name="arcticons:telegram" class="text-2xl" />
                <h1>Telegram</h1>
              </NuxtLink>
            </div>
          </div>

          <div>
            <button @click="scrollToTop" v-show="isButtonVisible">
              back to top
            </button>
          </div>
        </div>
        <div
          class="flex md:justify-center dark:text-white border-t-2 pt-6 flex-col-reverse gap-5 md:gap-0 mx-4 md:mx-0 md:flex-row pb-10 md:pb-0"
        >
          <h1>&copy;2024,my recipe</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const isButtonVisible = ref(false);

const handleScroll = () => {
  isButtonVisible.value = window.scrollY > 20;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style></style>
