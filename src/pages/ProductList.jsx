import * as React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import {
  Avatar,
  Box,
  Paper,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductList(products) {
  const handleProductClick = (product) => {
    navigate(`/product/${product.serviceId}`);
  };

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Typography component="div" variant="h2">
        Products
      </Typography>
      <Divider />
      <Paper elevation={3}>
        <List
        >
          {products.products.map((product, i) => {
            return (
              <div key={i}>
                <Box
                  sx={{
                    width: "22rem",
                    height: "5rem",
                    "&:hover": {
                      backgroundColor: "core.primary",
                      opacity: [0.9, 0.8, 0.7],
                      pointer: "cursor",
                    },
                  }}
                >
                  <ListItem
                    alignItems="flex-start"
                    onClick={() => handleProductClick(product)}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={product.serviceName}
                        src="src/assets/julius-baer-logo-talendo.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={product.serviceName}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
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
                </Box>
              </div>
            );
          })}
          <Divider variant="inset" component="li" />
        </List>
      </Paper>
    </React.Fragment>
  );
}
