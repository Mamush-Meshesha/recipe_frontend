<template>
  <div>
    <div class="container mx-auto mt-16">
      <h1 class="capitalize pb-8 font-semibold font-fractul text-4xl">
        latest recipes
      </h1>
      <div>
        <div class="grid md:grid-cols-4 grid-cols-2 gap-2 mx-3 md:mx-0 md:gap-5">
          <div class="w-full" v-for="latest in food" :key="latest.id">
            <!-- image -->
            <div class="w-full">
              <img
                :src="latest.url"
                alt="image not found"
                class="w-full h-[170px] md:h-[250px] rounded-md object-cover"
              />
            </div>
            <!-- rating -->
            <div class="py-4">
              <div>
                <h1 class="capitalize font-semibold font-poppins">
                  {{ latest.title }}
                </h1>
              </div>
            </div>
          </div>
          <!-- two columns -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  food: Object
})

</script>

<style></style>
