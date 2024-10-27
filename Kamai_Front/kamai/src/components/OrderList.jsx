// File: src/components/OrderList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './OrderList.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        setError('Error fetching orders');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="order-list-container">
      <h2>Your Orders</h2>
      <ul>
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <Link to={`/orders/${order._id}`}>
            <p>Job: {order.jobId.title}</p>
            <p>Status: {order.status}</p>
            <p>Accepted Date: {new Date(order.acceptedDate).toLocaleString()}</p>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
