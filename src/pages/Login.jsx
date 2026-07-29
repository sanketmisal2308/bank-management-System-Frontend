import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login(){

const navigate = useNavigate();


const [username,setUsername] = useState("");
const [password,setPassword] = useState("");


const handleLogin=(e)=>{

e.preventDefault();

if(username && password){

navigate("/dashboard");

}

}



return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">


<div className="bg-white p-8 rounded shadow-md w-96">


<h1 className="text-2xl font-bold text-center mb-5">
Bank Management System
</h1>


<form onSubmit={handleLogin}>


<input

className="border p-2 w-full mb-3"

placeholder="Username"

value={username}

onChange={(e)=>setUsername(e.target.value)}

/>



<input

className="border p-2 w-full mb-3"

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>



<button

className="bg-blue-600 text-white w-full p-2 rounded"

>

Login

</button>



</form>


</div>


</div>

)

}


export default Login;