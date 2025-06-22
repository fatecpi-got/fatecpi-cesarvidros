import Header from "@/app/components/general/header/Header";
import Footer from "@/app/components/general/footer/Footer";

import "./globals.css";
import './layout.css'

const paths = [
  {name: "Solicitação", path: "/user"},
  {name: "Orçamento", path: "/user/orcamento"},
  {name: "Pedido", path: "/user/pedido"},
  {name: "Sair", path: "/"}
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