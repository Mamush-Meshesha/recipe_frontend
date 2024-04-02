<template>
  <div class="overflow-x-hidden dark:bg-[#040721] transition-colors ease-in-out duration-1000">
    <Header />
    <div class="">
      
      <div class="container mx-auto">
        <h1 class="text-4xl font-semibold text-[#239bb9] font-fractul">Your favourates</h1>
        <div class="md:grid md:grid-cols-3 md:gap-6 flex flex-col gap-3">
          <!-- box one -->
          <div class="w-full border rounded-lg pb-2" v-for="rec in result?.recipe" :key="rec.id">
            <!-- image -->
            <div class="w-full" v-for="image in rec.images" :key="image.id"> 
              <img
                :src="image.url[0]"
                alt="image not found"
                class="w-full h-[300px] rounded-md rounded-b-none object-cover"
              />
            </div>
            <!-- rating -->
            <div class="py-4 px-2">
              <Rating
                   
                    :cancel="false"
                    :model-value="rec.avarage_rating"
                  />
              <div class="py-3">
                <h1 class="capitalize dark:text-white font-semibold font-poppins">
                  {{ rec.title }}
                </h1>
              </div>
            </div>
          </div>
         </div>
       </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
const value = ref(5);

const QUERY_FAVOURATE = gql`
query MyQuery {
    recipe(where: { bookmarks: { recipe_id: { _gt: 0 } } }) {
      description
      title
      preparetion_time
    avarage_rating
      images {
        url
      }
    }
  }
`;

const { result, error, refetch } = useQuery(QUERY_FAVOURATE)


definePageMeta({
  middleware: "auth",
});
</script>
