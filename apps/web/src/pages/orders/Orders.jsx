import { useEffect, useState } from "react";
import api from "../../api/axios";


export default function Orders(){

  const [orders,setOrders] = useState([]);
  const [loading,setLoading] = useState(true);



  useEffect(()=>{

    getOrders();

  },[]);



  async function getOrders(){

    try {

      const res = await api.get("/orders");

      setOrders(res.data);

    } catch(error){

      console.log(error);

    } finally {

      setLoading(false);

    }

  }



  if(loading){

    return <h2>Loading...</h2>;

  }



  return (

    <div>

      <h1>
        Orders
      </h1>


      <table>

        <thead>

          <tr>

            <th>
              ID
            </th>


            <th>
              User
            </th>


            <th>
              Warehouse
            </th>


            <th>
              Total
            </th>


          </tr>

        </thead>


        <tbody>

        {
          orders.map(order => (

            <tr key={order.id}>

              <td>
                {order.id}
              </td>


              <td>
                {order.user?.email}
              </td>


              <td>
                {order.warehouse?.name}
              </td>


              <td>
                {order.total}
              </td>


            </tr>

          ))
        }

        </tbody>


      </table>


    </div>

  );

}