<template>
  <div class="overflow-x-hidden">
    <Header />
    <div class="container mx-auto">
      <div class="flex flex-col gap-16 mx-5 md:mx-0">
        <!-- componet one -->
        <div
          class="flex-col md:flex md:flex-row w-full rounded-lg bg-[#e3f1ff]"
        >
          <div class="w-[70%]">
            <ul>
              <li>
                <img
                  src="https://jangorecipes.com/wp-content/uploads/2023/09/image-2023-09-07T110633.694-1.jpg.webp"
                  alt=""
                  class="w-full md:w-full h-[300px] md:h-[550px] object-cover rounded-lg rounded-tr-none rounded-br-none"
                />
              </li>
            </ul>
          </div>
          <!-- text -->
          <div class="flex w-full md:w-[45%] pt-6 md:pt-0 md:items-center">
            <div class="flex flex-col gap-4 px-5 md:px-14">
              <div>
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
                  <p>85% would make this again</p>
                </div>

                <div>
                  <div>
                    <h1
                      class="md:text-4xl text-3xl font-semibold font-fractul capitalize"
                    >
                      the mighty super cheesecake
                    </h1>
                    <p class="pt-5">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Expedita pariatur repellendus exercitationem sed est
                      reiciendis ratione ut at architecto quia, nam repellat
                      dolorem dicta. Eveniet, ipsum reprehenderit. Sint, cum
                      voluptatibus. Lorem ipsum dolor sit amet consectetur,
                      adipisicing elit. Voluptate, cumque!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex md:items-end justify-end mr-4 pb-4">
            <div
              class="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-[#ff824b] dark:text-white"
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
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </div>
          </div>

          <!-- end text -->
        </div>
        <!-- componet two -->
        <Delicious :food="data.food" />
        <!-- componet three -->
        <Sweet :food="data.food" />
        <!-- popular catagories -->
        <Popular :food="data.food" />
      </div>
    </div>
    <Emailbox />
    <div class="container mx-auto mt-20">
      <Handpicked :food="data.food" />
    </div>
    <Latestrecipe :food="data.food" />
    <More />
    <Footer />
  </div>
</template>

<script setup>
const value = ref(5);

const QUERY_USER = gql`
  query MyQuery {
    food {
      catagory
      description
      id
      recipe_id
      title
      url
      
    }
  }
`;
definePageMeta({
  middleware: "auth",
});
const { data } = useAsyncQuery(QUERY_USER);
</script>
