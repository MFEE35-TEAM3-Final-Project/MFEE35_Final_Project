import React, { useState } from "react";

const Banner = () => {
  let images = [
    { imgName: "album1", imgUrl: "/img/album1.jpg" },
    { imgName: "album2", imgUrl: "/img/album2.jpg" },
    { imgName: "album3", imgUrl: "/img/album3.jpg" },
    { imgName: "album4", imgUrl: "/img/album4.jpg" },
    { imgName: "album5", imgUrl: "/img/album5.jpg" },
    { imgName: "album6", imgUrl: "/img/album6.jpg" },
    { imgName: "album7", imgUrl: "/img/album7.jpg" },
    { imgName: "album8", imgUrl: "/img/album8.jpg" },
    { imgName: "album9", imgUrl: "/img/album9.jpg" },
    { imgName: "album10", imgUrl: "/img/album10.jpg" }
  ];
  let [currentImg, setCurrentImg] = useState(images[0]);

  return (
    <div className="banner" id="banner">
      <div className="backfiliter"></div>
      <div
        className="banner_background"
        style={{ backgroundImage: `url(${currentImg.imgUrl})` }}
      ></div>
      <div id="banner_cover" className="order-lg-2">
        <img className="w-100" src={currentImg.imgUrl} alt="album_pic" />
      </div>
      <div id="banner_thumbnails" className="order-lg-1">
        {images.map((img) => (
          <div
            data-img={`${img.imgName}.jpg`}
            key={img.imgName}
            className={`thumbnail ${
              img.imgName === currentImg.imgName ? "active" : ""
            }`}
            onClick={() => {
              setCurrentImg(img);
            }}
          >
            <img src={img.imgUrl} alt="album_pic" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
