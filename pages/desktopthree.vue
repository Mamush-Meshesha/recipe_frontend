<template>
  <div>
    <div class="overflow-hidden">
      <Navbar />
      <div class="h-[91vh] bg-[#1d204e]">
        <div class=" overflow-x-hidden">
          <video
            ref="videoRef"
            autoplay
            muted
            loop
            class="h-[851px] absolute z-0 w-screen object-fill backdrop:blur opacity-20"
          >
            <source src="../assets/background/back.mp4" loop type="video/mp4" />
          </video>
        </div>
        <div class="flex justify-center z-40 absolute items-center h-screen">
          <div class="w-1/2 text-center">
            <p class=" text-white leading-10 text-2xl">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id quia
              rem dolore iusto reprehenderit eveniet facere ratione voluptate
              maiores aliquam asperiores nam qui, quis culpa minima modi fugit
              necessitatibus eius facilis in dignissimos? Quae, obcaecati
              accusamus praesentium quo perferendis placeat libero nemo suscipit
              incidunt nostrum autem, repellendus inventore in quis.
            </p>
            <div class="pt-10">
             <button class="text-center px-6 py-2 bg-[#c04725] rounded-md cursor-pointer">
               <NuxtLink to="/" >GET STRATED</NuxtLink>
             </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Latestrecipe />
      </div>

      <Footer />
    </div>
  </div>
</template>

<script setup></script>
<style></style>
