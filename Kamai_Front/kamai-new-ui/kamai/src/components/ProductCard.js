import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DealForm from './DealForm';
const ProductCard = ({ card }) => {

  console.log(card);
  const title = "Edit deal";
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  return (
    <Card sx={{ width: 300, height:450 }}>
      {/* <Link href={`/deals/${card.id}`}  underline="none" color="inherit"> */}
        <CardActionArea sx={{height:400}}>
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
              {`Earn flat ₹${card.returnAmount-card.orderAmount} cash reward`}
            </Typography>
          </CardContent>
        </CardActionArea>
      {/* </Link> */}
      <CardActions>
        <Button color="primary" sx={{ marginLeft: 'auto' }} onClick={handleOpen}>
          <BorderColorIcon fontSize="small" />
        </Button>
        <Button color="primary" sx={{ marginLeft: 'auto' }}>
          <DeleteForeverIcon fontSize="small" />
        </Button>
        <DealForm open={isOpen} onClose={()=>setIsOpen(false)} dealData={card} dialogTitle={title}/>
      </CardActions>
    </Card>
  );
};

export default ProductCard;