import { UserCircle, LogOut, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";


function Navbar(){

const navigate = useNavigate();


const logout = () => {

navigate("/");

};



return(

<nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">


{/* Logo */}

<div className="flex items-center gap-3">

<div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">

B

</div>


<div>

<h1 className="font-bold text-xl text-gray-800">
Bank Management
</h1>

<p className="text-sm text-gray-500">
Admin Panel
</p>

</div>


</div>



{/* Right Section */}

<div className="flex items-center gap-6">


<Bell className="text-gray-600 cursor-pointer"/>



<div className="flex items-center gap-2">


<UserCircle 
size={40}
className="text-blue-600"
/>


<div>

<p className="font-semibold">
Sanket Misal
</p>

<p className="text-sm text-gray-500">
Admin
</p>


</div>


</div>



<button

onClick={logout}

className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"

>

<LogOut size={18}/>

Logout

</button>



</div>


</nav>


)

}


export default Navbar;