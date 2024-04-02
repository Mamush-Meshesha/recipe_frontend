<template>
  <div>
    <div>
      <div>
        <span class="flex gap-3 items-center border-b">
          <h1 class="capitalize py-5 font-fractul text-3xl">comments</h1>
         
        </span>
      </div>
      <!-- end of comment title -->
      <div v-for="comme in result1?.comments" :key="comme.id">
        <div class="flex gap-5 pt-14 pb-4 dark:text-white items-center">
          <img
            :src="comme.user.url"
            alt="profile"
            class="w-12 h-12 rounded-full border-[#28cfcc] border object-cover"
          />
          <div>
            <h1 class="font-fractul text-2xl">
              {{ comme.user.first_name }}
            </h1>
            <p class="font-fractul text-xs">
              {{ formatTimestamp(comme.created_at) }}
            </p>
          </div>
        </div>
        <div>
          <div class="px-16 dark:text-white" >
            <p>
              {{ comme.comment }}
            </p>
          </div>
        </div>

        <div class="flex gap-3 px-16 pt-6 border-b pb-4">
          <svg
            class="w-6 h-6 text-[#b9b3b3] dark:text-white"
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
              d="M16 10.5h0m-4 0h0m-4 0h0M5 5h14c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1h-6.6a1 1 0 0 0-.7.3L8.8 19c-.3.3-.8 0-.8-.4V17c0-.6-.4-1-1-1H5a1 1 0 0 1-1-1V6c0-.6.4-1 1-1Z"
            />
          </svg>
          <p class="text-[#b9b3b3]">Replay</p>
          
        </div>
        <!-- replay section start -->
        <!-- <div class="px-16">
          <div class="flex gap-5 pt-14 pb-4 items-center">
            <img
              src="../images/02.jpeg"
              alt=""
              class="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h1 class="font-fractul text-2xl">alex</h1>
              <p class="font-fractul text-xs">45min</p>
            </div>
          </div>
          <div class="px-16">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              quaerat tempore, explicabo corrupti rerum labore totam. Quae eos
              ad aliquam.
            </p>
          </div>
        </div> -->
        <!-- replay section end-->
      </div>

      <!-- <div class="flex justify-center py-10">
        <button class="px-10 py-1 border border-black rounded-md">
          Load 25 more comments
        </button>
      </div> -->
      <!-- post comment -->
      <div class="pt-10">
        <div class="md:flex md:justify-between pb-5">
          <h1>Write a comment</h1>
        </div> 
        <div class="relative">
          <textarea
            v-model="userComment"
            placeholder="Write your comments here..."
            class="w-full outline-none bg-[#bdb4b4] dark:bg-[#0c252a] transition-colors ease-in-out duration-1000  rounded-md p-5 pr-20 h-[300px]"
          ></textarea>
          <button
            @click="handleComment"
            class="bg-[#ff642f] dark:bg-[#212448] px-8 py-2 float-end rounded-md bottom-0 text-white"
          >
            Post comment
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const idd = route.params.id;
const userComment = ref("");
const MUTATION_COMMENT = gql`
  mutation MyMutation($comment: String!, $comment_id: Int!) {
    insert_comments_one(
      object: { comment: $comment, comment_id: $comment_id }
    ) {
      comment
      user_id
    }
  }
`;

const { mutate: mutationComment } = useMutation(MUTATION_COMMENT);

const handleComment = async () => {
  try {
    await mutationComment({
      comment: userComment.value,
      comment_id: idd,
    });
  } catch (error) {
    console.log(error);
  }
};

// const props = defineProps({
//   recipe: Array,
// });

const Query = gql`
  query MyQuery($_gt: Int = 0, $recipe_id: Int!) {
    comments(where: { id: { _gt: $_gt }, recipe: { id: { _eq: $recipe_id} } }) {
      comment
      created_at
      user {
        first_name
        last_name
        url
      }
      recipe {
        id
        title
      }
    }
  }
`;
const { result: result1 } = useQuery(Query, { recipe_id: idd });

// convering created_at time to current time
const formatTimestamp = (timestamp) => {
  const createdAt = new Date(timestamp);
  const now = new Date();
  const diff = now - createdAt;

  const hours = Math.floor(diff / 3600000); // Calculate hours
  const days = Math.floor(hours / 24); // Calculate days
  const minutes = Math.floor(diff / 60000); // Calculate minutes

  if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else {
    return `${minutes} minutes ago`;
  }
};
</script>

<style></style>
