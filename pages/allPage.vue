<script setup>
const selectedCatagory = ref();
const catagory = ref([
  { name: "Desert" },
  { name: "Fast food" },
  { name: "Dinner" },
  { name: "Spicy" },
  { name: "Pasta" },
  { name: "pizza" },
  { name: "breakfast" },
  { name: "donnut" },
  { name: "see food" },
  { name: "soup" },
  { name: "pancakes" },
  { name: "meats" },
  { name: "chickens" },
  { name: "fast food" },
  { name: "pasta" },
  { name: "pizza" },
  { name: "cakes" },
  { name: "pastries" },
  { name: "burger" },
  { name: "vegan" },
  { name: "desert" },
  { name: "smoothies" },
  { name: "salad" },
  { name: "sandwiches" },
  { name: "waffles" },
  { name: "ramen" },
  { name: "dips" },
]);
const value = ref([10, 80]);
const title = ref("");

const searchVal = computed(() => {
  return {
    title: title.value.toLowerCase().trim()
  };
});

watch(searchVal, () => {
  executeQuery({ variables: searchVal.value });
});

watch(title, () => {
  if (title.value === "") {
    executeQuery({ variables: { title: "" } });
  }
});
const FILETR = gql`
  query MyQuery($title: String!) {
    food(where: { title: { _eq: $title } }) {
      id
      title
      description
      url
    }
  }
`;

const { data: foodData, executeQuery } = useAsyncQuery(FILETR, searchVal);

</script>

<template>
  <div>
    <div>
      <Header />
    </div>
    <div class="container mx-auto">
      <div class="flex gap-3 items-center">
        <svg
          class="w-8 h-8 text-[#1bacb1] dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M5.05 3C3.291 3 2.352 5.024 3.51 6.317l5.422 6.059v4.874c0 .472.227.917.613 1.2l3.069 2.25c1.01.742 2.454.036 2.454-1.2v-7.124l5.422-6.059C21.647 5.024 20.708 3 18.95 3H5.05Z"
          />
        </svg>
        <h1 class="text-2xl font-semibold text-[#1798b8]">Filter</h1>
      </div>
      <div class="pt-4">
        <div class="flex gap-10">
          <input
            v-model="title"
            type="search"
            placeholder="search recipes"
            class="px-3 h-11 outline-8 border-2 w-[80%] rounded-md outline-[#2cc9c9]"
          />
          <input
            type="search"
            placeholder="filter by ingredients"
            class="px-3 h-11 outline-8 border-2 w-[80%] rounded-md outline-[#2cc9c9]"
          />
          <input
            type="search"
            placeholder="search by creator"
            class="px-3 h-11 outline-8 border-2 w-[80%] rounded-md outline-[#2cc9c9]"
          />
          <Dropdown
            v-model="selectedCatagory"
            :options="catagory"
            optionLabel="name"
            placeholder="Select a catagory"
            class="w-[20%] h-11 outline-2 border-2 flex flex-row rounded-md outline-[#2cc9c9]"
          />
          <div class="card flex justify-content-center items-center w-full">
            <Slider v-model="value" range class="w-[90%]" />
          </div>
          <button
            @click="variables"
            class="w-[50%] text-white bg-[#d1692c] px-8 py-2 rounded-md"
          >
            clear filters
          </button>
        </div>
      </div>
    </div>
    <div class="mx-auto container">
      <div class="grid grid-cols-5 gap-10 py-10">
        <div
          v-for="food in data.food"
          :key="food.id"
          class="w-[97%] h-[250px] rounded-md border"
        >
          <img :src="food.url" alt="" class="w-full h-[200px] object-cover" />
          <h1>
            {{ food.title }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
