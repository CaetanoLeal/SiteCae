import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

// IMPORT DAS IMAGENS
import project1 from "@/assets/project1.png";
import project2 from "@/assets/project2.png";
import project3 from "@/assets/project3.png";
import project4 from "@/assets/project4.png";
import project5 from "@/assets/project5.png";
import project6 from "@/assets/project6.png";

// 🔥 TIPAGEM MELHORADA (repo opcional)
type Project = {
  title: string;
  description: string;
  image: string;
  url: string;
  repo?: string; // agora é opcional
  tags: string[];
};

const projects: Project[] = [
  {
    title: "Site EAS",
    description: "Site feito para empresa de software consolidada do Rio de Janeiro.",
    image: project1,
    url: "https://site-eas.vercel.app/",
    repo: "https://github.com/CaetanoLeal/SiteEas",
    tags: ["Vue", "Nuxt", "JavaScript"],
  },
  {
    title: "Chatbot Project",
    description: "Sistema que permite criar bots para operarem no Telegram e no WhatsApp.",
    image: project6,
    url: "#",
    repo: "https://github.com/CaetanoLeal/chatbot-project",
    tags: ["JavaScript", "TypeScript", "PostgreSQL", "Docker", "API", "Webhook"],
  },
  {
    title: "Site RK",
    description: "Projeto feito para empresa de marketing da qual fiz parte.",
    image: project3,
    url: "https://palegreen-ferret-362992.hostingersite.com/",
    repo: "https://github.com/CaetanoLeal/SiteRK",
    tags: ["JavaScript", "Vite", "Tailwind"],
  },
  {
    title: "Santinho Elton Maia",
    description: "Santinho eleitoral feito para o candidato a vereador Elton Maia, em 2024.",
    image: project2,
    url: "https://eltonmaia.site",
    // ❌ sem repo (WordPress)
    tags: ["Wordpress", "Low code", "Design"],
  },
  {
    title: "Chatbot Espaço Terapia",
    description: "Bot de atendimento automático feito para clínica de psicologia.",
    image: project4,
    url: "#",
    repo: "https://github.com/CaetanoLeal/ChatbotEspacoTerapia",
    tags: ["JavaScript", "Linux", "Node.js"],
  },
  {
    title: "Memórias de Casamento",
    description: "Site feito para registrar memórias do casamento de amigos.",
    image: project5,
    url: "https://casamento-eight-flax.vercel.app/",
    repo: "https://github.com/CaetanoLeal/casamento",
    tags: ["TypeScript", "Supabase", "CSS"],
  },
];

const Projects = () => {
  const handleProjectClick = (project: Project) => {
    if (project.url !== "#") {
      window.open(project.url, "_blank");
    } else if (project.repo) {
      window.open(project.repo, "_blank");
    }
  };

  return (
    <section id="projetos" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary glow-cyan">Portfólio</span> de projetos
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto glow-cyan-sm"></div>
          <p className="mt-4 text-muted-foreground">
            Alguns projetos que sou autorizado a mostrar como portfólio
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary hover-glow transition-all h-full">
                  
                  <div
                    className="relative overflow-hidden cursor-pointer"
                    onClick={() => handleProjectClick(project)}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 text-xs bg-primary/10 border border-primary/30 rounded-full text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        size="sm"
                        className="flex-1 bg-primary hover:bg-primary/90 box-glow-cyan"
                        onClick={() => handleProjectClick(project)}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Ver Projeto
                      </Button>

                      {/* 🔥 só mostra GitHub se existir repo */}
                      {project.repo && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-primary/50 hover:bg-primary/10"
                          onClick={() => window.open(project.repo, "_blank")}
                        >
                          <Github className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="border-primary/50 hover:bg-primary/10 hover:border-primary box-glow-cyan-sm" />
          <CarouselNext className="border-primary/50 hover:bg-primary/10 hover:border-primary box-glow-cyan-sm" />
        </Carousel>
      </div>
    </section>
  );
};

export default Projects;
