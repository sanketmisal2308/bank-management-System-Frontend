import { Link, useLocation } from "react-router-dom";

import {
Home,
Users,
Wallet,
ArrowLeftRight
} from "lucide-react";


function Sidebar(){


const location = useLocation();



const menu=[

{
name:"Dashboard",
path:"/dashboard",
icon:<Home size={20}/>
},

{
name:"Customers",
path:"/customers",
icon:<Users size={20}/>
},

{
name:"Accounts",
path:"/accounts",
icon:<Wallet size={20}/>
},

{
name:"Transactions",
path:"/transactions",
icon:<ArrowLeftRight size={20}/>
}

];



return(

<div className="w-72 bg-gradient-to-b from-blue-900 to-blue-700 text-white min-h-screen p-6">


{/* Bank Logo */}

<div className="flex items-center gap-3 mb-10">


<div className="bg-white text-blue-700 w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl">

₹

</div>


<div>

<h1 className="text-xl font-bold">
S-Bank
</h1>

<p className="text-sm text-blue-200">
Digital Banking
</p>


</div>


</div>




{/* Menu */}

<div className="space-y-3">


{

menu.map((item)=>(


<Link

key={item.path}

to={item.path}


className={`flex items-center gap-3 px-4 py-3 rounded-lg transition

${location.pathname === item.path

?

"bg-white text-blue-700 shadow-lg"

:

"hover:bg-blue-600"

}

`}

>


{item.icon}

<span>
{item.name}
</span>


</Link>


))


}



</div>


</div>


)


}


export default Sidebar;