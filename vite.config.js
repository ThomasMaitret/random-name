import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/name": {
        target: "https://nomsdefamille.net/france",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/name/, ""),
      },
      "/job": {
        target: "https://fr.wikimini.org/wiki/Liste_des_m%C3%A9tiers",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/job/, ""),
      },
      "/picture": {
        target:
          "https://randomuser.me/api?gender=male&inc=gender,picture&noinfo",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/picture/, ""),
      },
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});
