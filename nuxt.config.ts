// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-primevue",
    "vue3-carousel-nuxt",
    "nuxt-icon",
    "@nuxtjs/apollo",
    [
      "@vee-validate/nuxt",
      {
        // disable or enable auto imports
        autoImports: true,
        // Use different names for components
        componentNames: {
          Form: "VeeForm",
          Field: "VeeField",
          FieldArray: "VeeFieldArray",
          ErrorMessage: "VeeErrorMessage",
        },
      },
    ],
  ],
  css: ["@/assets/css/main.css"],

  app: {
    head: {
      title: "Food recipe",
    },
  },
  apollo: {
    authHeader: "Authorization",
    authType: "Bearer",
    tokenStorage: "cookie",
    clients: {
      default: {
        httpEndpoint: "http://localhost:8181/v1/graphql",
        tokenStorage: "cookie",
        authHeader: "Authorization",
        tokenName: "accessToken",
      },
    },
  },
});
