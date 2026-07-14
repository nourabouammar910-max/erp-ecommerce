import { createContext, useState } from "react";
import { authService } from "../services/auth.service";


export const AuthContext = createContext<any>(null);


export function AuthProvider({ children }: any) {


  const [user, setUser] = useState(null);



  async function login(data:any) {

    const response = await authService.login(data);


    const {
      user,
      access_token,
      refresh_token
    } = response.data;



    localStorage.setItem(
      "access_token",
      access_token
    );


    localStorage.setItem(
      "refresh_token",
      refresh_token
    );


    setUser(user);


    return response;

  }



  function logout(){

    localStorage.removeItem(
      "access_token"
    );

    localStorage.removeItem(
      "refresh_token"
    );


    setUser(null);

  }



  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}