import { defineStore } from "pinia";
import { auth } from "./../firebase";
import { createUserWithEmailAndPassword as createUser } from "firebase/auth";
import { signInWithEmailAndPassword as loginUser } from "firebase/auth";
import { signOut, onAuthStateChanged } from "firebase/auth";
import router from "../router";
import { useDatabaseStore } from "./database";

const databaseStore = () => useDatabaseStore();

export const useUserStore = defineStore("userStore", {
  state: () => ({ userData: null, loadingUser: false, loadingSession: false }),
  actions: {
    async registerUser(email, password) {
      this.loadingUser = true;
      try {
        console.log(this.loadingUser);
        const { user } = await createUser(auth, email, password);
        this.userData = { email: user.email, uid: user.uid };
        router.push("/");
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingUser = false;
      }
    },

    async loginUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await loginUser(auth, email, password);
        this.userData = { email: user.email, uid: user.uid };
        router.push("/");
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingUser = false;
      }
    },

    async cerrarSession() {
      databaseStore().$reset();
      try {
        await signOut(auth);
        this.userData = null;
        router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },

    currentUser() {
      return new Promise((resolve, reject) => {
        const unsuscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) this.userData = { email: user.email, uid: user.uid };
            else {
              this.userData = null;
              databaseStore().$reset();
            }
            resolve(user);
          },
          reject
        );
        unsuscribe();
      });
    },
  },
});
