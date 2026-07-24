import {
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";


interface Props {

  dashboard:any;

}



export default function InventoryDashboard({
  dashboard
}:Props){


  if(!dashboard)
    return null;



  return (

    <Grid container spacing={2}>


      <Grid item xs={12} md={4}>

        <Card>

          <CardContent>

            <Typography variant="h6">
              Total Products
            </Typography>


            <Typography
              variant="h3"
              fontWeight="bold"
            >
              {dashboard.totalProducts}
            </Typography>


          </CardContent>

        </Card>


      </Grid>



      <Grid item xs={12} md={4}>


        <Card>

          <CardContent>

            <Typography variant="h6">
              Total Quantity
            </Typography>


            <Typography
              variant="h3"
              fontWeight="bold"
            >

              {dashboard.totalQuantity}

            </Typography>


          </CardContent>


        </Card>


      </Grid>



      <Grid item xs={12} md={4}>


        <Card>


          <CardContent>


            <Typography variant="h6">
              Low Stock
            </Typography>


            <Typography
              variant="h3"
              color="error"
              fontWeight="bold"
            >

              {dashboard.lowStock}

            </Typography>


          </CardContent>


        </Card>


      </Grid>


    </Grid>

  );


}