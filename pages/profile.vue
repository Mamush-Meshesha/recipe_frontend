<template>
  <div class="dark:bg-[#040721] overflow-hidden relative transition-colors ease-in-out duration-1000">
    <div>
      <Header />
      <div class="container mx-auto">
        <div
          class="pb-6 border-b dark:border-[#393961] transition-colors ease-in-out duration-1000"
        >
          <div class="flex justify-between px-4 md:px-0 items-center">
            <h1
              class="text-4xl font-fractul dark:text-white transition-colors ease-in-out duration-1000  font-semibold capitalize"
            >
              profile
            </h1>
            <button
              @click="showProfile"
              class="px-9 py-2 bg-[#ff642f] dark:bg-[#3C4042] transition-colors ease-in-out duration-1000  text-white rounded-md"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <Transition   name="slide-fade" class="w-[100vw] top-0 overflow-hidden h-full  left-0 absolute opacity-80 z-40 bg-[#000000] transition-colors ease-in-out duration-1000 rounded-lg shadow-2xl  px-5 sm:px-0 ">
          <div class="flex justify-center items-center" v-if="editPro">
            <div class="w-[50%] h-[35%] mt-[-800px] relative opacity-100 rounded-lg bg-[#136463] flex justify-center border"
             
              
            >

           <button @click="showProfile">
             <Icon name="gala:remove" class="text-4xl mr-3 mt-3 absolute top-0 right-0 text-[#ff2727]"/>
           </button>
              <!-- profile upload -->
              <div class="pt-16 text-white" v-for="user in data.users" :key="user.id">
                <div
                  class="flex gap-4 justify-center px-6 md:justify-content-center"
                >
                  <Toast />
                  <div class="profile-upload">
                    <label for="profile-image">
                      <img
                        :src="user.url"
                        alt=""
                        class="md:w-[120px] md:h-[120px] w-[60px] h-[60px] border-2 rounded-full object-cover"
                      />
                    </label>
                    <input
                      type="file"
                      id="profile-image"
                      accept="image/*"
                      @change="handleFileUpload"
                    />
                  </div>
                  <div class="flex gap-6 items-center">
                    <button
                      @click="handleImageUpload"
                      class="mx:px-12 px-6 h-[40px] text-white items-center dark:bg-[#3C4042]  transition-colors ease-in-out duration-1000 bg-[#ff642f] rounded-md"
                    >
                      Change
                    </button>
                  </div>
                </div>
                <!-- profile details -->
                <div class="flex gap-10 flex-col pt-10 pl-8 sm:pl-0">
                  <div class="flex flex-col gap-8 relative">
                    <input
                      v-model="firstName"
                      type="text"
                      placeholder="First Name"
                      class="h-[50x] outline-none border-b dark:bg-transparent bg-transparent dark:text-white transition-colors ease-in-out duration-1000  px-10 py-1 text-xl"
                    />
                    <svg
                      class="absolute top-0 left-0 mt-[-5px] dark:text-white transition-colors ease-in-out duration-1000 "
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="currentColor"
                        d="M10.5 16a5.5 5.5 0 1 1 11 0a5.5 5.5 0 0 1-11 0M16 8a8 8 0 1 0 0 16a8 8 0 0 0 0-16m14.5 10a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m3.5-6a6 6 0 1 0 0 12a6 6 0 0 0 0-12m0 27c-2.176 0-3.922-.352-5.316-.922l.186-.24c.494-.651.873-1.303 1.163-1.921c1.02.355 2.316.583 3.966.583c4.276 0 6.173-1.533 7.063-2.831a5.55 5.55 0 0 0 .925-2.5a2.983 2.983 0 0 0 .012-.176v-.243c0-.69-.56-1.25-1.25-1.25h-9.886a5.73 5.73 0 0 0-1.255-2.5H40.75a3.75 3.75 0 0 1 3.75 3.75v.297l-.003.086c-.004.07-.01.164-.02.279a8.05 8.05 0 0 1-1.351 3.67C41.701 37.158 38.973 39 33.998 39M6.75 27A3.75 3.75 0 0 0 3 30.75v1.303l.004.097c.004.08.012.186.026.318c.029.262.084.622.192 1.05a8.686 8.686 0 0 0 1.5 3.112C6.479 38.946 9.826 41 16 41c6.175 0 9.522-2.054 11.277-4.37a8.687 8.687 0 0 0 1.501-3.113c.108-.427.163-.787.192-1.05a5.585 5.585 0 0 0 .03-.414V30.75A3.75 3.75 0 0 0 25.25 27zm-1.249 5.024l-.001-.032V30.75c0-.69.56-1.25 1.25-1.25h18.5c.69 0 1.25.56 1.25 1.25v1.242l-.001.032a5.189 5.189 0 0 1-.144.88a6.187 6.187 0 0 1-1.07 2.216c-1.182 1.56-3.71 3.38-9.285 3.38s-8.103-1.82-9.285-3.38a6.186 6.186 0 0 1-1.07-2.215a5.2 5.2 0 0 1-.144-.881"
                      />
                    </svg>
                  </div>
                  <div class="flex flex-col gap-8 relative">
                    <input
                      v-model="lastName"
                      type="text"
                      placeholder="Last name"
                      class="h-[50x] outline-none dark:bg-transparent transition-colors ease-in-out duration-1000 bg-transparent dark:text-white border-b px-10 py-1 text-xl"
                    />
                    <h1
                      class="text-xl absolute top-0 dark:bg-transparent dark:text-white left-0 mt-1"
                    >
                      @
                    </h1>
                  </div>
                </div>
                <div class="flex gap-10 flex-col px-7 sm:px-0 pt-10">
                  <div class="flex flex-col gap-8 relative">
                    <input
                      v-model="email"
                      type="email"
                      placeholder="Email"
                      class="h-[50x] outline-none dark:bg-transparent bg-transparent dark:text-white transition-colors ease-in-out duration-1000  border-b px-10 py-1 text-xl"
                    />
                    <Icon
                      name="mdi-light:email"
                      class="text-xl text-[#000] dark:text-white absolute transition-colors ease-in-out duration-1000  top-0 left-0 mt-1"
                    />
                  </div>
                  <div class="flex flex-col gap-8 relative">
                    <input
                      v-model="password"
                      type="Password"
                      placeholder="*******"
                      class="h-[50x] outline-none dark:bg-transparent w-full bg-transparent dark:text-white transition-colors ease-in-out duration-1000  border-b px-10 py-1 text-xl"
                    />
                    <Icon
                      name="arcticons:password"
                      class="text-xl text-[#fffcfc] dark:text-white transition-colors ease-in-out duration-1000  absolute top-0 left-0 mt-1"
                    />
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <div class="flex">
                    <button
                      @click="handleUpdatingUser"
                      class="text-[#ff8a63] px-4 border rounded-md h-10"
                    >
                      update
                    </button>
                  </div>
                  <div class="flex justify-end gap-[40%] py-10">
                    <button @click="handleDeleteUser" class="text-[#ff8a63] px-4 border py-2 rounded-md">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
        <div
          class="py-6 bg-[#c2cecb] dark:bg-[#2d4c5a] transition-colors ease-in-out duration-1000 rounded-lg mb-10 relative h-[300px]"
        >
          <div v-for="user in data?.users" :key="user.id">
            <div class="w-[100%] flex justify-center pt-[100px]">
              <div
                class="transition-colors ease-in-out duration-1000 h-[150px] shadow-md absolute rounded-lg w-[80%]"
              >
                <div class="flex justify-center relative">
                  <div>
                    <div class="top-0 mt-[-100px] absolute">
                      <img
                        :src="user.url"
                        alt="no profile image"
                        class="w-[130px] h-[130px] object-cover border shadow-2xl shadow-[#547960] rounded-full"
                      />
                    </div>
                    <div class="pt-16">
                      <h1
                        class="dark:text-white text-xl capitalize text-center"
                      >
                        {{ user.first_name }} {{ user.last_name }}
                      </h1>
                      <h1 class="dark:text-white text-xl text-[#afafaf]">
                        {{ user.email }}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- your recipes -->
        <div>
          <div>
            <h1 class="dark:text-white transition-colors ease-in-out duration-1000  text-3xl py-5">Your recipes</h1>
            <div>
              <div>
                <div
                  v-for="user in data?.users"
                  :key="user.id"
                  class="md:grid md:grid-cols-3 md:gap-6 flex flex-col dark:bg-[#182234] transition-colors ease-in-out duration-1000 rounded-md gap-3"
                >
                  <NuxtLink
                    :to="{ name: 'profiledetail-id', params: { id: rec.id } }"
                    v-for="rec in user.recipes"
                    :key="rec.id"
                    class="w-full border-2 h-full relative pb-10 dark:border-[#76807b] transition-colors ease-in-out duration-1000  dark:hover:border-[#00DC82] hover:border-[#00DC82] rounded-md"
                  >
                    <ul v-for="image in rec.images" :key="image.id">
                      <img
                        :src="image.url[0]"
                        alt=""
                        class="w-full h-[500px] object-cover rounded-md"
                      />
                    </ul>
                    <p
                      class="dark:text-white transition-colors ease-in-out duration-1000  capitalize px-5 text-2xl font-bold py-3"
                    >
                      {{ rec.title }}
                    </p>
                    <h1 class="text-2xl pt-2 px-2 dark:text-white transition-colors ease-in-out duration-1000 ">
                      More about this recipes
                    </h1>
                    <p class="dark:text-white transition-colors ease-in-out duration-1000  px-5 py-3">
                      {{ rec.description }}
                    </p>
                    <div
                      class="px-5 flex justify-between border-t pb-3 items-center absolute bottom-0 w-full"
                    >
                      <button>
                        <Icon
                          name="icon-park-outline:like"
                          class="text-3xl text-[#d8423d] pt-2"
                        />
                      </button>
                      <button>
                        <Icon
                          name="iconamoon:comment-thin"
                          class="text-3xl text-[#d8423d] pt-2"
                        />
                      </button>
                      <button>
                        <Icon
                          name="material-symbols-light:bookmark-outline"
                          class="text-3xl text-[#d8423d] pt-2"
                        />
                      </button>
                      <button>
                        <Icon
                          name="material-symbols-light:delete-outline"
                          class="text-3xl text-[#d8423d] pt-2"
                        />
                      </button>
                      <button>
                        <Icon
                          name="bx:edit"
                          class="text-3xl text-[#d8423d] pt-2"
                        />
                      </button>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { jwtDecode } from "jwt-decode";
import { Cloudinary } from "@cloudinary/url-gen";
const toast = useToast();

const route = useRoute();

const onUpload = () => {
  toast.add({
    severity: "success",
    summary: "Success",
    detail: "profile updated successfully",
    life: 3000,
  });
};

const imageUrl = ref(null);

const selectedFile = ref("");
const handleFileUpload = (event) => {
  const file = event.target.files[0]

  if (file) {
    selectedFile.value ={
      file,
      url: URL.createObjectURL(file)
    }
    console.log(selectedFile.value);
   }
};

const handleImageUpload = async() => {
  try {
    if (!selectedFile.value) {
      console.log("No file selected")
      return
    }

    const fileData = {
      name: selectedFile.value.file.name,
      base64str: await convertFileToBase64(selectedFile.value.file),
      type: selectedFile.value.file.type
    }

    const result = await image_upload({
      image: fileData
    })
     if (!result || !result.data) {
      console.error("Error uploading file:", result);
      alert("An error occurred while trying to upload the file");
      return;
     }

     imageUrl.value =result.data?.profile.image_url
     console.log(imageUrl.value)
  } catch (error) {
    console.log("error uploding profile", error)
  }
};

// onMounted(() => {
//   // Reset preview on component mount or any updates
//   imageUrl.value = null;
// });

const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader(file);
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result.split(",")[1])
    reader.onerror = (error) => reject(error) 
  })
}

const isPreviewVisible = computed(() => imageUrl.value !== null);

defineComponent({
  name: "MdiLightEmail",
});

const token = useCookie("accessToken").value;
const decoded = jwtDecode(token);
const userId = parseInt(
  decoded["https://hasura.io/jwt/claims"]["x-hasura-user-id"]
);
console.log(userId);

const QUERY_USER = gql`
  query MyQuery($id: Int!) {
    users(where: { id: { _eq: $id } }) {
      email
      first_name
      id
      url
      last_name
      recipes {
        id
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
const { data } = useAsyncQuery(QUERY_USER, { id: userId });

const firstName = ref(data.value?.users[0]?.first_name);
const lastName = ref(data.value?.users[0]?.last_name);
const email = ref(data.value?.users[0]?.email);
const password = ref(data.value?.users[0]?.password);


const editPro = ref(false);

const showProfile = () => {
  editPro.value = !editPro.value;
};


const MUTATION_UPLOAD_IMAGE =gql`
  mutation image_upload($image: ProfileImage!) {
  profile(image: $image) {
    image_url
  }
}

`
const {mutate: image_upload } = useMutation(MUTATION_UPLOAD_IMAGE)
const MUTATION_UPDATE_USER = gql`
  mutation updatingUser(
    $email: String
    $first_name: String
    $last_name: String
    $password: String!
    $url: String
    $id: Int!
  ) {
    update_users(
      where: { id: { _eq: $id } }
      _set: {
        email: $email
        first_name: $first_name
        last_name: $last_name
        url: $url
      }
    ) {
      affected_rows
    }
    reset(id: $id, password: $password) {
      success
    }
  }
`;

const { mutate: updatingUser } = useMutation(MUTATION_UPDATE_USER);

const handleUpdatingUser = async () => {
  try {
    await updatingUser({
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      password: password.value,
      url: imageUrl.value,
      id: userId,
    });
  } catch (error) {
    console.log(error);
  }
};

const { onLogout} = useApollo()

const MUTATION_DELETE_USER = gql`
  mutation deleteUser($user_id: Int!) {
    delete_users(where: { id: { _eq: $user_id } }) {
      affected_rows
    }
  }
`;

const { mutate: deleteUser } = useMutation(MUTATION_DELETE_USER)

const handleDeleteUser = async () => {
  await deleteUser({
    user_id: userId
  })
  onLogout()
  
}


definePageMeta({
  middleware: "auth",
});
</script>

<style>
input[type="file"] {
  display: none;
}
.file-upload {
  border: 1px solid #dd0808;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  background: #0a581e;
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
