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
const selectedOption = ref(null);

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
    delete_recipe(
      where: { id: { _eq: $recipe_id }, user_id: { _eq: $user_id } }
    ) {
      affected_rows
    }
  }
`;

const { mutate: deleteRecipe } = useMutation(MUTATION_DELETE_RECIPE, {
  variables: { user_id: userId },
});

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

// const toast = useToast();
const errormessage = ref("");
const ingredient = ref("");
const ingredients = ref([]);

const CatagoryNames = ref("");
const overlayModel = ref(false);
const addIngradient = () => {
  if (ingredient.value.length < 3) {
    return (errormessage.value = "you have to write ingredients name");
  }
  ingredients.value.push({
    id: Math.floor(Math.random() * 1000000),
    text: ingredient.value,
  });
  ingredient.value = "";
  overlayModel.value = false;
};

// directions
const newdirection = ref("");
const directions = ref([]);
const mesage_error = ref("");
const showDirectionOverlay = ref(false);

const addDirection = () => {
  if (newdirection.value.length < 10) {
    return (mesage_error.value =
      "you have to write directions of atleast 10 characters");
  }
  directions.value.push({
    id: Math.floor(Math.random() * 1000000),
    derect: newdirection.value,
  });
  showDirectionOverlay.value = false;
  newdirection.value = "";
};

// catagory
const isOpen = ref(false);
const selectedOPtion = ref(null);

const options = [];

const selectOption = (value) => {
  selectedOPtion.value = value;
  isOpen.value = false;
};
const imageUrls = ref([]);
// const selectedFile = ref(null);
const fileInput = ref([]);
const selectedFiles = ref([]);
const handleFileUpload = (event) => {
  const files = event.target.files;
  if (files) {
    const newFiles = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    selectedFiles.value = [...selectedFiles.value, ...newFiles];
    console.log(selectedFiles.value);
  }
};

const handleImageUpload = async () => {
  try {
    const fileDataArray = await Promise.all(
      selectedFiles.value.map(async (file) => {
        console.log(file);
        const base64String = await convertFileToBase64(file.file);
        return {
          name: file.file.name,
          base64str: base64String,
          type: file.file.type,
        };
      })
    );

    let images = [];
    for (const fileData of fileDataArray) {
      images = [
        ...images,
        {
          name: fileData.name,
          base64str: fileData.base64str,
          type: fileData.type,
        },
      ];
    }

    const result = await image_upload({
      images: [...images],
    });
    if (!result || !result.data) {
      console.error("Error uploading files:", result);
      alert("An error occurred while trying t ");
    }

    imageUrls.value = [...result.data?.fileUpload.image_urls];

    console.log(imageUrls.value); // Output the image URLs for verification
  } catch (error) {
    console.error("Error uploading files:", error);
  }
};

const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
  });
};
//mutations
const descriptions = ref("");
const preparetion_time = ref("");
// const title = ref("");
const ingredientNames = ingredients.value.map((ingredient) => ingredient.text);
const ingredientString = ingredientNames.join(", ");

const MUTATION_IMAGES = gql`
  mutation image_upload($images: [File!]) {
    fileUpload(images: $images) {
      image_urls
    }
  }
`;

const { mutate: image_upload } = useMutation(MUTATION_IMAGES);

const MUTATION_INSERT = gql`
  mutation recipePost(
    $name: String!
    $description: String!
    $name1: [String!]
    $instruction: [String!]!
    $preparetion_time: Int!
    $title: String!
    $url: [String!]
  ) {
    insert_recipe_one(
      object: {
        catagories: { data: { name: $name } }
        description: $description
        images: { data: { url: $url } }
        ingredients: { data: { name: $name1 } }
        instructions: { data: { instruction: $instruction } }
        preparetion_time: $preparetion_time
        title: $title
      }
    ) {
      description
      id
      images {
        url
      }
      ingredients {
        name
      }
      instructions {
        instruction
      }
      preparetion_time
      title
    }
  }
`;

const { mutate: recipePost } = useMutation(MUTATION_INSERT);

const handleRecipeUpload = async () => {
  try {
    if (!selectedOPtion.value) {
      console.error("Please select a category before uploading.");
    }
    const selectedCategory = options.find(
      (option) => option.value === selectedOPtion.value
    );
    const categoryName = selectedCategory ? selectedCategory.text : "";
    const ingredientNames = ingredients.value.map(
      (ingredient) => ingredient.text
    );
    const ingredientString = ingredientNames.join(", ");

    const instructionTexts = directions.value.map(
      (direction) => direction.derect
    );
    const instructionString = instructionTexts.join(", ");

    await recipePost({
      name: categoryName,
      description: descriptions.value,
      url: imageUrls.value,
      name1: ingredientNames,
      instruction: instructionTexts,
      preparetion_time: preparetion_time.value,
      title: title.value,
    });

    toast.add({
      severity: "success",
      summary: "Success",
      detail: "recipe successfully posted",
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Error uploading recipe",
      life: 3000,
    });
    console.log(error);
  }
};
const showSuccess = () => {
  toast.add({
    severity: "success",
    summary: "Success Message",
    detail: "Message Content",
    life: 3000,
  });
};
</script>
<template>
  <div
    class="dark:bg-[#040721] overflow-hidden relative h-auto transition-colors ease-in-out duration-1000"
  >
    <Header />
    <div class="mx-auto container">
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
            <div
              v-for="ingredient in rec.ingredients[0].name"
              :key="ingredient.id"
            >
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
            <div
              v-for="ingredient in rec.instructions[0].instruction"
              :key="ingredient.id"
            >
              <div class="flex gap-2 items-center px-5">
                <div>
                  <Icon
                    name="icon-park-solid:correct"
                    class="text-xl dark:text-[#228556]"
                  />
                </div>
                <li class="dark:text-white list-none px-5 py-6">
                  {{ ingredient }}
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
      <Transition
        name="slide-fade"
        class="absolute bg-[#070e17] dark:bg-[#000] h-full left-0 text-white opacity-90 z-40 right-0 top-0 w-[100vw] rounded-md"
      >
        <div
          class="w-[100%] h-[50%] flex justify-center items-center"
          v-if="showEditPage"
        >
          <div class="border p-3 relative rounded-lg">
            <div>
              <button @click="showEditPage = false">
                <Icon
                  name="gala:remove"
                  class="text-3xl absolute top-0 right-0 mt-4 mr-4 text-[#fe2121]"
                />
              </button>
            </div>
            <div class="">
              <div
                class="dark:bg-[#293548] transition-colors ease-in-out duration-1000 dark:text-white p-6 rounded-md"
              >
                <div class="">
                  <div
                    class="flex sm:justify-between flex-col sm:flex-row gap-10"
                  >
                    <div>
                      <input
                        v-model="title"
                        type="text"
                        placeholder="Title of recipe"
                        class="px-3 w-full bg-transparent border-b-2 text-2xl outline-none"
                      />
                    </div>
                    <div class="">
                      <div class="flex gap-3 items-center">
                        <Icon
                          name="carbon:category-new"
                          class="text-3xl text-[#17b69b]"
                        />

                        <div>
                          <div class="relative">
                            <Catacom v-model="CatagoryNames" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- descriptions -->
                  <div class="pt-14"></div>

                  <div class="flex gap-4 items-center">
                    <Icon name="tdesign:time" class="text-2xl text-[#17b69b]" />
                    <input
                      v-model="preparetion_time"
                      type="number"
                      placeholder="Preparetion time"
                      class="text-2xl outline-none bg-transparent py-2 border-b-2"
                    />
                  </div>
                  <div>
                    <textarea
                      v-model="descriptions"
                      placeholder="Descriptions about your recipes"
                      class="h-[200px] p-3 outline-[#51bbbe] border text-black border-[#51bbbe] rounded-md w-full bg-transparent"
                    ></textarea>
                  </div>
                  <!-- ingredients -->
                </div>

                <div
                  class="flex sm:justify-between flex-col sm:flex-row gap-10 py-6"
                >
                  <div class="w-[50%]">
                    <div class="">
                      <h1 class="sm:text-6xl text-3xl font-fractul border-b">
                        ingredients
                      </h1>

                      <div class="py-10 relative">
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
                            <div v-if="grad.id">
                              <h1>
                                {{ grad.text }}
                              </h1>
                            </div>
                            <div v-else>
                              <h1 class="text-[#030303]">no ingredient</h1>
                            </div>
                          </div>
                        </div>
                        <Transition
                          name="slide-fade"
                          class="absolute bg-[#234770] dark:bg-[#3E858C] h-[40vh] flex justify-center items-center opacity-90 z-40 right-0 top-0 border w-[40vw] rounded-md mt-20"
                        >
                          <div v-if="overlayModel">
                            <div
                              class="w-[90%] h-[90%] flex items-center justify-center"
                            >
                              <div class="flex flex-col w-full px-7">
                                <ol>
                                  <li class="py-3">
                                    <textarea
                                      v-model.trim="ingredient"
                                      placeholder="Enter your ingredients"
                                      class="w-full outline-[#31b4db] h-[140px] text-black dark:text-white border p-3 dark:bg-[#313131] rounded-md border-[#2cb8e2]"
                                    >
                                    </textarea>
                                    <p v-if="errormessage" class="text-red-500">
                                      {{ errormessage }}
                                    </p>
                                  </li>
                                </ol>

                                <div class="flex flex-col gap-2">
                                  <button
                                    @click="addIngradient"
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
                        </Transition>
                      </div>
                      <div class="flex gap-2 items-center">
                        <Icon name="flat-color-icons:plus" class="text-3xl" />
                        <button
                          @click="overlayModel = true"
                          class="text-[#28e221] text-2xl"
                        >
                          add
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="border-r"></div>
                  <div class="w-[50%] relative sm:px-0 dark:text-white">
                    <h1
                      class="sm:text-6xl text-3xl dark:text-white font-fractual border-b"
                    >
                      Instructions
                    </h1>
                    <div>
                      <div
                        v-for="(direction, index) in directions"
                        :key="direction.id"
                        class="py-2"
                      >
                        <div class="flex gap-3">
                          <h1 class="text-2xl text-[#1d21df]">
                            {{ index + 1 }} .
                          </h1>
                          <h1 class="text-2xl">
                            {{ direction.derect }}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <Transition
                      name="slide-fade"
                      class="absolute bg-[#234770] dark:bg-[#32868c] w- h-[50vh] mr-[-300px] flex justify-center items-center opacity-90 z-40 right-0 top-0 w-[50vw] rounded-md mt-20"
                    >
                      <div v-if="showDirectionOverlay">
                        <div class="w-[90%] h-[80%]">
                          <div class="p-5 h-full">
                            <textarea
                              v-model="newdirection"
                              placeholder="write your directions"
                              class="h-[70%] outline-[#40e6cf] w-full dark:bg-[#464545] text-black dark:text-white p-3 rounded-md"
                            ></textarea>
                            <p v-if="mesage_error" class="text-red-500">
                              {{ mesage_error }}
                            </p>
                            <div class="flex flex-col gap-2">
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
                    </Transition>
                    <div class="flex gap-2 items-center pt-6">
                      <Icon name="flat-color-icons:plus" class="text-3xl" />
                      <button
                        @click="showDirectionOverlay = true"
                        class="text-[#28e221] text-2xl"
                      >
                        add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- ingredients -->
            </div>
            <!-- image -->
            <div>
              <div class="py-6 sm:px-0 px-5">
                <label class="file-upload">
                  <div>
                    <input
                      type="file"
                      ref="imageUrls"
                      multiple
                      @change="handleFileUpload"
                      accept="image/*"
                    />
                  </div>

                  <div class="flex gap-3 py-1 items-center">
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <!-- SVG path for the upload icon -->
                    </svg>
                    <h1>Choose</h1>
                    <Toast />
                    <Button
                      @click="handleImageUpload"
                      class="px-2 py-1 bg-[#24803e] text-white rounded-md"
                    >
                      Upload
                    </Button>
                  </div>
                </label>
                <div class="grid grid-cols-9 w-auto gap-2 pt-6">
                  <div v-for="(file, index) in selectedFiles" :key="index">
                    <div
                      class="py-4 flex justify-center border-dashed border rounded-md border-[#1d7fa9]"
                    >
                      <img
                        :src="file.url"
                        :alt="file.name"
                        class="w-[100px] h-[100px] object-cover rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="float-right">
                <Toast />
                <Button
                  @click="handleRecipeUpload"
                  severity="success"
                  class="px-12 py-2 bg-[#096777] text-white rounded-md"
                >
                  Post
                </Button>
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
@cloudinary/url-gen/index
