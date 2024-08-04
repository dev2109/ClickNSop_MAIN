// import React from 'react'

// const ProductCard = ({product}) => {

//   return (
//     <>

//       <Link className="productCard" to={`/product/${product._id}`} >
//         <div>
//           <img src={product.images[0].url} alt="" />
//   <p>{product.name}</p>
//   <div>
//     <ReactStars {...options} />
//     <span>({product.numOfReviews} reviews)</span>
//   </div>
// <span>&#8377;{product.price}</span>
//         </div>
//       </Link>
//     </>
//   )
// }

// export default ProductCard
import * as React from "react";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  const options = {
    edit: false, //star select nai hsse
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.ratings, //2.5,star color maa hssee
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true, //half star color ma battaavse
  };
  return (
    <Link to={`/product/${product._id}`}>
      <Card
        sx={{
          width: 300,
          margin: "2rem",
        }}
      >
        <CardMedia
          sx={{ height: 400, objectFit: "cover" }}
          image={product.images[0].url}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Box>
            <ReactStars {...options} />
            <span>({product.numOfReviews} reviews)</span>

            <p>&#8377;{product.price}</p>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};
export default ProductCard;
