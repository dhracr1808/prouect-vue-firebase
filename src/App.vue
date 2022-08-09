<template>
  <div v-if="userStore.loadingSession" class="content_loding">
    <span class="loader"></span>
  </div>
  <div v-else>
    <nav>
      <router-link to="/" v-if="userStore.userData">Inicio</router-link>
      <div v-else>
        <router-link to="/login">login</router-link> |
        <router-link to="/register">register</router-link> |
      </div>

      <button @click="cerrarSession" v-if="userStore.userData">logout</button>
    </nav>
  </div>
  <router-view />
</template>

<script setup>
import { useUserStore } from "./stores/user";

const { cerrarSession } = useUserStore();
const userStore = useUserStore();
</script>

<style scoped>
.content_loding {
  width: 100%;
  height: 100vh;
  background-color: rgb(240, 240, 240);
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  width: 64px;
  height: 64px;
  position: relative;
  background-image: linear-gradient(rgb(113, 14, 179) 16px, transparent 0),
    linear-gradient(#ff3d00 16px, transparent 0),
    linear-gradient(#ff3d00 16px, transparent 0),
    linear-gradient(rgb(113, 14, 179) 16px, transparent 0);
  background-repeat: no-repeat;
  background-size: 16px 16px;
  background-position: left top, left bottom, right top, right bottom;
  animation: rotate 1s linear infinite;
}
@keyframes rotate {
  0% {
    width: 64px;
    height: 64px;
    transform: rotate(0deg);
  }
  50% {
    width: 30px;
    height: 30px;
    transform: rotate(180deg);
  }
  100% {
    width: 64px;
    height: 64px;
    transform: rotate(360deg);
  }
}
</style>
