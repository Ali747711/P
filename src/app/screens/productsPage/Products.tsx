import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, IconButton,InputBase, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Close";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useSelector,useDispatch  } from "react-redux";
import {Dispatch } from "@reduxjs/toolkit";
import {setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/data/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/data/types/search";


/**REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

/**REDUX SLICE & SELECTOR */
const productsRetriever = createSelector(
  retrieveProducts,
  (products) => ({products})
);

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}




export default function Products(props:ProductsProps) {
    const {onAdd} = props;

    const {setProducts} = actionDispatch(useDispatch());
    const {products}=useSelector(productsRetriever);
    const[productSearch,setProductSearch]= useState<ProductInquiry> (
         { page:1,
            limit:8,
            order: "createdAt   ",
            productCollection: ProductCollection.DISH,
            search: "",
   });
          const history=useHistory();


    const [searchText, setSearchText] = useState<string>("");


    useEffect(() => {
        const product =new ProductService();
        product.getProducts(productSearch)
        .then(data=>setProducts(data) )
        .catch((err)=>console.log(err)  );
    }
    , [productSearch]);

    useEffect(() => {
        if(searchText === ""){
      productSearch.search="";   
      setProductSearch({...productSearch});    
        }
    } , [searchText]);

    //Handler section

    const searchCollection= (collection:ProductCollection) => {
        productSearch.page=1;
        productSearch.productCollection=collection;
        setProductSearch({...productSearch});
    };

    const searchOrderHandler=(order:string) => {
           productSearch.page=1;
        productSearch.order=order;
        setProductSearch({...productSearch});
    }

    const searchProductHandler =() => {
        productSearch.search=searchText;
        setProductSearch({...productSearch});
    }

    const paginationHandler =(e: ChangeEvent<any>, value: number) => {
        productSearch.page=value;
        setProductSearch({...productSearch});
    }

    const chooseDishHandler = (id:string) => {
        history.push(`/products/${id}`);
    }

    return(
        <div className="products">
            <Container>
                <Stack flexDirection={"column"} alignItems={"center"}>
                    <Stack className={"avatar-big-box"}>
                        <Stack className={"top-text"}>
                          <p>Shafran Restaurant</p>
                            <Stack className="single-search-big-box">
                                    <input 
                                    type={"search"}
                                    className={"single-search-input"}
                                    name={"singleResearch"}
                                    placeholder={"Type here"}
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") searchProductHandler();
                                    }}
                                    />
                                    <Button
                                      className="single-button-search"
                                      variant="contained"
                                      endIcon={<SearchIcon />}
                                      onClick={searchProductHandler}
                                    >
                                        Search
                                    </Button>
                               </Stack>
                        </Stack>
                    </Stack>

                    <Stack className={"dishes-filter-section"}>
                        <Stack className={"dishes-filter-box"}
                 
                       >
                            <Button
                              variant={"contained"}
                               className={"order"}
                              color={productSearch.order === "createdAt" ? "primary" :"secondary"}
                              onClick={()=> searchOrderHandler("createdAt")}
                              
                              
                            >
                                New
                            </Button>
                            <Button
                              variant={"contained"}
                              className={"order"}
                              color={productSearch.order === "productPrice" ? "primary" :"secondary"}
                              onClick={()=> searchOrderHandler("productPrice")}
                              
                            >
                                Price
                            </Button>
                            <Button
                              variant={"contained"}
                              className={"order"}
                              color={productSearch.order === "productViews" ? "primary" :"secondary"}
                              onClick={()=> searchOrderHandler("productViews")}
                              
                            >
                                Views
                            </Button>
                        </Stack>
                    </Stack>

                    <Stack className={"list-category-section"}>
                        <Stack className={"product-category"}>
                            <div className={"category-main"}>
                                <Button variant={"contained"} 
                                  color={productSearch.productCollection === ProductCollection.OTHER 
                                    ? "primary" :
                                     "secondary"}

                                 onClick={() =>  searchCollection( ProductCollection.OTHER)}>
                                    Other
                                </Button>
                                <Button variant={"contained"} 
                                  color={productSearch.productCollection === ProductCollection.DESSERT 
                                    ? "primary" :
                                     "secondary"}
                                 onClick={() =>  searchCollection( ProductCollection.DESSERT)}>
                                    Dessert
                                </Button>
                                <Button variant={"contained"} 
                                  color={productSearch.productCollection === ProductCollection.DRINK 
                                    ? "primary" :
                                     "secondary"}
                                 onClick={() =>  searchCollection( ProductCollection.DRINK)}>
                                    Drink
                                </Button>
                                <Button variant={"contained"} 
                                 color={productSearch.productCollection === ProductCollection.SALAD 
                                    ? "primary" :
                                     "secondary"}
                                 onClick={() =>  searchCollection( ProductCollection.SALAD)}>
                                    Salad
                                </Button>
                                <Button variant={"contained"}
                                 color={productSearch.productCollection === ProductCollection.DISH 
                                    ? "primary" :
                                     "secondary"}
                                 onClick={() =>  searchCollection( ProductCollection.DISH)}>
                                    Dish
                                </Button>
                            </div>
                        </Stack>
                               
                        <Stack className={"product-wrapper"}>
                            {products.length !== 0 ? (
                                products.map((product: Product ) => {
                                    const imagePath =`${serverApi}/${product.productImages[0]}`;
                                    const sizeVolume= product.productCollection === ProductCollection.DRINK ? 
                                    product.productVolume +"litre": product.productSize + " size";
                                    return (
                                        <Stack key={product._id} className={"product-card"}
                                        onClick={() => chooseDishHandler(product._id)}>
                                            <Stack
                                             className={"product-img"}
                                             sx={{
                                                backgroundImage: `url(${imagePath})`,
                                                
                                                
                                             }}
                                            >
                                                <div className={"product-sale"}>{sizeVolume}</div>
                                                <Button className={"shop-btn"} 
                                                     onClick={(e) => {
                                                    onAdd({
                                                        _id: product._id,
                                                        quantity: 1,
                                                        name: product.productName,
                                                        price: product.productPrice,
                                                        image: product.productImages[0],
                                                    })
                                                    e.stopPropagation(); //chosenProduct ga otishdan toxtatadi
                                                }}
                                                >
                                                    <img 
                                                      src={"/icons/shopping-cart.svg"}
                                                      style={{display: "flex"}}
                                                    />
                                                </Button>
                                                <Button className={"view-btn"} sx={{ right: "36px"}}>
                                                    <Badge badgeContent={product.productViews} color="secondary">
                                                        <RemoveRedEyeIcon 
                                                          sx={{
                                                            color:
                                                            product.productViews === 0 ? "gray" : "white",
                                                        }}
                                                        />
                                                    </Badge>
                                                </Button>
                                            </Stack>
                                            <Box className={"product-desc"}>
                                                <span className={"product-title"}>
                                                    {product.productName}
                                                </span>
                                                <div className={"product-desc"}>
                                                    <MonetizationOnIcon />
                                                    {product.productPrice}
                                                </div>
                                            </Box>
                                        </Stack>
                                    );
                                })
                            ) : (
                                <Box className="no-data"> Products are not aviable!</Box>
                            )}
                        </Stack>
                       
                    </Stack>

                    <Stack className={"pagination-section"}>
                        <Pagination 
                          count={products.length !== 0 ?
                             productSearch.page + 1
                            :productSearch.page
                        }
                          page={productSearch.page}
                          renderItem={(item) => (
                            <PaginationItem 
                               components={{
                                previous: ArrowBackIcon,
                                next: ArrowForwardIcon,
                              }}
                              {...item}
                              color={"secondary"}
                            />
                          )}
                          onChange={paginationHandler}
                        />
                    </Stack>
                </Stack>
            </Container>

            <div className={"brands-logo"} >
                <Container className={"family-brands"}>
                    <Box className={"category-title"}>
                        Our family-brands
                        </Box>
                    <Stack className={"brand-list"}
                    >
                             <Box className={"review-box"}>
                            <img src={"/img/ta.jpg"} />
                        </Box>

                         <Box className={"review-box"}
                         
                         >
                            <img src={"/img/zira.jpg"} />
                          
                        
                        </Box>
                       
                        <Box className={"review-box"}>
                            <img src={"/img/eastwing.jpg"} />
                        </Box>
                       
                    </Stack>
                </Container>
            </div>

            <div className={"address"}>
                <Container>
                    <Stack className={"address-area"}>
                        <Box className={"title"}>Our Address</Box>
                        <iframe 
                          style={{marginTop: "60px"}}
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2442.7728170978403!2d20.988233500000003!3d52.247510000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecd8373eb171d%3A0xc3274f176b5a4e6e!2sRestauracja%20SZAFRAN!5e0!3m2!1sru!2skr!4v1761667508489!5m2!1sru!2skr"
                          height="700"
                          width={"1300"}
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </Stack>
                </Container>
            </div>
        </div>
    );
}