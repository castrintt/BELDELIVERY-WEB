import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAab_DeA2VZuLl05oBMFeY8A9J9mv7OU6I",
  authDomain: "beldelivery-f4426.firebaseapp.com",
  projectId: "beldelivery-f4426",
  storageBucket: "beldelivery-f4426.appspot.com",
  messagingSenderId: "545880720658",
  appId: "1:545880720658:web:eb3db6de50c19f5760dfcb"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
