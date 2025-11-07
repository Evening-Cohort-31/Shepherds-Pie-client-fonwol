import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar/Navbar.jsx";
import { Home } from "./components/home/Home.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar/>
              <Outlet />
            </>}
        >
          <Route index element={<Home />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App;
