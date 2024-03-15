<template>
  <div>
    <div class="mx-auto container">
      <input
        type="search"
        placeholder="Search"
        class="w-full outline-none h-12 mt-10 border-b-2 border-black"
      />
    </div>
    <div class="mx-auto container pt-10">
      <Delicious />
    </div>
    <div class="mx-auto container pt-10">
      <Sweet />
    </div>
    <div class="mx-auto container pt-10">
      <Popular />
    </div>
    <div>
      <Emailbox />
    </div>
    <div class="mx-auto container pt-10">
      <Handpicked />
    </div>
    <div class="mx-auto container pt-10">
      <Latestrecipe />
    </div>
    <More />
    <Footer />
  </div>
</template>

<script setup></script>

<style></style>
