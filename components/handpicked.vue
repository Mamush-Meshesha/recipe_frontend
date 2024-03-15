<template>
  <div>
    <div>
      <h1 class="capitalize pb-8 font-semibold font-fractul text-4xl">
        hand-picked collections
      </h1>
      <div class="md:grid md:grid-cols-2 md:gap-10 flex flex-col gap-6" v-for="user in users" :key="user.id">
        <div class="w-full h-[425px] md:h-[400px] shadow-md border rounded-md" v-for="handpick in user.food.slice(1,7)" :key="handpick.id">
          <!-- image -->
          <div class="w-full">
            <img
              :src="handpick.url"
              alt="image not found"
              class="w-full h-[300px] rounded-md rounded-b-none object-cover"
            />
          </div>
          <!-- rating -->
          <div class="py-4">
            <div
              class="flex md:justify-between flex-col md:flex-row md:mx-[30px] md:items-center"
            >
              <h1
                class="capitalize md:font-semibold text-2xl md:text-3xl w-full md:w-2/4 font-poppins"
              >
                {{ handpick.title }}
              </h1>
              <div class="flex justify-end mr-2 md:mr-0">
                <Recipebutton />
              </div>
            </div>
          </div>
          <!-- end of rating section -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  food: Array
})

</script>

<style></style>
