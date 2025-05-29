import { getFirestore, collection, addDoc, doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export const createOrderWithStockCheck = async (orderData) => {
  const db = getFirestore();

  try {
    // Validar stock para cada producto
    for (const item of orderData.items) {
      const productRef = doc(db, "mangas", item.id);
      const productSnap = await getDoc(productRef);

      if (!productSnap.exists()) {
        throw new Error(`El producto ${item.title} no existe`);
      }

      const productData = productSnap.data();

      if (item.quantity > productData.stock) {
        throw new Error(`Stock insuficiente para ${item.title}. Solo quedan ${productData.stock} unidades.`);
      }
    }

    // Crear orden
    const ordersCollection = collection(db, "orders");
    const orderToSave = {
      ...orderData,
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(ordersCollection, orderToSave);

    // Actualizar stock
    for (const item of orderData.items) {
      const productRef = doc(db, "mangas", item.id);
      const productSnap = await getDoc(productRef);
      const productData = productSnap.data();

      await updateDoc(productRef, {
        stock: productData.stock - item.quantity
      });
    }

    return docRef.id;
  } catch (error) {
    console.error("Error creando orden con control de stock:", error);
    throw error;
  }
}

