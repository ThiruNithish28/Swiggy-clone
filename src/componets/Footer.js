import { useContext } from "react"
import userContext from "../utils/userContext"

const Footer = ()=>{
    const {user} = useContext(userContext);
    
    return <div className="bg-slate-700 p-5 ">
        <p>Footer</p>
    </div>
}

export default Footer;