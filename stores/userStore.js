import { defineStore } from "pinia";

export const useRecipeStore = defineStore({
  id: "offsetStore",
  state: () => ({
    offset: 0, // Initialize the offset value
  }),
  actions: {
    incrementOffset() {
      this.offset++; // Increment offset value by one
      localStorage.setItem("offset", this.offset.toString()); // Save offset value to localStorage
    },
    initializeOffset() {
      this.offset = parseInt(localStorage.getItem("offset") || "0"); // Initialize offset value from localStorage
    },
  },
});
