import WatchedMovie from "./WatchedMovie.jsx";

export default function WatchedList({watched, onDeleteWatched}) {
    return (
        <ul className="list">
            {watched.map((movie, index) => (
                <WatchedMovie onDeleteWatched={onDeleteWatched} movie={movie} key={index}/>
            ))}
        </ul>
    )
}