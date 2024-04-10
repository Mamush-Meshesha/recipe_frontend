<template>
  <div>
    <div
      class="dark:bg-[#050822] dark:text-white transition-colors ease-in-out duration-1000"
    >
      <Header />
      <div class="container mx-auto">
        <div class="pb-5 border-b">
          <h1 class="md:text-4xl text-3xl font-fractul font-bold capitalize">
            about
          </h1>
        </div>
        <div class="pt-10 px-4 md:px-0">
          <h1
            class="md:text-4xl text-3xl font-fractul capitalize font-bold pb-7"
          >
            this is our recipe sharing website
          </h1>
          <div>
            <div v-for="rec in resResult?.recipe" :key="rec.id">
              <div v-for="image in rec.images" :key="image.id">
                <img
                  :src="image.url[0]"
                  alt=""
                  class="w-full h-[550px] rounded-md object-cover"
                />
                <h1 class="pt-6 text-xl font-fractul">
                  {{ rec.description }}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <!-- team members -->
        <div class="pt-10 px-4 md:px-0">
          <h1
            class="md:text-4xl text-3xl font-fractul capitalize pb-7 font-bold"
          >
            our food recipe members and top creators
          </h1>
          <div>
            <Carousel v-bind="settings" :breakpoints="breakpoints">
              <Slide
                v-for="user in result?.users"
                :key="user.id"
                class="flex flex-col mx-10"
              >
                <div class="flex justify-center pb-3">
                  <div v-if="user.url">
                    <img
                      :src="user.url"
                      alt=""
                      class="md:w-[150px] w-[100px] h-[100px] md:h-[150px] rounded-full object-cover"
                    />
                  </div>
                  <div v-else>
                    <img
                      src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                      alt=""
                      class="md:w-[150px] w-[100px] h-[100px] md:h-[150px] rounded-full object-cover"
                    />
                  </div>
                </div>
                <div class="text-center">
                  <h1 class="font-bold">{{ user.first_name }}</h1>
                  <p class="text-[#bbb]">{{ user.email }}</p>
                </div>
              </Slide>
              <template #addons>
                <Pagination />
              </template>
            </Carousel>
          </div>
        </div>
      </div>

      <div class="container mx-auto pt-12">
        <h1>Find us here</h1>
        <div>
          <iframe
            width="660"
            height="340"
            style="border: 0"
            loading="lazy"
            allowfullscreen
            :src="mapUrl"
          ></iframe>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
const query = gql`
  query MyQuery {
    users {
      first_name
      url
      id
      last_name
      email
      recipes(limit: 1) {
        title
        description
        images {
          id
          url
        }
      }
    }
  }
`;

const { result } = useQuery(query);

const recpeQuery = gql`
  query MyQuery {
    recipe(limit: 1) {
      title
      description
      images {
        id
        url
      }
    }
  }
`;
const { result: resResult } = useQuery(recpeQuery);
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";

const settings = {
  itemsToShow: 1,
  priority: 1,
  snapAlign: "center",
  autoplay: 1,

  autoplaySpeed: 1000000,
};

const breakpoints = {
  768: {
    itemsToShow: 4,
  },
  1024: {
    itemsToShow: 5,
  },
};


definePageMeta({
  middleware: "auth",
});

const mapUrl = ref("");

const mapApi = import.meta.env.VITE_MAP_API;

onMounted(() => {
  mapUrl.value = `https://www.google.com/maps/embed/v1/place?key=${mapApi}&q=9.0409338,38.7282904`;
});
</script>

<style></style>
