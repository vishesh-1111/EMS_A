
import { CookiesProvider } from 'next-client-cookies/server';


const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <CookiesProvider>
          {children}
        </CookiesProvider>
      </body>
    </html>
  );
};

export default Layout;
