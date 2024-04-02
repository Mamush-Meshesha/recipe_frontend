


<template>
  <div>
    <div>
      <Header />
      <div class="mx-auto container">
        <div class="flex gap-3">
          <svg
            width="30px"
            height="30px"
            viewBox="0 -0.5 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5 7.75C15.0858 7.75 14.75 8.08579 14.75 8.5C14.75 8.91421 15.0858 9.25 15.5 9.25V7.75ZM19.5 9.25C19.9142 9.25 20.25 8.91421 20.25 8.5C20.25 8.08579 19.9142 7.75 19.5 7.75V9.25ZM20.25 8.5C20.25 8.08579 19.9142 7.75 19.5 7.75C19.0858 7.75 18.75 8.08579 18.75 8.5H20.25ZM18.75 12.5C18.75 12.9142 19.0858 13.25 19.5 13.25C19.9142 13.25 20.25 12.9142 20.25 12.5H18.75ZM20.0303 9.03033C20.3232 8.73744 20.3232 8.26256 20.0303 7.96967C19.7374 7.67678 19.2626 7.67678 18.9697 7.96967L20.0303 9.03033ZM12.5 15.5L11.9697 16.0303C12.2626 16.3232 12.7374 16.3232 13.0303 16.0303L12.5 15.5ZM9.5 12.5L10.0303 11.9697C9.73744 11.6768 9.26256 11.6768 8.96967 11.9697L9.5 12.5ZM4.96967 15.9697C4.67678 16.2626 4.67678 16.7374 4.96967 17.0303C5.26256 17.3232 5.73744 17.3232 6.03033 17.0303L4.96967 15.9697ZM15.5 9.25H19.5V7.75H15.5V9.25ZM18.75 8.5V12.5H20.25V8.5H18.75ZM18.9697 7.96967L11.9697 14.9697L13.0303 16.0303L20.0303 9.03033L18.9697 7.96967ZM13.0303 14.9697L10.0303 11.9697L8.96967 13.0303L11.9697 16.0303L13.0303 14.9697ZM8.96967 11.9697L4.96967 15.9697L6.03033 17.0303L10.0303 13.0303L8.96967 11.9697Z"
              fill="#000000"
            />
          </svg>
          <p class="text-xl">85% would make this again</p>
        </div>
        <div>
          <div class="flex md:justify-between flex-col-reverse md:flex-row">
            <h1 class="text-4xl font-fractul pt-5 font-bold w-full md:w-[55%]">
              <!-- {{ rec.title }} -->
            </h1>
            <div class="flex justify-end">
              <div class="flex gap-5 items-center">
                <svg
                  class="w-7 h-7 text-gray-800 dark:text-white"
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
                    d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8"
                  />
                </svg>
                <svg
                  class="w-7 h-7 text-gray-800 dark:text-white"
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
                    d="m17 21-5-4-5 4V3.9c0-.2 0-.5.2-.6l.6-.3h8.4c.2 0 .4 0 .6.3l.2.6V21Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <!-- profile -->
          <div class="flex gap-10 pt-7 border-b pb-4">
            <div class="flex gap-3 items-center">
              <img src="" alt="" class="w-10 h-10 rounded-full" />
              <h1 class="font-fractul font-bold">
                <!-- {{ rec.user.first_name }} {{ rec.user.last_name }} -->
              </h1>
            </div>
            <div class="flex items-center gap-3">
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
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
                  d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14c.6 0 1-.4 1-1V7c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
                />
              </svg>
              Yesterday
            </div>
            <!-- <div class="flex items-center gap-3">
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
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
                  d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
                />
              </svg>
              <h1>25</h1>
              <div class="card flex justify-content-center">
                <Rating v-model="value" :cancel="false" style="fill: red" />
              </div>
            </div> -->
          </div>
          <!-- end of profile -->
          <div>
            <div>
              <h1 class="md:w-[75%] w-full py-4 font-fractul text-xl">
                <!-- {{ rec.description }} -->
              </h1>
              <div class="py-5">
                <img
                  src=""
                  alt=""
                  class="w-full h-[600px] rounded-md object-cover"
                />
              </div>
            </div>
          </div>
          <!-- ingredients -->
          <div class="">
            <div class="">
              <!-- column one -->
              <div>
                <div class="flex gap-9 py-7">
                  <div class="border-r pr-5">
                    <h1>PREP TIME</h1>
                    <!-- <P> {{ rec.preparetion_time }} MIN</P> -->
                  </div>
                  <div class="border-r pr-5">
                    <h1>PREP TIME</h1>
                    <P>15MIN</P>
                  </div>
                  <div class="border-r pr-5">
                    <h1>SERVINGS</h1>
                    <p>4 PEOPLES</p>
                  </div>
                  <div>
                    <svg
                      class="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16.4 18H19c.6 0 1-.4 1-1v-5c0-.6-.4-1-1-1H5a1 1 0 0 0-1 1v5c0 .6.4 1 1 1h2.6m9.4-7V5c0-.6-.4-1-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4c0 .6-.4 1-1 1H8a1 1 0 0 1-1-1v-4Z"
                      />
                    </svg>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-10">
                  <div>
                    <h1 class="text-4xl font-bold font-fractul pb-5">
                      Ingridients
                    </h1>
                    <div >
                      <div class="flex gap-3 leading-[50px]">
                        <input
                          type="checkbox"
                          checked
                          class="w-[20px] border rounded-full"
                        />
                        <h1>
                          <!-- {{ ingre.name }} -->
                        </h1>
                      </div>
                    </div>
                  </div>
                  <!-- instarctions -->
                  <div>
                    <div class="w-full">
                      <h1 class="text-4xl font-bold font-fractul pb-5">
                        Instructions
                      </h1>
                      <ol>
                        <!-- one -->
                        <div class="flex gap-8 pb-6">
                          <div class="w-[40px]">
                            <div
                              class="w-[35px] h-[35px] text-white rounded-full flex items-center justify-center bg-[#ff3d3d]"
                            >
                              1
                            </div>
                          </div>
                          <div
                            class=""
                            
                          >
                            <p>
                              <!-- {{ rec.instructions.instruction }} -->
                            </p>
                          </div>
                        </div>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <!-- end of column one -->
            </div>
          </div>
          <!-- comment section -->
        
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
// const value = ref(5);

// const step = ref(1);

// const indexs = () => {
//   return step.value++;
// };

const userComment = ref("");
// id
const route = useRoute();
const idc = route.params.id;

// query
const COMMENT_QUERY = gql`
  query MyQuery($recipe_id: Int!) {
    recipe(where: { id: { _eq: $recipe_id } }) {
      id
      title
      description
      images {
        id
        url
      }
      ingredients {
        id
        name
      }
      instructions {
        id
        instruction
      }
      preparetion_time
      user {
        id
        first_name
        last_name
        url
      }
      comments(where: { comment: { _gt: "0" } }) {
        id
        comment
      }
    }
  }
`;
const { result, refetch } = useQuery(COMMENT_QUERY, { recipe_id: idc });

// for handling user comment insertion
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

const { mutate: mutationComment } = useMutation(MUTATION_COMMENT, {});

const handleComment = async () => {
  try {
    await mutationComment({
      comment: userComment.value,
      comment_id: idc,
    });
  } catch (error) {
    console.log(error);
  }
};

definePageMeta({
  middleware: "auth",
});
</script>

<style>
.list-item {
  list-style-type: none; /* Remove default markers */
  position: relative; /* Enable pseudo-element positioning */
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: white; /* Set text color */
  text-align: center; /* Center text content */
  line-height: 30px; /* Vertically center text */
  display: inline-block; /* Allow text wrapping */
  margin-right: 10px; /* Add spacing between items */
}

.list-item::before {
  /* Target the pseudo-element */
  content: counter(li); /* Generate numbering */
  counter-increment: li; /* Increment counter for each list item */
  display: block;
  position: absolute; /* Position the numbering within the circle */
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Adjust positioning for alignment */
  width: 100%; /* Match the circle size */
  height: 100%;
  border-radius: 50%; /* Inherit circular shape */
  background-color: red; /* Set red background for numbering */
}
</style>
