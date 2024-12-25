"use client";
import { AppContextProvider } from "./context/appContext";
import Localization from '../Localization';
import { CookiesProvider } from "react-cookie";

const Layout = ({ children }) => {
  return (
    <html>
      <body>
        <CookiesProvider>
          <Localization>
            <AppContextProvider>
              {children}
            </AppContextProvider>
          </Localization>
        </CookiesProvider>
      </body>
    </html>
  );
};

export default Layout;
