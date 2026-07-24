import React from "react";
import ReactDOM from "react-dom/client";


import {
  RouterProvider
} from "react-router-dom";


import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";


import {
  ThemeProvider,
  CssBaseline,
} from "@mui/material";


import {
  Toaster
} from "react-hot-toast";


import {
  router
} from "./routes";


import {
  AuthProvider
} from "./contexts/AuthContext";


import theme from "./theme/theme";


import "./index.css";





const queryClient =
new QueryClient();





ReactDOM.createRoot(

document.getElementById("root")!

)

.render(



<ThemeProvider theme={theme}>


<CssBaseline />



<QueryClientProvider client={queryClient}>


<AuthProvider>


<RouterProvider

router={router}

/>



<Toaster

position="top-right"

reverseOrder={false}

/>


</AuthProvider>


</QueryClientProvider>


</ThemeProvider>



);