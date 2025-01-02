"use client";
import "./globals.css";
import { AppContextProvider } from "./context/appContext";
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import Localization from '../Localization';
import { CookiesProvider } from "react-cookie";
import Footer from "../components/Footer";
const Layout = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}> 
        <CookiesProvider>
          <Localization>
            <AppContextProvider>
              {children}
              <Footer></Footer>
            </AppContextProvider>
          </Localization>
        </CookiesProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default Layout;
