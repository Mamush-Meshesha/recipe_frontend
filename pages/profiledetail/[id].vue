<script setup>
import { Cloudinary } from "@cloudinary/url-gen";
import { jwtDecode } from "jwt-decode";

const token = useCookie("accessToken").value;
const decoded = jwtDecode(token);
const userId = parseInt(
  decoded["https://hasura.io/jwt/claims"]["x-hasura-user-id"]
);


const toast = useToast();
const route = useRoute();
const idds = route.params.id;

const showEditPage = ref(false);


const prep_time = ref("");
const ingredient = ref("");
const ingredients = ref([]);
const instruction = ref("");
const instructions = ref([]);
const imageUrl = ref("");

const overlayModel = ref(false);
const showDirectionOverlay = ref(false);
// cloudinary image upload

const selectedFile = ref(null);
const cloudName = "dmjtytstd";
const apiKey = process.env.VUE_APP_CLOUDINARY_API_KEY;
const apiSecret = process.env.VUE_APP_CLOUDINARY_API_SECRET;

const cld = new Cloudinary({
  cloud: {
    cloudName: cloudName,
    apiKey: apiKey,
    apiSecret: apiSecret,
  },
});
const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];
};

const uploadImage = (event) => {
  if (selectedFile.value) {
    const formData = new FormData();
    formData.append("file", selectedFile.value);
    formData.append("upload_preset", "mam-upload");

    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("uploaded successfully", data.secure_url);
        imageUrl.value = data.secure_url;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log("no file selected");
  }
};
// ingredient
const addIngredient = () => {
  ingredients.value.push({
    id: Math.floor(Math.random() * 1000000),
    text: ingredient.value,
  });
  ingredient.value = "";
  overlayModel.value = false;
};
// direction

const addDirection = () => {
  instructions.value.push({
    id: Math.floor(Math.random() * 1000000),
    direct: instruction.value,
  });
  showDirectionOverlay.value = false;
  instruction.value = "";
};

// catagories

const isOpen = ref(false);
const selectedOption = ref(null);

const options = [
  { value: "1", text: "seafood" },
  { value: "2", text: "soup" },
  { value: "3", text: "panacake" },
  { value: "4", text: "meat" },
  { value: "5", text: "chicken" },
  { value: "1", text: "fast food" },
  { value: "2", text: "pasta" },
  { value: "3", text: "pizza" },
  { value: "4", text: "cake" },
  { value: "5", text: "pastries" },
  { value: "1", text: "burder" },
  { value: "2", text: "vegan" },
  { value: "3", text: "desert" },
  { value: "4", text: "smoothies" },
  { value: "5", text: "breakfast" },
  { value: "1", text: "salad" },
  { value: "2", text: "sandwitches" },
  { value: "3", text: "waffles" },
  { value: "4", text: "ramens" },
  { value: "5", text: "dips" },
];

const selectOption = (value) => {
  selectedOption.value = value;
  isOpen.value = false;
};

const EDIT_QUERY = gql`
  query MyQuery($id: Int!) {
    recipe(where: { id: { _eq: $id } }) {
      title
      description
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
    }
  }
`;
const { result, refetch } = useQuery(EDIT_QUERY, { id: idds });
const title = ref(result.value?.recipe[0]?.title);
const description = ref(result.value?.recipe[0]?.description);


const MUTATION_DELETE_RECIPE = gql`
  mutation deleteRecipe($recipe_id: Int!, $user_id: Int!) {
    delete_recipe(where: { id: { _eq: $recipe_id }, user_id: { _eq: $user_id } }) {
      affected_rows
    }
  }
`;

const { mutate: deleteRecipe } = useMutation(MUTATION_DELETE_RECIPE, { variables: { user_id: userId }});

const handleDeleteRecipe = async (recipe_id) => {
  try {
    await deleteRecipe({
      recipe_id: idds,
    });
    toast.add({
      severity: "Success",
      summary: "Success Message",
      detail: "Successfully deleted the recipe",
      life: 3000,
    });
    return;
  } catch (error) {
    console.error(error);
  }
};

// update the recipe

const ingredientNames = ingredients.value.map((ingredient) => ingredient.text);
const ingredientString = ingredientNames.join(",");

const MUTATION_UPDATE_RECIPE = gql`
  mutation updateTheRecipe(
    $preparetion_time: Int!
    $title: String!
    $description: String!
    $instruction: String!
    $ing_name: String!
    $url: String!
    $recipe_id: Int!
    $id: Int!
    $cat_name: String!
  ) {
    update_recipe(
      where: { id: { _eq: $id } }
      _set: {
        title: $title
        preparetion_time: $preparetion_time
        description: $description
      }
    ) {
      affected_rows
    }
    update_instructions(
      where: { recipe_id: { _eq: $recipe_id } }
      _set: { instruction: $instruction }
    ) {
      affected_rows
    }
    update_ingredients(
      where: { recipe_id: { _eq: $recipe_id } }
      _set: { name: $ing_name }
    ) {
      affected_rows
    }
    update_images(
      where: { recipe_id: { _eq: $recipe_id } }
      _set: { url: $url }
    ) {
      affected_rows
    }
    update_catagories(where: {}, _set: { name: $cat_name }) {
      affected_rows
    }
  }
`;

const { mutate: updateTheRecipe } = useMutation(MUTATION_UPDATE_RECIPE);

const handleUpdateTheRecipe = async (recipe_id) => {
  try {
    // if (!selectedOption.value) {
    //   console.log("Please select a catagory");
    //   return;
    // }
    const selectedCategory = options.find(
      (option) => option.value === selectedOption.value
    );
    const categoryName = selectedCategory ? selectedCategory.text : "";

    const ingredientNames = ingredients.value.map(
      (ingredient) => ingredient.text
    );

    const ingredientString = ingredientNames.join(",");
    const instructionText = instructions.value.map(
      (instruction) => instruction.direct
    );
    const instructionString = instructionText.join(",");
    await updateTheRecipe({
      title: title.value,
      description: description.value,
      preparetion_time: prep_time.value,
      ing_name: ingredientString,
      instruction: instructionString,
      url: imageUrl.value,
      recipe_id: idds,
      id: idds,
      cat_name: categoryName,
    });
  } catch (error) {
    console.log(error);
  }
};

definePageMeta({
  middleware: "auth",
});


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
</script>
<template>
  <div class="dark:bg-[#040721] h-auto transition-colors ease-in-out duration-1000">
    <Header />
    <div class="mx-auto container relative">
      <div class="flex gap-4">
        <Icon name="iconamoon:edit-thin" class="text-4xl text-[#1a9599]" />
        <h1
          class="text-4xl pb-6 bg-gradient-to-tr from-[#679388] via-[#643f60] to-[#1f458b] inline-block text-transparent bg-clip-text"
        >
          Would like to edit your recipe?
        </h1>
      </div>
      <div
        v-for="rec in result?.recipe"
        :key="rec.id"
        class="w-full h-auto pb-10"
      >
        <p class="dark:text-white capitalize px-5 text-2xl font-bold py-6">
          {{ rec.title }}
        </p>
        <p class="dark:text-white text-xl py-2">
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
        <div class="md:grid md:grid-cols-2 py-6 gap-10">
          <div>
            <h1 class="text-2xl pt-4 px-2 dark:text-white">Ingredients</h1>
            <div v-for="ingredient in rec.ingredients[0].name" :key="ingredient.id">
              <div class="flex gap-2 items-center px-5">
                <Icon
                  name="icon-park-solid:correct"
                  class="text-xl dark:text-[#228556]"
                />
                <li class="dark:text-white list-none px-5 py-6">
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
                <li class="dark:text-white list-none px-5 py-6">
                  {{ ingredient}}
                </li>
              </div>
            </div>
          </div>
        </div>
        <div
          class="border-t justify-center pt-10 flex flex-col md:px-52 gap-6 w-full"
        >
        <Toast />
          <Button
            @click="showEditPage = true"
            class="bg-[#17b52a] text-white justify-center rounded-full py-3"
          >
            Edit recipe
          </Button>
          <Button
            @click="handleDeleteRecipe"
            class="px-5 bg-[#b21f1f] text-white justify-center py-3 rounded-full"
          >
            Delete recipe
          </Button>
        </div>
      </div>
      <!-- edit pages -->
     <Transition name="slide-fade">
       <div
        v-if="showEditPage"
        class="absolute bottom-0 z-40  bg-[#3e9dc2] border shadow-lg rounded-lg rounded-b-none px-16"
      >
        <div class="container mx-auto pt-10">
          <div class="md:grid md:grid-cols-2 gap-10">
            <div class="bg-[#FFF2DE] p-6 rounded-md">
              <div>
                <input
                  v-model="title"
                  type="text"
                  placeholder="Title of recipe"
                  class="px-3 w-full bg-transparent border-b-2 text-2xl outline-none"
                />
              </div>
              <div class="grid grid-cols-2 py-6 items-center relative">
                <div class="flex gap-3 items-center">
                  <Icon
                    name="carbon:category-new"
                    class="text-3xl text-[#17b69b]"
                  />

                  <div>
                    <div class="relative">
                      <select
                        v-model="selectedOption"
                        class="text-xl w-[80%] border px-3 h-12 rounded-md"
                      >
                        <option value="select" disabled selected>
                          Select an Option
                        </option>

                        <option
                          v-for="option in options"
                          :key="option.value"
                          :value="option.value"
                        >
                          {{ option.text }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="flex gap-4 items-center">
                  <Icon name="tdesign:time" class="text-2xl text-[#17b69b]" />
                  <input
                    v-model="prep_time"
                    type="number"
                    placeholder="Preparetion time"
                    class="text-2xl w-[85%] outline-none bg-transparent py-2 border-b-2"
                  />
                </div>
              </div>
              <!-- descriptions -->
              <div class="pt-14">
                <div>
                  <textarea
                    v-model="description"
                    placeholder="Descriptions about your recipes"
                    class="h-[200px] p-3 outline-[#51bbbe] border border-[#51bbbe] rounded-md w-full bg-transparent"
                  ></textarea>
                </div>
              </div>
              <!-- ingredients -->
              <div class="pt-14">
                <div class="relative">
                  <h1 class="text-6xl font-sacre border-b">ingredients</h1>

                  <div class="py-10">
                    <div
                      v-for="grad in ingredients"
                      :key="grad.id"
                      class="py-3"
                    >
                      <div class="flex gap-3">
                        <Icon
                          name="icon-park-outline:check-correct"
                          class="text-2xl text-[#23cc48]"
                        />
                        <h1>
                          {{ grad.text }}
                        </h1>
                      </div>
                    </div>
                    <div v-if="overlayModel">
                      <div
                        class="absolute w-[70%] border z-50 rounded-lg ml-[40%] bg-[#7dac9a] opacity-90 flex justify-center items-center py-16 shadow-lg mt-10 h-[100%] top-0 left-0"
                      >
                        <div class="flex flex-col w-full px-7">
                          <ol>
                            <li class="py-3">
                              <input
                                v-model.trim="ingredient"
                                type="text"
                                placeholder="Enter your ingredients"
                                class="w-full outline-[#31b4db] h-12 border px-3 rounded-md border-[#2cb8e2]"
                              />
                              <!-- <p v-if="errormessage" class="text-red-500">
                                {{ errormessage }}
                              </p> -->
                            </li>
                          </ol>

                          <div class="flex justify-between">
                            <button
                              @click="addIngredient"
                              class="text-white bg-[#52d117] px-3 py-1 rounded-md"
                            >
                              add ingredients
                            </button>
                            <button
                              @click="overlayModel = false"
                              class="text-white px-3 py-1 rounded-md bg-[#af1616]"
                            >
                              close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex gap-2 items-center">
                    <Icon name="flat-color-icons:plus" class="text-3xl" />
                    <button
                      @click="overlayModel = true"
                      class="text-[#28e221] text-2xl"
                    >
                      Have new ingredients ?
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="relative">
              <h1 class="text-6xl font-sacre border-b">direction</h1>
              <div>
                <div
                  v-for="(direction, index) in instructions"
                  :key="direction.id"
                  class="py-2"
                >
                  <div class="flex gap-3">
                    <h1 class="text-2xl text-[#1d21df]">{{ index + 1 }} .</h1>
                    <h1 class="text-2xl">
                      {{ direction.direct }}
                    </h1>
                  </div>
                </div>
              </div>
              <div v-if="showDirectionOverlay">
                <div
                  class="w-[70%] absolute bg-[#234770] opacity-90 z-50 right-0 top-0 border rounded-md h-[40%] mt-20"
                >
                  <div class="p-5 h-full">
                    <textarea
                      v-model="instruction"
                      placeholder="write your directions"
                      class="h-[70%] outline-[#40e6cf] w-full rounded-md"
                    ></textarea>
                    <!-- <p v-if="mesage_error" class="text-red-500">
                      {{ mesage_error }}
                    </p> -->
                    <div class="flex justify-between">
                      <button
                        @click="addDirection"
                        class="text-white bg-[#52d117] px-3 py-1 rounded-md"
                      >
                        add direction
                      </button>
                      <button
                        @click="showDirectionOverlay = false"
                        class="text-white bg-[#c91cc0] px-3 py-1 rounded-md"
                      >
                        close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex gap-2 items-center pt-6">
                <Icon name="flat-color-icons:plus" class="text-3xl" />
                <button
                  @click="showDirectionOverlay = true"
                  class="text-[#28e221] text-2xl"
                >
                  Have new directions ?
                </button>
              </div>
            </div>
          </div>
          <!-- kimage -->
          <div class="relative">
            <div class="py-6">
              <label class="file-upload">
                <input
                  type="file"
                  :auto="true"
                  @change="handleFileUpload"
                  accept="image/*"
                />
                <div class="flex gap-3 py-1 items-center">
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.5"
                      d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
                      stroke="#1fff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 16V3M12 3L16 7.375M12 3L8 7.375"
                      stroke="#fff"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <h1>Choose</h1>
                  <button
                    @click="uploadImage"
                    class="px-2 py-1 bg-[#24803e] text-white rounded-md"
                  >
                    upload
                  </button>
                </div>
              </label>
            </div>
            <div class="right-0 mb-[20px] mr-20 bottom-0 absolute">
              <Toast />
              <Button
                @click="handleUpdateTheRecipe"
                severity="success"
                class="px-12 py-2 bg-[#096777] text-white rounded-md"
              >
                Post
              </Button>
              <Button
                class="px-12 py-2 bg-[#99461f] text-white rounded-md ml-10"
                @click="showEditPage = false"
                >cancel</Button
              >
            </div>
          </div>
        </div>
      </div>
     </Transition>
    </div>
    <Footer />
  </div>
</template>

<style>
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