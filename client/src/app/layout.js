"use client";
import "./globals.css";
import { AppContextProvider } from "./context/appContext";
import Localization from '../Localization';
import { CookiesProvider } from "react-cookie";
import Footer from "../components/Footer";
const Layout = ({ children }) => {
  return (
    <html>
      <body>
        <CookiesProvider>
          <Localization>
            <AppContextProvider>
              {children}
              <Footer></Footer>
            </AppContextProvider>
          </Localization>
        </CookiesProvider>
      </body>
    </html>
  );
};

export default Layout;
