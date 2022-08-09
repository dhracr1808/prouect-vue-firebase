<template>
  <div>
    <h1>Home</h1>
    <span> {{ userStore.userData?.email }} </span>
    <hr />
    <div class="content_loaderr" v-if="databaseStore.loading">
      <span class="loaderr"></span>
    </div>
    <div v-else>
      <Form />
      <div v-for="doc of databaseStore.documents" :key="doc.id">
        {{ doc.name }}
        <br />
        {{ doc.id }}
        <br />
        {{ doc.user }}
        <br />
        <button
          @click="router.push(`edit/${doc.id}`)"
          v-if="userStore.userData"
        >
          editar
        </button>
        <button @click="databaseStore.deleteUrl(doc.id)">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "./../stores/user";
import { useDatabaseStore } from "./../stores/database";
import Form from "./../components/Form.vue";
import { useRouter } from "vue-router";
const userStore = useUserStore();
const databaseStore = useDatabaseStore();

const router = useRouter();

databaseStore.getUrls();
</script>

<style>
.content_loaderr {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: rgb(211, 211, 211);
  width: 100%;
}
.loaderr {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 32px 0 #fff, -32px 0 #fff;
  position: relative;
  animation: flash 0.5s ease-out infinite alternate;
}

@keyframes flash {
  0% {
    background-color: rgb(113, 14, 179);
    box-shadow: 32px 0 rgb(113, 14, 179), -32px 0 rgb(250, 79, 79);
  }
  50% {
    background-color: rgb(250, 79, 79);
    box-shadow: 32px 0 rgb(113, 14, 179), -32px 0 rgb(113, 14, 179);
  }
  100% {
    background-color: rgb(113, 14, 179);
    box-shadow: 32px 0 rgb(250, 79, 79), -32px 0 rgb(113, 14, 179);
  }
}
</style>
