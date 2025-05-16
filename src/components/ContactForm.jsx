import { useState, useContext, useRef } from 'react'
import { CartContext } from '../context/ShoppingCartContext'
import { createOrder } from '../services/orderService'
import { useNavigate, Link } from 'react-router-dom'
import { Toast } from 'primereact/toast';
import styles from './ContactForm.module.css'
import OrderConfirmation from './OrderConfirmation';

const ContactForm = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [orderId, setOrderId] = useState(null);

    const { cart, clearCart } = useContext(CartContext);
    const toast = useRef(null);
    const navigate = useNavigate();

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nombre === "" || apellido === "" || email === "") {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Todos los campos son obligatorios',
                life: 3000
            });
            return;
        }

        try {
            const orderData = {
                buyer: { nombre, apellido, email },
                items: cart.map(item => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity
                })),
                total: calculateTotal()
            };

            const id = await createOrder(orderData);
            setOrderId(id);
            clearCart();
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Hubo un error al crear tu orden',
                life: 3000
            });
        }
    }

    if (orderId) {
        return (
            <div className={styles.fromContainer}>
                <OrderConfirmation orderId={orderId} />
                <Link to="/">
                    <button className={styles.button}>Volver a la tienda</button>
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.formContainer}>
            <Toast ref={toast} />
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        className={styles.input}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="text"
                        placeholder="Apellido"
                        className={styles.input}
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="email"
                        placeholder="Email"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit" className={styles.button}>
                    Enviar y Comprar
                </button>
            </form>
        </div>
    );
}

export default ContactForm;

