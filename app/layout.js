import "./globals.css";
// import font awesome
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import NextTopLoader from 'nextjs-toploader';
export const metadata = {
  icons: {
    icon: "./icon.png",
  },
  title: "Note Share Hub",
  description: "Note Share Hub",
  keywords: ["Note Share Hub", "Cloud Notes"],
  authors: [
    { name: "suraj singh" },
    { name: "suraj singh", url: "https://www.linkedin.com/in/surajsinghgore" },
  ],
  creator: "suraj singh",
  publisher: "suraj singh",
  viewport: "width=device-width, initial-scale=1",
};
import { Providers } from "../redux/provider";
import AuthProvider from "./components/authProvider/AuthProvider";
import Header from "@/layout/Header";
import LeftSideMenu from "@/layout/LeftSideMenu";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Providers>
          <NextTopLoader   color="#242c3f"
  initialPosition={0.08}
  crawlSpeed={60}
  height={6}
  crawl={true}
  showSpinner={true}
  easing="ease"
  speed={200}
  shadow="0 0 10px #242c3f,0 0 5px #242c3f"
  template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  zIndex={1600}
  showAtBottom={false}/>
            <LeftSideMenu />
            <Header />
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
