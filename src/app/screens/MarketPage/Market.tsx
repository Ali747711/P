import React from "react";
import { Box, Button, Container, InputBase, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { NavLink } from "react-router-dom";
import { Height } from "@mui/icons-material";




export default function Market() {
  return ( 
    <div >
      <Container className="shop">
        <Stack className="shop-container"> 
                        <Stack className="shop-header" > 
                          <img src="/icons/shop/FASHION.svg"/>
                        
                                        
                                    <Box >CATALOG  </Box>
                                    <Box >FASHION  </Box>
                                    <Box >FAVOURITES  </Box>
                                    <Box >LIFESTYLE  </Box>
                                    <Button variant="contained" 
                                      className="login-button"
                                      >SIGN UP</Button> 
                                    
                                   
                       </Stack>

            <Stack className="shop-menu">
                     <Box className="shop-logo">
                       <Box className="shop-logo-text"> LET'S EXPLORE UNIQUE CLOTHES!</Box>
                       <Box className="shop-logo-text2"> Live for Influential and Innovative fashion! </Box> 
                         <Box> Shop Now</Box>
                     


                      </Box>
             </Stack>

                   <Stack className="Brands">
                      <Box className="shop-logo-img">
                          <img  src="/icons/shop/hm.svg" />
                          <img  src="/icons/shop/lacoste.svg" />
                          <img  src="/icons/shop/shopify.svg" />
                          <img  src="/icons/shop/obey.svg" />
                          <img  src="/icons/shop/levis.svg" />
                          <img  src="/icons/shop/amazon.svg" />
                        </Box>
                   </Stack>
              <Stack className="new arrivals"
            >
                
              </Stack>


        </Stack>
      </Container>
  
    </div>
  );
}

