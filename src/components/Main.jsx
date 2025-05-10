import ListBox from "./ListBox.jsx";
import WatchedBox from "./WatchedBox.jsx";

export default function Main({children}){
    return(
        <main className="main">
            {children}
            <WatchedBox/>
        </main>
    )
}