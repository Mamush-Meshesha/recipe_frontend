<template>
  <div class="overflow-x-hidden">
    <div>
      <Navbartwo />
      <div class="container mx-auto py-8">
        <div class="md:grid md:grid-cols-3 md:gap-6 flex flex-col gap-3">
          <!-- box one -->
          <div class="w-full border rounded-lg pb-2">
            <!-- image -->
            <div class="w-full">
              <img
                src="../images/02.jpeg"
                alt="image not found"
                class="w-full h-[300px] rounded-md rounded-b-none object-cover"
              />
            </div>
            <!-- rating -->
            <div class="py-4 px-2">
              <div class="card flex justify-content-center">
                <Rating v-model="value" :cancel="false" style="fill: red" />
              </div>
              <div class="py-3">
                <h1 class="capitalize font-semibold font-poppins">
                  spanish and cheese pasta
                </h1>
              </div>
            </div>
          </div>
          <!-- box two -->
          <div class="w-full border rounded-lg pb-2">
            <!-- image -->
            <div class="w-full">
              <img
                src="../images/02.jpeg"
                alt="image not found"
                class="w-full h-[300px] rounded-md rounded-b-none object-cover"
              />
            </div>
            <!-- rating -->
            <div class="py-4 px-2">
              <div class="card flex justify-content-center">
                <Rating v-model="value" :cancel="false" style="fill: red" />
              </div>
              <div class="py-3">
                <h1 class="capitalize font-semibold font-poppins">
                  spanish and cheese pasta
                </h1>
              </div>
            </div>
          </div>
          <!-- box three -->
          <div class="w-full border rounded-lg pb-2">
            <!-- image -->
            <div class="w-full">
              <img
                src="../images/02.jpeg"
                alt="image not found"
                class="w-full h-[300px] rounded-md rounded-b-none object-cover"
              />
            </div>
            <!-- rating -->
            <div class="py-4 px-2">
              <div class="card flex justify-content-center">
                <Rating v-model="value" :cancel="false" style="fill: red" />
              </div>
              <div class="py-3">
                <h1 class="capitalize font-semibold font-poppins">
                  spanish and cheese pasta
                </h1>
              </div>
            </div>
          </div>
        </div>
        <!-- container one -->
        <Emailboxtwo />
        <div class="border-t pb-8"></div>
        <div class="md:grid md:grid-cols-2 w-[100%] md:gap-20 mt-10">
          <div class="w-[100%] mx-3 md:mx-0">
            <Latestrecipetwo />
          </div>
          <div class="mx-3 md:mx-0">
            <div class="w-[100%] border pt-10 px-10">
              <div class="flex justify-center">
                <img
                  src="../images/01.jpg"
                  alt=""
                  class="w-16 h-16 rounded-full"
                />
              </div>
              <h1 class="text-center">hi, Mamush</h1>
              <p class="text-center">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi
                vel tempora illum! Autem doloribus veritatis blanditiis animi
                cupiditate obcaecati! Libero? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Officia, voluptas.
              </p>
              <div class="flex justify-center py-14">
                <button class="border px-5 py-1 rounded-md">Read More</button>
              </div>
            </div>
            <!-- fresh recipes -->
            <div>
              <Freshrecipe />
            </div>
          </div>
        </div>
      </div>
      <!-- cureated collections -->
      <div class="mx-3 md:mx-0">
        <div class="container mx-auto mt-20">
          <div>
            <h1 class="capitalize pb-8 font-semibold font-fractul text-4xl">
              curated collections
            </h1>
            <div class="md:grid md:grid-cols-2 md:gap-10 flex flex-col gap-6">
              <div
                class="w-full h-[425px] md:h-[400px] shadow-md border rounded-md"
              >
                <!-- image -->
                <div class="w-full">
                  <img
                    src="../images/02.jpeg"
                    alt="image not found"
                    class="w-full h-[300px] rounded-md rounded-b-none object-cover"
                  />
                </div>
                <!-- rating -->
                <div class="py-4">
                  <div
                    class="flex md:justify-between flex-col md:flex-row md:mx-[30px] md:items-center"
                  >
                    <h1
                      class="capitalize md:font-semibold text-2xl md:text-3xl w-full md:w-2/4 font-poppins"
                    >
                      sushi combo for your next party
                    </h1>
                    <div class="flex justify-end mr-2 md:mr-0">
                      <Recipebutton />
                    </div>
                  </div>
                </div>
                <!-- end of rating section -->
              </div>
              <div
                class="w-full h-[425px] md:h-[400px] shadow-md border rounded-md"
              >
                <!-- image -->
                <div class="w-full">
                  <img
                    src="../images/02.jpeg"
                    alt="image not found"
                    class="w-full h-[300px] rounded-md rounded-b-none object-cover"
                  />
                </div>
                <!-- rating -->
                <div class="py-4">
                  <div
                    class="flex md:justify-between flex-col md:flex-row md:mx-[30px] md:items-center"
                  >
                    <h1
                      class="capitalize md:font-semibold text-2xl md:text-3xl w-full md:w-2/4 font-poppins"
                    >
                      sushi combo for your next party
                    </h1>
                    <div class="flex justify-end mr-2 md:mr-0">
                      <Recipebutton />
                    </div>
                  </div>
                </div>
                <!-- end of rating section -->
              </div>
              <div
                class="w-full h-[425px] md:h-[400px] shadow-md border rounded-md"
              >
                <!-- image -->
                <div class="w-full">
                  <img
                    src="../images/02.jpeg"
                    alt="image not found"
                    class="w-full h-[300px] rounded-md rounded-b-none object-cover"
                  />
                </div>
                <!-- rating -->
                <div class="py-4">
                  <div
                    class="flex md:justify-between flex-col md:flex-row md:mx-[30px] md:items-center"
                  >
                    <h1
                      class="capitalize md:font-semibold text-2xl md:text-3xl w-full md:w-2/4 font-poppins"
                    >
                      sushi combo for your next party
                    </h1>
                    <div class="flex justify-end mr-2 md:mr-0">
                      <Recipebutton />
                    </div>
                  </div>
                </div>
                <!-- end of rating section -->
              </div>
              <div
                class="w-full h-[425px] md:h-[400px] shadow-md border rounded-md"
              >
                <!-- image -->
                <div class="w-full">
                  <img
                    src="../images/02.jpeg"
                    alt="image not found"
                    class="w-full h-[300px] rounded-md rounded-b-none object-cover"
                  />
                </div>
                <!-- rating -->
                <div class="py-4">
                  <div
                    class="flex md:justify-between flex-col md:flex-row md:mx-[30px] md:items-center"
                  >
                    <h1
                      class="capitalize md:font-semibold text-2xl md:text-3xl w-full md:w-2/4 font-poppins"
                    >
                      sushi combo for your next party
                    </h1>
                    <div class="flex justify-end mr-2 md:mr-0">
                      <Recipebutton />
                    </div>
                  </div>
                </div>
                <!-- end of rating section -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <Latestrecipe />
      <More />
      <Footer />
    </div>
  </div>
</template>

<script setup>
const value = ref(5);
</script>
