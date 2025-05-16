
import React from 'react'

const OrderConfirmation = ({ orderId }) => {
    return (
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2>¡Gracias por tu compra!</h2>
            <p>Tu número de orden es:</p>
            <strong style={{ fontSize: '1.2rem', color: 'green' }}>{orderId}</strong>
        </div>
    );
};

export default OrderConfirmation;
