import { createApp } from 'vue'
import App from './App.vue'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/plugins/fontawsome";
// import Vue from 'vue'
// import router from './router'


createApp(App)
.component("font-awesome-icon", FontAwesomeIcon)
.mount('#app')






//import firebase from 'firebase/compat/app';
//import 'firebase/compat/auth';
//import 'firebase/compat/firestore';


/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App :user="user" ></App>',
//   components: { App },
//   //
//   data(){
//     return {
//       user : {}
//     }
//   },
// })
//   methods:{
//     getLoginStatus(){
//       let vm = this
//       firebase.auth().onAuthStateChanged(function(user) {
//         if (user) {
//           vm.user = user
//           console.log("// User is signed in by Phone Number : ", user.phoneNumber)
//         } else {
//           vm.user = null
//           console.log("// No user is signed in.")
//         }
//       });
//     },
//     initFirebase(){
//       const firebaseApp = initializeApp(firebaseConfig);
//       const initializeApp = {
//         apiKey: "AIzaSyBYcHSGSLTyKY57Jjb8IFGaWMPoBeptnUM",
//         authDomain: "synpulse-f206e.firebaseapp.com",
//         projectId: "synpulse-f206e",
//         storageBucket: "synpulse-f206e.appspot.com",
//         messagingSenderId: "1059955035402",
//         appId: "1:1059955035402:web:5e5a67864f5858e40efef3",
//         measurementId: "G-M76E0HS59E"
//       };
//       var db = firebase.firestore();
//     },
//   },
  
  
//   updated(){
//     this.getLoginStatus()
//   },
//   created(){
//     this.initFirebase()
//     this.getLoginStatus()
//   }

  
// })

