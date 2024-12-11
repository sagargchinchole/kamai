import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
const ProductCard = ({ card }) => {

    const ActiveDealLink = ({ id, children }) => (
        <MuiLink
          component={RouterLink}
          to={`/activeDeals/${id}`}
          underline="none"  // Remove the underline
          color="inherit"   // Inherit the color
        >
          {children}
        </MuiLink>
      );

    const [isAccepted, setIsAccepted] = useState(false);
    const handleAccept = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/orders`,
                { jobId: card._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Job accepted! Order created.');
            window.open(response.data.jobUrl, '_blank');
            setIsAccepted(true);

        } catch (error) {
            console.error(error);
            alert('Failed to accept job.');
        }
    };

    return (
        <Card sx={{ width: 300, height: 450 }}>
            <ActiveDealLink id={card._id}>
            <CardActionArea sx={{ height: 400 }}>
                <Box>
                    <CardMedia
                        component="img"
                        height="250"
                        image={card.imageLink}
                        sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                        alt="green iguana"
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 16, // Adjust based on where you want the small image
                            left: 15, // Adjust based on where you want the small image
                            width: 75, // Size of the small image
                            height: 20, // Size of the small image
                            borderRadius: '10%', // Optional: to make the small image circular
                            overflow: 'hidden',
                            boxShadow: 1, // Optional: to add shadow to the small image
                        }}
                    >
                        <img
                            src={`/assets/${card.platform.toLowerCase().replace(/\s+/g, '')}.png`}
                            alt="small overlay"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                        />
                    </Box>
                </Box>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {card.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {`Earn flat ₹${card.returnAmount - card.orderAmount} cash reward`}
                    </Typography>
                </CardContent>
            </CardActionArea>
            </ActiveDealLink>
            <CardActions>
                <Button color="primary" size='small' variant='contained' sx={{ marginLeft: 'auto' }} onClick={handleAccept}>
                    Accept
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;