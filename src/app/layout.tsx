import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Boca-mano-pie en Colombia: qué está pasando | VIRAL Network LATAM",
  description:
    "Información clínica y científica para médicos en Colombia sobre el brote de enfermedad mano-pie-boca (EMPB). Estudio observacional prospectivo multicéntrico.",
  keywords: [
    "EMPB",
    "enfermedad mano-pie-boca",
    "Colombia",
    "enterovirus",
    "Coxsackie",
    "EV-A71",
    "pediatría",
    "infectología",
    "brote",
  ],
  authors: [{ name: "Dr. Iván Felipe Gutiérrez Tobar" }],
  openGraph: {
    title: "Boca-mano-pie en Colombia: qué está pasando",
    description:
      "Información clínica para médicos sobre el brote actual de enfermedad mano-pie-boca en Colombia.",
    locale: "es_CO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-CO"
      className={`${jakarta.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans antialiased bg-white text-slate-700">
        {children}
      </body>
    </html>
  );
}
