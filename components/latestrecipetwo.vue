<template>
  <div class="container mx-auto">
    <div class="w-[100%]">
      <h1 class="capitalize pb-8 font-semibold font-fractul text-4xl">
        latest recipes
      </h1>
      <div class="w-[100%] h-auto border rounded-md">
        <div>
          <img
            src="../images/recipe.png"
            alt="image not found"
            class="w-full rounded-md rounded-b-none object-cover"
          />
          <div class="px-5 pt-10">
            <div class="card flex justify-content-center">
              <Rating v-model="value" :cancel="false" />
            </div>
            <!-- end of rating -->
            <div>
              <h1 class="capitalize pb-3 font-semibold font-fractul text-3xl">
                pumpkin mershmallow pie
              </h1>
              <p>
                The perfact desert for all , i finaly found the perfact way to
                make the funniest crust, and toasted murshmallow is to day for
              </p>
            </div>
            <!-- user profile  and comment-->
            <div class="flex justify-between py-10">
              <div class="flex gap-3 items-center">
                <img
                  src="../images/01.jpg"
                  alt=""
                  class="w-12 h-12 rounded-full"
                />
                <h1>Albert Queen</h1>
              </div>
              <div class="flex gap-3 items-center">
                <svg
                  class="w-6 h-6 text-[#b9b9b9] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
                  />
                </svg>
                <h1 class="text-[#b9b9b9]">478</h1>
                <svg
                  class="w-6 h-6 text-[#b9b9b9] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
                  />
                </svg>
                <h1 class="text-[#b9b9b9]">Yesterday</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end of the main latest recipe -->
      <div class="pt-16 flex flex-col gap-9">
        <div class="w-full flex gap-5 items-center">
          <!-- image -->
          <div class="w-[50%]">
            <img
              src="../images/02.jpeg"
              alt="image not found"
              class="w-full h-[170px] md:h-[250px] rounded-md rounded-r-none object-cover"
            />
          </div>
          <!-- rating -->
          <div>
            <div class="card flex justify-content-center pb-5">
              <Rating v-model="value" :cancel="false" />
            </div>
            <div class="pb-5">
              <div>
                <h1 class="capitalize font-semibold font-poppins">
                  spanish and cheese pasta
                </h1>
              </div>
            </div>
            <div class="pb-5">
              <div class="flex gap-3 items-center pb-5">
                <img
                  src="../images/01.jpg"
                  alt=""
                  class="w-12 h-12 rounded-full"
                />
                <h1 class="text-xs">Albert Queen</h1>
              </div>
              <div class="flex gap-3 items-center">
                <svg
                  class="w-5 h-5 text-[#b9b9b9] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
                  />
                </svg>
                <h1 class="text-[#b9b9b9] text-xs">478</h1>
                <svg
                  class="w-5 h-5 text-[#b9b9b9] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
                  />
                </svg>
                <h1 class="text-[#b9b9b9] text-xs">Yesterday</h1>
              </div>
            </div>
            <!-- end of user profile and comments -->
          </div>
        </div>
        <div class="w-full flex gap-5 items-center">
          <!-- image -->
          <div class="w-[50%]">
            <img
              src="../images/02.jpeg"
              alt="image not found"
              class="w-full h-[170px] md:h-[250px] rounded-md rounded-r-none object-cover"
            />
          </div>
          <!-- rating -->
          <div>
            <div class="card flex justify-content-center pb-5">
              <Rating v-model="value" :cancel="false" />
            </div>
            <div class="pb-5">
              <div>
                <h1 class="capitalize font-semibold font-poppins">
                  spanish and cheese pasta
                </h1>
              </div>
            </div>
            <div class="pb-5">
              <div class="flex gap-3 items-center pb-5">
                <img
                  src="../images/01.jpg"
                  alt=""
                  class="w-12 h-12 rounded-full"
                />
                <h1 class="text-xs">Albert Queen</h1>
              </div>
              <div class="flex gap-3 items-center">
                <svg
                  class="w-5 h-5 text-[#b9b9b9] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
                  />
                </svg>
                <h1 class="text-[#b9b9b9] text-xs">478</h1>
                <svg
                  class="w-5 h-5 text-[#b9b9b9] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
                  />
                </svg>
                <h1 class="text-[#b9b9b9] text-xs">Yesterday</h1>
              </div>
            </div>
            <!-- end of user profile and comments -->
          </div>
        </div>
        <div class="w-full flex gap-5 items-center">
          <!-- image -->
          <div class="w-[50%]">
            <img
              src="../images/02.jpeg"
              alt="image not found"
              class="w-full h-[170px] md:h-[250px] rounded-md rounded-r-none object-cover"
            />
          </div>
          <!-- rating -->
          <div>
            <div class="card flex justify-content-center pb-5">
              <Rating v-model="value" :cancel="false" />
            </div>
            <div class="pb-5">
              <div>
                <h1 class="capitalize font-semibold font-poppins">
                  spanish and cheese pasta
                </h1>
              </div>
            </div>
            <div class="pb-5">
              <div class="flex gap-3 items-center pb-5">
                <img
                  src="../images/01.jpg"
                  alt=""
                  class="w-12 h-12 rounded-full"
                />
                <h1 class="text-xs">Albert Queen</h1>
              </div>
              <div class="flex gap-3 items-center">
                <svg
                  class="w-5 h-5 text-[#b9b9b9] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
                  />
                </svg>
                <h1 class="text-[#b9b9b9] text-xs">478</h1>
                <svg
                  class="w-5 h-5 text-[#b9b9b9] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
                  />
                </svg>
                <h1 class="text-[#b9b9b9] text-xs">Yesterday</h1>
              </div>
            </div>
            <!-- end of user profile and comments -->
          </div>
        </div>
        <div class="w-full flex gap-5 items-center">
          <!-- image -->
          <div class="w-[50%]">
            <img
              src="../images/02.jpeg"
              alt="image not found"
              class="w-full h-[170px] md:h-[250px] rounded-md rounded-r-none object-cover"
            />
          </div>
          <!-- rating -->
          <div>
            <div class="card flex justify-content-center pb-5">
              <Rating v-model="value" :cancel="false" />
            </div>
            <div class="pb-5">
              <div>
                <h1 class="capitalize font-semibold font-poppins">
                  spanish and cheese pasta
                </h1>
              </div>
            </div>
            <div class="pb-5">
              <div class="flex gap-3 items-center pb-5">
                <img
                  src="../images/01.jpg"
                  alt=""
                  class="w-12 h-12 rounded-full"
                />
                <h1 class="text-xs">Albert Queen</h1>
              </div>
              <div class="flex gap-3 items-center">
                <svg
                  class="w-5 h-5 text-[#b9b9b9] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
                  />
                </svg>
                <h1 class="text-[#b9b9b9] text-xs">478</h1>
                <svg
                  class="w-5 h-5 text-[#b9b9b9] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
                  />
                </svg>
                <h1 class="text-[#b9b9b9] text-xs">Yesterday</h1>
              </div>
            </div>
            <!-- end of user profile and comments -->
          </div>
        </div>
        <div class="w-full flex gap-5 items-center">
          <!-- image -->
          <div class="w-[50%]">
            <img
              src="../images/02.jpeg"
              alt="image not found"
              class="w-full h-[170px] md:h-[250px] rounded-md rounded-r-none object-cover"
            />
          </div>
          <!-- rating -->
          <div>
            <div class="card flex justify-content-center pb-5">
              <Rating v-model="value" :cancel="false" />
            </div>
            <div class="pb-5">
              <div>
                <h1 class="capitalize font-semibold font-poppins">
                  spanish and cheese pasta
                </h1>
              </div>
            </div>
            <div class="pb-5">
              <div class="flex gap-3 items-center pb-5">
                <img
                  src="../images/01.jpg"
                  alt=""
                  class="w-12 h-12 rounded-full"
                />
                <h1 class="text-xs">Albert Queen</h1>
              </div>
              <div class="flex gap-3 items-center">
                <svg
                  class="w-5 h-5 text-[#b9b9b9] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
                  />
                </svg>
                <h1 class="text-[#b9b9b9] text-xs">478</h1>
                <svg
                  class="w-5 h-5 text-[#b9b9b9] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
                  />
                </svg>
                <h1 class="text-[#b9b9b9] text-xs">Yesterday</h1>
              </div>
            </div>
            <!-- end of user profile and comments -->
          </div>
        </div>
        <div class="w-full flex gap-5 items-center">
          <!-- image -->
          <div class="w-[50%]">
            <img
              src="../images/02.jpeg"
              alt="image not found"
              class="w-full h-[170px] md:h-[250px] rounded-md rounded-r-none object-cover"
            />
          </div>
          <!-- rating -->
          <div>
            <div class="card flex justify-content-center pb-5">
              <Rating v-model="value" :cancel="false" />
            </div>
            <div class="pb-5">
              <div>
                <h1 class="capitalize font-semibold font-poppins">
                  spanish and cheese pasta
                </h1>
              </div>
            </div>
            <div class="pb-5">
              <div class="flex gap-3 items-center pb-5">
                <img
                  src="../images/01.jpg"
                  alt=""
                  class="w-12 h-12 rounded-full"
                />
                <h1 class="text-xs">Albert Queen</h1>
              </div>
              <div class="flex gap-3 items-center">
                <svg
                  class="w-5 h-5 text-[#b9b9b9] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
                  />
                </svg>
                <h1 class="text-[#b9b9b9] text-xs">478</h1>
                <svg
                  class="w-5 h-5 text-[#b9b9b9] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
                  />
                </svg>
                <h1 class="text-[#b9b9b9] text-xs">Yesterday</h1>
              </div>
            </div>
            <!-- end of user profile and comments -->
          </div>
        </div>
        <div class="w-full flex gap-5 items-center">
          <!-- image -->
          <div class="w-[50%]">
            <img
              src="../images/02.jpeg"
              alt="image not found"
              class="w-full h-[170px] md:h-[250px] rounded-md rounded-r-none object-cover"
            />
          </div>
          <!-- rating -->
          <div>
            <div class="card flex justify-content-center pb-5">
              <Rating v-model="value" :cancel="false" />
            </div>
            <div class="pb-5">
              <div>
                <h1 class="capitalize font-semibold font-poppins">
                  spanish and cheese pasta
                </h1>
              </div>
            </div>
            <div class="pb-5">
              <div class="flex gap-3 items-center pb-5">
                <img
                  src="../images/01.jpg"
                  alt=""
                  class="w-12 h-12 rounded-full"
                />
                <h1 class="text-xs">Albert Queen</h1>
              </div>
              <div class="flex gap-3 items-center">
                <svg
                  class="w-5 h-5 text-[#b9b9b9] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
                  />
                </svg>
                <h1 class="text-[#b9b9b9] text-xs">478</h1>
                <svg
                  class="w-5 h-5 text-[#b9b9b9] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
                  />
                </svg>
                <h1 class="text-[#b9b9b9] text-xs">Yesterday</h1>
              </div>
            </div>
            <!-- end of user profile and comments -->
          </div>
        </div>
        <div class="w-full flex gap-5 items-center">
          <!-- image -->
          <div class="w-[50%]">
            <img
              src="../images/02.jpeg"
              alt="image not found"
              class="w-full h-[170px] md:h-[250px] rounded-md rounded-r-none object-cover"
            />
          </div>
          <!-- rating -->
          <div>
            <div class="card flex justify-content-center pb-5">
              <Rating v-model="value" :cancel="false" />
            </div>
            <div class="pb-5">
              <div>
                <h1 class="capitalize font-semibold font-poppins">
                  spanish and cheese pasta
                </h1>
              </div>
            </div>
            <div class="pb-5">
              <div class="flex gap-3 items-center pb-5">
                <img
                  src="../images/01.jpg"
                  alt=""
                  class="w-12 h-12 rounded-full"
                />
                <h1 class="text-xs">Albert Queen</h1>
              </div>
              <div class="flex gap-3 items-center">
                <svg
                  class="w-5 h-5 text-[#b9b9b9] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
                  />
                </svg>
                <h1 class="text-[#b9b9b9] text-xs">478</h1>
                <svg
                  class="w-5 h-5 text-[#b9b9b9] dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
                  />
                </svg>
                <h1 class="text-[#b9b9b9] text-xs">Yesterday</h1>
              </div>
            </div>
            <!-- end of user profile and comments -->
          </div>
        </div>
        <!-- end of box one -->
      </div>
    </div>
  </div>
</template>

<script setup>
const value = ref(4);
</script>
