import Movie from "./Movie.jsx";

export default function MovieList({movies, onSelectMovie}) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie, index) => (
                <Movie onSelectMovie={onSelectMovie} movie={movie} key={index}/>
            ))}
        </ul>
    )
}