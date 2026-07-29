import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { useNavigate } from "react-router-dom";


function AddCustomer(){


const navigate = useNavigate();


const [customer,setCustomer] = useState({

    fullName:"",
    email:"",
    mobile:"",
    address:"",
    aadhaarNumber:"",
    panNumber:""

});



const handleChange=(e)=>{

setCustomer({

...customer,

[e.target.name]:e.target.value

});

};



const handleSubmit=async(e)=>{

e.preventDefault();


try{


await API.post("/customers",customer);


alert("Customer Added Successfully");


navigate("/customers");


}
catch(error){

console.log("ERROR:", error.response?.data || error.message);

alert(
error.response?.data?.message || 
"Error adding customer"
);

}

};




return(

<div className="flex bg-gray-100 min-h-screen">


<Sidebar/>


<div className="flex-1">


<Navbar/>


<div className="p-8">


<h1 className="text-3xl font-bold mb-6">
Add New Customer
</h1>



<div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl">



<form 
onSubmit={handleSubmit}
className="grid grid-cols-2 gap-5"
>



<input

name="fullName"

placeholder="Full Name"

className="border p-3 rounded-lg"

value={customer.fullName}

onChange={handleChange}

/>



<input

name="email"

placeholder="Email"

className="border p-3 rounded-lg"

value={customer.email}

onChange={handleChange}

/>



<input

name="mobile"

placeholder="Mobile Number"

className="border p-3 rounded-lg"

value={customer.mobile}

onChange={handleChange}

/>



<input

name="aadhaarNumber"

placeholder="Aadhaar Number"

className="border p-3 rounded-lg"

value={customer.aadhaarNumber}

onChange={handleChange}

/>



<input

name="panNumber"

placeholder="PAN Number"

className="border p-3 rounded-lg"

value={customer.panNumber}

onChange={handleChange}

/>



<input

name="address"

placeholder="Address"

className="border p-3 rounded-lg"

value={customer.address}

onChange={handleChange}

/>



<button

className="col-span-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"

>

Add Customer

</button>



</form>



</div>


</div>


</div>


</div>


)

}


export default AddCustomer;