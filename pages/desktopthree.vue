<template>
  <div>
    <div class="overflow-hidden">
      <Navbar />
      <div class="relative">
        <Carousel v-bind="settings" :breakpoints="breakpoints">
          <Slide v-for="slide in slides" :key="slide.id">
            <img
              :src="slide.imageUrl"
              alt="Slide Image"
              class="w-full object-cover h-[650px]"
            />
          </Slide>
          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
        <div class="md:mx-[160px] mx-6 absolute bottom-0 left-0 mb-[60px] w-full md:w-[500px]">
          <div class="flex gap-3">
            <svg
              width="30px"
              height="30px"
              viewBox="0 -0.5 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 7.75C15.0858 7.75 14.75 8.08579 14.75 8.5C14.75 8.91421 15.0858 9.25 15.5 9.25V7.75ZM19.5 9.25C19.9142 9.25 20.25 8.91421 20.25 8.5C20.25 8.08579 19.9142 7.75 19.5 7.75V9.25ZM20.25 8.5C20.25 8.08579 19.9142 7.75 19.5 7.75C19.0858 7.75 18.75 8.08579 18.75 8.5H20.25ZM18.75 12.5C18.75 12.9142 19.0858 13.25 19.5 13.25C19.9142 13.25 20.25 12.9142 20.25 12.5H18.75ZM20.0303 9.03033C20.3232 8.73744 20.3232 8.26256 20.0303 7.96967C19.7374 7.67678 19.2626 7.67678 18.9697 7.96967L20.0303 9.03033ZM12.5 15.5L11.9697 16.0303C12.2626 16.3232 12.7374 16.3232 13.0303 16.0303L12.5 15.5ZM9.5 12.5L10.0303 11.9697C9.73744 11.6768 9.26256 11.6768 8.96967 11.9697L9.5 12.5ZM4.96967 15.9697C4.67678 16.2626 4.67678 16.7374 4.96967 17.0303C5.26256 17.3232 5.73744 17.3232 6.03033 17.0303L4.96967 15.9697ZM15.5 9.25H19.5V7.75H15.5V9.25ZM18.75 8.5V12.5H20.25V8.5H18.75ZM18.9697 7.96967L11.9697 14.9697L13.0303 16.0303L20.0303 9.03033L18.9697 7.96967ZM13.0303 14.9697L10.0303 11.9697L8.96967 13.0303L11.9697 16.0303L13.0303 14.9697ZM8.96967 11.9697L4.96967 15.9697L6.03033 17.0303L10.0303 13.0303L8.96967 11.9697Z"
                fill="#000000"
              />
            </svg>
            <p class="text-xl text-white">85% would make this again</p>
          </div>
          <h1 class="capitalize md:text-7xl text-4xl font-bold text-white font-fractul">
            cinanon apple loaded tart
          </h1>
        </div>
      </div>
      <!-- end of carousel -->
      <div class="mx-auto container pt-16">
        <Popular :food="data.food"/>
      </div>
      <div class="mx-auto container pt-16">
        <Delicious :food="data.food"/>
      </div>
      <div class="mx-auto container pt-16">
        <Handpicked :food="data.food"/>
      </div>
      <div>
        <Latestrecipe :food="data.food"/>
        <More />
      </div>
      <Emailbox />
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";

const settings = {
  itemsToShow: 1,
  snapAlign: "center",
  autoplay: false, // Enable autoplay if desired
  autoplaySpeed: 3000, // Autoplay speed in milliseconds
};

const breakpoints = {
  768: {
    itemsToShow: 1,
  },
  1024: {
    itemsToShow: 1,
  },
};

const slides = [
  {
    id: 1,
    imageUrl:
      "https://w4s8p5t8.rocketcdn.me/wp-content/uploads/2021/09/how-to-make-vegan-french-apple-tart.jpg.webp",
  },
  {
    id: 2,
    imageUrl:
      "https://w4s8p5t8.rocketcdn.me/wp-content/uploads/2021/09/ingredients-for-vegan-apple-tart-4.jpg.webp",
  },
  {
    id: 3,
    imageUrl:
      "https://www.sugarsaltmagic.com/wp-content/uploads/2024/02/Lemon-Blackberry-Cake-17FEAT-500x500.jpg",
  },
];

const QUERY_USER = gql`
  query MyQuery {
   
      food {
        catagory
        description
        id
        recipe_id
        title
        url
        rating {
          id
          value
        }
      }
    }
`;   
const { data } = useAsyncQuery(QUERY_USER);

</script>
<style></style>
