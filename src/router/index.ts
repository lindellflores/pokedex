import { createRouter, createWebHistory } from "vue-router";

import IntroPage from "@/views/introPage.vue";
import HomePage from "@/views/homePage.vue";
import PokemonPage from "@/views/pokemonPage.vue";
import BattlePage from "@/views/battlePage.vue";

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
      path: "/battle",
      component: BattlePage,
    },
    {
      path: "/pokemon/:name",
      component: PokemonPage,
    },
  ],
});

export default router;
