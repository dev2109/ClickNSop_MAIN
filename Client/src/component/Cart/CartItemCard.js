import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
// import "./CartItemCard.css";
import { Link } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: { sm: "100%", md: "33.33%" },
          // height: "5rem",
          textTransform: "capitalize",
          // width: "5rem",
        }}
      >
        <Box sx={{margin:"0 auto" , width:"100%"}}>
          <img
            src={item.image}
            style={{ borderRadius: "1rem" }}
            alt="ssa"
            height="100"
            width="100"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          <Box ml={2} sx={{ textAlign: "center" }}>
            <Link style={{ color: "blue" }} to={`/product/${item.product}`}>
              {item.name}
            </Link>
            <Typography
              variant="p"
              component="p"
            >{`Price: ₹${item.price}`}</Typography>
            <IconButton
              onClick={() => deleteCartItems(item.product)}
              color="red"
              aria-label="Remove"
            >
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CartItemCard;
