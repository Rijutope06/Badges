import React, { Component } from "react";
import { Link } from 'react-router-dom';

import confLogo from '../images/badge-header.svg';
import imgRight from '../images/astronauts.svg';

class Home extends Component {
   render() {
      return (
         <>
            <div className="container-fluid">
               <div className="row">
                  <div className="col-6">
                     <img src={confLogo} alt="Logo Conferencia" />
                     <h1>PRINT YOUR BADGES</h1>
                     <p>The easiest way to manage your conference</p>
                     <Link to="/badges" className="btn btn-primary">
                        Start now
                     </Link>
                  </div>

                  <div className="col-6">
                     <img width="330px" src={imgRight} alt="" />
                  </div>
               </div>
            </div>
         </>
      );
   }
}

export default Home;
