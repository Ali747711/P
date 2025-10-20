import React from "react";
import {  Route, Switch, useRouteMatch,  } from "react-router-dom";

import "../../../css/market.css";
import Market from "./Market";



export default function MarketPage() {
  const shop = useRouteMatch();



  return (
     <div className={"shop-page"} >
       <Switch>
         <Route path= {`${shop.path}`}>
          <Market/>
          </Route>
      </Switch> 

  
     </div>
  );
}

