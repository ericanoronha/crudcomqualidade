import React from "react";
import StyledJsxRegistry from "./registry";

export const metadata = {
  title: "Minha lista de tarefas",
  description:
    "Aplicativo Next.js desenvolvido por Erica Noronha, como projeto do curso CRUDcomqualidade.io",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
      </body>
    </html>
  );
}
