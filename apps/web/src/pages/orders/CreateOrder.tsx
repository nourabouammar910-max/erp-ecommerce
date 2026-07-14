import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";


export default function CreateOrder(){


  const navigate = useNavigate();


  const [products,setProducts] =
    useState<any[]>([]);

  const [warehouses,setWarehouses] =
    useState<any[]>([]);



  const [warehouseId,setWarehouseId] =
    useState("");

  const [productId,setProductId] =
    useState("");

  const [quantity,setQuantity] =
    useState(1);



  const [price,setPrice] =
    useState(0);



  useEffect(()=>{

    loadData();

  },[]);



  async function loadData(){

    const productsRes =
      await api.get("/products");


    const warehousesRes =
      await api.get("/warehouses");


    setProducts(
      productsRes.data
    );


    setWarehouses(
      warehousesRes.data
    );

  }



  function selectProduct(id:string){

    setProductId(id);


    const product =
      products.find(
        p=>p.id===id
      );


    if(product){

      setPrice(
        product.price
      );

    }

  }




  async function submit(e:any){

    e.preventDefault();


    try{


      await api.post(
        "/orders",
        {

          warehouseId,

          items:[

            {

              productId,

              quantity,

              price,

            }

          ]

        }
      );


      alert(
        "Order created"
      );


      navigate("/orders");


    }
    catch(error){

      console.error(error);

      alert(
        "Failed creating order"
      );

    }


  }





  return (

    <div
      style={{
        padding:20
      }}
    >

      <h1>
        Create Order
      </h1>


      <form onSubmit={submit}>


        <div>

          <label>
            Warehouse
          </label>


          <br/>


          <select

            value={warehouseId}

            onChange={
              e=>setWarehouseId(
                e.target.value
              )
            }

          >

            <option value="">
              Select warehouse
            </option>


            {
              warehouses.map(w=>(

                <option
                  key={w.id}
                  value={w.id}
                >

                  {w.name}

                </option>

              ))
            }


          </select>

        </div>





        <br/>





        <div>

          <label>
            Product
          </label>


          <br/>


          <select

            value={productId}

            onChange={
              e=>selectProduct(
                e.target.value
              )
            }

          >

            <option value="">
              Select product
            </option>


            {
              products.map(p=>(

                <option
                  key={p.id}
                  value={p.id}
                >

                  {p.name}

                </option>

              ))
            }


          </select>


        </div>





        <br/>





        <div>

          <label>
            Quantity
          </label>


          <br/>


          <input

            type="number"

            value={quantity}

            onChange={
              e=>setQuantity(
                Number(e.target.value)
              )
            }

          />


        </div>




        <br/>




        <div>

          <label>
            Price
          </label>


          <br/>


          <input

            value={price}

            readOnly

          />


        </div>





        <br/>





        <h3>

          Total:
          {" "}
          {quantity * price}

        </h3>





        <button
          type="submit"
        >

          Create Order

        </button>



      </form>


    </div>

  );

}