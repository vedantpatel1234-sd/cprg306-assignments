import { db } from "../_utils/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function addItem(userId, item) {
  try {
    const itemsRef = collection(db, "users", userId, "items");

    const docRef = await addDoc(itemsRef, {
      name: item.name,
      quantity: item.quantity,
      category: item.category,
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding item:", error);
    return null;
  }
}

export async function getItems(userId) {
  try {
    const itemsRef = collection(db, "users", userId, "items");
    const snapshot = await getDocs(itemsRef);

    const items = [];
    snapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return items;
  } catch (error) {
    console.error("Error getting items:", error);
    return [];
  }
}