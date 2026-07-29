import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import AddCustomer from "./pages/AddCustomer";



function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/accounts" element={<Accounts/>}/>

        <Route path="/add-customer" element={<AddCustomer />} />

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/customers" element={<Customers />} />

        <Route path="/accounts" element={<Accounts />} />

        <Route path="/transactions" element={<Transactions />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;