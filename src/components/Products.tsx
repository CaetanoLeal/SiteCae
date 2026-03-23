import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, FileText, Layers, Wrench } from "lucide-react";

const products = [
  {
    icon: FileText,
    title: "E-book: Como fazer dinheiro com programação e tecnologia",
    description: "Ensino como fazer dinheiro usando seus conhecimentos em tecnologia sem depender dos outros.",
    price: "R$ 23,99",
  },
  {
    icon: Layers,
    title: "Cursos: do básico ao avançado",
    description: "Vários cursos sobre tecnologia para todos os níveis.",
    price: "apartir de R$ 20,00",
  },
  {
    icon: Wrench,
    title: "Mentorias",
    description: "Aulas particulares e ajuda para alcançar o primeiro cliente.",
    price: "R$ 299,99",
  },
];

const Products = () => {
  return (
    <section id="produtos" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary glow-cyan">Produtos</span> Digitais
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto glow-cyan-sm"></div>
          <p className="mt-4 text-muted-foreground">
            Recursos premium para acelerar seu aprendizado e produtividade
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <Card
                key={index}
                className="group p-6 bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary hover-glow transition-all"
              >
                <div className="text-center space-y-4">
                  <div className="inline-block p-4 bg-primary/10 rounded-full border border-primary/30 group-hover:box-glow-cyan transition-all">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>

                  <p className="text-muted-foreground text-sm">
                    {product.description}
                  </p>

                  <div className="pt-4">
                    <span className="text-3xl font-bold text-primary glow-cyan-sm">
                      {product.price}
                    </span>
                  </div>

                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 box-glow-cyan group-hover:box-glow-cyan-strong"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Adquirir Agora
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
