import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { addDoc, deleteDoc, doc, getDoc } from "firebase/firestore/lite";
import { updateDoc } from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { db, auth } from "./../firebase";
import { nanoid } from "nanoid";
import router from "../router";

export const useDatabaseStore = defineStore("database", {
  state: () => ({ documents: [], loading: false }),
  actions: {
    async getUrls() {
      if (this.documents[0]) return;
      this.loading = true;
      try {
        const userId = auth.currentUser.uid;
        const q = query(collection(db, "urls"), where("user", "==", userId));
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
          this.documents.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async setUrl(name) {
      this.loading = true;
      try {
        const user = auth.currentUser.uid;
        const objectDoc = { name, short: nanoid(6), user };
        const docRef = await addDoc(collection(db, "urls"), objectDoc);
        this.documents.push({ id: docRef.id, ...objectDoc });
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async leerUrl(id) {
      this.loading = true;
      try {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) throw new Error("no existe el documento");
        if (docSnap.data().user !== auth.currentUser.uid)
          throw new Error("el documento no le pertenece");
        return docSnap.data().name;
      } catch (error) {
        console.log(error.message);
      } finally {
        this.loading = false;
      }
    },
    async updateUrl(id, name) {
      this.loading = true;
      try {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) throw new Error("no existe el documento");
        if (docSnap.data().user !== auth.currentUser.uid)
          throw new Error("el documento no le pertenece");
        await updateDoc(docRef, { name });
        this.documents = this.documents.map((item) =>
          item.id === id ? { ...item, name } : item
        );
        router.push("/");
      } catch (error) {
        console.log(error, message);
      } finally {
        this.loading = false;
      }
    },

    async deleteUrl(id) {
      try {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) throw new Error("no existe el documento");
        if (docSnap.data().user !== auth.currentUser.uid)
          throw new Error("el documento no le pertenece");
        await deleteDoc(docRef);
        this.documents = this.documents.filter((e) => e.id !== id);
      } catch (error) {
        console.log(error.message);
      }
    },
  },
});
