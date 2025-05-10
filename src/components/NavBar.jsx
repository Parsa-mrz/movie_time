import Logo from "./Logo.jsx";
import Search from "./Search.jsx";

export default function NavBar({children}){
    return(
        <nav className="nav-bar">
            <Logo/>
            <Search/>
            {children}
        </nav>
    )
}