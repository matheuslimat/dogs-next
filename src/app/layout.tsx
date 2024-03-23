import Header from "@/components/header";
import Footer from "@/components/footer";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dogs Next",
  description: "Rede social para cachorros.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="App">
        <Header />
        <main className="AppBody">{children}</main>
        <Footer />
      </div>
  );
}
