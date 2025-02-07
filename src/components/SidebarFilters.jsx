import React, { useState, useEffect } from "react";
import { FormGroup, FormControlLabel, Checkbox, Box, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const SidebarFilters = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Obtener categorías desde Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      setCategories(querySnapshot.docs.map(doc => doc.data().name));
    };
    fetchCategories();
  }, []);

  // Manejo del cambio en checkboxes de categorías
  const handleCategoryChange = (event) => {
    const updatedCategories = event.target.checked
      ? [...selectedCategories, event.target.name]
      : selectedCategories.filter(cat => cat !== event.target.name);

    setSelectedCategories(updatedCategories);
    onCategoryChange(updatedCategories); // Enviar cambios a ProductGrid
  };

  return (
    <Box sx={{ padding: 2, width: 250, borderRight: "1px solid #ddd" }}>
      <Typography variant="h6" mt={2}>Filtra per Categoria</Typography>
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={<Checkbox name={category} onChange={handleCategoryChange} />}
            label={category}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default SidebarFilters;
