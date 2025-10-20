/** REACT APP STATE */

import exp from "constants";
import { Member } from "./member"
import { Product } from "./product"
import { Order } from "./order";

export interface AppRootState {
homePage: HomePageState
productsPage: ProductsPageState;
ordersPage: OrdersPageState;

}

export interface HomePageState {
    popularDishes: Product[];
    newDishes: Product[];
    topUsers: Member[];
    
}

/** PRODUCTS PAGE    */
export interface ProductsPageState {
    restaurant: Member|null;
    chosenProduct: Product|null;
    products: Product[];

}

/** ORDERS PAGE  */

export interface OrdersPageState {
    pausedOrders:Order[];
    processOrders :Order[];
    finishedOrders :Order[];

}