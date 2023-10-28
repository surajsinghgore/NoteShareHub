import "./globals.css";
// import font awesome
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

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
            <Header />
            <LeftSideMenu />
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
