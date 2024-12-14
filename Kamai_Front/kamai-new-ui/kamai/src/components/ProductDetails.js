import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Fab,
} from "@mui/material";
import { styled } from "@mui/system";
import {makeStyles } from '@mui/styles'
const useStyles = makeStyles(() => ({
  fab: {
    position: "fixed",
    bottom: 16,
    right: "40%",
  },
}));

const ProductDetails = () => {
  
  const classes = useStyles();

  const theme = useTheme();
  const token = localStorage.getItem('token');

  const [product,setProduct]= useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/jobs/${id}`,
        { headers: { Authorization: `Bearer ${token}` } });
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductDetails();
  }, []);


  const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: "12px",
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2),
  }));

  const HighlightCard = styled(Card)(({ theme }) => ({
    borderRadius: "12px",
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2),
    mb: 4
  }));

  const handleAccept = async () => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/orders`,
            { jobId: product._id },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        alert('Job accepted! Order created.');
        window.open(response.data.jobUrl, '_blank');

    } catch (error) {
        console.error(error);
        alert('Failed to accept job.');
    }
};


  const HighlightItem = ({ label, value, highlight }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 1,
        padding: 1,
        borderRadius: "8px",
        backgroundColor:  highlight
        ? theme.palette.mode === 'dark'
          ? theme.palette.success.dark
          : theme.palette.success.light
        : 'transparent',
      }}
    >
      <Typography variant="body2" fontWeight={highlight ? "bold" : "normal"}>
        {label}
      </Typography>
      <Typography
        variant="body2"
        fontWeight={highlight ? "bold" : "normal"}
        color={highlight ? "primary" : "inherit"}
      >
        {value}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ paddingRight:4}}>
      <Grid container spacing={2}>
        {/* Product Details Section */}
        <Grid item xs={12} md={6}>
          <StyledCard>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Box
                  component="img"
                  src={product.imageLink}
                  alt="Product"
                  sx={{ width: "100%", borderRadius: "8px" }}
                />
              </Grid>
              <Grid item xs={7}>
                <Typography variant="h6" gutterBottom>
                  {product.title}
                </Typography>
              </Grid>
            </Grid>
          </StyledCard>

          <Box sx={{ marginTop: 2 }}>
            <StyledCard>
              <Typography variant="h6" gutterBottom>
                Offer Details
              </Typography>
              <Typography variant="body2" gutterBottom>
                Rs 1000 off on Axis Bank credit card
              </Typography>
              <Typography variant="body2" gutterBottom>
                5% Unlimited Cashback on Flipkart Axis Bank Credit Card
              </Typography>
              <Typography variant="body2" color="error" gutterBottom>
                ⚠ Note: Don’t overuse your card. Keep the cashback to a certain
                limit under Rs. 4000 (according to the analysis, not a definite
                value) per billing cycle. If overused, then chances are that the
                whole cashback will not be processed.
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1">Steps to avoid Flipkart cancellation:</Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="1. Use incognito window or DuckDuckGo Browser." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="2. Always turn on and off Airplane mode (Must)." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3. Avoid using Flipkart plus account." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="4. Don’t use any phone number on which cancellation already happened." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="5. Turn off location service before adding address on the phone." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="6. Add address before adding the product to the cart." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="7. Add some characters in the address for safety (Don’t remove anything)." />
                </ListItem>
              </List>
            </StyledCard>
          </Box>
        </Grid>

        {/* Summary Section */}
        <Grid item xs={12} md={4}>
          <HighlightCard>
            <Typography variant="h6" gutterBottom>
              Deal Details
            </Typography>

            <HighlightItem label="Total Price" value={product.orderAmount} />
            <HighlightItem label="Receive from Us" value={product.returnAmount} />
            <HighlightItem
              label="Total You'll Receive"
              value={product.returnAmount}
            />
            <HighlightItem label="Total Earnings" highlight value={product.returnAmount-product.orderAmount} />
          </HighlightCard>
        </Grid>
      </Grid>
      <Fab
      color="primary"
      aria-label="accept"
      className={classes.fab}
      onClick={handleAccept}
      variant="extended"
    >
      Accept
    </Fab>
    </Box>
  );
};

export default ProductDetails;
