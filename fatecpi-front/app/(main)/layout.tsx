export const metadata = {
  title: "César Vidros",
  description: "Glass solutions",
  icons: {
    icon: "/logo_cesar.png",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}