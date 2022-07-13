import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/metiers": {
        target: "https://fr.wikimini.org/wiki/Liste_des_m%C3%A9tiers",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/metiers/, ""),
      },
      "/noms": {
        target: "https://nomsdefamille.net/france",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/noms/, ""),
      },
      "/picture": {
        target:
          "https://randomuser.me/api?gender=male&inc=gender,picture&noinfo",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/picture/, ""),
      },
    },
  },
});
