import React, { useState } from "react";
import Grid from '@mui/material/Grid2';
import ProductCard from './ProductCard';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert, Snackbar,MenuItem } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DealForm from "./DealForm";

const AdminCard = () => {

  const title="Add New Deal"
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
      setIsOpen(false); // Close dialog if no unsaved changes
    };

  const cards = [
    { id: 1, image: 'https://m.media-amazon.com/images/I/81u+lUSZRDL._SL1500_.jpg', platform_image: 'https://w7.pngwing.com/pngs/1012/770/png-transparent-amazon-logo-amazon-com-amazon-video-logo-company-brand-amazon-logo-miscellaneous-wish-text.png', title: 'Card 1', description: 'Description of Card 1' },
    { id: 2, image: 'https://m.media-amazon.com/images/I/81u+lUSZRDL._SL1500_.jpg', platform_image: '/assets/Amazon.png', title: 'Card 2', description: 'Description of Card 2' },
    { id: 3, image: 'https://m.media-amazon.com/images/I/81u+lUSZRDL._SL1500_.jpg', platform_image: 'https://cdn.prod.website-files.com/648afe63bbf1f3eaf6419381/6502d40194b2f080644bd195_jiomart%20bnw.png', title: 'Card 3', description: 'Description of Card 3' },
    { id: 4, image: 'https://m.media-amazon.com/images/I/81u+lUSZRDL._SL1500_.jpg', platform_image: 'https://e7.pngegg.com/pngimages/243/989/png-clipart-reliance-digital-reliance-retail-jio-reliance-industries-others-miscellaneous-blue.png', title: 'Card 4', description: 'Description of Card 4' },
    { id: 5, image: 'https://m.media-amazon.com/images/I/81u+lUSZRDL._SL1500_.jpg', platform_image: 'https://via.placeholder.com/345x140', title: 'Card 5', description: 'Description of Card 5' },
    { id: 6, image: 'https://m.media-amazon.com/images/I/81u+lUSZRDL._SL1500_.jpg', platform_image: 'https://via.placeholder.com/345x140', title: 'Card 6', description: 'Description of Card 6' },
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
        <Button size="small" variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>Add Deal</Button>
      </Box>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
            <ProductCard card={card} />
          </Grid>
        ))}
      </Grid>

      <DealForm open={isOpen} onClose={handleClose} dialogTitle={title}/>
    </Box>
  )
}

export default AdminCard;