"use client";

import { useState } from "react";
import { Terminal, Heart, Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";

import about1 from "@/assets/about1.jpg";
import about2 from "@/assets/about2.jpeg";
import about3 from "@/assets/about3.jpg";
import about4 from "@/assets/about4.jpg";

const About = () => {
  const images = [
    {
      src: about1,
      description: "Lecionando sobre tecnologia e programação para jovens"
    },
    {
      src: about2,
      description: "Conquista do primeiro cliente"
    },
    {
      src: about3,
      description: "No primeiro emprego na área de tecnologia"
    },
    {
      src: about4,
      description: "Apresentando o primeiro sistema que desenvolvi no mercado"
    }
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="sobre" className="py-20 relative">
      <div className="container mx-auto px-6">
        
        {/* Título */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Sobre <span className="text-primary glow-cyan">Mim</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto glow-cyan-sm"></div>
        </div>

        {/* Conteúdo */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Texto */}
          <div className="space-y-6">
            <p className="text-lg text-foreground/90 leading-relaxed">
              Sou um programador apaixonado por tecnologia e inovação. 
              Minha missão é usar o código como ferramenta para criar soluções que impactem positivamente nossa sociedade.
            </p>
            
            <p className="text-lg text-foreground/90 leading-relaxed">
              Com anos de experiência na área da tecnologia e criação de soluções e sistemas, busco 
              clientes e projetos que me leve mais próximo da minha missão.
            </p>

            <p className="text-lg text-foreground/90 leading-relaxed">
              Veja alguns marcos na minha carreira:
            </p>

            {/* Cards */}
            <div className="grid sm:grid-cols-3 gap-4 pt-6">
              <div className="p-4 border border-primary/30 rounded-lg hover-glow bg-card/50 backdrop-blur-sm">
                <Terminal className="w-8 h-8 text-primary mb-2 mx-auto" />
                <p className="text-center text-sm text-muted-foreground">Programação</p>
              </div>
              <div className="p-4 border border-primary/30 rounded-lg hover-glow bg-card/50 backdrop-blur-sm">
                <Lightbulb className="w-8 h-8 text-primary mb-2 mx-auto" />
                <p className="text-center text-sm text-muted-foreground">Inovação</p>
              </div>
              <div className="p-4 border border-primary/30 rounded-lg hover-glow bg-card/50 backdrop-blur-sm">
                <Heart className="w-8 h-8 text-primary mb-2 mx-auto" />
                <p className="text-center text-sm text-muted-foreground">Educação</p>
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-lg blur-2xl"></div>

            <div className="relative overflow-hidden rounded-lg border-2 border-primary/50 box-glow-cyan">
              
              {/* Imagem */}
              <div className="w-full h-[300px] md:h-[400px]">
                <img
                  src={images[current].src}
                  alt="Sobre mim"
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>

              {/* Descrição */}
              <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white p-4 text-sm">
                {images[current].description}
              </div>

              {/* Botão esquerda */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full"
              >
                <ChevronLeft className="text-white w-5 h-5" />
              </button>

              {/* Botão direita */}
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full"
              >
                <ChevronRight className="text-white w-5 h-5" />
              </button>
            </div>

            {/* Indicadores */}
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                    current === index ? "bg-primary" : "bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Frase final */}
        <div className="mt-16 p-8 border-l-4 border-primary bg-card/30 backdrop-blur-sm rounded-lg">
          <p className="text-2xl italic text-primary/90 glow-cyan-sm text-center">
            "A tecnologia é a ponte entre imaginação e realidade. Com código, transformamos sonhos em soluções."
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
