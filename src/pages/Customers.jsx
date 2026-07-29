import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { Link } from "react-router-dom";

function Customers() {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers();
  }, []);

  // Get All Customers
  const getCustomers = async () => {
    try {
      const response = await API.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Customer
  const deleteCustomer = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {

      const response = await API.delete(`/customers/${id}`);

      console.log("Delete Success:", response.data);

      alert("Customer Deleted Successfully");

      getCustomers();

    } catch (error) {

      console.log("Full Error:", error);

      console.log("Status:", error.response?.status);

      console.log("Response:", error.response?.data);

      alert(
        "Delete Failed\n\nStatus: " +
        error.response?.status +
        "\n\nMessage: " +
        JSON.stringify(error.response?.data)
      );

    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <div className="flex justify-between items-center mb-6">

            <h1 className="text-3xl font-bold">
              Customers
            </h1>

            <Link
              to="/add-customer"
              className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
            >
              + Add Customer
            </Link>

          </div>

          <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Mobile</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>

                {customers.length > 0 ? (

                  customers.map((customer) => (

                    <tr
                      key={customer.id}
                      className="border-b hover:bg-gray-100"
                    >

                      <td className="p-3 text-center">{customer.id}</td>
                      <td className="p-3">{customer.fullName}</td>
                      <td className="p-3">{customer.email}</td>
                      <td className="p-3">{customer.mobile}</td>

                      <td className="p-3">

                        <button
                          onClick={() => deleteCustomer(customer.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="5"
                      className="p-5 text-center text-gray-500"
                    >
                      No Customers Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Customers;