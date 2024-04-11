<template>
  <div>
    <div>
      <div>
        <h1
          class="capitalize pb-8 font-semibold font-fractul dark:text-white text-4xl"
        >
          Super delicious
        </h1>
        <div
          class="md:grid md:grid-cols-3 md:gap-6 flex flex-col dark:bg-[#182234] transition-colors ease-in-out duration-1000 gap-3"
        >
          <div v-if="loading">
            <Icon
              name="line-md:loading-alt-loop"
              class="text-5xl dark:text-[#3ee5da]"
            />
          </div>
          <div
            class="w-full border-2 dark:border-[#76807b] h-auto dark:hover:border-[#00DC82] hover:border-[#00DC82] rounded-md"
            v-for="foo in result?.recipe"
            :key="foo.id"
          >
            <div>
              <!-- image -->
              <NuxtLink :to="{ name: 'fullindex-id', params: { id: foo.id } }">
                <div class="w-full" v-for="image in foo.images" :key="image.id">
                  <img
                    :src="image.url[0]"
                    alt="image not found"
                    class="w-full h-[300px] rounded-md dark:rounded-b-none object-cover"
                  />
                </div>
              </NuxtLink>
              <!-- rating -->
              <div class="">
                <div class="card flex justify-content-center pl-3">
                  <Toast />
                  <Rating
                    @click="handleRatings(foo.id)"
                    v-model="userRatingValue"
                    :cancel="false"
                    :model-value="foo.avarage_rating"
                  />
                </div>
                <div class="py-3">
                  <h1
                    class="capitalize font-semibold dark:text-white px-2 font-poppins"
                  >
                    {{ foo.title }}
                  </h1>
                </div>
                <div class="flex items-center h-[40px] border-t pb-1">
                  <div class="px-5 flex justify-between items-center w-full">
                    <div class="flex gap-2 items-center">
                      <Toast />
                      <Button @click="handleLikes(foo.id, foo.is_liked)">
                        <Icon
                          :class="{ liked: foo.is_liked }"
                          name="mdi:heart"
                          class="text-3xl text-[#8f8c8c] pt-2"
                        />
                      </Button>
                      <div v-if="foo.likes_aggregate.aggregate.count > 0">
                        <h1 class="text-xl pt-2 dark:text-white">
                          {{ foo.likes_aggregate.aggregate.count }}
                        </h1>
                      </div>
                    </div>

                    <NuxtLink
                      :to="{ name: 'cnt-id', params: { id: foo.id } }"
                      class="flex gap-2 items-center"
                    >
                      <Icon
                        name="iconamoon:comment-thin"
                        class="text-3xl text-[#d8423d] pt-2"
                      />
                      <div v-if="foo.comments_aggregate.aggregate.count > 0">
                        <h1 class="text-xl pt-2 dark:text-white">
                          {{ foo.comments_aggregate.aggregate.count }}
                        </h1>
                      </div>
                    </NuxtLink>

                    <div class="flex items-center">
                      <Toast />
                      <Button @click="handleBookmark(foo.id, foo.is_booked)">
                        <Icon
                          :class="{ liked: foo.is_booked }"
                          name="ic:baseline-bookmark"
                          class="text-4xl text-[#635d5d] pt-2"
                        />
                      </Button>
                      <div v-if="foo.bookmarks_aggregate.aggregate.count > 0">
                        <h1 class="text-xl pt-2 dark:text-white">
                          {{ foo.bookmarks_aggregate.aggregate.count }}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- </NuxtLink> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const toast = useToast();
import { jwtDecode } from "jwt-decode";

const token = useCookie("accessToken").value;
const decoded = jwtDecode(token);
const userId = parseInt(
  decoded["https://hasura.io/jwt/claims"]["x-hasura-user-id"]
);

const QUERY_USER = gql`
  query MyQuery {
    recipe {
      id
      title
      description
      is_liked
      is_booked
      ingredients {
        id
        name
      }
      preparetion_time
      instructions {
        id
        instruction
      }
      avarage_rating
      images {
        id
        url
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      bookmarks_aggregate {
        aggregate {
          count
        }
      }
      comments_aggregate(where: { comment: { _gt: "0" } }) {
        aggregate {
          count
        }
      }
      ratings {
        user_id
        rating_value
      }
    }
  }
`;

const { result, refetch, onDone, loading } = useQuery(QUERY_USER);
console.log(result.value);

const LIKE_MUTATION = gql`
  mutation likeRecipe($recipe_id: Int!) {
    insert_likes_one(
      object: { recipe_id: $recipe_id }
      on_conflict: {
        constraint: likes_user_id_recipe_id_key
        update_columns: recipe_id
      }
    ) {
      recipe_id
      id
    }
  }
`;
// delete likes mutation
const DELETE_LIKE = gql`
  mutation deleteLike($recipe_id: Int!, $user_id: Int!) {
    delete_likes(
      where: { recipe_id: { _eq: $recipe_id }, user_id: { _eq: $user_id } }
    ) {
      affected_rows
    }
  }
`;

// mutation bookmarks

const MUTATION_BOOKMARKS = gql`
  mutation bookRecipe($recipe_id: Int!) {
    insert_bookmarks_one(
      object: { recipe_id: $recipe_id }
      on_conflict: {
        constraint: bookmarks_user_id_recipe_id_key
        update_columns: recipe_id
      }
    ) {
      id
      recipe_id
    }
  }
`;
const MUTATION_DELETE_BOOK = gql`
  mutation deleteBooked($user_id: Int!, $recipe_id: Int!) {
    delete_bookmarks(
      where: { user_id: { _eq: $user_id }, recipe_id: { _eq: $recipe_id } }
    ) {
      affected_rows
    }
  }
`;
const { mutate: deleteBooked } = useMutation(
  MUTATION_DELETE_BOOK,
  {
    variables: { user_id: userId },
  },
  () => ({
    fetchPolicy: "network-only",
  })
);
const { mutate: bookRecipe } = useMutation(MUTATION_BOOKMARKS, () => ({
  fetchPolicy: "network-only",
}));
const { mutate: deleteLike } = useMutation(
  DELETE_LIKE,
  {
    variables: { user_id: userId },
  },
  () => ({
    fetchPolicy: "network-only",
  })
);

const likeColor = computed(() => {});
const isLiked = ref(false);

const { mutate: likeRecipe } = useMutation(LIKE_MUTATION, () => ({
  fetchPolicy: "network-only",
}));

const handleLikes = async (recipe_id, is_liked) => {
  try {
    if (is_liked == null) {
      console.log("Like status is null");
    } else {
      if (is_liked) {
        await deleteLike({ recipe_id, is_liked });
      } else {
        await likeRecipe({ recipe_id });
        isLiked.value = true;
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Like updated successfully",
          life: 3000,
        });
      }
      refetch();
    }
  } catch (error) {
    console.log(error);
    toast.add({
      severity: "Error",
      summary: "Error",
      detail: "Error updating like",
      life: 3000,
    });
  }
};

const isbooked = ref(false);

const handleBookmark = async (recipe_id, is_booked) => {
  try {
    if (is_booked == null) {
      console.log("no recipe id");
    } else {
      if (is_booked) {
        await deleteBooked({ recipe_id, is_booked });
      } else {
        await bookRecipe({ recipe_id });
        isbooked.value = true;
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Like updated successfully",
          life: 3000,
        });
      }
      refetch();
    }
  } catch (error) {
    console.log(error);
    toast.add({
      severity: "Error",
      summary: "Error",
      detail: "Error updating bookmark",
      life: 3000,
    });
  }
};

const userRatingValue = ref(1);

const MUTATION_RATE = gql`
  mutation userRating($rating_value: Int!, $recipe_id: Int!) {
    insert_rating_one(
      object: { rating_value: $rating_value, recipe_id: $recipe_id }
      on_conflict: {
        constraint: rating_user_id_recipe_id_key
        update_columns: rating_value
      }
    ) {
      rating_value
      user_id
    }
  }
`;

const { mutate: userRating } = useMutation(
  MUTATION_RATE,
  {
    onDone: () => {
      refetch();
    },
  },
  () => ({
    fetchPolicy: "network-only",
  })
);

const rated = ref(false);
const handleRatings = async (recipe_id) => {
  try {
    await userRating({
      rating_value: userRatingValue.value,
      recipe_id: recipe_id,
    });

    rated.value = true;
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "rating updated successfully",
      life: 3000,
    });
    refetch();
  } catch (error) {
    console.log(error);
  }
};
</script>

<style>
.liked {
  color: red;
}
</style>
