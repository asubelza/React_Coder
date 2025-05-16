import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";


export const getProducts = async (category = null) => {
        try {
            const db = getFirestore()
            const productsCollection = collection(db, "mangas")
            
            let q = productsCollection
            //incluir el filtrado por categoria
            
            const querySnapshot = await getDocs(q)
        
            const products = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            return products

        }   catch (error) {
            
            console.error("Error al obtener los productos", error);
            throw error
        }
}
    
 