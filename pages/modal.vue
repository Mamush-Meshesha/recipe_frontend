<template>
  <div class="container mx-auto md:pt-16 pt-8 px-4 md:px-0">
    <div
      v-if="notice"
      class="md:flex md:justify-between md:shadow-md md:h-[140px] md:border md:rounded-md md:items-center p-10"
    >
      <div class="md:w-[60%]">
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
    <div class="md:flex md:gap-16 justify-center pt-10 md:pt-20">
      <!-- login form -->
      <div
        class="p-10 border md:w-[70%] h-[100%] w-full py-20 rounded-md relative shadow-md"
      >
        <h1 class="text-4xl capitalize text-center font-fractul">login</h1>
        <form
          @submit.prevent="handleLogin"
          class="flex flex-col items-center gap-4 pt-10"
        >
          <div class="relative pb-9 flex flex-col">
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="h-[50x] w-full outline-none border-b px-10  text-xl"
            />
            <Icon
              name="mdi-light:email"
              class="text-2xl text-[#000] absolute top-0 left-0"
            />
            <span class="text-red-500 w-full">
              {{ errors.email }}
            </span>
          </div>
          <div class="relative pb-9">
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="h-[50x] w-full outline-none border-b px-10  text-xl"
            />
            <Icon
              name="arcticons:password"
              class="text-2xl text-[#000] absolute top-0 left-0"
            />
            <div class="flex flex-col">
              <span class="text-red-500 capitalize">
                {{ errors.password }}
              </span>
            </div>
          </div>
          <div class="flex justify-end">
            <h1 class="text-[#ff642f]">Forget password?</h1>
          </div>
          <div class="flex justify-center">
            <Toast />
            <Button
              severity="success"
              type="submit"
              class="px-6 py-2 rounded-md bg-[#ff642f] text-white"
            >
              Login
            </Button>
          </div>
        </form>
        <div class="flex gap-2 justify-center py-6">
          <h1>Don't Have an account?</h1>
          <NuxtLink to="/signup" class="text-[#ff642f]">Sign up</NuxtLink>
        </div>
        <Icon
          name="lucide:x"
          class="absolute top-0 right-0 text-3xl mt-5 mr-5"
        />
      </div>
      <!-- signup form -->
    </div>
    <!-- delete account  -->
    <!-- <div class="py-10">
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
    </div> -->
    <!-- recipes -->
    <!-- <div class="pb-8">
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
    </div> -->
  </div>
</template>

<script setup>
const toast = useToast();
// const email = ref("");
// const password = ref("");

const router = useRouter();
// vee-validate
import * as z from "zod";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
const passwordPattern =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])\w{8,}$/;

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
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema,
});
const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");

const { onLogin } = useApollo();
const MUTATION_LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`;

const { mutate: userLogin, refetch } = useMutation(MUTATION_LOGIN);

const handleLogin = async () => {
  await handleSubmit(async () => {
    try {
      const res = await userLogin({
        email: email.value,
        password: password.value,
      });
      onLogin(res?.data.login.accessToken);
      toast.add({
        severity: "Success",
        summary: "Success Message",
        detail: "Successfully Logged in",
        life: 3000,
      });
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Email or password incorrect",
        life: 3000,
      });
    }
  })();
  toast.add({
        severity: "error",
        summary: "Error",
        detail: "Email or password does not satisfy the minimum requirement",
        life: 3000,
      });
};

// const handleLG = async () => {
//   try {
//       const res = await userLogin({
//         email: email.value,
//         password: password.value,
//       });
//       onLogin(res?.data.login.accessToken);
//       toast.add({
//         severity: "Success",
//         summary: "Success Message",
//         detail: "Successfully Logged in",
//         life: 3000,
//       });
//       navigateTo("/");
//     } catch (error) {
//       console.log(error);
//       toast.add({
//         severity: "error",
//         summary: "Error",
//         detail: "Email or password incorrect",
//         life: 3000,
//       });
//     }
// }

const notice = ref(true);

definePageMeta({
  middleware: "already-auth",
});
</script>

<style></style>
