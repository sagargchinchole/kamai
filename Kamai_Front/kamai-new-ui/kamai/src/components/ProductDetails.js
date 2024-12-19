import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  Fab,
  Grid2,
  Stack
} from "@mui/material";
import { styled } from "@mui/system";
import { makeStyles } from '@mui/styles'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const useStyles = makeStyles(() => ({
  fab: {
    position: "fixed",
    bottom: 16,
    right: "40%",
  },
}));

const ProductDetails = () => {

  const classes = useStyles();

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [product, setProduct] = useState({});
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

  const handleAccept = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/orders`,
        { jobId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Job accepted! Order created.');
      navigate(`/myOrders/${response.data._id}`);
      window.open(response.data.jobUrl, '_blank');

    } catch (error) {
      console.error(error);
      alert('Failed to accept job.');
    }
  };

  return (
    <Box sx={{ paddingRight: 4 }}>
      <Grid container spacing={2}>
        {/* Product Details Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <Box
                  component="img"
                  src={product.imageLink}
                  alt="Product"
                  sx={{ width: "75%", borderRadius: "8px" }}
                />
              </Grid>
              <Grid item xs={7}>
                <Typography variant="body1" gutterBottom>
                  {product.title}
                </Typography>
              </Grid>
            </Grid>
            </CardContent>
          </Card>

          <Box sx={{ marginTop: 2 }}>
            <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Offer Details
              </Typography>
              <Typography variant="body2" gutterBottom>
                {product.description}
              </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        {/* Summary Section */}
        <Card sx={{ m: 2 }}>
          <CardContent>
            <Typography variant='h6'>Earning Details</Typography>
            <Grid2 container xs={4} spacing={1} sx={{ mt: 1 }}>
              <Card sx={{ width: 150 }}>
                <CardContent>
                  <Stack direction={'row'}>
                    <Box maxWidth={'100'}>
                      <Typography variant='body2'>You'll spend</Typography>
                      <Typography>{product.orderAmount}</Typography>
                    </Box>
                    <ArrowCircleDownIcon sx={{ mt: 2, ml: 2 }} color='warning' />
                  </Stack>
                </CardContent>
              </Card>
              <Card sx={{ width: 150 }}>
                <CardContent>
                  <Stack direction={'row'}>
                    <Box maxWidth={'100'}>
                      <Typography variant='body2'>You'll get</Typography>
                      <Typography>{product.returnAmount}</Typography>
                    </Box>
                    <ArrowCircleUpIcon sx={{ mt: 2, ml: 2 }} color='info' />
                  </Stack>
                </CardContent>
              </Card>
              <Card sx={{ width: 150 }}>
                <CardContent>
                  <Stack direction={'row'}>
                    <Box maxWidth={'100'}>
                      <Typography variant='body2'>You'll earn</Typography>
                      <Typography>{product.returnAmount - product.orderAmount}</Typography>
                    </Box>
                    <ArrowCircleUpIcon sx={{ mt: 2, ml: 2 }} color='success' />
                  </Stack>
                </CardContent>
              </Card>
            </Grid2>
          </CardContent>
        </Card>
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
