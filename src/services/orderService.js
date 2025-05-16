import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

export const createOrder = async (orderData) => {
    try {
        const db = getFirestore();
        const ordersCollection = collection(db, "orders");

        const order = {
            ...orderData,
            createdAt: serverTimestamp(),
        };

        const docRef = await addDoc(ordersCollection, order);
        return docRef.id;
    }
    catch (error) {
        console.error("Error creando orden:", error);
        throw error;
    }
};
