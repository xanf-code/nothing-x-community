import HeaderComp from "@/components/header/HeaderComp";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Nothing Resources",
  description: "All nothing product resources at one stop.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <HeaderComp />
          <div className="w-full m-auto max-w-3xl p-6 space-y-4">
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
