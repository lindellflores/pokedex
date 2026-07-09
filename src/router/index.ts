import { createRouter, createWebHistory } from "vue-router";

import IntroPage from "../views/introPage.vue";
import HomePage from "../views/homePage.vue";
import PokemonPage from "../views/pokemonPage.vue";
import LoadingPage from "@/views/loadingPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: IntroPage,
    },
    {
      path: "/home",
      component: HomePage,
    },
    {
      path: "/loading",
      component: LoadingPage,
    },
    {
      path: "/pokemon/:name",
      component: PokemonPage,
    },
  ],
});

export default router;
