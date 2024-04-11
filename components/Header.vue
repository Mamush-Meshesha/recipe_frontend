<template>
  <div class="sm:pb-32 pb-28 flex relative">
    <div
      v-for="user in data?.users"
      :key="user.id"
      class="fixed top-0 right-0 dark:bg-[#040721] w-screen border-b dark:border-[#393961] transition-colors ease-in-out duration-1000 shadow-lg bg-white bg-opacity-70 z-50 backdrop-filter backdrop-blur-md"
    >
      <div class="flex py-4 justify-between w-screen container mx-auto md:px-0">
        <!-- hidden for mobile devices -->
        <div class="lg:flex gap-16 hidden dark:text-white">
          <NuxtLink to="/" class="font-fractul  capitalize text-xl hover:border hover:bg-[#00DC82] hover:text-white px-5 flex items-center rounded-md ">Home</NuxtLink>
          <NuxtLink to="/allPage" class="font-fractul  capitalize text-xl hover:border hover:bg-[#00DC82] hover:text-white px-5 flex items-center rounded-md "
            >catagory</NuxtLink
          >
            <NuxtLink
                to="/upload"
                class="font-fractul  capitalize text-xl hover:border hover:bg-[#00DC82] hover:text-white px-5 flex items-center rounded-md "
                >create recipe</NuxtLink
              >
          <NuxtLink to="/favourate" class="font-fractul  capitalize text-xl hover:border hover:bg-[#00DC82] hover:text-white px-5 flex items-center rounded-md "
            >favourate</NuxtLink
          >
          <NuxtLink to="/about"  class="font-fractul  capitalize text-xl hover:border hover:bg-[#00DC82] hover:text-white px-5 flex items-center rounded-md ">About</NuxtLink>

        </div>

        <div class="flex items-center justify-between w-full sm:w-auto relative gap-5">
          <NuxtLink to="/allPage">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Outline"
              viewBox="0 0 24 24"
              width="28"
              height="28"
              stroke="#fc9"
              fill="#dbb"
            >
              <path
                d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"
              />
            </svg>
          </NuxtLink>
          <div class="md:flex items-center px-6 hidden">
            <button @click="toggleTheme" class="text-yellow-800">
              <Icon
                name="solar:sun-line-duotone"
                class="text-3xl"
                v-if="colorMode.preference === 'light'"
              />
              <!-- moon -->
              <Icon name="ph:moon-thin" v-else class="text-3xl" />
            </button>
          </div>
          <!-- profile menu -->

          <div class="sm:flex hidden">
            <button @click="showProfile">
              <img
                :src="user.url"
                alt=""
                class="w-12 h-12 rounded-full border border-[#1f9fad] object-cover"
              />
            </button>
            <Transition name="slide-fade">
              <div
                v-if="prof"
                class="absolute border p-6 bg-[#1E293B] rounded-md shadow-md text-white"
              >
                <div>
                  <div class="flex flex-col gap-4">
                    <NuxtLink
                      to="/profile"
                      class="border border-[#3049b6] px-3 rounded-sm hover:border hover:bg-[#00DC82] hover:text-white  flex items-center  "
                      >Profile</NuxtLink
                    >
                    <button
                      @click="logout"
                      class="border border-[#3049b6] px-3 rounded-sm hover:border hover:bg-[#00DC82] hover:text-white  flex items-center "
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
          <button @click="showMenu" class="float-right  flex">
            <svg
              class="w-8 h-8 block sm:hidden pr-0 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- hidden for large devices -->
      <Transition name="slide-fade-full">
        <div
          v-if="menu"
          class="absolute top-0 left-0 bottom-0 h-screen pt-[80px] w-[50%] max-h-[100vh] pb-6 bg-[#041612] opacity-90"
        >
          <div class="flex flex-col justify-between">
            <div class="flex text-white flex-col gap-4 px-6">
              <NuxtLink
                to="/"
                class="font-fractul font-semibold capitalize text-xl"
                >Home</NuxtLink
              >
              <NuxtLink
                to="/favourate"
                class="font-fractul font-semibold capitalize text-xl"
                >favourate</NuxtLink
              >
              <NuxtLink
                to="/upload"
                class="font-fractul font-semibold capitalize text-xl"
                >upload</NuxtLink
              >
              <NuxtLink
                to="/allPage"
                class="font-fractul font-semibold capitalize text-xl"
                >Catagory</NuxtLink
              >
              <NuxtLink
                to="/about"
                class="font-fractul font-semibold capitalize text-xl"
                >About</NuxtLink
              >
            </div>
            <div class="px-5 py-5">
              <button @click="showProfile">
                <img
                  :src="user.url"
                  alt=""
                  class="w-12 h-12 rounded-full border border-[#1f9fad] object-cover"
                />
              </button>
              <Transition name="slide-fade">
                <div
                  v-if="prof"
                  class="absolute border p-6 bg-[#1E293B] rounded-md shadow-md text-white"
                >
                  <div>
                    <div class="flex flex-col gap-4">
                      <NuxtLink
                        to="/profile"
                        class="border border-[#3049b6] px-3 rounded-sm"
                        >Profile</NuxtLink
                      >
                      <button
                        @click="logout"
                        class="border border-[#3049b6] px-3 rounded-sm"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
            <div class="px-5">
              <button
                @click="menu = false"
                class="text-white px-4 border rounded-md"
              >
                hide menu
              </button>
            </div>
            <div class="px-10">
              <button
                @click="toggleTheme"
                class="text-yellow-800 items-center flex pt-10 pb-0"
              >
                <Icon
                  name="solar:sun-line-duotone"
                  class="text-3xl"
                  v-if="colorMode.preference === 'light'"
                />
                <!-- moon -->
                <Icon name="ph:moon-thin" v-else class="text-3xl" />
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
<script setup>
const menu = ref(false);
import { jwtDecode } from "jwt-decode";
const { onLogout } = useApollo();
const showMenu = () => {
  return (menu.value = !menu.value);
};
const token = useCookie("accessToken").value;
const decoded = jwtDecode(token);
const userId = parseInt(
  decoded["https://hasura.io/jwt/claims"]["x-hasura-user-id"]
);
const QUERY_USER = gql`
  query MyQuery($id: Int!) {
    users(where: { id: { _eq: $id } }) {
      email
      first_name
      id
      url
      last_name
    }
  }
`;
const { data } = useAsyncQuery(QUERY_USER, { id: userId });

const colorMode = useColorMode();
const toggleTheme = () => {
  colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
};

const prof = ref(false);

const showProfile = () => {
  prof.value = !prof.value;
};

const pages = ref(false);

const showPages = () => {
  pages.value = !pages.value;
};

const logout = () => {
  onLogout();
  navigateTo("/desktopthree");
};
</script>
<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.slide-fade-full-enter-active {
  transition: all 0.6s ease-out;
}

.slide-fade-full-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-full-enter-from,
.slide-fade-full-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}
</style>
