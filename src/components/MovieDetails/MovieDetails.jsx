import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { fetchAsyncDetails,getSelectedDetails,removeSelectedDetails } from "../../features/movies/movieSlice";
import './MovieDetails.scss';
const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector(getSelectedDetails)
  useEffect(() => {
    dispatch(fetchAsyncDetails(id))
    return () => {
      dispatch(removeSelectedDetails())
    }
  }, [id, dispatch])
  return (
    <div className="movie-section">
      {Object.keys(movie).length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="section-left">
            <div className="movie-title">{movie.Title}</div>
            <div className="movie-rating">
              <span>
                IMDB rating <i className="fa fa-star"></i> : {movie.imdbRating}
              </span>
              <span>
                IMDB Votes <i className="fa fa-thumbs-up"></i> :{" "}
                {movie.imdbVotes}
              </span>
              <span>
                Runtime <i className="fa fa-film"></i> : {movie.Runtime}
              </span>
              <span>
                Year <i className="fa fa-calendar"></i> : {movie.Released}
              </span>
            </div>
            <div className="movie-plot">{movie.plot}</div>
            <div className="movie-info">
              <div>
                <span>Director</span>
                <span>{movie.Director}</span>
              </div>
              <div>
                <span>Stars</span>
                <span>{movie.Actors}</span>
              </div>
              <div>
                <span>Genre</span>
                <span>{movie.Genre}</span>
              </div>
              <div>
                <span>Awards</span>
                <span>{movie.Awards}</span>
              </div>
            </div>
          </div>
          <div className="section-right">
            <img src={movie.Poster} alt={movie.Title} />
          </div>
        </>
      )}
    </div>
  );
}

export default MovieDetails