import { Rating } from "@material-ui/lab";
import React from "react";
// import profilePng from "../../images/profile.jpg";
import {
  Avatar,
  Card,
  // CardActions,
  CardContent,
  CardHeader,
  Divider,
  // IconButton,
  Typography,
} from "@mui/material";

const ReviewCard = ({ review, open }) => {
  const options = {
    size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    // <div className="reviewCard">
    //   <img src={profilePng} alt="User" />
    //   <p>{}</p>
    //   <Rating {...options} />
    //   <span className="reviewCardComment">{review.comment}</span>
    // </div>

    <Card m={3} sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            // src={profilePng}
            // sx={{ bgcolor: red[500] }}
            aria-label="recipe"
          />
        }
        title={review.name}
        // subheader="September 14, 2016"
      />
      <Divider />
      <CardContent>
        <Rating {...options} />
        <Typography variant="body2" color="text.secondary">
          {review.comment}
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing></CardActions> */}
    </Card>
  );
};

export default ReviewCard;
