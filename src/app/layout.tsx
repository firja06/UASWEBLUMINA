import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
          <Toaster
          position="top-right"
          toastOptions={{
          duration: 2500,
          style: {
          background: "#18181b",
          color: "#fff",
          border: "1px solid #3f3f46",
      },
      }}
    />
        </UserProvider>
      </body>
    </html>
  );
}