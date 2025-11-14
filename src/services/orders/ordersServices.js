export const getAllOrders = () => {
    return fetch("http://localhost:8088/orders?_embed=pizzaOrders").then(res => res.json())
}