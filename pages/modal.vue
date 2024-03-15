<template>
  <div class="container mx-auto md:pt-16 pt-8 px-4 md:px-0">
    <div
      v-if="notice"
      class="md:flex md:justify-between md:shadow-md md:h-[140px] md:border md:rounded-md md:items-center p-10"
    >
      <div class="md:w-[70%]">
        <h1 class="text-4xl pb-4 md:pb-0 font-fractul capitalize font-bold">
          cookie notice
        </h1>
        <p class="pb-4 md:pb-0">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Necessitatibus accusantium atque impedit et blanditiis expedita
          facilis ab modi itaque assumenda. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. In, iusto.
        </p>
      </div>
      <div>
        <button
          @click="notice = false"
          class="px-6 py-2 bg-[#ff642f] text-white border rounded-md"
        >
          Got it
        </button>
      </div>
    </div>
    <!-- login and signup form -->
    <div class="md:flex md:gap-16 pt-10 md:pt-20">
      <!-- login form -->
      <div class="p-10 border md:w-[50%] w-full rounded-md relative shadow-md">
        <h1 class="text-4xl capitalize font-fractul">login</h1>
        <form @submit.prevent="handleLogin" class="flex flex-col gap-4 pt-10">
          <div class="relative pb-9">
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="h-[50x] w-full outline-none border-b px-10 py-1 text-xl"
            />
            <Icon
              name="mdi-light:email"
              class="text-3xl text-[#000] absolute top-0 left-0"
            />
            <span class="text-red-500">
              {{ errors.email }}
            </span>
          </div>
          <div class="relative pb-9">
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="h-[50x] w-full outline-none border-b px-10 py-1 text-xl"
            />
            <Icon
              name="arcticons:password"
              class="text-3xl text-[#000] absolute top-0 left-0"
            />
            <div class="flex flex-col">
              <span class="text-red-500 capitalize">
                {{ errors.password }}
              </span>
              <!-- <span v-if="uppercaseMet">✔</span>
              <span v-if="lowercaseMet">✔</span>
              <span v-if="numberMet">✔</span>
              <span v-if="specialCharMet">✔</span>
              <span v-if="passwordLenMet">❌ Minimum 8 characters</span> -->
            </div>
          </div>
          <div class="flex justify-end">
            <h1 class="text-[#ff642f]">Forget password?</h1>
            <Icon icon="icon-park-solid:correct" class="text-5xl text-black" />
          </div>
          <div class="flex justify-center">
            <button
              type="submit"
              class="px-6 py-2 rounded-md bg-[#ff642f] text-white"
            >
              Login
            </button>
          </div>
        </form>
        <div class="flex gap-2 justify-center py-6">
          <h1>Don't Have an account?</h1>
          <h1 class="text-[#ff642f]">Sign up</h1>
        </div>
        <Icon
          name="lucide:x"
          class="absolute top-0 right-0 text-3xl mt-5 mr-5"
        />
      </div>
      <!-- signup form -->
      <div class="p-10 border md:w-[50%] w-full relative rounded-md shadow-md">
        <h1 class="text-4xl capitalize font-fractul">Sign up</h1>
        <div class="flex flex-col gap-4 pt-10">
          <div class="relative pb-9">
            <input
              v-model="first_name"
              type="text"
              placeholder="First Name"
              class="h-[50x] w-full outline-none border-b px-10 py-1 text-xl"
            />
            <svg
              class="text-3xl text-[#000] absolute top-0 left-0"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 48 48"
            >
              <path
                fill="currentColor"
                d="M10.5 16a5.5 5.5 0 1 1 11 0a5.5 5.5 0 0 1-11 0M16 8a8 8 0 1 0 0 16a8 8 0 0 0 0-16m14.5 10a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m3.5-6a6 6 0 1 0 0 12a6 6 0 0 0 0-12m0 27c-2.176 0-3.922-.352-5.316-.922l.186-.24c.494-.651.873-1.303 1.163-1.921c1.02.355 2.316.583 3.966.583c4.276 0 6.173-1.533 7.063-2.831a5.55 5.55 0 0 0 .925-2.5a2.983 2.983 0 0 0 .012-.176v-.243c0-.69-.56-1.25-1.25-1.25h-9.886a5.73 5.73 0 0 0-1.255-2.5H40.75a3.75 3.75 0 0 1 3.75 3.75v.297l-.003.086c-.004.07-.01.164-.02.279a8.05 8.05 0 0 1-1.351 3.67C41.701 37.158 38.973 39 33.998 39M6.75 27A3.75 3.75 0 0 0 3 30.75v1.303l.004.097c.004.08.012.186.026.318c.029.262.084.622.192 1.05a8.686 8.686 0 0 0 1.5 3.112C6.479 38.946 9.826 41 16 41c6.175 0 9.522-2.054 11.277-4.37a8.687 8.687 0 0 0 1.501-3.113c.108-.427.163-.787.192-1.05a5.585 5.585 0 0 0 .03-.414V30.75A3.75 3.75 0 0 0 25.25 27zm-1.249 5.024l-.001-.032V30.75c0-.69.56-1.25 1.25-1.25h18.5c.69 0 1.25.56 1.25 1.25v1.242l-.001.032a5.189 5.189 0 0 1-.144.88a6.187 6.187 0 0 1-1.07 2.216c-1.182 1.56-3.71 3.38-9.285 3.38s-8.103-1.82-9.285-3.38a6.186 6.186 0 0 1-1.07-2.215a5.2 5.2 0 0 1-.144-.881"
              />
            </svg>
            <span class="text-red-500 capitalize">
              {{ errors.first_name }}
            </span>
          </div>
          <div class="relative pb-9">
            <input
              v-model="last_name"
              type="text"
              placeholder="Last Name"
              class="h-[50x] w-full outline-none border-b px-10 py-1 text-xl"
            />
            <svg
              class="text-3xl text-[#000] absolute top-0 left-0"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 48 48"
            >
              <path
                fill="currentColor"
                d="M10.5 16a5.5 5.5 0 1 1 11 0a5.5 5.5 0 0 1-11 0M16 8a8 8 0 1 0 0 16a8 8 0 0 0 0-16m14.5 10a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m3.5-6a6 6 0 1 0 0 12a6 6 0 0 0 0-12m0 27c-2.176 0-3.922-.352-5.316-.922l.186-.24c.494-.651.873-1.303 1.163-1.921c1.02.355 2.316.583 3.966.583c4.276 0 6.173-1.533 7.063-2.831a5.55 5.55 0 0 0 .925-2.5a2.983 2.983 0 0 0 .012-.176v-.243c0-.69-.56-1.25-1.25-1.25h-9.886a5.73 5.73 0 0 0-1.255-2.5H40.75a3.75 3.75 0 0 1 3.75 3.75v.297l-.003.086c-.004.07-.01.164-.02.279a8.05 8.05 0 0 1-1.351 3.67C41.701 37.158 38.973 39 33.998 39M6.75 27A3.75 3.75 0 0 0 3 30.75v1.303l.004.097c.004.08.012.186.026.318c.029.262.084.622.192 1.05a8.686 8.686 0 0 0 1.5 3.112C6.479 38.946 9.826 41 16 41c6.175 0 9.522-2.054 11.277-4.37a8.687 8.687 0 0 0 1.501-3.113c.108-.427.163-.787.192-1.05a5.585 5.585 0 0 0 .03-.414V30.75A3.75 3.75 0 0 0 25.25 27zm-1.249 5.024l-.001-.032V30.75c0-.69.56-1.25 1.25-1.25h18.5c.69 0 1.25.56 1.25 1.25v1.242l-.001.032a5.189 5.189 0 0 1-.144.88a6.187 6.187 0 0 1-1.07 2.216c-1.182 1.56-3.71 3.38-9.285 3.38s-8.103-1.82-9.285-3.38a6.186 6.186 0 0 1-1.07-2.215a5.2 5.2 0 0 1-.144-.881"
              />
            </svg>
            <span class="text-red-500 capitalize">
              {{ errors.last_name }}
            </span>
          </div>
          <div class="relative pb-9">
            <input
              v-model="regEmail"
              type="email"
              placeholder="Email"
              class="h-[50x] w-full outline-none border-b px-10 py-1 text-xl"
            />
            <Icon
              name="mdi-light:email"
              class="text-3xl text-[#000] absolute top-0 left-0"
            />
            <span class="text-red-500 capitalize">
              {{ errors.regEmail}}
            </span>
          </div>
          <div class="relative pb-9">
            <input
              v-model="regPassword"
              type="password"
              placeholder="Password"
              class="h-[50x] w-full outline-none border-b px-10 py-1 text-xl"
            />
            <Icon
              name="arcticons:password"
              class="text-3xl text-[#000] absolute top-0 left-0"
            />
            <span class="text-red-500 capitalize">
              {{ errors.regPassword }}
            </span>
          </div>
          <div class="flex justify-center">
            <button class="px-6 py-2 rounded-md bg-[#ff642f] text-white">
              sign up
            </button>
          </div>
        </div>
        <div class="flex gap-2 justify-center py-6">
          <h1>by creating an account you are agree to our</h1>
          <span class="text-[#ff642f]"> terms and policy </span>
        </div>
        <Icon
          name="lucide:x"
          class="absolute top-0 right-0 text-3xl mt-5 mr-5"
        />
      </div>
    </div>
    <!-- delete account  -->
    <div class="py-10">
      <div class="md:w-[40%] w-full p-12 rounded-md border shadow-md">
        <h1 class="text-3xl font-bold font-fractul pb-4">
          Are you sure you want to delete your account?
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod magni
          laboriosam quas explicabo eligendi recusandae possimus reiciendis
          culpa nisi praesentium? Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Corporis, recusandae!
        </p>
        <div class="flex justify-between pt-6">
          <button class="text-white px-4 py-2 bg-[#ff642f] rounded-md">
            Delete
          </button>
          <button class="px-4 py-2 bg-[#f3f1f1] rounded-md">Cancel</button>
        </div>
      </div>
    </div>
    <!-- recipes -->
    <div class="pb-8">
      <div class="md:w-[60%] w-full p-12 rounded-md border relative shadow-md">
        <div>
          <h1 class="text-5xl text-center font-bold font-fractul pb-7">
            would you make this recipe again?
          </h1>
        </div>
        <div class="flex flex-col gap-5 px-10">
          <button class="bg-[#60dc8c] text-3xl text-white h-16 rounded-md">
            Yes!
          </button>
          <button class="bg-[#ff3030] text-3xl text-white h-16 rounded-md">
            No!
          </button>
        </div>
        <Icon
          name="lucide:x"
          class="absolute top-0 right-0 text-3xl mt-5 mr-5"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// const email = ref("");
// const password = ref("");

const router = useRouter();
// vee-validate
import * as z from "zod";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
const passwordPattern =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])\w{8,}$/;

// const uppercaseMet = ref(false);
// const lowercaseMet = ref(false);
// const numberMet = ref(false);
// const specialCharMet = ref(false);
// const passwordLenMet = ref(false);

const validationSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .nonempty("email mustn't be empty")
      .email("email address must be valid containg @gmail.com"),
    password: z
      .string()
      .nonempty("password mustn't be empty")
      .min(8, { message: "it have to contain atleast 8 characters" }),
    regEmail: z
      .string()
      .nonempty("email mustn't be empty")
      .email("email address must be valid containg @gmail.com"),
    regPassword: z
      .string()
      .nonempty("password mustn't be empty")
      .min(8, { message: "at least it has to be 8" }),
    first_name: z
      .string()
      .nonempty("first name mustn't be empty")
      .min(3, { message: "at least it has to be 3 characters" }),
    last_name: z
      .string()
      .nonempty("last name mustn't be empty")
      .min(3, { message: "at least it has to be 3 characters" }),
  })
);
// const ValidationSchema = toTypedSchema(
//   z.object({
//     regEmail: z.string().nonempty().email(),
//     regPassword: z
//       .nonempty()
//       .string()
//       .min(8, { message: "it have to contain atleast 8 characters" }),
//     first_name: z.string().nonempty()
//       .min(3, { message: "it have to contain atleast 3 characters" }),
//     last_name: z.string()
//       .nonempty()
//       .min(3, { message: "it have to contain atleast 3 characters" }),
//   })
// );

const { handleSubmit, errors } = useForm({
  validationSchema,
});
const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");
const { value: regEmail, errorMessage: regEmailError } = useField("regEmail");
const { value: regPassword, errorMessage: regPasswordError } =
  useField("regPassword");
const { value: first_name, errorMessage: first_nameError } =
  useField("first_name");
const { value: last_name, errorMessage: last_nameError } =
  useField("last_name");
const { onLogin } = useApollo();
const MUTATION_LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`;

const { mutate: userLogin } = useMutation(MUTATION_LOGIN);

const handleLogin = async () => {
  try {
    const res = await userLogin({
      email: email.value,
      password: password.value,
    });
    onLogin(res?.data.login.accessToken);
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

// computed(() => {
//   if (password.value) {
//     uppercaseMet.value = /[A-Z]/.test(password.value);
//     lowercaseMet.value = /[a-z]/.test(password.value);
//     numberMet.value = /\d/.test(password.value);
//     specialCharMet.value = /[^\da-zA-Z]/.test(password.value);
//     passwordLenMet.value = password.value.length >= 8;
//   } else {
//     uppercaseMet.value = false;
//     lowercaseMet.value = false;
//     numberMet.value = false;
//     specialCharMet.value = false;
//     passwordLenMet.value = false;
//   }
// });

//notice
const notice = ref(true);

definePageMeta({
  middleware: "already-auth",
});
</script>

<style></style>
