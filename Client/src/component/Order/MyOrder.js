import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../redux/actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/MetaData/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";
import { Box, Container, Divider } from "@mui/material";

const MyOrder = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      align: "center",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      cellClassName: (params) => {
        // console.log(params);
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
        // return params.getValue(params.id, "status") === "Delivered"
        //   ? "greenColor"
        //   : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      align: "center",
      minWidth: 150,
      headerAlign: "center",
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      headerAlign: "center",
      type: "number",
      minWidth: 270,
      align: "center",
      // headerAlign: "center",
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.row.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <>
      <MetaData title={`${user.name} - Orders`} />

      <Box m={2}>
        <Typography align="center" variant="h4" components="h4">
          {`Order Details`}
        </Typography>
        <Divider sx={{ width: "20%", margin: "1rem auto" }} />
      </Box>

      {loading ? (
        <Loader />
      ) : (
        <>
          <Container maxWidth="xl">
            <Box sx={{ height: "100dvh", width: "100%", p: 3 }}>
              <DataGrid
                style={{ textAlign: "center" }}
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 10,
                    },
                  },
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
              />
            </Box>
          </Container>
          {/*      <Box sx={{ height: "100vh" }}>
            <Typography align="center" m={2} variant="h4" components="h4">
              Product Details
            </Typography>
            <Divider sx={{ width: "20%", margin: "1rem auto" }} />
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />

            <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
          </Box> */}
        </>
      )}
    </>
  );
};

export default MyOrder;
