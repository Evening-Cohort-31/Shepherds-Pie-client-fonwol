# 🥧 Shepherd’s Pie

_A Restaurant Order Management System_

## Overview

**Shepherd’s Pie** is a restaurant management application designed for Giuseppe’s restaurant.  
It streamlines order creation, pizza customization, delivery assignment, and sales tracking — all managed by employees.

---

## 🧾 Application Views

### 🆕 New Order View

Create a new customer order.

**Form Fields**

- Customer Info
- Auto-Generated Order ID
- Date/Time (auto-filled)
- **Save Order** → Creates order and redirects to **Order Detail Edit View**

---

### 🍕 Order Detail Edit View

Edit and manage pizzas, delivery assignments, and order status.

**Features**

- **View Current Pizzas**
  - Each pizza shows _Edit_ / _Delete_ options
  - _Edit_ → routes to **Pizza Edit View** (fields pre-filled)
  - _Delete_ → confirmation prompt, then returns to Order Detail View
- **Add Pizza** → navigates to **Pizza Creation View**
- **Add Delivery Assignment**
  - Assigns a delivery employee (`deliveryId`)
  - Updates order status to _Out for Delivery_
  - _(Optional)_ Notifies assigned employee
- **Submit Order**
  - Saves final order to database
  - Redirects to **Orders List View**
- **Cancel Order**
  - Confirmation prompt → deletes order
  - Redirects to **Orders List View** with success message

---

### 🍕 Pizza Edit / Create View

Create or modify a pizza associated with an order.

**Features**

- Form with selectable options:
  - Size
  - Cheese
  - Sauce
  - Toppings (multi-select)
- Running total displayed at bottom
- **Submit** → Adds pizza to database and returns to **Order Detail Edit View**

---

### 📋 Orders List View

View all orders by date.

**Features**

- Date selection input (defaults to _today_)
- Displays orders matching selected date (newest first)
- Each order row: **Order ID**, **Customer Name**, **Status**
- Click any order → navigates to **Order Detail View**
- Pagination: _20 orders per page_

---

### 🔍 Order Detail View (Read-Only)

Displays finalized order details.

**Information Displayed**

- Order breakdown (pizzas, sizes, toppings, prices)
- Tip amount & total cost
- Current order status (_In the Oven_, _Out for Delivery_, _Complete_, etc.)
- Status field may be editable by authorized employees

---

### 📊 Monthly Sales Report View

Generate sales and performance insights.

**Inputs**

- Month selection (defaults to current month)

**Displays**

- Total orders and total sales
- Average order value
- Day-by-day sales breakdown
- **Popular Items Sub-View**
  - Top size, cheese, sauce
  - Top 3 toppings
  - Each item clickable → navigates to **Item Detail View**

---

### 🧀 Item Detail View

Detailed performance metrics for a specific menu item.

**Displays**

- Total quantity sold
- Total revenue generated
- Percentage of total orders including the item

---

---

### ⏰ Optional: Employee Clock In/Out Page

- Allows employees to record work hours
- May integrate with payroll or attendance reports in the future

---

## 🧩 Future Enhancements

- Notifications for assigned deliveries
- Support for non-pizza menu items
- Printable receipts and kitchen tickets
- Role-based access controls (Admin, Cashier, Delivery, etc.)

---

## 🗂️ Directory Structure (Suggested)
