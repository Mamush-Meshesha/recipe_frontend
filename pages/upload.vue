<script setup>
const toast = useToast();
const errormessage = ref("");
const ingredient = ref("");
const ingredients = ref([]);

const Catagory = ref("");
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
const catagory = ref("");
const descriptions = ref("");
const preparetion_time = ref("");
const title = ref("");
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
    $catagory_name: String!
    $description: String!
    $name1: [String!]
    $instruction: [String!]!
    $preparetion_time: Int!
    $title: String!
    $url: [String!]
  ) {
    insert_recipe_one(
      object: {
        description: $description
        images: { data: { url: $url } }
        ingredients: { data: { name: $name1 } }
        instructions: { data: { instruction: $instruction } }
        preparetion_time: $preparetion_time
        title: $title
        catagory: { data: { name: $catagory_name } }
      }
    ) {
      description
      id
      images(where: {}) {
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
    // if (!selectedOPtion.value) {
    //   console.error("Please select a category before uploading.");
    // }
    // const selectedCategory = options.find(
    //   (option) => option.value === selectedOPtion.value
    // );
    // const categoryName = selectedCategory ? selectedCategory.text : "";
    const ingredientNames = ingredients.value.map(
      (ingredient) => ingredient.text
    );
    const ingredientString = ingredientNames.join(", ");

    const instructionTexts = directions.value.map(
      (direction) => direction.derect
    );
    const instructionString = instructionTexts.join(", ");

    await recipePost({
      catagory_name: Catagory.value,
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
    class="overflow-x-hidden dark:bg-[#1E293B] relative transition-colors ease-in-out duration-1000"
  >
    <Header />
    <!-- <img
      src="https://imageproxy.wolt.com/venue/6232faaafd94b762808350de/ebcc50b6-a903-11ec-8d84-92cd96cd4d02_habib3.jpg"
      alt="image not avaliable"
      class="object-cover w-full mt-[-88px] h-[360px]"
    /> -->
    <div class="container mx-auto pt-2">
      <div class="">
        <div
          class="dark:bg-[#293548] transition-colors ease-in-out duration-1000 dark:text-white p-6 rounded-md"
        >
          <div class="">
            <div class="flex sm:justify-between flex-col sm:flex-row gap-10">
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
                      <!-- <Catacom v-model="CatagoryNames" /> -->
                      <input v-model="Catagory" type="text" placeholder="Catagory names" class="h-12 outline-none border rounded-md px-3">
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
                class="h-[200px] p-3 outline-[#51bbbe] border border-[#51bbbe] rounded-md w-full bg-transparent"
              ></textarea>
            </div>
            <!-- ingredients -->
          </div>

          <div class="flex sm:justify-between flex-col sm:flex-row gap-10 py-6">
            <div class="w-[50%]">
              <div class="">
                <h1 class="sm:text-5xl text-3xl font-fractul border-b">
                  ingredients
                </h1>

                <div class="pt-10">
                  <div v-for="grad in ingredients" :key="grad.id" class="py-3">
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
                    class="absolute bg-[#234770] dark:bg-[#000] h-[100vh] flex justify-center items-center opacity-90 z-40 right-0 top-0 border w-[100vw] rounded-md mt-20"
                  >
                    <div v-if="overlayModel">
                      <div
                        class="w-[50%] h-[50%] border flex items-center justify-center"
                      >
                        <div class="flex flex-col w-full px-7">
                          <ol>
                            <li class="py-3">
                              <textarea
                                v-model.trim="ingredient"
                                placeholder="Enter your ingredients"
                                class="w-full outline-[#31b4db] h-[140px] border p-3 dark:bg-[#313131] rounded-md border-[#2cb8e2]"
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
            <div class="w-[50%] sm:px-0 dark:text-white">
              <h1
                class="sm:text-5xl text-3xl dark:text-white font-fractul border-b"
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
                    <h1 class="text-2xl text-[#1d21df]">{{ index + 1 }} .</h1>
                    <h1 class="text-2xl">
                      {{ direction.derect }}
                    </h1>
                  </div>
                </div>
              </div>
              <Transition
                name="slide-fade"
                class="absolute bg-[#234770] dark:bg-[#000] w- h-[100vh] flex justify-center items-center opacity-90 z-40 right-0 top-0 w-[100vw] rounded-md mt-20"
              >
                <div v-if="showDirectionOverlay">
                  <div class="w-[50%] h-[50%]">
                    <div class="p-5 h-full">
                      <textarea
                        v-model="newdirection"
                        placeholder="write your directions"
                        class="h-[70%] outline-[#40e6cf] w-full dark:bg-[#464545] p-3 rounded-md"
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
              <div class="flex gap-2 items-center pt-10">
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
                class="px-2 py-1 bg-[#096777] border text-white rounded-md"
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
    <Footer class="w-screen" />
  </div>
</template>

<style>
input[type="file"] {
  display: none;
}
.file-upload {
  border: 1px solid #15068b;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  background: #096777;
  color: white;
  border-radius: 10px;
}

.slide-fade-enter-active {
  transition: all 0.6s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translatey(10px);
  opacity: 0;
}
</style>
