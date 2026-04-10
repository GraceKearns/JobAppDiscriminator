import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { RouteProvider } from "@/context/RouteContext";
import { ViewportProvider } from "@/context/ViewportContext";
import { AuthProvider } from "@/context/AuthProvider";

const hinaMincho = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-hinaMincho",
  weight: ["400", "500", "600", "700"],
})

const jacquesFrancois = DM_Sans({
  subsets: ["latin"],
  variable: "--font-jacquesFrancois",
  weight: ["400", "500", "700"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${hinaMincho.variable} ${jacquesFrancois.variable}`}>
      <body>
        <AuthProvider>
          <RouteProvider>
            <ViewportProvider>
              {children}
            </ViewportProvider>
          </RouteProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
