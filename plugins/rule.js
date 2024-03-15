// import { defineRule } from "vee-validate";
// export default defineNuxtPlugin(() => {
//   defineRule("email", (value) => {
//     return (
//       !value ||
//       /[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
//         value
//       ) ||
//       "email address not valid"
//     );
//   });

//   defineRule("password", (value) => {
//     return (
//       !value ||
//       value.length >= 8 ||
//       "password must be at least 8 characters long"
//     );
//   });

//   defineRule("confirm", (value, [other]) => {
//     return !value || value === other || "password is not correct";
//   });
// });
