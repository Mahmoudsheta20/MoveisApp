import { getDocs } from "firebase/firestore";
import { q } from "./firebase";

export const getWatchList = async () => {
  const reqeust = await getDocs(q);
  return reqeust.docs;
};
