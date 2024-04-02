<script setup>
const toast = useToast();
// const email = ref("");
// const password = ref("");

const router = useRouter();
// vee-validate
import * as z from "zod";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useRouter } from "vue-router";
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

const { handleSubmit, errors } = useForm({
  validationSchema,
});
const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");
const { value: first_name, errorMessage: first_nameError } =
  useField("first_name");
const { value: last_name, errorMessage: last_nameError } =
  useField("last_name");

const MUTATION_REGISTER = gql`
  mutation userRegisteration(
    $email: String!
    $first_name: String!
    $last_name: String!
    $password: String!
  ) {
    register(
      email: $email
      first_name: $first_name
      last_name: $last_name
      password: $password
    ) {
      success
    }
  }
`;
const { mutate: userRegisteration } = useMutation(MUTATION_REGISTER);

const handleRegisteration = async () => {
  await handleSubmit(async () => {
    try {
      await userRegisteration({
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        password: password.value,
      });
      toast.add({
        severity: "Success",
        summary: "Sucess Message",
        detail: "SUccessfully Registered",
        life: 3000,
      });
      navigateTo("/modal")
    } catch (error) {
      console.log(error);
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "email or password incorrect",
        life: 3000,
      });
    }
  })();
};
const notice = ref(true);

definePageMeta({
  middleware: "already-auth",
});
</script>
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
    <div class="flex justify-center items-center pt-16">
      <div class="p-10 border md:w-[70%] w-full relative rounded-md shadow-md">
        <div class="py-6">
          <h1 class="text-4xl capitalize text-center font-fractul">Sign up</h1>
          <div class="flex flex-col items-center gap-4 pt-10">
            <div class="relative pb-9">
              <div class="flex flex-col">
                <input
                  v-model="first_name"
                  type="text"
                  placeholder="First Name"
                  class="h-[50x] w-full outline-none border-b px-10 py-1 text-xl"
                />
                <Icon
                  name="icon-park-outline:edit-name"
                  class="text-2xl absolute top-0 left-0 text-[#8d8888]"
                />
                <span class="text-red-500 capitalize">
                  {{ errors.first_name }}
                </span>
              </div>
            </div>
            <div class="relative pb-9">
              <div class="flex flex-col">
                <input
                  v-model="last_name"
                  type="text"
                  placeholder="Last Name"
                  class="h-[50x] w-full outline-none border-b px-10 py-1 text-xl"
                />
                <Icon
                  name="icon-park-outline:edit-name"
                  class="text-2xl absolute top-0 left-0 text-[#9b9696]"
                />
                <span class="text-red-500 capitalize">
                  {{ errors.last_name }}
                </span>
              </div>
            </div>
            <div class="relative pb-9 flex flex-col">
              <div class="flex flex-col">
                <input
                  v-model="email"
                  type="email"
                  placeholder="Email"
                  class="h-[50x] w-full outline-none border-b px-10 py-1 text-xl"
                />
                <Icon
                  name="mdi-light:email"
                  class="text-2xl text-[#6e6b6b] absolute top-0 left-0"
                />
                <span class="text-red-500 capitalize">
                  {{ errors.email }}
                </span>
              </div>
            </div>
            <div class="relative pb-9">
              <div class="flex flex-col">
                <input
                  v-model="password"
                  type="password"
                  placeholder="Password"
                  class="h-[50x] w-full outline-none border-b px-10 py-1 text-xl"
                />
                <Icon
                  name="arcticons:password"
                  class="text-2xl text-[#000] absolute top-0 left-0"
                />
                <span class="text-red-500 capitalize">
                  {{ errors.password }}
                </span>
              </div>
            </div>
            <div class="flex justify-center">
              <Toast />
              <Button
                severity="success"
                @click="handleRegisteration"
                class="px-6 py-2 rounded-md bg-[#ff642f] text-white"
              >
                sign up
              </Button>
            </div>
            <div class="flex gap-10 items-center justify-end">
              <h1>Already have an account?</h1>
              <NuxtLink to="/modal" class="text-[#cf326b]">Login</NuxtLink>
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
    </div>
  </div>
</template>
