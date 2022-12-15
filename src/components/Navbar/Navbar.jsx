import React, { useState } from "react";
import {
  home,
  original,
  search,
  series,
  movie,
  watchlist,
  avtar,
} from "../../assets";
import { Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { Auth, provider } from "../../data/firebase";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import "./Navbar.css";
import {
  IoCaretDownOutline,
  IoTv,
  IoFilm,
  IoHome,
  IoAdd,
  IoEllipsisVertical,
} from "react-icons/io5";
const Navbar = () => {
  const [{ user }, dispatch] = useStateValue();
  const [menu, setMenu] = useState(false);
  const login = async () => {
    if (!user) {
      try {
        const {
          user: { refreshToken, providerData },
        } = await signInWithPopup(Auth, provider);
        dispatch({
          type: actionType.SET_USER,
          user: providerData[0],
        });
        localStorage.setItem("user", JSON.stringify(providerData[0]));
      } catch (err) {
        console.log(err);
      }
    }
    setMenu(false);
  };
  const logOut = () => {
    setMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  return (
    <>
      <div className="nav">
        <Link to={"/"}>
          <div className="nav_logo">Sheta</div>
        </Link>
        <div className="nav_menu">
          {!user ? (
            <div className="sigin" onClick={login}></div>
          ) : (
            <>
              <Link to={"/"}>
                <img src={home} alt="home" />
                <span>home</span>{" "}
              </Link>

              <Link to={"/search"}>
                <img src={search} alt="search" />
                <span>search</span>
              </Link>

              <Link to={"/original"}>
                <img src={original} alt="original" />
                <span>original</span>
              </Link>

              <Link to={"/series"}>
                <img src={series} alt="series" />
                <span>series</span>
              </Link>

              <Link to={"/movie"}>
                <img src={movie} alt="movie" />
                <span>movie</span>
              </Link>

              <Link to={"/watchlist"}>
                <img src={watchlist} alt="watchlist" />
                <span>watchlist</span>
              </Link>
            </>
          )}
        </div>

        <div className="nav__user">
          <img src={user ? user.photoURL : avtar} alt="userPhoto" />

          <p onClick={menu ? () => setMenu(false) : () => setMenu(true)}>
            <IoCaretDownOutline />
          </p>
        </div>
        <div className={`${menu ? "mnue_nav" : "mnue_hed_nav"}`}>
          {!user ? (
            <div onClick={login} className="sigin_mnue">
              login
            </div>
          ) : (
            <div className="nav_user">
              <img src={user ? user.photoURL : avtar} alt="userPhoto" />
              <p>{user.displayName}</p>
              <p onClick={logOut} className="signout">
                sign out
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="nav_small">
        <div className="nav_menu">
          <>
            <Link to={"movie"}>
              <IoFilm />
            </Link>
            <Link to={"/series"}>
              <IoTv />
            </Link>

            <Link className=" nav_home" to={"home"}>
              <IoHome />
            </Link>
            <Link to={"/watchlist"}>
              <IoAdd />
            </Link>
            <Link onClick={menu ? () => setMenu(false) : () => setMenu(true)}>
              <IoEllipsisVertical />
            </Link>
          </>

          <div className={`${menu ? "mnue" : "mnue_hed"}`}>
            {!user ? (
              <div onClick={login} className="sigin_mnue">
                login
              </div>
            ) : (
              <div className="nav_user">
                <img src={user ? user.photoURL : avtar} alt="userPhoto" />
                <p>{user.displayName}</p>
                <p onClick={logOut} className="signout">
                  sign out
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
