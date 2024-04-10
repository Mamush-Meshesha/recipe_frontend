<template>
  <div
    class="overflow-x-hidden dark:bg-[#040721] transition-colors ease-in-out duration-1000"
  >
    <Header />
    <div class="container mx-auto">
      <div class="flex flex-col gap-16 px-3 sm:px-0 mx-5 md:mx-0">
        <!-- componet one -->
        <div
          class="w-full rounded-lg bg-[#e3f1ff] rounded-b-none dark:bg-[#182234] transition-colors ease-in-out duration-1000"
        >
          <Carousel v-bind="settings" :breakpoints="breakpoints">
            <Slide
              
              v-for="image in intro?.images[0].url"
              :key="image.id"
            >
              <img
                :src="image"
                alt=""
                class="w-full  h-[300px] md:h-[550px] object-cover rounded-b-none rounded-lg"
              />

              <div
                class="absolute dark:bg-[#08072b] dark:bg-opacity-60 rounded-lg w-full h-[40%] rounded-t-none flex justify-center bg-[#272626] bg-opacity-70 bottom-0"
              >
                <p
                  class="text-lg overflow-hidden text-center w-[75%] leading-[70px] font-fractul pt-10 justify-center"
                >
                  <span
                    v-for="(char, index) in formattedText"
                    :key="index"
                    class="inline-block text-5xl uppercase"
                    :style="{ 'animation-delay': `${index * 0.1}s` }"
                    :class="{ revealed: char !== '\u00A0' }"
                    >{{ char }}
                  </span>
                </p>
              </div>
            </Slide>
            <template #addons>
              <Pagination />
            </template>
          </Carousel>
        </div>
        <!-- componet two -->
        <Delicious />
      </div>
    </div>
    <div class="flex justify-center">
      <input type="file" ref="fileInput" multiple accept="image/*" />
    </div>
    <Footer />
  </div>
</template>

<script setup>
const value = ref(5);
const page = ref(1);
const items = ref(Array(55));
const QUERY_USER = gql`
  query MyQuery {
    recipe {
      id
      title
      description
      is_liked
      is_booked
      ingredients {
        id
        name
      }
      preparetion_time
      instructions {
        id
        instruction
      }
      avarage_rating
      images {
        id
        url
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      bookmarks_aggregate {
        aggregate {
          count
        }
      }
      comments_aggregate(where: { comment: { _gt: "0" } }) {
        aggregate {
          count
        }
      }
    }
  }
`;

const INTROQUERY = gql`
  query MyQuery {
    images(where: { id: { _eq: 30 } }) {
      id
      url
    }
  }
`;

const { result, refetch, onDone } = useQuery(QUERY_USER);
const { result: intro } = useQuery(INTROQUERY);

const originalText =
  "Feel free to share any recipe and explore our collection of delicious dishes!";
const formattedText = ref([]);

onMounted(() => {
  const letters = originalText.split("");
  const formatted = [];
  letters.forEach((letter, index) => {
    if (letter === " ") {
      // Add a non-breaking space for spaces
      formatted.push("\u00A0");
    } else {
      formatted.push(letter);
    }
  });
  formattedText.value = formatted;
});

const settings = {
  itemsToShow: 1,
  priority: 1,
  snapAlign: "center",
  

  autoplaySpeed: 1000000,
};

const breakpoints = {
  768: {
    itemsToShow: 1,
  },
  1024: {
    itemsToShow: 1,
  },
};

definePageMeta({
  middleware: "auth",
});
</script>
<style scoped>
input[type="file"] {
  display: none;
}
.file-upload {
  border: 1px solid #15068b;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  background: #0a581e;
  color: white;
  border-radius: 10px;
}

@keyframes reveal {
  0% {
    color: rgb(253, 0, 0);
  }
  20% {
    color: rgb(172, 97, 0);
  }
  40% {
    color: rgb(8, 81, 8);
  }
  50% {
    color: rgb(0, 55, 149);
  }
  75% {
    color: rgb(57, 0, 111);
  }
  100% {
    color: rgb(89, 255, 0);
  }

  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}

span {
  animation: reveal 10s forwards infinite;
  opacity: 0;
}

.reveal {
  color: green;
}
</style>
