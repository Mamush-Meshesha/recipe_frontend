<template>
  <div class="w-[100%]">
    <div class="w-full relative" ref="dropdown">
      <div>
        <div
          @click="isDropdownVisible = true"
          class="p-3 overflow-hidden text-[#aca9a9] hover:border-[#389bb7] flex items-center h-11 rounded-lg border-2 cursor-pointer"
        >
          {{
            mappedSelectedCat
          }}
        </div>
        <Transition name="slide-fade">
          <div
            v-if="isDropdownVisible"
            class="border absolute bg-[#17797e] w-[300%] mt-2 ml-3 rounded-lg p-5 grid grid-cols-5 gap-2"
          >
            <div
              @click="toggleSelectedCat(catagory)"
              class="cursor-pointer"
              v-for="(catagory, index) in catagory"
              :key="index"
            >
               <div class="flex justify-center">
                <button class="hover:bg-[#28a136] h-10 w-28 rounded-md border hover:text-[#fff]">
                {{ catagory.name }}
               </button>
               </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<script setup>

const props = defineProps({
  catagory: Array,
  modelValue: null
})

const emit = defineEmits(['update:modelValue'])

const dropdown = ref(null);
const selectedCatagories = ref([]);
const isDropdownVisible = ref(false);

const mappedSelectedCat = computed(() => {
  return selectedCatagories.value.length > 0
    ? selectedCatagories.value.map((item) => item.name).join(", ")
    : "please select catagory";
});

// const toggleSelectedIng = (option) => {
//   if (selectedIngredients.value.includes(option)) {
//     selectedIngredients.value = selectedIngredients.value.filter(
//       (item) => item !== option
//     );
//     emit('update:modelValue', selectedIngredients.value.map((item) => item.name).join(" ",))
//   } else {
//     selectedIngredients.value.push(option);
//     emit('update:modelValue', selectedIngredients.value.map((item) => item.name).join(" ",))
//   }
//   isDropdownVisible.value = false;
// };

const toggleSelectedCat = (catagory) => {
  const updatedCatagories = [...selectedCatagories.value];
  const CatagoryIndex = updatedCatagories.findIndex(item => item.name === catagory.name);

  if (CatagoryIndex !== -1) {
    updatedCatagories.splice(CatagoryIndex, 1);
  } else {
    updatedCatagories.push(catagory);
  }

  selectedCatagories.value = updatedCatagories;
  const CatagoryNames = updatedCatagories.map(item => item.name);
  emit('update:modelValue', CatagoryNames);
  isDropdownVisible.value = false;
};

const closeDropdown = (element) => {
  if (!dropdown.value.contains(element.target)) {
    isDropdownVisible.value = false;
  }
};

onMounted(() => {
  window.addEventListener("click", closeDropdown);
});

onBeforeUnmount(() => {
  window.removeEventListener("click", closeDropdown);
});
</script>
