import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const addTask = async () => {
  try {
    await addDoc(collection(db, "tasks"), {
      title: taskTitle,
      status: "Planned",
      createdAt: new Date(),
    });

    alert("Task Added");

  } catch (error) {
    console.log(error);
  }
};