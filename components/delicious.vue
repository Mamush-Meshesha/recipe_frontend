<template>
  <div>
    <div>
      <div>
        <h1 class="capitalize pb-8 font-semibold font-fractul text-4xl">
          Super delicious
        </h1>
        <div class="md:grid md:grid-cols-3 md:gap-6 flex flex-col gap-3">
          <div class="w-full" v-for="foo in food.slice(1, 4)" :key="foo.id">
            <div>
              <!-- image -->
              <div class="w-full">
                <img
                  :src="foo.url"
                  alt="image not found"
                  class="w-full h-[300px] rounded-md object-cover"
                />
              </div>
              <!-- rating -->
              <div class="py-4">
                <div class="card flex justify-content-center">
                  <span v-if="!foo.ratings || foo.ratings.length === 0">
                    No ratings yet. Be the first to rate!
                    <Rating
                      @click="handleRating(foo.id)"
                      :initial-value="0"
                      :cancel="false"
                      style="fill: red"
                    />
                  </span>
                  <Rating
                    @click="handleRating(foo.id)"
                    v-else
                    :ratings="foo.ratings"
                    :key="foo.id"
                    v-model="rat.value"
                    :cancel="false"
                    style="fill: red"
                  />
                </div>
                <div class="py-3">
                  <h1 class="capitalize font-semibold font-poppins">
                    {{ foo.title }}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  food: Array,
});

const value = ref(0);

const MUTATION_RATING = gql`
  mutation Rate($value: Int!) {
    update_rating(where: {}, _set: { value: $value }) {
      affected_rows
      returning {
        id
        value
        user_id
      }
    }
  }
`;

const { mutate: Rate } = useMutation(MUTATION_RATING);

const handleRating = async (recipe_id) => {

  await Rate({
    value: value.value ++,
    recipe_id: recipe_id,
  });
};
</script>

<style></style>
