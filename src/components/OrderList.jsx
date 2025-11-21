import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, getOrdersByDate, getTodaysOrders } from '../../services/orderService';
import './OrdersList.css';

export const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const ordersPerPage = 20;
  const navigate = useNavigate();

  function getTodayDateString() {
    return new Date().toISOString().split('T')[0];
  }

  useEffect(() => {
    fetchTodaysOrders();
  }, []);

  useEffect(() => {
    
    setCurrentPage(1);
  }, [selectedDate]);

  const fetchTodaysOrders = async () => {
    setLoading(true);
    try {
      const todaysOrders = await getTodaysOrders();
      setOrders(todaysOrders);
      setFilteredOrders(todaysOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      alert('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = async (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    setLoading(true);

    try {
      const ordersForDate = await getOrdersByDate(newDate);
      setOrders(ordersForDate);
      setFilteredOrders(ordersForDate);
    } catch (error) {
      console.error('Failed to fetch orders for date:', error);
      alert('Failed to load orders for selected date');
    } finally {
      setLoading(false);
    }
  };

  
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return 'status-badge status-completed';
      case 'in-progress':
        return 'status-badge status-in-progress';
      case 'pending':
        return 'status-badge status-pending';
      default:
        return 'status-badge';
    }
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="orders-list-container">
      <div className="orders-header">
        <h1>Orders</h1>
        <button 
          className="btn-new-order"
          onClick={() => navigate('/orders/new')}
        >
          + New Order
        </button>
      </div>
      <div className="filters">
        <div className="date-filter">
          <label htmlFor="order-date">Filter by Date:</label>
          <input
            type="date"
            id="order-date"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <button 
            className="btn-today"
            onClick={() => {
              const today = getTodayDateString();
              setSelectedDate(today);
              handleDateChange({ target: { value: today } });
            }}
          >
            Today
          </button>
        </div>

        <div className="results-info">
          Showing {filteredOrders.length} order(s) for {new Date(selectedDate).toLocaleDateString()}
        </div>
      </div>
      {currentOrders.length === 0 ? (
        <div className="no-orders">
          <p>No orders found for this date.</p>
        </div>
      ) : (
        <>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Time</th>
                <th>Customer Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map(order => (
                <tr key={order.id}>
                  <td className="order-id">#{order.id}</td>
                  <td>{formatTime(order.orderDate)}</td>
                  <td className="customer-name">{order.customerName}</td>
                  <td>
                    {order.delivererId ? (
                      <span className="order-type delivery">Delivery</span>
                    ) : (
                      <span className="order-type dine-in">Table {order.tableNumber}</span>
                    )}
                  </td>
                  <td>
                    <span className={getStatusBadgeClass(order.status)}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-view"
                      onClick={() => navigate(`/orders/${order.id}`)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                ← Previous
              </button>

              <div className="pagination-pages">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`pagination-page ${currentPage === pageNum ? 'active' : ''}`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next →
              </button>

              <div className="pagination-info">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};