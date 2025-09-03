import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "School Management",
  description: "A simple school management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>School Management</title>
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
