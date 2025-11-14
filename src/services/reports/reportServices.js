export const getReportValues = async (orders) => {
    const numOrders = orders.length || 0
    const sumOrders = orders.reduce((a,c) => a + c.total, 0) || 0
    const avgOrders = Math.round(sumOrders/numOrders * 100) / 100 || 0

    const ordersByDay = Object.groupBy(orders, order => order.dateCreated.split("T")[0])

    const dailyStats = Object.keys(ordersByDay).map(key => {
        return {
            date: key,
            orders: ordersByDay[key].length,
            sales: ordersByDay[key].reduce((a,c) => a + c.total, 0)
        }
    })
    
    let options = await getOptions()
    options = options.map(option => {
        return {...option, count : 0}
    })

    orders.forEach(order => {
        order.pizzaOrders.forEach(pizza => {
            pizza.pizzaOptions.forEach(option => {
                options.find(o => option.toppingId === o.id).count += 1
            })
        })
    })

    let topSize = ""
    let topCheese = ""
    let topSauce = ""
    let topToppings = []

    if (orders.length > 0) {
    topSize = options.filter(option => option.type === "size").reduce((a,c) => a.count > c.count ? a : c)
    topCheese = options.filter(option => option.type==="cheese").reduce((a,c) => a.count > c.count ? a: c)
    topSauce = options.filter(option => option.type==="sauce").reduce((a,c) => a.count > c.count ? a : c)
    topToppings = options.filter(option => option.type==="topping").sort((a, b) => b.count - a.count).slice(0,3)
    }
    return {
        numOrders: numOrders,
        sumOrders: sumOrders,
        avgOrders: avgOrders,
        topSize: topSize,
        topCheese: topCheese,
        topSauce: topSauce,
        topToppings: topToppings,
        dailyStats: dailyStats
    }
}

export const getDetailedOrders = async (orders) => {
    const detailedOrdersPromises = orders.map(order => 
        fetch(`http://localhost:8088/pizzaOrders?orderId=${order.id}&_embed=pizzaOptions`)
            .then(res => res.json())
            .then(pizzaOrders => ({ ...order, pizzaOrders }))
    );
    
    return Promise.all(detailedOrdersPromises);
}

export const getOptions = () => {
    return fetch("http://localhost:8088/options").then(res => res.json())
}