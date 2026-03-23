import { Code2, Bot, Cog, Smartphone, Database, Zap } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Desenvolvimento Web",
    description: "Sites e sistemas modernos, responsivos e performáticos.",
  },
  {
    icon: Bot,
    title: "Chatbots com IA",
    description: "Assistentes virtuais inteligentes para automatizar atendimento.",
  },
  {
    icon: Cog,
    title: "Automação de Processos",
    description: "Otimize seu tempo com soluções de automação personalizadas.",
  },
  {
    icon: Smartphone,
    title: "Aplicativos Mobile",
    description: "Apps nativos e híbridos para iOS e Android.",
  },
  {
    icon: Database,
    title: "Sistemas Personalizados",
    description: "Soluções sob medida para as necessidades do seu negócio.",
  },
  {
    icon: Zap,
    title: "Consultoria Tech",
    description: "Orientação estratégica em tecnologia e inovação.",
  },
];

const Services = () => {
  const handleServiceClick = (serviceTitle: string) => {
    const phoneNumber = "559198065187";
    const message = `Vim pelo site e estou interessado no serviço de ${serviceTitle}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="servicos" className="py-20 relative">
      <div className="absolute inset-0 grid-background opacity-10"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary glow-cyan">Serviços</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto glow-cyan-sm"></div>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Soluções completas em tecnologia para transformar seu negócio
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <button
                key={index}
                onClick={() => handleServiceClick(service.title)}
                className="group p-6 border border-primary/30 rounded-lg hover-glow bg-card/30 backdrop-blur-sm transition-all duration-300 text-left cursor-pointer"
              >
                <div className="mb-4 inline-block p-3 bg-primary/10 rounded-lg border border-primary/30 group-hover:box-glow-cyan transition-all">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground">
                  {service.description}
                </p>

                <div className="mt-4 h-1 w-0 group-hover:w-full bg-primary transition-all duration-300 glow-cyan-sm"></div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
