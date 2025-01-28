"use client";
import "./globals.css";
import { AppContextProvider } from "./context/appContext";
import QueryClientProviderComponent from "../components/QueryProvider";
import Localization from "../Localization";
import NextTopLoader from 'nextjs-toploader';
import NavBar from '../components/NavBar';

import { CookiesProvider } from "react-cookie";
import Footer from "../components/Footer";
import ProxyProvider from "@/components/proxyProvider";
import { usePathname } from "next/navigation";
import { Suspense } from "react";


const Layout = ({ children }) => {
    const pathname = usePathname();

  const showNavbar = pathname !== "/login/user";

  return (
    <html lang="en">
      <body className="h-screen">
        <Suspense fallback={<div>
          Loading....suspense!
        </div>}>

        <ProxyProvider>
          <QueryClientProviderComponent>
            <Localization>
              <AppContextProvider>
                <NextTopLoader />
                <div className="flex h-full gap-3">
                  {showNavbar&&
                  <div className="w-64 bg-gray-800 text-white">
                   <NavBar />
                  </div>
                  }

                  <div className="flex-1 bg-gray-100 p-4 overflow-auto">
                    {children}
                  </div>
                </div>
              </AppContextProvider>
            </Localization>
          </QueryClientProviderComponent>
        </ProxyProvider>
            </Suspense>
      </body>
    </html>
  );
};

export default Layout;
