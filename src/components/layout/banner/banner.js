import "./banner.css";

import imagemBanner from "../../../images/banner.png";
import { TypeAnimation } from "react-type-animation";

const BannerComponent = () => {
  return (
    <>
      <div id="div-banner">
        <img src={imagemBanner} />
        <center className="frase-banner">
          <TypeAnimation
            sequence={["ETHEREUM CLUB", 3000, "FRASE ALEATORIA", 5000]}
            speed={1}
            deletionSpeed={1}
            repeat={Infinity}
          />
        </center>
      </div>
    </>
  );
};

export default BannerComponent;
