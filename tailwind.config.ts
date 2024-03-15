import type { Config } from "tailwindcss";
import googleFonts from "@nuxtjs/google-fonts";
export default <Partial<Config>>{
  content: [],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        fractul: ["Fractul", "serif"],
        veneer: ["Veneer", "serif"],
        dancing: ["Dancing Script", "serif"],
        sacre: ["Sacramento", "serif"],
      },
      screens: {
        // Adjust breakpoints to your desired spacing
        sm: "640px", // Default
        md: "768px", // Default
        lg: "992px", // Example larger size
        xl: "1280px", // Default
        "2xl": "1536px", // Default
      },
    },
  },
  plugins: [],
};
