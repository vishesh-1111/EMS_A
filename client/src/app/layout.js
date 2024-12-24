"use client";
// import { Provider } from "@/components/ui/provider"
import { AppContextProvider } from "./context/appContext";
import Localization from '../Localization'
const Layout = ({ children }) => {
  return (
      <html >
        <body>
          <Localization>
          <AppContextProvider>
          {children}
          </AppContextProvider>
          </Localization>
        </body>
      </html>
  )
};

export default Layout;
