import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, MenuItem, Select, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getAllOrders } from "../../services/orders/ordersServices.js";
import { getDetailedOrders, getReportValues } from "../../services/reports/reportServices.js";

export const Reports = () => {
    const currentYear = new Date().getFullYear();
    const currentMonthIndex = new Date().getMonth();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex);
    const [allOrders, setAllOrders] = useState([])
    const [reportOrders, setReportOrders] = useState([])
    const [reportValues, setReportValues] = useState({ numOrders: 0, sumOrders: 0.00, avgOrders: 0.00})


    useEffect(() => {
        getAllOrders().then(res => {
            setAllOrders(res)
        })
    }, [])

    useEffect(() => {
        const filteredOrders = allOrders.filter(order => {
            const d = new Date(order.dateCreated)
            return (
                d.getFullYear() === selectedYear &&
                d.getMonth() === selectedMonth
            );
        })
        getDetailedOrders(filteredOrders).then(res => {
        getReportValues(res).then(r => setReportValues(r))
        setReportOrders(res)})
        
    }, [selectedMonth, selectedYear, allOrders])

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const years = [];
    for (let i = 2000; i <= currentYear; i++) {
        years.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
    }

    years.reverse()

    return (
        <>
        <Box sx={{display: "flex", justifyContent: "center", marginTop: "1rem"}}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
                <Select
                    value={selectedYear}
                    onChange={e => setSelectedYear(e.target.value)}
                    sx={{ minWidth: 100 }}
                    size="small"
                >
                    {years}
                </Select>
                <ButtonGroup sx={{display: "flex", flexWrap: "wrap"}}>
                    {months.map((month, idx) => (
                        <Button
                            key={month}
                            variant={selectedMonth === idx ? "contained" : "outlined"}
                            onClick={() => setSelectedMonth(idx)}
                        >
                            {month.slice(0,3)}
                        </Button>
                    ))}
                </ButtonGroup>
            </Box>
        </Box>
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
            <Box>
                        <Box sx={{justifyContent: "center"}}>
                            <p>Total orders: {reportValues.numOrders}</p>
                            <p>Total sales: ${reportValues.sumOrders}</p>
                            <p>Average order value: ${reportValues.avgOrders} </p>
                        </Box>
                        <Box>
                            <Card>
                                <CardHeader title="Most Popular Items"/>
                                <CardContent>
                                    <Typography>Size: {reportValues.topSize?.name}</Typography>
                                    <Typography>Sauce: {reportValues.topSauce?.name}</Typography>
                                    <Typography>Cheese: {reportValues.topCheese?.name}</Typography>
                                    <Box>
                                        <Typography>Toppings:</Typography>
                                        <ol>
                                            {reportValues.topToppings?.map(topping => (
                                                <li key={topping.id}>{topping.name}</li>
                                            ))}
                                        </ol>
                                    </Box>
                                </CardContent>
                            </Card>

                        </Box>
            </Box>
            <Box>
                <Card>
                    <CardHeader title="Daily Breakdown"/>
                    <CardContent>
                        <Box sx={{overflow: "auto"}}>
                            <ul>
                                {reportValues.dailyStats?.map(day => (
                                    <li key={day.date}>{day.date} : Orders: {day.orders};  Sales: {Number(day.sales).toLocaleString('en-us', {style: "currency", currency: "USD"})}</li>
                                ))}
                            </ul>
                        </Box>
                    </CardContent>
                </Card>

            </Box>
        </Box>
        </>
    );
}