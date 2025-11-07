import { Box, Button, ButtonGroup, MenuItem, Select } from "@mui/material"
import { useState } from "react"

export const Reports = () => {
    const currentYear = new Date().getFullYear();
    const currentMonthIndex = new Date().getMonth();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex);

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
    );
}