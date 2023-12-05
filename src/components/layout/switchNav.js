import React from 'react';
import './switchNav.css'


import NavDesktop from './navDesktop/NavDesktop';
import NavMobile from './navMobile/NavMobile';

import { Visible } from 'react-grid-system';

const Navbar = () => {
  return (
    <>
    <header>
      <Visible md lg xl xxl xxxl  >
        <NavDesktop />
      </Visible>
      {/* out of NavWrapper so i can display:none the NavWrapper */}
      <Visible xs sm  >
            <NavMobile/>
      </Visible>    
    </header>
    
    </>
  );
};

export default Navbar;