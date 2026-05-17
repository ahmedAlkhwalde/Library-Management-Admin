import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store } from "./store/store.js";
import { Provider } from "react-redux";

// 1. استيراد المكونات الجديدة والـ router المركزي الذي أنشأته
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routers.jsx"; 

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        
        <RouterProvider router={router} />
        
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { BrowserRouter } from "react-router-dom";
// import { store } from "./store/store.js";
// import { Provider } from "react-redux";
// const queryClient = new QueryClient();
// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <BrowserRouter>
//       <Provider store={store}>
//         <QueryClientProvider client={queryClient}>
//           <App />
//           <ReactQueryDevtools />
//         </QueryClientProvider>
//       </Provider>
//     </BrowserRouter>
//   </StrictMode>,
// );
