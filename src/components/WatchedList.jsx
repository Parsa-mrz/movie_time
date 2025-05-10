import WatchedMovie from "./WatchedMovie.jsx";

export default function WatchedList({watched}){
    return(
        <ul className="list">
            {watched.map((movie,index) => (
                <WatchedMovie movie={movie} key={index}/>
            ))}
        </ul>
    )
}