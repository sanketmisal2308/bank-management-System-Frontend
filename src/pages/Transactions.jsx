import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";


function Transactions() {


  const [accounts, setAccounts] = useState([]);

  const [transactions, setTransactions] = useState([]);


  const [transaction, setTransaction] = useState({

    accountId: "",
    amount: ""

  });



  useEffect(() => {

    getAccounts();
    getTransactions();

  }, []);





  // Get All Accounts

  const getAccounts = async () => {

    try {

      const response = await API.get("/accounts");

      setAccounts(response.data);

    }

    catch(error) {

      console.log(error);

    }

  };






  // Get All Transactions

  const getTransactions = async () => {

    try {

      const response = await API.get("/transactions");

      setTransactions(response.data);

    }

    catch(error) {

      console.log(error);

    }

  };







  // Deposit Money

  const depositMoney = async () => {


    if(!transaction.accountId){

      alert("Please Select Account");
      return;

    }


    if(!transaction.amount || transaction.amount <= 0){

      alert("Enter Valid Amount");
      return;

    }



    try {


      await API.post(
        `/transactions/deposit/${transaction.accountId}?amount=${transaction.amount}`
      );


      alert("Deposit Successful");


      setTransaction({

        accountId:"",
        amount:""

      });


      getTransactions();


    }

    catch(error){

      console.log(error);

      alert("Deposit Failed");

    }


  };







  // Withdraw Money

  const withdrawMoney = async () => {


    if(!transaction.accountId){

      alert("Please Select Account");
      return;

    }



    if(!transaction.amount || transaction.amount <= 0){

      alert("Enter Valid Amount");
      return;

    }



    try {


      await API.post(
        `/transactions/withdraw/${transaction.accountId}?amount=${transaction.amount}`
      );


      alert("Withdraw Successful");


      setTransaction({

        accountId:"",
        amount:""

      });


      getTransactions();


    }

    catch(error){

      console.log(error);

      alert("Withdraw Failed");

    }


  };







  return (

    <div className="flex bg-gray-100 min-h-screen">


      <Sidebar />



      <div className="flex-1">


        <Navbar />



        <div className="p-8">



          <h1 className="text-3xl font-bold mb-6">

            Transaction Management

          </h1>





          {/* Create Transaction */}



          <div className="bg-white p-6 rounded-xl shadow">


            <h2 className="text-xl font-bold mb-5">

              Create Transaction

            </h2>




            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">



              <select

                className="border p-3 rounded"

                value={transaction.accountId}

                onChange={(e)=>

                  setTransaction({

                    ...transaction,

                    accountId:e.target.value

                  })

                }

              >


                <option value="">

                  Select Account

                </option>



                {

                  accounts.map((account)=>(


                    <option

                      key={account.id}

                      value={account.id}

                    >

                      {account.accountNumber}

                    </option>


                  ))

                }


              </select>
                            <input

                type="number"

                placeholder="Amount"

                className="border p-3 rounded"

                value={transaction.amount}

                onChange={(e)=>

                  setTransaction({

                    ...transaction,

                    amount:e.target.value

                  })

                }

              />





              <button

                onClick={depositMoney}

                className="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-3"

              >

                Deposit

              </button>





              <button

                onClick={withdrawMoney}

                className="bg-red-600 hover:bg-red-700 text-white rounded px-4 py-3"

              >

                Withdraw

              </button>



            </div>


          </div>







          {/* Transaction History */}



          <div className="bg-white rounded-xl shadow overflow-hidden mt-8">


            <h2 className="text-xl font-bold p-5">

              Transaction History

            </h2>





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

                    Account

                  </th>



                </tr>


              </thead>







              <tbody>



              {

                transactions.length > 0 ? (



                  transactions.map((trans)=>(



                    <tr

                      key={trans.id}

                      className="border-b hover:bg-gray-100"

                    >



                      <td className="p-3">


                        {

                          trans.transactionDate

                          ?

                          trans.transactionDate.substring(0,10)

                          :

                          ""

                        }


                      </td>





                      <td className="p-3">


                        {trans.transactionType}


                      </td>





                      <td className="p-3 font-bold">


                        ₹ {trans.amount}


                      </td>





                      <td className="p-3">


                        {

                          trans.account

                          ?

                          trans.account.accountNumber

                          :

                          "N/A"

                        }


                      </td>



                    </tr>



                  ))



                )



                :



                (



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
        {/* p-8 */}


      </div>
      {/* flex-1 */}



    </div>

  );


}



export default Transactions;