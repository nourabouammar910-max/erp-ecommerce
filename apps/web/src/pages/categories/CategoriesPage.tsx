import { useState } from "react";

import {
  Paper,
  Stack,
  Typography,
  Button,
} from "@mui/material";

import { Add } from "@mui/icons-material";

import SearchInput from "../../components/ui/SearchInput";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";

import { useCategories } from "./hooks/useCategories";

import CategoriesTable from "./components/CategoriesTable";
import CategoryForm from "./components/CategoryForm";


export default function CategoriesPage() {

  const {
    categories,
    loading,
    refresh,
  } = useCategories();



  const [open,setOpen] =
    useState(false);



  const [selectedCategory,setSelectedCategory] =
    useState<any>(null);



  const [search,setSearch] =
    useState("");



  const filteredCategories =
    categories.filter((category:any)=>{

      const keyword =
        search.toLowerCase();


      return (
        category.name
          ?.toLowerCase()
          .includes(keyword)
      );

    });



  return (

    <Paper

      elevation={3}

      sx={{
        p:3,
        borderRadius:3
      }}

    >


      <Stack

        direction="row"

        justifyContent="space-between"

        alignItems="center"

        mb={3}

      >

        <Typography

          variant="h4"

          fontWeight="bold"

        >

          Categories

        </Typography>



        <Button

          variant="contained"

          startIcon={<Add/>}

          onClick={()=>{

            setSelectedCategory(null);

            setOpen(true);

          }}

        >

          Add Category

        </Button>


      </Stack>



      <Stack mb={3}>

        <SearchInput

          value={search}

          onChange={setSearch}

          placeholder="Search categories..."

        />

      </Stack>



      {
        loading ?

        <Loader/>


        :

        filteredCategories.length === 0 ?

        <EmptyState

          text="No categories found"

        />


        :


        <CategoriesTable

          categories={filteredCategories}

          refresh={refresh}

          onEdit={(category:any)=>{

            setSelectedCategory(category);

            setOpen(true);

          }}

        />

      }



      <CategoryForm

        open={open}

        onClose={()=>setOpen(false)}

        refresh={refresh}

        category={selectedCategory}

      />


    </Paper>

  );

}