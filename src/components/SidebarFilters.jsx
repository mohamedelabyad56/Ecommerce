import React, { useState, useEffect } from "react";
import { Box, Typography, Slider, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const SidebarFilters = ({ onCategoryChange, onPriceChange, priceRange, maxPrice }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const products = snapshot.docs.map((doc) => doc.data());
        const uniqueCategories = [...new Set(products.map((product) => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handlePriceChange = (event, newValue) => {
    onPriceChange(newValue);
  };

  const handleCategoryChange = (category, isChecked) => {
    const updated = isChecked ? [...selectedCategories, category] : selectedCategories.filter((cat) => cat !== category);
    setSelectedCategories(updated);
    onCategoryChange(updated);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">Filtres</Typography>
      <Typography variant="subtitle1" mt={2}>
        Preu: €{priceRange[0]} - €{priceRange[1]}
      </Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={maxPrice}
        sx={{ mt: 1 }}
      />
      <Typography variant="subtitle1" mt={4}>Categories</Typography>
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={<Checkbox onChange={(e) => handleCategoryChange(category, e.target.checked)} checked={selectedCategories.includes(category)} />}
            label={category}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default SidebarFilters;
