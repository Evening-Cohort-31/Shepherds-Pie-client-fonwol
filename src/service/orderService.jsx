

const DELIVERY_SURCHARGE = 5.00;

export const getAllOrders = async () => {
  const response = await fetch(
    'http://localhost:8088/orders?_expand=orderTaker&_expand=deliverer'
  );
  return await response.json();
};

export const getOrdersByDate = async (dateString) => {

  const allOrders = await getAllOrders();

  const targetDate = new Date(dateString).toISOString().split('T')[0];
  
  const filteredOrders = allOrders.filter(order => {
    const orderDate = new Date(order.orderDate).toISOString().split('T')[0];
    return orderDate === targetDate;
  });
  
  filteredOrders.sort((a, b) => 
    new Date(b.orderDate) - new Date(a.orderDate)
  );
  
  return filteredOrders;
};

export const getTodaysOrders = async () => {
  const today = new Date().toISOString().split('T')[0];
  return await getOrdersByDate(today);
};

export const calculateOrderTotal = async (orderId) => {
  const order = await getOrderById(orderId);
  
  const orderPizzasResponse = await fetch(
    `http://localhost:8088/orderPizzas?orderId=${orderId}&_expand=pizza`
  );
  const orderPizzas = await orderPizzasResponse.json();
  
  let total = 0;
  
  for (const orderPizza of orderPizzas) {
    const pizza = orderPizza.pizza;
    
    const sizeResponse = await fetch(`http://localhost:8088/sizes/${pizza.sizeId}`);
    const size = await sizeResponse.json();
    total += size.basePrice;
    
    const toppingsResponse = await fetch(
      `http://localhost:8088/pizzaToppings?pizzaId=${pizza.id}&_expand=topping`
    );
    const pizzaToppings = await toppingsResponse.json();
    
    for (const pt of pizzaToppings) {
      total += pt.topping.price;
    }
  }
  
  if (order.delivererId) {
    total += DELIVERY_SURCHARGE;
  }
  
  return total;
};