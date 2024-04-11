<template>
  <div>
    <div class="container mx-auto mt-16">
      <h1 class="capitalize pb-8 font-semibold font-fractul text-4xl">
        latest recipes
      </h1>
      <div>
        <div
          class="grid md:grid-cols-4 grid-cols-2 gap-2 mx-3 md:mx-0 md:gap-5"
        >
          <NuxtLink to="/modal" class="w-full" v-for="latest in result?.recipe" :key="latest.id">
            <!-- image -->
            <div class="w-full" v-for="image in latest.images" :key="image.id">
              <img
                :src="image.url[0]"
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
          </NuxtLink>

          <!-- two columns -->
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
const ofvar = ref(0);
import { useRecipeStore} from "../stores/userStore"
const offsetStore = useRecipeStore()
const QUERY_RECIPE = gql`
  query MyQuery($offset: Int!) {
    recipe(order_by: { created_at: asc }, offset: $offset, limit: 8) {
      title
      images {
        url
      }
    }
  }
`;
const { result, fetchMore, refetch } = useQuery(QUERY_RECIPE, { offset: offsetStore.offset }, () => ({
  fetchPolicy: "network-only",
}));

const loadMore = () => {
  offsetStore.incrementOffset();// Increment offset value by one
  fetchMore({ variables: { offset: offsetStore.offset } });
  refetch()
  console.log(fetchMore)
};
</script>

<style></style>
