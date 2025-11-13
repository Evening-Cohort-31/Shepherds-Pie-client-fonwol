import "./Employees.css"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getEmployeeById, updateEmployee } from "../services/EmployeeService"
import { useNavigate } from "react-router-dom"

export const EmployeeDetails = () => {

    const navigate = useNavigate()

    const [employee, setEmployee] = useState({})
    const { employeeId } = useParams()

    useEffect(() => {
        getEmployeeById(employeeId).then((employeeObj) => {
            setEmployee(employeeObj)
        })
    }, [employeeId])

    
    const handleSave = (event) => {
        event.preventDefault()

        if (employee.name && employee.email && employee.phoneNumber && employee.address) {
        const editedEmployee = {
            id: employee.id,
            name: employee.name,
            email: employee.email,
            phoneNumber: employee.phoneNumber,
            address: employee.address
        }

           
            updateEmployee(editedEmployee).then(() => {
            navigate(`/Employees`)
        })
        } else {
            window.alert("Please complete the form.")
        }
    }



    return (
        <form className="profile">
            <h2>Edit Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text"
                        required
                        value={employee?.name || ""}
                        onChange={(event) => {
                            const copy = { ...employee }
                            copy.name = event.target.value
                            setEmployee(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Phone:</label>
                    <input type="text"
                        required
                        value={employee?.phoneNumber || ""}
                        onChange={(event) => {
                            const copy = { ...employee }
                            copy.phoneNumber = event.target.value
                            setEmployee(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="text"
                        required
                        value={employee?.email || ""}
                        onChange={(event) => {
                            const copy = { ...employee }
                            copy.email = event.target.value
                            setEmployee(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Address:</label>
                    <input type="text"
                        required
                        value={employee?.address || ""}
                        onChange={(event) => {
                            const copy = { ...employee }
                            copy.address = event.target.value
                            setEmployee(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button className="form-btn"
                        onClick={handleSave}
                    >
                        Save Profile
                    </button>
                </div>
            </fieldset>

        </form>
    )
}

