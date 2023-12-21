// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBnw5YoAA4aaP09IQ27MwTrdx3crI4woQY",
  authDomain: "spark-tasker.firebaseapp.com",
  projectId: "spark-tasker",
  storageBucket: "spark-tasker.appspot.com",
  messagingSenderId: "293140058541",
  appId: "1:293140058541:web:d7d1f24db48a27fb55d124"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;