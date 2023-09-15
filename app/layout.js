import HeaderComp from "@/components/header/HeaderComp";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col justify-center min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <HeaderComp />
          <div className="w-full m-auto max-w-3xl p-6 space-y-4">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
