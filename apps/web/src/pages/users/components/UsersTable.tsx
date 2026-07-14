import { useNavigate } from "react-router-dom";
import type { User } from "../types/user";


interface Props {
  users: User[];
  refresh: () => void;
}


export default function UsersTable({
  users,
  refresh
}: Props) {


  const navigate = useNavigate();



  async function removeUser(id:number){

    const ok = window.confirm(
      "Delete this user?"
    );

    if(!ok) return;


    await fetch(
      `http://localhost:3000/users/${id}`,
      {
        method:"DELETE"
      }
    );


    refresh();

  }



  return (

    <table
      style={{
        width:"100%",
        borderCollapse:"collapse"
      }}
    >

      <thead>

        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>

      </thead>


      <tbody>

      {
        users.map(user=>(

          <tr key={user.id}>

            <td>{user.id}</td>

            <td>{user.name}</td>

            <td>{user.email}</td>

            <td>{user.role}</td>


            <td>

              <button
                onClick={()=>
                  navigate(
                    `/users/${user.id}/edit`
                  )
                }
              >
                Edit
              </button>


              <button
                onClick={()=>
                  removeUser(user.id)
                }
                style={{
                  marginLeft:10
                }}
              >
                Delete
              </button>


            </td>

          </tr>

        ))
      }

      </tbody>

    </table>

  );

}