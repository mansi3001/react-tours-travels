import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const registerUser = async (email, password, role) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCred.user.uid;
  await setDoc(doc(db, "users", uid), { email, role });
  return { uid, role };
};

export const loginUser = async (email, password, expectedRole) => {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  const uid = userCred.user.uid;
  const docSnap = await getDoc(doc(db, "users", uid));

  if (!docSnap.exists() || docSnap.data().role !== expectedRole) {
    throw new Error("Invalid role access");
  }
  localStorage.setItem("user", JSON.stringify({ uid, ...docSnap.data() }));
  return docSnap.data();
};