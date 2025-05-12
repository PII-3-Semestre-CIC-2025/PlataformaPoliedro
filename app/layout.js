import { Poppins } from "next/font/google";
import "../styles/globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "PoliPoints",
  description: "Criado por alunos do Instituro Mauá de Tecnologia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
