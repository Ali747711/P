import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopurlarDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import {  useDispatch } from "react-redux";
import {Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/data/types/product";
import { serverApi } from "../../../lib/config";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import "../../../css/home.css";
import { Member } from "../../../lib/data/types/member";
import MemberService from "../../services/MemberService";


/**REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});



export default function HomePage() {
  const { setPopularDishes,setNewDishes,setTopUsers } = actionDispatch(useDispatch());
//Selector: Store=> Data


  useEffect(() => { 
 //Backend server date fetch => Data
    const product =new ProductService();
    product.getProducts({
      page:1,
      limit:4, 
      order:"productViews",
      productCollection: ProductCollection.DISH,
    }).then((data) => {
      setPopularDishes(data);
    }).catch((err)=>console.log(err)  );


    product.getProducts({
      page:1,
      limit:4, 
      order:"createdAt",
      //productCollection: ProductCollection.DISH,
    }).then((data) => setNewDishes(data))
      .catch((err)=>console.log(err)  );


    //Member

    const member =new MemberService();
    member
    .getTopUsers()
    .then((data)=> setTopUsers(data))
    .catch((err)=>console.log(err));

    

   }, []);

  

   //slice: Data => Store(Frontend)
 



  return <div className= {"homepage"}>
    <Statistics />
    <PopularDishes />
    <NewDishes />
    <Advertisement  />  
    <ActiveUsers />
    <Events />
    



  </div>;
}

