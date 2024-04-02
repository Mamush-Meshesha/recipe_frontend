<template>
  <div>
    <form @submit.prevent="uploadImages">
    <input type="file" multiple @change="previewImages" />
    <button type="submit">Upload Images</button>
  </form>

  <div>
    <img v-for="image in imagePreviews" :key="image.id" :src="image.url" alt="Image Preview" />
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const imagePreviews = ref([]);

const previewImages = (event) => {
  const files = event.target.files;
  if (!files) return;

  imagePreviews.value = [];
  Array.from(files).forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviews.value.push({ id: file.name, url: e.target.result });
    };
    reader.readAsDataURL(file);
  });
};

const uploadImages = () => {
  // Implement your image upload logic here
  // You can use FormData to send the images to your server
};
</script>

<style></style>
