import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";


interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  productId: string;
}


interface Order {
  id: number;
  total: number;

  user?: {
    name: string;
    email: string;
  };

  warehouse?: {
    name: string;
  };

  items: OrderItem[];
}



export default function OrdersPage() {


  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);



  useEffect(() => {

    loadOrders();

  }, []);



  async function loadOrders() {
  try {
    const res = await api.get("/orders");

    console.log("SUCCESS:", res.data);

    setOrders(res.data);
  } catch (err: any) {
    console.log("STATUS:", err.response?.status);
    console.log("DATA:", err.response?.data);
    console.log("ERROR:", err);

    setOrders([]);
  } finally {
    setLoading(false);
  }
}





  if(loading){

    return (

      <div style={{padding:20}}>

        Loading orders...

      </div>

    );

  }





  return (


    <div style={{padding:20}}>


      <div
        style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center"
        }}
      >


        <h1>
          Orders
        </h1>



        <Link to="/orders/create">

          <button>
            + Create Order
          </button>

        </Link>


      </div>





      {
        orders.length === 0 && (

          <p>
            No orders found
          </p>

        )
      }






      {
        orders.length > 0 && (


        <table

          border={1}

          cellPadding={10}

          style={{
            marginTop:20,
            width:"100%",
            borderCollapse:"collapse"
          }}

        >


          <thead>

            <tr>


              <th>
                ID
              </th>


              <th>
                Customer
              </th>


              <th>
                Warehouse
              </th>


              <th>
                Items
              </th>


              <th>
                Total
              </th>


            </tr>


          </thead>





          <tbody>


          {
            orders.map(order=>(


              <tr key={order.id}>


                <td>
                  #{order.id}
                </td>



                <td>

                  {order.user?.name}

                  <br />

                  <small>
                    {order.user?.email}
                  </small>

                </td>




                <td>

                  {
                    order.warehouse?.name
                    ||
                    "-"
                  }

                </td>





                <td>

                  {
                    order.items?.length
                    ||
                    0
                  }

                  {" "}products

                </td>





                <td>

                  $
                  {
                    order.total
                  }

                </td>




              </tr>


            ))
          }



          </tbody>



        </table>


        )

      }




    </div>


  );


}