import NavBar from "./components/NavBar.jsx";
import Main from "./components/Main.jsx";
import {useEffect, useState} from "react";
import NumResults from "./components/NumResults.jsx";
import Box from "./components/Box.jsx";
import MovieList from "./components/MovieList.jsx";
import WatchedSummary from "./components/WatchedSummary.jsx";
import WatchedList from "./components/WatchedList.jsx";
import Loader from "./components/Loader.jsx";
import Search from "./components/Search.jsx";
import MovieDetails from "./components/MovieDetails.jsx";

const KEY = "d447c90d";

export default function App() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Loading...");
    const [selectedId, setSelectedId] = useState(null);

    const handleSelectMovie = (id) => {
        setSelectedId((selectedId) => (id === selectedId ? null : id));
    };

    const handleCloseMovieDetail = () => {
        setSelectedId(null);
    };

    const handleAddWatched = (movie) => {
        setWatched((watched) => [...watched, movie]);
    };

    const handleDeleteWatched = (id) => {
        setWatched((watched) => watched.filter((movies) => movies.imdbID !== id));
    };

    useEffect(() => {
        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setIsLoading(true);
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                    {signal: controller.signal},
                );
                if (!res.ok) {
                    throw new Error("Something went wrong with fetching movies");
                }
                const data = await res.json();
                if (data.Response === "False") {
                    throw new Error(data.Error);
                }
                setMovies(data.Search);
                setIsLoading(false);
            } catch (err) {
                setErrorMessage(err.message);
            }
        }

        if (query.length < 3) {
            setMovies([]);
            setErrorMessage("");
            setIsLoading(false);
            return;
        }
        handleCloseMovieDetail()
        fetchMovies();

        return function () {
            controller.abort();
        }
    }, [query]);

    return (
        <>
            <NavBar>
                <Search query={query} setQuery={setQuery}/>
                <NumResults movies={movies}/>
            </NavBar>
            <Main>
                <Box>
                    {isLoading && <Loader>{errorMessage}</Loader>}
                    {!isLoading && (
                        <MovieList onSelectMovie={handleSelectMovie} movies={movies}/>
                    )}
                </Box>
                <Box>
                    {selectedId ? (
                        <MovieDetails
                            onCloseMovie={handleCloseMovieDetail}
                            selectedId={selectedId}
                            onAddWatched={handleAddWatched}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched}/>
                            <WatchedList
                                watched={watched}
                                onDeleteWatched={handleDeleteWatched}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}
