import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

import {
  Users,
  Wallet,
  IndianRupee,
  ArrowDownLeft,
  ArrowUpRight,
  Send,
  ShieldCheck
} from "lucide-react";

function Dashboard() {

  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    customers: 0,
    accounts: 0,
    balance: 0,
    transactions: []
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await API.get("/dashboard");
      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          {/* Admin Card */}

          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-xl p-6 shadow-lg mb-8 flex justify-between items-center">

            <div>

              <h1 className="text-3xl font-bold">
                Welcome, Sanket 👋
              </h1>

              <p className="mt-2 text-blue-100">
                Role : ADMIN
              </p>

              <p className="text-sm text-blue-200 mt-1">
                Manage Customers, Accounts and Transactions
              </p>

            </div>

            <ShieldCheck size={70} />

          </div>

          {/* Dashboard Cards */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Total Customers
                </p>

                <h2 className="text-3xl font-bold text-blue-600">
                  {dashboard.customers}
                </h2>

              </div>

              <Users
                size={45}
                className="text-blue-600"
              />

            </div>

            <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Total Accounts
                </p>

                <h2 className="text-3xl font-bold text-green-600">
                  {dashboard.accounts}
                </h2>

              </div>

              <Wallet
                size={45}
                className="text-green-600"
              />

            </div>

            <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Total Balance
                </p>

                <h2 className="text-3xl font-bold text-purple-600">
                  ₹ {dashboard.balance}
                </h2>

              </div>

              <IndianRupee
                size={45}
                className="text-purple-600"
              />

            </div>

          </div>

          {/* Quick Actions */}

          <h2 className="text-2xl font-bold mt-10 mb-4">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <button
              onClick={() => navigate("/transactions")}
              className="bg-green-600 hover:bg-green-700 text-white p-5 rounded-xl flex justify-center items-center gap-2"
            >
              <ArrowDownLeft />
              Deposit
            </button>

            <button
              onClick={() => navigate("/transactions")}
              className="bg-red-600 hover:bg-red-700 text-white p-5 rounded-xl flex justify-center items-center gap-2"
            >
              <ArrowUpRight />
              Withdraw
            </button>

            <button
              onClick={() => navigate("/transactions")}
              className="bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-xl flex justify-center items-center gap-2"
            >
              <Send />
              Transfer
            </button>

          </div>
                    {/* Recent Transactions */}

          <h2 className="text-2xl font-bold mt-10 mb-4">
            Recent Transactions
          </h2>

          <div className="bg-white rounded-xl shadow overflow-hidden">

            <table className="w-full">

              <thead className="bg-blue-600 text-white">

                <tr>

                  <th className="p-3">
                    Date
                  </th>

                  <th className="p-3">
                    Type
                  </th>

                  <th className="p-3">
                    Amount
                  </th>

                  <th className="p-3">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  dashboard.transactions.length > 0 ? (

                    dashboard.transactions.map((tx) => (

                      <tr
                        key={tx.id}
                        className="border-b hover:bg-gray-100"
                      >

                        <td className="p-3 text-center">

                          {
                            tx.transactionDate
                              ? tx.transactionDate.substring(0, 10)
                              : ""
                          }

                        </td>

                        <td className="p-3 text-center">

                          {tx.transactionType}

                        </td>

                        <td className="p-3 text-center font-semibold">

                          ₹ {tx.amount}

                        </td>

                        <td className="p-3 text-center">

                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            Success
                          </span>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="4"
                        className="p-5 text-center text-gray-500"
                      >

                        No Transactions Found

                      </td>

                    </tr>

                  )

                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;