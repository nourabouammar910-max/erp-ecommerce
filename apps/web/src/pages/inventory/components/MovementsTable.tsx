interface Props {
  movements:any[];
}


export default function MovementsTable({
  movements
}:Props){


  return (

    <table
      style={{
        width:"100%",
        borderCollapse:"collapse",
        marginTop:20,
      }}
    >


      <thead>

        <tr>

          <th>Date</th>

          <th>Product</th>

          <th>Warehouse</th>

          <th>Type</th>

          <th>Quantity</th>

        </tr>

      </thead>



      <tbody>


      {
        movements.map((item)=>(

          <tr key={item.id}>


            <td>

              {
                new Date(
                  item.createdAt
                ).toLocaleDateString()
              }

            </td>



            <td>
              {
                item.product?.name
              }
            </td>



            <td>
              {
                item.warehouse?.name
              }
            </td>



            <td>
              {
                item.type
              }
            </td>



            <td>
              {
                item.quantity
              }
            </td>


          </tr>

        ))
      }


      </tbody>


    </table>

  );

}