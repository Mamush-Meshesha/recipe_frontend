<script setup>
const route = useRoute();

const idds = route.params.id;

const Query = gql`
query MyQuery($id: Int!) {
  recipe(where: {id: {_eq: $id}}) {
    title
    description
    created_at
    images {
      id
      url
    }
    bookmarks_aggregate {
      aggregate {
        count
      }
    }
    comments_aggregate {
      aggregate {
        count
      }
    }
    ingredients {
      name
    }
    instructions {
      instruction
    }
    likes_aggregate {
      aggregate {
        count
      }
    }
    preparetion_time
    user {
      first_name
      last_name
      url
    }
    comments {
      created_at
    }
  }
}

`;
const { result, refetch, loading } = useQuery(Query, { id: idds });

import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";

const settings = {
  itemsToShow: 1,
  priority: 1,
  snapAlign: "center",
  autoplay: 0,
  autoplaySpeed: 3000,
};

const breakpoints = {
  768: {
    itemsToShow: 1,
  },
  1024: {
    itemsToShow: 1,
  },
};

// convering created_at time to current time
const formatTimestamp = (timestamp) => {
  const createdAt = new Date(timestamp);
  const now = new Date();
  const diff = now - createdAt;

  const hours = Math.floor(diff / 3600000); // Calculate hours
  const days = Math.floor(hours / 24); // Calculate days
  const minutes = Math.floor(diff / 60000); // Calculate minutes

  if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else {
    return `${minutes} minutes ago`;
  }
};
</script>
<template>
  <div class="dark:bg-[#040721] transition-colors ease-in-out duration-1000">
    <Header />
    <div class="container mx-auto">
      <div class="flex gap-2 justify-between">
        <div>
          <Icon name="typcn:arrow-sync" class="text-2xl text-[#1a9599]" />
          <h1
            class="text-xl bg-gradient-to-tr from-[#0abd90] via-[#c501ab] to-[#0042bd] inline-block text-transparent bg-clip-text"
          >
            85% would make this again
          </h1>
        </div>
      </div>
      <div
        v-for="rec in result?.recipe"
        :key="rec.id"
        class="w-full b h-full relative pb-10"
      >
        <p class="dark:text-white px-5 text-3xl font-bold py-6">
          {{ rec.title }}
        </p>
        <div v-if="loading">
          <Icon name="line-md:loading-alt-loop"  class="text-5xl dark:text-[#3ee5da]"/>
        </div>
        <div class="pb-7">
          <div class="flex gap-10 pt-3 border-b pb-4">
            <div class="flex gap-3 items-center">
              <img
                :src="rec.user.url"
                alt=""
                class="w-10 h-10 rounded-full object-cover border border-[#1ba597]"
              />
              <h1 class="font-fractul dark:text-white text-xl">
                {{ rec.user.first_name }}
              </h1>
            </div>
            <div class="flex items-center gap-3">
              <Icon
                name="material-symbols-light:date-range-outline"
                class="text-2xl dark:text-white"
              />
             <h1 class="dark:text-white">
               {{  formatTimestamp(rec.created_at) }}
             </h1>
            </div>
            <div class="flex items-center gap-3">
              <div class="px-3 flex gap-3">
                <Icon name="mage:message-round" class="text-2xl dark:text-white" />
                <h1 class="dark:text-white">
                  {{ rec.comments_aggregate.aggregate.count }}
                </h1>
              </div>
             
            </div>
          </div>
        </div>
        <div>
          <p class="dark:text-white px-5 py-6">
            {{ rec.description }}
          </p>
          <Carousel v-bind="settings" :breakpoints="breakpoints">
            <Slide v-for="image in rec.images[0].url" :key="image.id">
              <img
                :src="image"
                alt=""
                class="w-full h-[600px] object-cover rounded-lg"
              />
            </Slide>
            <template #addons>
              <Navigation />
              <Pagination />
            </template>
          </Carousel>
        </div>
        <!-- prepare time -->
        <div class="flex gap-10 dark:text-white py-6">
          <div>
            <h1 class="text-2xl capitalize border-r pr-6">Preparation time</h1>
            <p>{{ rec.preparetion_time }} Min</p>
          </div>
          <div>
            <h1 class="text-2xl capitalize">favour by</h1>
            <p>
              {{ rec.preparetion_time }} customers
            </p>
          </div>
        </div>

        <div class=" sm:grid sm:grid-cols-2 pt-5 border-t gap-10">
          <div>
            <h1 class="text-2xl py-4 px-2 dark:text-white">Ingredients</h1>
            <div v-for="ingredient in rec.ingredients[0].name" :key="ingredient.id">
              <div class="flex gap-2 items-center px-5">
                <Icon
                  name="icon-park-solid:correct"
                  class="text-xl dark:text-[#228556]"
                />
                <li class="dark:text-white list-none px-5 py-3">
                  {{ ingredient }}
                </li>
              </div>
            </div>
          </div>
          <div>
            <h1 class="text-2xl pt-4 px-2 capitalize dark:text-white">
              instructions
            </h1>
            <div v-for="ingredient in rec.instructions[0].instruction" :key="ingredient.id">
              <div class="flex gap-2 items-center px-5">
                <div>
                  <Icon
                    name="icon-park-solid:correct"
                    class="text-xl dark:text-[#228556]"
                  />
                </div>
                <li class="dark:text-white list-none px-5 py-2">
                  {{ ingredient }}
                </li>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Comment />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
