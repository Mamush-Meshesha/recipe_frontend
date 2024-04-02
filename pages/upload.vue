<script setup>
import { Cloudinary } from "@cloudinary/url-gen";

const toast = useToast();
const errormessage = ref("");
const ingredient = ref("");
const ingredients = ref([]);
const imageUrl = ref([]);
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
  selectedOPtion.value = value;
  isOpen.value = false;
};

// const selectedFile = ref(null);
const cloudName = "dmjtytstd";
const apikey = process.env.VUE_APP_CLOUDINARY_API_KEY;
const apiSecret = process.env.VUE_APP_CLOUDINARY_API_SECRET;

const cld = new Cloudinary({
  cloud: {
    cloudName: cloudName,
    apiKey: apikey,
    apiSecret: apiSecret,
  },
});
const selectedFiles = ref([]);
const handleFileUpload = (event) => {
  const files = event.target.files;
  if (files) {
    const newFiles = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    selectedFiles.value = [...selectedFiles.value, ...newFiles];
  }
};

const uploadImages = () => {
  if (selectedFiles.value.length > 0) {
    const promises = selectedFiles.value.map((fileObj) => {
      const formData = new FormData();
      formData.append("file", fileObj.file);
      formData.append("upload_preset", "mam-upload");

      return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("uploaded successfully", data.secure_url);
          // Push the new URL into the imageUrl array
          imageUrl.value.push(data.secure_url);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          return null;
        });
    });

    Promise.all(promises)
      .then((results) => {
        console.log("All images uploaded:", results);
        // Handle the array of uploaded image URLs
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
      });
       toast.add({
    severity: "success",
    summary: "Success",
    detail: "images uploaded successfully",
    life: 3000,
  });
  } else {
    console.log("No files selected");
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "No image selected",
      life: 3000,
    })
  }
};
//mutations
const descriptions = ref("");
const preparetion_time = ref("");
const title = ref("");
const ingredientNames = ingredients.value.map((ingredient) => ingredient.text);
const ingredientString = ingredientNames.join(", ");

const MUTATION_UPLOAD = gql`
  mutation recipePost(
    $name: String!
    $description: String!
    $url: [String!]!
    $name1: [String!]
    $instruction: [String!]!
    $preparetion_time: Int!
    $title: String!
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

const { mutate: recipePost } = useMutation(MUTATION_UPLOAD);

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
      url: imageUrl.value,
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
  <div class="overflow-x-hidden dark:bg-[#1E293B] transition-colors ease-in-out duration-1000">
    <Header />
    <img
      src="https://imageproxy.wolt.com/venue/6232faaafd94b762808350de/ebcc50b6-a903-11ec-8d84-92cd96cd4d02_habib3.jpg"
      alt="image not avaliable"
      class="object-cover w-full mt-[-88px] h-[360px]"
    />
    <div class="container mx-auto pt-10">
      <div class="sm:grid sm:grid-cols-2 gap-10">
        <div class="bg-[#e4dfd7] dark:bg-[#293548] transition-colors ease-in-out duration-1000 dark:text-white p-6 rounded-md">
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
                    v-model="selectedOPtion"  placeholder="select catagory"
                    class="text-xl w-[80%] border dark:text-black px-3 h-12 rounded-md"
                  >
                    <option value="" class="dark:text-black" selected>Select an Option</option>

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
                v-model="preparetion_time"
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
                v-model="descriptions"
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
                <div v-for="grad in ingredients" :key="grad.id" class="py-3">
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
                            class="w-full outline-[#31b4db] h-14 border px-3 dark:bg-[#313131] rounded-md border-[#2cb8e2]"
                          />
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
        <div class="relative sm:px-0 px-5 dark:text-white">
          <h1 class="text-6xl dark:text-white font-sacre border-b">direction</h1>
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
          <div v-if="showDirectionOverlay">
            <div
              class="w-[70%] absolute bg-[#234770] opacity-90 z-50 right-0 top-0 border rounded-md h-[40%] mt-20"
            >
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
      <!-- image -->
      <div>
        <div class="py-6 sm:px-0 px-5">
          <label class="file-upload">
            <div>
              <input
                type="file"
                ref="fileInput"
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
                @click="uploadImages"
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
  background: #0a581e;
  color: white;
  border-radius: 10px;
}
</style>
