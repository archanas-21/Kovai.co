import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const fetchTasks = async () => {
  const querySnapshot = await getDocs(collection(db, "tasks"));

  const taskList = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  setTasks(taskList);
};