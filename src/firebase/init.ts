/* istanbul ignore file */
import firebase from "firebase/app";
import "firebase/auth";

import { firebaseConfig } from "./config";

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
