<template>
  <div>
    <div class="md:pt-20 pt-10 container mx-auto">
      <div class="pb-5 border-b">
        <h1 class="text-5xl font-fractul font-bold capitalize">catagories</h1>
      </div>
      <div
        class="grid md:grid-cols-4 grid-cols-2 md:gap-8 gap-4 md:pt-20 pt-10"
      >
        <div class="flex justify-center" v-for="foo in data.food" :key="foo.id">
          <NuxtLink :to="{ name: 'desert-id', params: { id: foo.id } }">
            <div>
              <img
                :src="foo.url"
                alt="image not found"
                class="md:w-56 w-44 md:h-56 h-44 rounded-full object-cover"
              />
              <h1 class="font-fractul text-xl capitalize text-center pt-3">
                {{ foo.catagory }}
              </h1>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
const route = useRoute();

const CATAGORY_QUERY = gql`
  query MyQuery {
    food(where: { description: { _lt: "0" }, id: { _gte: 22 } }) {
      catagory
      description
      id
      recipe_id
      title
      url
    }
  }
`;
const { data } = useAsyncQuery(CATAGORY_QUERY);

let pollingInterval;

onMounted(() => {
  pollingInterval = setInterval(() => refetch(), 500); // Refetch every 5 seconds
});

onUnmounted(() => {
  clearInterval(pollingInterval); // Clear the interval when the component unmounts to avoid memory leaks
});
</script>

<style></style>
