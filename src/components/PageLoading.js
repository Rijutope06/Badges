import React, { Component } from "react";
import Loading from '../components/Loader';

import './styles/PageLoading.css';

function PageLoading() {
   return <div className="PageLoading" >
      <Loading />
   </div>  ;
}

export default PageLoading;
