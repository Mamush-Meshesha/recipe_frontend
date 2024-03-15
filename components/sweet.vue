<template>
  <div>
    <div>
      <div>
        <h1 class="capitalize pb-8 font-semibold font-fractul text-4xl">
          sweet tooth
        </h1>
        <div class="md:grid md:grid-cols-3 md:gap-6 flex flex-col gap-3" v-for="user in users" :key="user.id">
          <div class="w-full" v-for="foo in user.food.slice(3,6)" :key="foo.id">
            <!-- image -->
            <div class="w-full">
              <img
                :src="foo.url"
                alt="image not found"
                class="w-full h-[300px] rounded-md object-cover"
              />
            </div>
            <!-- rating -->
            <div class="py-4">
              <div class="card flex justify-content-center">
                <Rating v-model="value" :cancel="false" style="fill: red" />
              </div>
              <div class="py-3">
                <h1 class="capitalize font-semibold font-poppins">
                  spanish and cheese pasta
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const value = ref(4);

const props = defineProps({
  users: Array
})

</script>

<style></style>
