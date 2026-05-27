import { Hero } from "@/components/sections/Hero";
import { QueEs } from "@/components/sections/QueEs";
import { Etiologia } from "@/components/sections/Etiologia";
import { Clinica } from "@/components/sections/Clinica";
import { Diferenciales } from "@/components/sections/Diferenciales";
import { BannerNotificacion } from "@/components/sections/BannerNotificacion";
import { Epidemiologia } from "@/components/sections/Epidemiologia";
import { Recursos } from "@/components/sections/Recursos";
import { NoticiasNacionales } from "@/components/sections/NoticiasNacionales";
import { LiteraturaClinica } from "@/components/sections/LiteraturaClinica";
import { LiteraturaVacunas } from "@/components/sections/LiteraturaVacunas";
import { Estudio } from "@/components/sections/Estudio";
import { ContactoBar } from "@/components/sections/ContactoBar";
import { Formulario } from "@/components/sections/Formulario";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <QueEs />
      <Etiologia />
      <Clinica />
      <Diferenciales />
      <BannerNotificacion />
      <Epidemiologia />
      <Recursos />
      <NoticiasNacionales />
      <LiteraturaClinica />
      <LiteraturaVacunas />
      <Estudio />
      <ContactoBar />
      <Formulario />
      <Footer />
    </main>
  );
}
