import React from "react";
import css from "./css/Sidebar.module.css";

function SideBar(){
    return (
        <div className={css.sidebar}>
            <a href = "#." target= "_blank">My Photos</a>
            <a href = "#." target= "_blank">My Illustrations</a>
            <a href = "#." target= "_blank">My Paintings</a>
        </div>
    )
}

// const SideBar = () =>{
//     return (
//         <div>
//             <a href = "#." target= "_blank">My Photos</a>
//             <a href = "#." target= "_blank">My Illustrations</a>
//             <a href = "#." target= "_blank">My Paintings</a>
//         </div>
//     )
// }

export default SideBar