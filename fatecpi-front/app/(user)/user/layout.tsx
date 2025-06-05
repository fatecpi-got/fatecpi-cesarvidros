import Header from "@/app/components/general/header/Header";
import Footer from "@/app/components/general/footer/Footer";

import "./globals.css";

const paths = [
    {name: "Home", path: "/"},
    {name: "Orçamento", path: "/user"},
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Header paths={paths} />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}