import { Hero } from "@/components/sections/Hero";
import { QueEs } from "@/components/sections/QueEs";
import { Etiologia } from "@/components/sections/Etiologia";
import { Clinica } from "@/components/sections/Clinica";
import { Diferenciales } from "@/components/sections/Diferenciales";
import { Epidemiologia } from "@/components/sections/Epidemiologia";
import { Recursos } from "@/components/sections/Recursos";
import { Estudio } from "@/components/sections/Estudio";
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
      <Epidemiologia />
      <Recursos />
      <Estudio />
      <Formulario />
      <Footer />
    </main>
  );
}
