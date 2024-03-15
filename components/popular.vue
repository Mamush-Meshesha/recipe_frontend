<template>
  <div>
    <div>
          <h1 class="capitalize pb-8 font-semibold font-fractul text-4xl">
            popular gatagories
          </h1>
          <div class="grid md:grid-cols-6  grid-cols-3 gap-3">
            <div v-for="popular in food.slice(5,11)" :key="popular.id" >
              <img
                :src="popular.url"
                alt="image not found"
                class="w-[90px] h-[90px] md:w-[150px] md:h-[150px] object-cover rounded-full"
              />
              <h1 class="w-[60%] pt-4 flex justify-center text-center">
                {{ popular.title }}
              </h1>
            </div>
          </div>
        </div>
        <!-- end of popular catagories -->
  </div>
</template>

<script setup>
const props = defineProps({
  food: Array
})
</script>

<style>

</style>