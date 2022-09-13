import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";

const config: UserConfig = {
  server: { host: "192.168.68.57" },

  plugins: [sveltekit()],
};

export default config;
