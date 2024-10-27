import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './OrderPage.css';

const OrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${id}`);
      const data = await response.json();
      setOrder(data);
    };

    fetchOrder();
  }, [id]);

  const handleUpdate = async () => {
    const payload = {};

    switch (order.status) {
      case 'accepted':
        payload.status = 'confirmed';
        payload.productOrderId = inputValue;
        break;
      case 'confirmed':
        payload.status = 'shipped';
        payload.shippingId = inputValue;
        break;
      case 'shipped':
        payload.status = 'ofd';
        payload.otp = inputValue.split('-')[0];
        payload.mobileLast4Digits = inputValue.split('-')[1];
        break;
      default:
        break;
    }

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const updatedOrder = await response.json();
    setOrder(updatedOrder);
    setInputValue('');
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div className="order-page">
      <h1 className="order-title">Order Details</h1>
      <div className="order-details">
        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Status:</strong> {order.status}</p>
      </div>

      <div className="order-form">
        {order.status === 'accepted' && (
          <>
            <label>Enter Product Order ID:</label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="input-field"
            />
          </>
        )}

        {order.status === 'confirmed' && (
          <>
            <label>Enter Shipping ID:</label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="input-field"
            />
          </>
        )}

        {order.status === 'shipped' && (
          <>
            <label>Enter OTP and Last 4 Digits of Mobile (e.g., 1234-5678):</label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="input-field"
            />
          </>
        )}

        <button onClick={handleUpdate} disabled={!inputValue} className="update-button">
          Update Order Status
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
