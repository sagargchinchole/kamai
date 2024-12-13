import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from "@mui/material/Grid2";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { Box, Chip } from '@mui/material';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import PendingActionsTwoToneIcon from '@mui/icons-material/PendingActionsTwoTone';
import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

export default function OrderCard({ order }) {

    const OrderLink = ({ id, children }) => (
        <MuiLink
            component={RouterLink}
            to={`/myOrders/${id}`}
            underline="none"  // Remove the underline
            color="inherit"   // Inherit the color
        >
            {children}
        </MuiLink>
    );
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate().toString().padStart(2, '0')}-${date.toLocaleString('en-IN', {
            month: 'short',
        })}-${date.getFullYear()}`;
    };
    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case "accepted":
                return <CheckCircleTwoToneIcon sx={{ color: "green" }} />;
            case "confirmed":
                return <PendingActionsTwoToneIcon sx={{ color: "blue" }} />;
            case "shipped":
                return <LocalShippingTwoToneIcon sx={{ color: "orange" }} />;
            case "ofd": // Out for Delivery
                return <LocalShippingTwoToneIcon sx={{ color: "purple" }} />;
            case "delivered":
                return <DoneAllTwoToneIcon sx={{ color: "teal" }} />;
            case "canceled":
                return <CancelTwoToneIcon sx={{ color: "red" }} />;
            default:
                return null; // No icon for unknown status
        }
    };

    return (
        <Card>
            <OrderLink id={order._id}>
                <CardActionArea>
                    <Box sx={{ position: "relative", display: "flex" }}>
                        <Box sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                        }}>
                            {getStatusIcon(order.status)}
                        </Box>
                        <Stack direction="row" sx={{ flex: 1 }}>
                            <CardMedia
                                component="img"
                                height="100"
                                image={order.image}
                                alt={order.productName}
                                sx={{ objectFit: "contain", width: 75 }}
                            />
                            <CardContent>
                                <Grid>
                                    <Typography variant="body1">{order.productName}</Typography>
                                    <Typography variant="body2" sx={{ mt: 0.5 }}  >Status: {order.status}</Typography>
                                    <Typography variant="body2" sx={{ mt: 0.5 }} >Accepted on: {formatDate(order.acceptedDate)}</Typography>
                                </Grid>
                                <Divider sx={{ mt: 1, mb: 1 }} />
                                <Stack direction="row"
                                    divider={<Divider orientation="vertical" flexItem />}
                                    spacing={0.5}>
                                    <Typography align="center" variant="caption">You spent: <br /> <b>{order.orderAmount}</b></Typography>
                                    <Typography align="center" variant="caption">You'll receive:<br /> <b>{order.returnAmount}</b></Typography>
                                    <Typography align="center" variant="caption">Total earnings: <br /><b>{order.returnAmount - order.orderAmount}</b></Typography>
                                    {order.status === "cancelled" && (
                                        <Chip label="Cancelled" color="error" />
                                    )}
                                </Stack>
                            </CardContent>
                        </Stack>
                    </Box>
                </CardActionArea>
            </OrderLink>
        </Card>
    );
}
