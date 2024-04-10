<script setup>
const minute = ref(0);
const selectedIngredients = ref([]);
const selectedcata = ref("");

const title = ref("");
const creater = ref("");
const variables = computed(() => {
  const titleWithValue = `%${title.value}%`;
  const miuteTitle = parseInt(`${minute.value}`);
  const ingreTitle = Array.isArray(selectedIngredients.value)
    ? selectedIngredients.value
    : [];

  const cataTitle = `%${selectedcata.value}%`;

  const userValue = `%${creater.value}%`;

  return {
    where: {
      title: { _ilike: titleWithValue },
      ingredients: {
        name: { _contains: ingreTitle },
      },
      catagory: { name: { _ilike: cataTitle } },
      preparetion_time: { _gt: miuteTitle },
      user: { first_name: { _ilike: userValue } },
    },
  };
});

const QUERY_ALL = gql`
  query MyQuery($where: recipe_bool_exp) {
    recipe(where: $where) {
      id
      title
      images {
        id
        url
        recipe {
          id
          user {
            id
            first_name
          }
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      ingredients {
        name
      }
      catagory {
        name
      }
    }
  }
`;

const { result, loading, error } = useQuery(QUERY_ALL, variables);

definePageMeta({
  middleware: "auth",
});

const clearFilters = () => {
  
  title.value = "";
  creater.value = "";
  selectedIngredients.value = [];
  selectedcata.value = "";
  minute.value = 0;
  refetchData();
};

const refetchData = () => {

  const defaultVariables = {
    where: {
      title: { _ilike: "%%" },
      ingredients: { name: { _contains: [] } },
      catagories: { name: { _ilike: "%%" } },
      preparetion_time: { _gt: 0 },
      user: { first_name: { _ilike: "%%" } },
    },
  };

};


</script>

<template>
  <div
    class="dark:bg-[#040721] transition-colors ease-in-out duration-1000 min-h-screen"
  >
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
      <div class="pt-4 w-[100%]">
        <div class="sm:flex sm:gap-10 grid grid-cols-3 gap-4">
          <input
            v-model="title"
            type="search"
            placeholder="search recipes"
            class="px-3 h-11 outline-8 border-2 w-[80%] rounded-md outline-[#2cc9c9]"
          />

          <Ingred v-model="selectedIngredients" />

          <input
            v-model="creater"
            type="search"
            placeholder="search by creator"
            class="px-3 h-11 outline-8 border-2 w-[80%] rounded-md outline-[#2cc9c9]"
          />
          <Catacom  v-model="selectedcata" />
          <div class="card flex justify-content-center items-center w-full">
            <Slider v-model="minute" range class="w-[90%]" />
          </div>
          <button @click="clearFilters"
            type="submit"
            class="sm:w-[50%] text-white bg-[#d1692c] px-8 sm:py-2 rounded-md"
          >
            clear filters
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="loading"
      class="flex justify-center items-center h-screen w-full"
    >
      <Icon
        name="line-md:loading-twotone-loop"
        class="text-4xl text-[#178a17]"
      />
    </div>

    <div class="container mx-auto pt-10">
      <div class="sm:grid sm:grid-cols-4 px-5 sm:px-0 flex flex-col gap-5">
        <div
          v-for="rec in result?.recipe"
          :key="rec.id"
          class="rounded-md border"
        >
          <div class="flex w-full">
            <div v-for="i in rec.images" :key="i.id">
              <img
                :src="i.url[0]"
                alt=""
                class="rounded-md rounded-b-none w-[500px] object-cover h-[300px]"
              />
            </div>
          </div>
          <h1 class="px-2 py-4 dark:text-white">{{ rec.title }}</h1>
          <div v-for="reci in rec.images" :key="reci.id">
            <ul>
              <h1
                class="dark:text-white text-xs text-black float-end pb-1 pr-1"
              >
                created by {{ reci.recipe.user.first_name }}
              </h1>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.6s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translatey(-60px);
  opacity: 0;
}
</style>
