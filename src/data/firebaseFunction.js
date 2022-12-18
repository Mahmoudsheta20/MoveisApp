import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { q } from "./firebase";

export const getAllWatchList = async () => {
  const items = await getDocs(q);

  return items.docs;
};
