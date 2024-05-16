import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: "#e0e0e0",
      black: "#00302d",
      red: "#de0b30",
      blue: "#2cabfd",
      green: "#52ae5c",
      yellow: "#f7e81d",
      brown: "#232323"
    }
  },
  plugins: [],
};
export default config;
