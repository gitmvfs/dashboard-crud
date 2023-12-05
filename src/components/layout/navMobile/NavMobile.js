import React from "react";
import { useState } from "react";
import './NavMobile.css'
import { Link, animateScroll as scroll } from "react-scroll";

function NavMobile(){
  
  const [menuAtivo, setMenuAtivo] = useState(false);

  const alternarMenu = () => {
    setMenuAtivo(!menuAtivo);
  };
  
  return(
      <div className={`div-mobile-header ${menuAtivo ? 'open' : ''}`}>
      <div
        className={`menu-btn ${menuAtivo ? 'open' : ''}`}
        onClick={() => {alternarMenu()}}
      >
      
        <div
            className="menu-btn__burger"
        >

        </div>
      </div> 
      <nav className={`nav-mobile-header ${menuAtivo? 'visible': ''}`}>
          <a  class="h1">+ Categoria</a>
          <a  class="h1">+ Produto</a>
      </nav>
      
      </div>


  )
}



export default NavMobile