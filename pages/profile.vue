<template>
  <div>
    <div>
      <Header />
      <div class="container mx-auto">
        <div class="pb-6 border-b">
          <div class="flex justify-between px-4 md:px-0 items-center">
            <h1 class="text-4xl font-fractul font-semibold capitalize">
              profile
            </h1>
            <button class="px-9 py-2 bg-[#ff642f] text-white rounded-md">
              Save
            </button>
          </div>
        </div>

        <!-- profile upload -->
        <div class="pt-16" v-for="user in data.users" :key="user.id">
          <div class="card flex gap-4 justify-content-center">
            <Toast />
            <div class="profile-upload">
              <label for="profile-image">
                {{ user.first_name }}
                <img
                  src=""
                  alt=""
                  class="md:w-[120px] md:h-[120px] w-[60px] h-[60px] border-2 rounded-full object-cover"
                />
              </label>
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                @change="handleFileChange"
              />
            </div>
            <div class="flex gap-6 items-center">
              <button
                @click="onUpload"
                class="mx:px-12 px-6 h-[40px] text-white items-center bg-[#ff642f] rounded-md"
              >
                Change
              </button>
              <button
                class="md:px-12 px-6 h-[40px] items-center bg-[#f1f1f1] rounded-md border-black border-2"
              >
                Delete
              </button>
            </div>
          </div>
          <!-- profile details -->
          <div class="flex gap-10 md:flex-row flex-col pt-10 px-4 md:px-0">
            <div class="flex flex-col gap-8 relative">
              <label for="full name" class="text-xl text-[#b7b7b7]"
                >First Name</label
              >
              <input
                type="text"
                placeholder="First Name"
                class="h-[50x] outline-none border-b px-10 py-1 text-xl"
              />
              <svg
                class="absolute top-0 left-0 mt-14"
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
              <label for="username" class="text-xl text-[#b7b7b7]"
                >Last Name</label
              >
              <input
                type="text"
                placeholder="Last name"
                class="h-[50x] outline-none border-b px-10 py-1 text-xl"
              />
              <h1 class="text-xl absolute top-0 left-0 mt-14">@</h1>
            </div>
          </div>
          <div class="flex gap-10 md:flex-row flex-col px-4 md:px-0 pt-10">
            <div class="flex flex-col gap-8 relative">
              <label for="full name" class="text-xl text-[#b7b7b7]"
                >Email</label
              >
              <input
                type="email"
                placeholder="Email"
                class="h-[50x] outline-none border-b px-10 py-1 text-xl"
              />
              <Icon
                name="mdi-light:email"
                class="text-3xl text-[#000] absolute top-0 left-0 mt-14"
              />
            </div>
            <div class="flex flex-col gap-8 relative">
              <label for="username" class="text-xl text-[#b7b7b7]"
                >Password</label
              >
              <input
                type="Password"
                placeholder="*******"
                class="h-[50x] outline-none border-b px-10 py-1 text-xl"
              />
              <Icon
                name="arcticons:password"
                class="text-3xl text-[#000] absolute top-0 left-0 mt-14"
              />
            </div>
          </div>
          <div class="flex justify-center pt-6">
            <button class="text-[#ff8a63] text-2xl font-fractul">Change</button>
          </div>
          <!-- subscribe button -->
          <div class="border-b py-12">
            <h1>Newsletter</h1>
            <div class="flex md:flex-row flex-col gap-[20%] pt-5">
              <h1 class="pb-3 md:pb-0">
                You are currently subscribed to newslatter
              </h1>
              <button class="px-10 border border-black py-2 rounded-md">
                Unsubscribe
              </button>
            </div>
          </div>
          <!-- signout button -->
          <div class="flex gap-[40%] py-10">
            <div class="flex items-center">
              <Icon name="uil:signout" class="text-3xl" />
              <h1>signout</h1>
            </div>
            <h1 class="text-[#ff8a63]">Delete Account</h1>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { jwtDecode } from "jwt-decode";
const toast = useToast();

const onUpload = () => {
  toast.add({
    severity: "success",
    summary: "Success",
    detail: "profile updated successfully",
    life: 3000,
  });
};
const imageUrl = ref("https://cdn-icons-png.freepik.com/512/3135/3135715.png");

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    imageUrl.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

// onMounted(() => {
//   // Reset preview on component mount or any updates
//   imageUrl.value = null;
// });

const isPreviewVisible = computed(() => imageUrl.value !== null);

defineComponent({
  name: "MdiLightEmail",
});

// async function getUserIdFromCookie() {
//   try {
//     const token = useCookie("accessToken").value;

//     if (!token) {
//       throw new Error("Missing access token in cookie");
//     }

//     const decoded = jwtDecode(token);

//     // Ensure the expected Hasura claims namespace exists
//     if (!decoded["https://hasura.io/jwt/claims"]) {
//       throw new Error("Invalid JWT format: Missing Hasura claims namespace");
//     }

//     const userId = parseInt(
//       decoded["https://hasura.io/jwt/claims"]["x-hasura-user-id"]
//     );

//     console.log("User ID:", userId);
//     return userId; // Optionally return the user ID for further use
//   } catch (error) {
//     console.error("Error retrieving user ID:", error.message);
//     // Handle errors appropriately, e.g., redirect to login or display an error message
//   }
// }
// const userId = await getUserIdFromCookie();
const token = useCookie("accessToken").value;
const decoded = jwtDecode(token);
const userId = parseInt(
  decoded["https://hasura.io/jwt/claims"]["x-hasura-user-id"]
);
console.log(userId);

const QUERY_USER = gql`
  query MyQuery {
    users(where: { id: { _eq: 1 } }) {
      email
      first_name
      id
      url
      last_name
    }
  }
`;
const { data } = useAsyncQuery(QUERY_USER, () => {
  return {
    variables: {
      user_id: userId,
    },
  };
});

console.log(data.users);
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
</style>
