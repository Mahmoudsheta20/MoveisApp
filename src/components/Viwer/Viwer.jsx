import React from "react";
import "./Viwer.css";
import {
  viwerimg,
  marvelimg,
  nationalimg,
  pixarimg,
  starimg,
  viwervideo,
  starvideo,
  marvilvideo,
  nationalvideo,
  pixsarvideo,
} from "../../assets/index";
const Viwer = () => {
  return (
    <div className="viewer">
      <div className="viewer_img">
        <img src={viwerimg} alt="" />
        <video autoPlay={true} loop={true} playsInline={true}>
          <source src={viwervideo} type="video/mp4" />
        </video>
      </div>
      <div className="viewer_img">
        <img src={marvelimg} alt="" />
        <video autoPlay={true} loop={true} playsInline={true}>
          <source src={marvilvideo} type="video/mp4" />
        </video>
      </div>
      <div className="viewer_img">
        <img src={nationalimg} alt="" />
        <video autoPlay={true} loop={true} playsInline={true}>
          <source src={nationalvideo} type="video/mp4" />
        </video>
      </div>
      <div className="viewer_img">
        <img src={pixarimg} alt="" />
        <video autoPlay={true} loop={true} playsInline={true}>
          <source src={pixsarvideo} type="video/mp4" />
        </video>
      </div>
      <div className="viewer_img">
        <img src={starimg} alt="" />
        <video autoPlay={true} loop={true} playsInline={true}>
          <source src={starvideo} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Viwer;
