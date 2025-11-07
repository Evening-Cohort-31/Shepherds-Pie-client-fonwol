export const getAllOrders = () => {
    return fetch("http://localhost:8088/orders").then(res => res.json())
}

