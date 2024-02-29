import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,components}/**/*.{ts,tsx}",
  ],
} satisfies Config;
