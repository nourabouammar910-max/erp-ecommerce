import { useState } from "react";

import {
  Paper,
  Stack,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

import { Add } from "@mui/icons-material";

import { useProducts } from "./hooks/useProducts";
import ProductsTable from "./components/ProductsTable";
import ProductForm from "./components/ProductForm";


export default function ProductsPage() {

  const {
    products,
    loading,
    refresh,
  } = useProducts();


  const [open, setOpen] =
    useState(false);


  const [selectedProduct, setSelectedProduct] =
    useState<any>(null);



  console.log("Products:", products);



  return (

    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >


      <Stack
        direction="row"
        sx={{
          mb: 3,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >


        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Products
        </Typography>



        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {

            setSelectedProduct(null);

            setOpen(true);

          }}
        >
          Add Product
        </Button>


      </Stack>





      {
        loading ?


        <Stack
          sx={{
            py: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <CircularProgress />

        </Stack>


        :


        <ProductsTable

          products={products}

          refresh={refresh}

          onEdit={(product) => {

            setSelectedProduct(product);

            setOpen(true);

          }}

        />


      }






      <ProductForm

        open={open}

        onClose={() => setOpen(false)}

        refresh={refresh}

        product={selectedProduct}

      />



    </Paper>

  );

}