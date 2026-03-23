import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Sparkles } from "lucide-react";
import perfilImg from "@/assets/perfil.png";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-background opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background"></div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* TEXTO */}
          <div className="flex-1 text-center lg:text-left space-y-8">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary glow-cyan-sm">
                Programador / Tecnologista
              </span>
            </div>

            {/* Nome */}
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="text-foreground">Caetano</span>{" "}
              <span className="text-primary glow-cyan">Leal</span>
            </h1>

            {/* IMAGEM NO MOBILE (COM MESMOS EFEITOS) */}
            <div className="flex justify-center lg:hidden">
              <div className="relative w-72 h-[440px] mb-2">

                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>

                <div className="absolute inset-0 rounded-full border-4 border-primary box-glow-cyan-strong z-10"></div>

                <img
                  src={perfilImg}
                  alt="Caetano Leal"
                  className="absolute inset-0 w-full h-full object-cover rounded-full z-0"
                />

                <img
                  src={perfilImg}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover z-20"
                  style={{
                    clipPath: 'ellipse(48% 30% at 50% 25%)',
                  }}
                />

                <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping"></div>
              </div>
            </div>

            {/* Frase */}
            <p className="text-2xl md:text-3xl text-primary/90 glow-cyan-sm font-light italic">
              "Using code to make the world better."
            </p>

            {/* Descrição */}
            <p className="text-lg text-muted-foreground max-w-xl">
              Transformando ideias em soluções tecnológicas inovadoras. 
              Especializado em desenvolvimento web, automação e criação de conteúdo educativo.
            </p>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="group bg-primary hover:bg-primary/90 text-primary-foreground box-glow-cyan hover:box-glow-cyan-strong transition-all"
                onClick={() => scrollToSection('projetos')}
              >
                Ver Projetos
                <Code2 className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>

              <Button 
                size="lg" 
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 hover:border-primary hover-glow"
                onClick={() => scrollToSection('contato')}
              >
                Entrar em Contato
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* 🔥 IMAGEM ORIGINAL (DESKTOP - INTACTA) */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="relative w-80 h-[480px] lg:w-96 lg:h-[580px]">

              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>

              <div className="absolute inset-0 rounded-full border-4 border-primary box-glow-cyan-strong z-10"></div>

              <img
                src={perfilImg}
                alt="Caetano Leal"
                className="absolute inset-0 w-full h-full object-cover rounded-full z-0"
              />

              <img
                src={perfilImg}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover z-20"
                style={{
                  clipPath: 'ellipse(48% 30% at 50% 25%)',
                }}
              />

              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping"></div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="mt-10 flex justify-center lg:absolute lg:bottom-8 lg:left-1/2 lg:-translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
