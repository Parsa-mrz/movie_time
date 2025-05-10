import WatchedMovie from "./WatchedMovie.jsx";

export default function WatchedList({watched}){
    return(
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie movie={movie}/>
            ))}
        </ul>
    )
}