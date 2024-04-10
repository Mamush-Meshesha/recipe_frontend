<template>
  <div class="w-[100%]">
    <div class="w-full relative" ref="dropdown">
      <div>
        <div
          @click="isDropdownVisible = true"
          class="p-3 overflow-hidden text-[#aca9a9] hover:border-[#389bb7] flex items-center h-11 rounded-lg border-2 cursor-pointer"
        >
          {{ mappedSelectedIng }}
        </div>
        <Transition name="slide-fade">
          <div
            v-if="isDropdownVisible"
            class="border absolute bg-[#17797e] mt-2 ml-3 rounded-md p-2 grid grid-cols-2 gap-2"
          >
            <div
              @click="toggleSelectedIng(option)"
              class="border py-3 px-1 rounded-md cursor-pointer"
              v-for="option in result.ingredients"
              :key="option.id"
            >
              <input type="checkbox" /> {{ option.name[0] }}
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<script setup>
const IngreQuery = gql`
  query MyQuery {
    ingredients {
      name
      id
    }
  }
`;
const { result } = useQuery(IngreQuery);


const emit = defineEmits(["update:modelValue"]);

const dropdown = ref(null);
const selectedIngredients = ref([]);
const isDropdownVisible = ref(false);
const mappedSelectedIng = computed(() => {
  if (selectedIngredients.value && selectedIngredients.value.length > 0) {
    const uniqueIngredients = selectedIngredients.value.reduce(
      (accumulator, item) => {
        if (item.name && item.name.length > 0) {
          accumulator.push(item.name[0]);
        }
        return accumulator;
      },
      []
    );
    return uniqueIngredients.join(", ");
  } else {
    return "Please select ingredients";
  }
});

const isSelected = (option) => {
  return selectedIngredients.value.some((item) => {
    return option.name.some((name) => item.name.includes(name));
  });
};

const toggleSelectedIng = (option) => {
  const updatedIngredients = [...selectedIngredients.value];
  const optionIndex = updatedIngredients.findIndex(
    (item) => item.id === option.id
  );

  if (optionIndex !== -1) {
    updatedIngredients.splice(optionIndex, 1);
  } else {
    updatedIngredients.push(option);
  }

  selectedIngredients.value = updatedIngredients;

  const uniqueIngredientNames = Array.from(
    new Set(updatedIngredients.flatMap((item) => item.name[0]))
  );

  emit("update:modelValue", uniqueIngredientNames);
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
