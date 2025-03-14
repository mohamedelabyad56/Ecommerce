import React, { useEffect, useState, useMemo } from "react";
import { fetchProducts } from "../services/productService";
import SidebarFilters from "./SidebarFilters";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QSgAiBNoAIrMHfdrqMMFCgqvBXCJ9ymEpmjB0u8QzZUfrkNRN3DU1FEtI5Pe63YEgz5T3FwmpOvHpuR9hzGn0op00jZoKkROE");

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);

      const prices = data.map((product) => product.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setPriceRange([minPrice, maxPrice]);
      setMaxPrice(maxPrice);
    };
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );
  }, [selectedCategories, priceRange, products]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: 250, borderRight: "1px solid #ddd", padding: 2 }}>
        <SidebarFilters 
          onCategoryChange={setSelectedCategories}
          onPriceChange={setPriceRange}
          priceRange={priceRange}
          maxPrice={maxPrice}
        />
      </Box>
      <Grid container spacing={2} sx={{ flexGrow: 1, padding: 2 }}>
        {loading ? (
          <CircularProgress />
        ) : (
          filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardMedia component="img" height="140" image={product.image} alt={product.name} />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    €{product.price}
                  </Typography>
                  <Button variant="contained" color="primary">Comprar</Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default ProductGrid;