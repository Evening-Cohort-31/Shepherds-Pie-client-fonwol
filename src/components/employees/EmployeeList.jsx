import { getAllEmployees } from "../services/EmployeeService"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Employees.css"

export const EmployeeList = () => {

    const navigate = useNavigate()

    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getAllEmployees().then((EmployeeArray) => {
            setEmployees(EmployeeArray)
        })

    }, [])

    return (
        <div className="employees">
            {employees.map((employeeObj) => {
                return (<section className="employee" key={employeeObj.id}>
                    <div className="employee-header"> {employeeObj.name} </div>
                    <div className="employee-details"> {employeeObj.phoneNumber} </div>
                    <div className="employee-details"> {employeeObj.email} </div>
                    <div className="employee-details"> {employeeObj.address} </div>

                    <button
                        className="form-btn"
                        onClick={()=>{navigate(`/Employees/${employeeObj.id}`)}}

                    >Edit</button>
                </section>
                )
            },

            )}

           
        </div>
    )
}