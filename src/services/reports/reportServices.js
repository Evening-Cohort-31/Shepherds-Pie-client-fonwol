export const getReportValues = (orders) => {
    const numOrders = orders.length || 0
    const sumOrders = orders.reduce((a,c) => a + c.total, 0) || 0
    const avgOrders = Math.round(sumOrders/numOrders * 100) / 100 || 0

    return {
        numOrders: numOrders,
        sumOrders: sumOrders,
        avgOrders: avgOrders
    }
}