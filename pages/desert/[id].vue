<template>
  <div>
    <div v-for="foods in data.food" :key="foods.id">
      <Header />
      <div >
        <img
          :src="foods.url"
          alt=""
          class="w-full h-[350px] object-cover"
        />
      </div>
      <!-- desert -->
      <div class="container mx-auto pt-20">
        <div class="flex justify-between items-center">
          <div class="w-[75%]">
            <div class="flex gap-2">
              <h1 class="font-fractul text-5xl">
                {{ foods.catagory }}
              </h1>
              <span>({{ data.food_aggregate.aggregate.count }})</span>
            </div>
            <div>
              <h1 class="text-xl font-fractul">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui
                eum quasi aut? Assumenda, enim qui natus nihil harum tenetur
                aliquid illum rem similique nesciunt temporibus ipsum delectus
                at odit?
              </h1>
            </div>
          </div>
          <div class="card flex justify-content-center border rounded-md px-3">
            <Dropdown
              v-model="selectedCatagory"
              :options="catagory"
              optionLabel="name"
              placeholder="Sort"
              class="w-full md:w-14rem"
            />
          </div>
        </div>
        <!-- rusalts of filterd -->
        <div class="grid grid-cols-4 py-10 gap-4" >
          <div class="w-full">
            <!-- image -->
            <div class="w-full">
              <img
                :src="foods.url"
                alt="image not found"
                class="w-full h-[170px] md:h-[250px] rounded-md object-cover"
              />
            </div>
            <!-- rating -->
            <div class="py-4">
              <div>
                <h1 class="capitalize font-semibold font-poppins">
                  {{ foods.title }}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end of desert -->
    </div>
    <More />
    <Footer />
  </div>
</template>

<script setup>
const route = useRoute()
import { ref } from "vue";

const foodId = route.params.id
const selectedCatagory = ref();
const catagory = ref([
  { name: "latest" },
  { name: "Ascending" },
  { name: "Descending" },
  { name: "older" },
  { name: "Random" },
]);

const QUERY_EACH = gql`
 query MyQuery($id: Int!) {
  food(where: {id: {_eq: $id}}) {
    catagory
    description
    id
    recipe_id
    title
    url
  }
  food_aggregate {
    aggregate {
      count
    }
  }
}

`;
const { data, refetch } = useAsyncQuery(QUERY_EACH, { id: foodId })

let pollingInterval;

onMounted(() => {
  pollingInterval = setInterval(() => refetch(), 5000); // Refetch every 5 seconds
});

onUnmounted(() => {
  clearInterval(pollingInterval); // Clear the interval when the component unmounts to avoid memory leaks
});
</script>
