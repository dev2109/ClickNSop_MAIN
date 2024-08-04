import React, { useEffect, useState ,useLayoutEffect} from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
// import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../redux/actions/productAction";
import { getAllOrders } from "../../redux/actions/orderAction";
import { getAllUsers } from "../../redux/actions/userAction";
import MetaData from "../layout/MetaData/MetaData";
import { styled } from "@mui/material/styles";
import { Box, Divider } from "@mui/material/";
// import Typography from "@mui/material/Typography";
import {
  PieChart,
  Pie,
  // Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  // renderCustomizedLabel,
  // data,
} from "recharts";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const Dashboard = () => {
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (user.role === "user") {
      navigate("/home");
    }
  }, [navigate, user.role]);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineChartData = [
    {
      name: "inital amount ",
      amt: 0,
    },
    {
      name: "Amount earned",
      amt: totalAmount,
    },
  ];
  const COLORS = ["#FF8042", "#00C49F"];

  const pieChartData = [
    { name: "out of stock", value: outOfStock },
    { name: "In stock", value: products.length - outOfStock },
  ];

  return (
    <>
      <Box sx={{ display: "flex", maxwidth: "100%" }}>
        <MetaData title="Dashboard - Admin Panel" />
        <Sidebar open={open} setOpen={setOpen} />
        <Main>
          <Box mt={6} p={2}>
            <Box m={2}>
              <Typography align="center" variant="h4" components="h4">
                {`Dashboard`}
              </Typography>
              <Divider sx={{ width: "20%", margin: "1rem auto" }} />
            </Box>

            <Box>
              <Box
                mt={2}
                p={5}
                sx={{
                  bgcolor: "rgba(91, 132, 219, 0.932)",
                  color: "white",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Typography variant="p">
                  Total Amount <br /> ₹{totalAmount}
                </Typography>
              </Box>
              <div className="dashboardSummaryBox2">
                <Link className="linkBox" to="/admin/products">
                  <p>Product</p>
                  <p>{products && products.length}</p>
                </Link>
                <Link className="linkBox" to="/admin/orders">
                  <p>Orders</p>
                  <p>{orders && orders.length}</p>
                </Link>
                <Link className="linkBox" to="/admin/users">
                  <p>Users</p>
                  <p>{users && users.length}</p>
                </Link>
              </div>
            </Box>
            <Box sx={{ height: "50vh" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={500} height={300} data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="amt"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>

            <Box sx={{ height: "60vh", width: "auto" }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    animation={true}
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    width={800}
                    height={700}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={180}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ height: "20vh" }}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ height: "10vh", width: "200%" }}
              >
                <Box
                  sx={{
                    height: "1rem",
                    width: "1rem",
                    bgcolor: "#FF8042",
                    mr: 2,
                  }}
                ></Box>
                <Typography variant="body1" component="body1">
                  Out Of Stock
                </Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ height: "10vh", width: "200%" }}
              >
                <Box
                  sx={{
                    height: "1rem",
                    width: "1rem",
                    bgcolor: "#00C49F",
                    mr: 2,
                  }}
                ></Box>
                <Typography variant="body1" component="body1">
                  In Stock
                </Typography>
              </Box>
            </Box>
          </Box>
        </Main>
      </Box>
    </>
  );
};

export default Dashboard;
