import {useEffect, useState} from "react";
import StarRating from "./StarRating.jsx";
import Loader from "./Loader.jsx";

const KEY = "d447c90d";

export default function MovieDetails({
                                         selectedId,
                                         onCloseMovie,
                                         onAddWatched,
                                         watched,
                                     }) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(null);

    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

    const watchedUserRating = watched.find(
        (movie) => movie.imdbID === selectedId,
    )?.userRating;

    const handleAdd = () => {
        if (!userRating) return;

        const {Title, Year, Poster, imdbRating, Runtime} = movie;
        const newWatchedMovie = {
            imdbID: selectedId,
            Runtime: Number(Runtime.split(" ").at(0)),
            Title,
            Year,
            Poster,
            imdbRating: Number(imdbRating),
            userRating,
        };
        onAddWatched(newWatchedMovie);
        onCloseMovie();
    };

    useEffect(() => {
        async function getMovieDetails() {
            setIsLoading(true);
            const res = await fetch(
                `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
            );
            if (!res.ok) {
                throw new Error("Something went wrong with fetching movies");
            }
            const data = await res.json();
            if (data.Response === "False") {
                throw new Error(data.Error);
            }
            setMovie(data);
            setIsLoading(false);
        }

        getMovieDetails();
    }, [selectedId]);

    useEffect(() => {
        document.title = `Movie | ${movie.Title}`
    }, [movie.Title]);

    return (
        <div className="details">
            {isLoading ? (
                <Loader>Loading Movie Details...</Loader>
            ) : (
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={movie.Poster} alt={movie.Title}/>
                        <div className="details-overview">
                            <h2>{movie.Title}</h2>
                            <p>{movie.Released}</p>
                            <p>{movie.Genre}</p>
                            <p>
                                <span>⭐️</span>
                                {movie.imdbRating} IMDB rating
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            {!isWatched ? (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                        onSetRating={setUserRating}
                                    />

                                    <button className="btn-add" onClick={handleAdd}>
                                        + Add to list
                                    </button>
                                </>
                            ) : (
                                <p>You rated this movie ⭐️{watchedUserRating}</p>
                            )}
                        </div>
                        <p>
                            <em>{movie.Plot}</em>
                        </p>
                        <p>Starring {movie.Actors}</p>
                        <p>Directed by {movie.Director}</p>
                    </section>
                </>
            )}
        </div>
    );
}
