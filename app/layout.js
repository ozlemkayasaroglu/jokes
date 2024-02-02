import { Inter } from "next/font/google";
import {Providers} from "./provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Elf's App",
  description: "Created by Mommy4_0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        {children}
        </Providers>
        </body>
    </html>
  );
}
