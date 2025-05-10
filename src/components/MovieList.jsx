import Movie from "./Movie.jsx";

export default function MovieList({movies}){
    return(
        <ul className="list">
            {movies?.map((movie,index) => (
                <Movie movie={movie} key={index}/>
            ))}
        </ul>
    )
}