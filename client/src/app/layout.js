"use client";
import "./globals.css";
import { AppContextProvider } from "./context/appContext";
import QueryClientProviderComponent from '../components/QueryProvider'
import Localization from '../Localization';
import { CookiesProvider } from "react-cookie";
import Footer from "../components/Footer";
const Layout = ({ children }) => {
  return (
    <html>
      <body>
      <QueryClientProviderComponent>
        <CookiesProvider>
          <Localization>
            <AppContextProvider>
              {children}
              <Footer></Footer>
            </AppContextProvider>
          </Localization>
        </CookiesProvider>
      </QueryClientProviderComponent>
      </body>
    </html>
  );
};

export default Layout;
