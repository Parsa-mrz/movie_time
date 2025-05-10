import Logo from './Logo.jsx'
import Search from "./Search.jsx";
import NumResults from "./NumResults.jsx";
export default function NavBar(){
    return(
        <nav className="nav-bar">
            <Logo/>
            <Search/>
            <NumResults/>
        </nav>
    )
}