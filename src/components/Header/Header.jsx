import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import './Header.scss'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncMovies ,fetchAsyncShows} from "../../features/movies/movieSlice";
const Header = () => {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));
    setTerm("");
  }
  return (
    <div className="header">
      <Link to="/">
        <div className="logo">Movie app</div>
      </Link>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input type="text" value={term} onChange={(e)=>setTerm(e.target.value)} placeholder="Search Movies or Shows" />
          <button type="submit"><i className="fa fa-search"></i></button>
        </form>
      </div>
      <div className="user-image">
        <FaRegCircleUser size={38} color="#ffffff"/>
      </div>
    </div>
  );
};

export default Header;
