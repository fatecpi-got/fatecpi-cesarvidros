import Header from "@/app/components/general/header/Header";

const paths = [
  { name: "Dashboard", path: "/admin/" },
  { name: "Pedidos", path: "/admin/orders" },
  { name: "Orçamentos", path: "/admin/budgets" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Header paths={paths} />
        <main>{children}</main>
      </body>
    </html>
  );
}
