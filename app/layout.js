import { Poppins } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/globals.css";
import CursorResetter from "./components/CursorResetter";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "PoliPoints",
  description: "Criado por alunos do Instituto Mauá de Tecnologia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`${poppins.variable}`}>
        <CursorResetter />
        {children}
      </body>
    </html>
  );
}