import "./i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";

import { BrowserRouter } from "react-router-dom";
import Body from "./Body";

import { RecoilRoot } from "recoil";


const queryClient = new QueryClient();
const App = () => {
 
  return (
    <BrowserRouter>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Body />

          <Toaster position="bottom-center" />
        </QueryClientProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;
