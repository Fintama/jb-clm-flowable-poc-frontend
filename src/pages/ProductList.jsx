import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function ProductList(products) {

  const handleProductClick = (product) => {
    navigate(`/product/${product.serviceId}`);
  };

  const navigate = useNavigate();
  
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {products.products.map((product, i) => {
      return (
        <div key={i}>
          <ListItem alignItems="flex-start" onClick={() => handleProductClick(product)}>
          <ListItemAvatar>
            <Avatar alt={product.serviceName} src="src/assets/julius-baer-logo-talendo.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={product.serviceName}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {product.serviceId}
                </Typography>
                {product.context}
              </React.Fragment>
            }
          />
        </ListItem>
        </div>
      );
    })}
      <Divider variant="inset" component="li" />
    </List>
  );
}