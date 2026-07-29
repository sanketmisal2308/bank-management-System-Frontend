import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";


function Accounts(){


const [accounts,setAccounts] = useState([]);

const [customers,setCustomers] = useState([]);



const [account,setAccount] = useState({

    accountType:"SAVINGS",

    customerId:""

});





useEffect(()=>{

    getAccounts();

    getCustomers();

},[]);






// Get All Accounts

const getAccounts = async()=>{

    try{

        const response = await API.get("/accounts");

        setAccounts(response.data);

    }
    catch(error){

        console.log(error);

    }

};







// Get All Customers

const getCustomers = async()=>{


    try{


        const response = await API.get("/customers");


        setCustomers(response.data);


    }
    catch(error){

        console.log(error);

    }


};







// Create Account

const createAccount = async(e)=>{


    e.preventDefault();



    if(!account.customerId){

        alert("Please Select Customer");

        return;

    }




    try{


        await API.post(
            `/accounts/${account.customerId}`,
            {

                accountType:account.accountType

            }
        );



        alert("Account Created Successfully");



        setAccount({

            accountType:"SAVINGS",

            customerId:""

        });



        getAccounts();



    }
    catch(error){


        console.log(error.response);


        alert("Error Creating Account");


    }


};







return(


<div className="flex bg-gray-100 min-h-screen">


<Sidebar/>




<div className="flex-1">


<Navbar/>




<div className="p-8">



<h1 className="text-3xl font-bold mb-6">

Account Management

</h1>






{/* Create Account */}



<div className="bg-white p-6 rounded-xl shadow mb-8">



<h2 className="text-xl font-bold mb-5">

Create Bank Account

</h2>





<form

onSubmit={createAccount}

className="grid grid-cols-1 md:grid-cols-3 gap-5"

>






<select


className="border p-3 rounded"


value={account.customerId}



onChange={(e)=>

setAccount({

    ...account,

    customerId:e.target.value

})

}



>



<option value="">

Select Customer

</option>




{

customers.map((customer)=>(


<option

key={customer.id}

value={customer.id}

>

{customer.fullName}

</option>


))


}



</select>








<select


className="border p-3 rounded"


value={account.accountType}



onChange={(e)=>

setAccount({

    ...account,

    accountType:e.target.value

})

}



>



<option value="SAVINGS">

Savings Account

</option>



<option value="CURRENT">

Current Account

</option>



</select>







<button


type="submit"


className="bg-blue-600 hover:bg-blue-700 text-white rounded px-5 py-3"


>


Create Account


</button>




</form>



</div>








{/* Account List */}



<div className="bg-white rounded-xl shadow overflow-hidden">



<h2 className="text-xl font-bold p-5">

Account List

</h2>





<table className="w-full">



<thead className="bg-blue-600 text-white">



<tr>


<th className="p-3">

Account No

</th>


<th className="p-3">

Customer

</th>


<th className="p-3">

Type

</th>


<th className="p-3">

Balance

</th>


<th className="p-3">

Status

</th>


</tr>



</thead>







<tbody>



{

accounts.length > 0 ? (


accounts.map((acc)=>(


<tr

key={acc.id}

className="border-b hover:bg-gray-100"

>



<td className="p-3">

{acc.accountNumber}

</td>





<td className="p-3">


{

acc.customer?.fullName || "N/A"

}


</td>






<td className="p-3">

{acc.accountType}

</td>






<td className="p-3 font-bold">

₹ {acc.balance}

</td>






<td className="p-3 text-green-600">

{acc.status}

</td>





</tr>



))


)

:(


<tr>

<td

colSpan="5"

className="p-5 text-center text-gray-500"

>

No Accounts Found

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



export default Accounts;