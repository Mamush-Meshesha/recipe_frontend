<template>
  <div class="w-[100%]">
    <div class="w-full relative" ref="dropdown">
      <div>
        <div
          @click="isDropdownVisible = true"
          class="p-3 overflow-hidden text-[#aca9a9] hover:border-[#389bb7] flex items-center h-11 rounded-lg border-2 cursor-pointer"
        >
          {{
            mappedSelectedIng
          }}
        </div>
        <Transition name="slide-fade">
          <div
            v-if="isDropdownVisible"
            class="border absolute bg-[#17797e] mt-2 ml-3 rounded-md p-2 grid grid-cols-2 gap-2"
          >
            <div
              @click="toggleSelectedIng(option)"
              class="border py-3 px-1 rounded-md cursor-pointer"
              v-for="(option, index) in options"
              :key="index"
            >
              <input type="checkbox" /> {{ option.name }}
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<script setup>

const props = defineProps({
  options: Array,
  modelValue: null
})

const emit = defineEmits(['update:modelValue'])

const dropdown = ref(null);
const selectedIngredients = ref([]);
const isDropdownVisible = ref(false);

const mappedSelectedIng = computed(() => {
  return selectedIngredients.value.length > 0
    ? selectedIngredients.value.map((item) => item.name).join(", ")
    : "please select ingredients";
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

const toggleSelectedIng = (option) => {
  const updatedIngredients = [...selectedIngredients.value];
  const optionIndex = updatedIngredients.findIndex(item => item.name === option.name);

  if (optionIndex !== -1) {
    updatedIngredients.splice(optionIndex, 1);
  } else {
    updatedIngredients.push(option);
  }

  selectedIngredients.value = updatedIngredients;
  const ingredientNames = updatedIngredients.map(item => item.name);
  emit('update:modelValue', ingredientNames);
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
