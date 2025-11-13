import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar/Navbar.jsx";
import { Home } from "./components/home/Home.jsx";
import { EmployeeList } from "./components/employees/EmployeeList.jsx";
import { EmployeeDetails } from "./components/employees/EmployeeDetails.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Outlet />
            </>
          }
        >
          <Route index element={<Home />} />
          <Route path="Employees">
            <Route index element={<EmployeeList />} />
            <Route path=":employeeId" element={<EmployeeDetails />} />
            
          </Route> 
        </Route>
      </Routes>
    </>
  );
}

export default App;
