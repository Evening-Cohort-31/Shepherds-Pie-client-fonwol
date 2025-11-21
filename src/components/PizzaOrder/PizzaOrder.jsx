// Import React and useState hook for managing component state
import React, { useState } from 'react';
// Import icons from lucide-react library
import { Plus, Trash2, ShoppingCart, User } from 'lucide-react';
// Import custom CSS styles
import './Pizza.css';

const PizzaOrderingApp = () => {
  // State to track which view/page is currently displayed
  const [currentView, setCurrentView] = useState('orderList');
  // State to store all orders created
  const [orders, setOrders] = useState([]);
  // State to store the order currently being viewed/edited
  const [currentOrder, setCurrentOrder] = useState(null);
  // State to store pizza being edited (null if adding new pizza)
  const [editingPizza, setEditingPizza] = useState(null);

  // Pizza configuration data - sizes, prices, and options
  
  // Available pizza sizes with dimensions and base prices
  const pizzaSizes = [
    { name: 'Kids', size: 8, price: 6.00 },
    { name: 'Small', size: 10, price: 10.00 },
    { name: 'Medium', size: 14, price: 12.50 },
    { name: 'Large', size: 16, price: 15.00 },
    { name: 'X Large', size: 18, price: 18.00 }
  ];

  // Available cheese options
  const cheeseOptions = [
    'Mozzarella',
    'Buffalo Mozzarella',
    'Four Cheese',
    'Vegan',
    'Ricotta',
    'None (cheeseless)'
  ];

  // Available sauce options
  const sauceOptions = [
    'Marinara',
    'Arrabbiata',
    'Garlic White',
    'Diavolo',
    'None (sauceless pizza)'
  ];

  // Available toppings (can select multiple)
  const toppingOptions = [
    'Sausage',
    'Pepperoni',
    'Mushroom',
    'Onion',
    'Green pepper',
    'Black olive',
    'Basil',
    'Extra cheese'
  ];

  // Generate unique order ID using timestamp and random string
  const generateOrderId = () => {
    return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  // Create New Order Form Component
  // This form captures customer information and creates a new empty order
  const CreateOrderForm = () => {
    // Local state to store customer information input
    const [customerInfo, setCustomerInfo] = useState({
      name: '',
      phone: '',
      email: '',
      address: ''
    });

    // Update customer info state when form inputs change
    const handleInputChange = (e) => {
      setCustomerInfo({
        ...customerInfo,
        [e.target.name]: e.target.value
      });
    };

    // Validate and save the new order
    const handleSaveOrder = () => {
      // Require name and phone before creating order
      if (!customerInfo.name || !customerInfo.phone) {
        alert('Please fill in at least customer name and phone number');
        return;
      }

      // Create new order object with generated ID and timestamp
      const newOrder = {
        id: generateOrderId(),
        customer: customerInfo,
        pizzas: [],
        createdAt: new Date().toLocaleString(),
        total: 0
      };

      // Add order to orders list and set as current order
      setOrders([...orders, newOrder]);
      setCurrentOrder(newOrder);
      // Navigate to order details page
      setCurrentView('orderDetails');
    };

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="card">
          <div className="flex gap-12 mb-24">
            <User size={32} color="#dc2626" />
            <h2 className="card-title">Create New Order</h2>
          </div>
          
          <div>
            <div className="form-group">
              <label className="form-label">Customer Name *</label>
              <input
                type="text"
                name="name"
                value={customerInfo.name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={customerInfo.phone}
                onChange={handleInputChange}
                className="form-input"
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                className="form-input"
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Delivery Address</label>
              <textarea
                name="address"
                value={customerInfo.address}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="123 Main St, Apt 4B"
                rows="3"
              />
            </div>

            <button onClick={handleSaveOrder} className="btn btn-primary btn-full btn-large mt-24">
              Save Order
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Pizza Builder Component
  // This component allows users to customize a pizza by selecting size, cheese, sauce, and toppings
  const PizzaBuilder = ({ pizza, onSave, onCancel }) => {
    // Initialize pizza with default values (Medium, Mozzarella, Marinara) or existing pizza data
    const [currentPizza, setCurrentPizza] = useState(pizza || {
      size: pizzaSizes[2], // Default to Medium
      cheese: cheeseOptions[0], // Default to Mozzarella
      sauce: sauceOptions[0], // Default to Marinara
      toppings: [],
      price: pizzaSizes[2].price
    });

    // Handle pizza size selection - updates size and price
    const handleSizeSelect = (e, size) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrentPizza(prev => ({
        ...prev,
        size: size,
        price: size.price
      }));
    };

    // Handle cheese selection - updates cheese type
    const handleCheeseSelect = (e, cheese) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrentPizza(prev => ({
        ...prev,
        cheese: cheese
      }));
    };

    // Handle sauce selection - updates sauce type
    const handleSauceSelect = (e, sauce) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrentPizza(prev => ({
        ...prev,
        sauce: sauce
      }));
    };

    // Handle topping toggle - adds or removes topping from selection
    const handleToppingToggle = (e, topping) => {
      e.preventDefault();
      e.stopPropagation();
      // Check if topping is already selected
      const toppings = currentPizza.toppings.includes(topping)
        ? currentPizza.toppings.filter(t => t !== topping) // Remove if selected
        : [...currentPizza.toppings, topping]; // Add if not selected
      
      setCurrentPizza(prev => ({
        ...prev,
        toppings: toppings
      }));
    };

    // Save the configured pizza and return to order details
    const handleSavePizza = (e) => {
      e.preventDefault();
      e.stopPropagation();
      onSave(currentPizza);
    };

    return (
      <div className="card">
        <h3 className="card-title mb-24">
          {pizza ? 'Edit Pizza' : 'Build Your Pizza'}
        </h3>

        {/* Size Selection */}
        <div className="mb-24">
          <h4 className="section-header">Select Size</h4>
          <div className="selection-grid selection-grid-5">
            {pizzaSizes.map((size) => (
              <button
                key={size.name}
                type="button"
                onClick={(e) => handleSizeSelect(e, size)}
                className={`selection-btn ${currentPizza.size.name === size.name ? 'active' : ''}`}
              >
                <div className="selection-btn-title">{size.name}</div>
                <div className="selection-btn-detail">{size.size}"</div>
                <div className="selection-btn-detail">${size.price.toFixed(2)}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Cheese Selection */}
        <div className="mb-24">
          <h4 className="section-header">Select Cheese</h4>
          <div className="selection-grid selection-grid-3">
            {cheeseOptions.map((cheese) => (
              <button
                key={cheese}
                type="button"
                onClick={(e) => handleCheeseSelect(e, cheese)}
                className={`selection-btn ${currentPizza.cheese === cheese ? 'active' : ''}`}
              >
                {cheese}
              </button>
            ))}
          </div>
        </div>

        {/* Sauce Selection */}
        <div className="mb-24">
          <h4 className="section-header">Select Sauce</h4>
          <div className="selection-grid selection-grid-3">
            {sauceOptions.map((sauce) => (
              <button
                key={sauce}
                type="button"
                onClick={(e) => handleSauceSelect(e, sauce)}
                className={`selection-btn ${currentPizza.sauce === sauce ? 'active' : ''}`}
              >
                {sauce}
              </button>
            ))}
          </div>
        </div>

        {/* Toppings Selection */}
        <div className="mb-24">
          <h4 className="section-header">Select Toppings</h4>
          <div className="selection-grid selection-grid-4">
            {toppingOptions.map((topping) => (
              <button
                key={topping}
                type="button"
                onClick={(e) => handleToppingToggle(e, topping)}
                className={`selection-btn ${currentPizza.toppings.includes(topping) ? 'active' : ''}`}
              >
                {topping}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-12">
          <button type="button" onClick={handleSavePizza} className="btn btn-primary btn-full">
            {pizza ? 'Update Pizza' : 'Add Pizza to Order'}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-outline">
            Cancel
          </button>
        </div>
      </div>
    );
  };

  // Order Details Component
  // Displays order information, customer details, and list of pizzas in the order
  const OrderDetails = () => {
    if (!currentOrder) return null;

    // Navigate to pizza builder to add a new pizza
    const handleAddPizza = () => {
      setEditingPizza(null);
      setCurrentView('pizzaBuilder');
    };

    // Navigate to pizza builder to edit an existing pizza
    const handleEditPizza = (index) => {
      setEditingPizza({ ...currentOrder.pizzas[index], index });
      setCurrentView('pizzaBuilder');
    };

    // Remove a pizza from the order and recalculate total
    const handleDeletePizza = (index) => {
      const updatedPizzas = currentOrder.pizzas.filter((_, i) => i !== index);
      const updatedOrder = {
        ...currentOrder,
        pizzas: updatedPizzas,
        total: updatedPizzas.reduce((sum, pizza) => sum + pizza.price, 0)
      };
      // Update current order and orders list
      setCurrentOrder(updatedOrder);
      setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
    };

    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">Order #{currentOrder.id}</h2>
              <p className="card-subtitle">{currentOrder.createdAt}</p>
            </div>
            <button onClick={() => setCurrentView('orderList')} className="btn btn-outline">
              Back to Orders
            </button>
          </div>

          <div className="customer-info">
            <h3 className="section-header mb-16">Customer Information</h3>
            <div className="customer-info-grid">
              <div className="customer-info-item">
                <p className="customer-info-label">Name</p>
                <p className="customer-info-value">{currentOrder.customer.name}</p>
              </div>
              <div className="customer-info-item">
                <p className="customer-info-label">Phone</p>
                <p className="customer-info-value">{currentOrder.customer.phone}</p>
              </div>
              {currentOrder.customer.email && (
                <div className="customer-info-item">
                  <p className="customer-info-label">Email</p>
                  <p className="customer-info-value">{currentOrder.customer.email}</p>
                </div>
              )}
              {currentOrder.customer.address && (
                <div className="customer-info-item" style={{ gridColumn: 'span 2' }}>
                  <p className="customer-info-label">Address</p>
                  <p className="customer-info-value">{currentOrder.customer.address}</p>
                </div>
              )}
            </div>
          </div>

          <button onClick={handleAddPizza} className="btn btn-primary btn-full btn-large">
            <Plus size={20} />
            Add Pizza
          </button>
        </div>

        {/* Pizza List */}
        {currentOrder.pizzas.length > 0 && (
          <div className="card">
            <h3 className="section-header mb-16">Pizzas in Order</h3>
            <div className="pizza-list">
              {currentOrder.pizzas.map((pizza, index) => (
                <div key={index} className="pizza-item">
                  <div className="pizza-item-content">
                    <div className="pizza-item-details">
                      <h4 className="pizza-item-title">
                        {pizza.size.name} Pizza ({pizza.size.size}")
                      </h4>
                      <p className="pizza-item-info">
                        <span className="pizza-item-label">Cheese:</span> {pizza.cheese}
                      </p>
                      <p className="pizza-item-info">
                        <span className="pizza-item-label">Sauce:</span> {pizza.sauce}
                      </p>
                      {pizza.toppings.length > 0 && (
                        <p className="pizza-item-info">
                          <span className="pizza-item-label">Toppings:</span> {pizza.toppings.join(', ')}
                        </p>
                      )}
                      <p className="pizza-item-price">${pizza.price.toFixed(2)}</p>
                    </div>
                    <div className="pizza-item-actions">
                      <button onClick={() => handleEditPizza(index)} className="btn btn-secondary">
                        Edit
                      </button>
                      <button onClick={() => handleDeletePizza(index)} className="btn btn-primary btn-icon">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-total">
              <span className="order-total-label">Total:</span>
              <span className="order-total-amount">${currentOrder.total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Order List Component
  // Displays all orders and allows user to view order details or create new orders
  const OrderList = () => {
    // Navigate to order details page for selected order
    const handleViewOrder = (order) => {
      setCurrentOrder(order);
      setCurrentView('orderDetails');
    };

    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">All Orders</h2>
            <button onClick={() => setCurrentView('createOrder')} className="btn btn-primary btn-large">
              <Plus size={20} />
              Create New Order
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="empty-state">
              <ShoppingCart className="empty-state-icon" size={64} />
              <p className="empty-state-text">No orders yet. Create your first order!</p>
            </div>
          ) : (
            <div className="order-list">
              {orders.map((order) => (
                <div key={order.id} className="order-item" onClick={() => handleViewOrder(order)}>
                  <div className="order-item-content">
                    <div className="order-item-info">
                      <h3 className="order-item-id">Order #{order.id}</h3>
                      <p className="order-item-customer">{order.customer.name} - {order.customer.phone}</p>
                      <p className="order-item-date">{order.createdAt}</p>
                      <p className="order-item-pizzas">
                        {order.pizzas.length} pizza{order.pizzas.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="order-item-total">
                      <p className="order-item-price">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Handle pizza save from builder
  // Updates existing pizza or adds new pizza to the order, then recalculates total
  const handleSavePizza = (pizza) => {
    if (editingPizza !== null && editingPizza.index !== undefined) {
      // Editing existing pizza - replace it in the array
      const updatedPizzas = [...currentOrder.pizzas];
      updatedPizzas[editingPizza.index] = pizza;
      const updatedOrder = {
        ...currentOrder,
        pizzas: updatedPizzas,
        total: updatedPizzas.reduce((sum, p) => sum + p.price, 0)
      };
      setCurrentOrder(updatedOrder);
      setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
    } else {
      // Adding new pizza - append to array
      const updatedPizzas = [...currentOrder.pizzas, pizza];
      const updatedOrder = {
        ...currentOrder,
        pizzas: updatedPizzas,
        total: updatedPizzas.reduce((sum, p) => sum + p.price, 0)
      };
      setCurrentOrder(updatedOrder);
      setOrders(orders.map(o => o.id === updatedOrder.id ? updatedOrder : o));
    }
    // Clear editing state and return to order details
    setEditingPizza(null);
    setCurrentView('orderDetails');
  };

  return (
    <div className="pizza-app">
      <div className="pizza-app-container">
        {/* Header - displays app title and subtitle */}
        <div className="app-header">
          <h1 className="app-title">🍕 Pizza Palace</h1>
          <p className="app-subtitle">Employee Order Management System</p>
        </div>

        {/* Main Content - renders different views based on currentView state */}
        {/* Show order list view */}
        {currentView === 'orderList' && <OrderList />}
        {/* Show create order form */}
        {currentView === 'createOrder' && <CreateOrderForm />}
        {/* Show order details and pizza list */}
        {currentView === 'orderDetails' && <OrderDetails />}
        {/* Show pizza builder for adding/editing pizzas */}
        {currentView === 'pizzaBuilder' && (
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <PizzaBuilder
              pizza={editingPizza}
              onSave={handleSavePizza}
              onCancel={() => setCurrentView('orderDetails')}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PizzaOrderingApp;