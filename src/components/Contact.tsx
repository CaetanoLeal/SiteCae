import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Instagram, Youtube, Linkedin, Github, Send, MessageCircle } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

const whatsappUrl = `https://wa.me/559198065187?text=${encodeURIComponent("Vim pelo site")}`;

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/caetanolealdev/", color: "hover:text-pink-500" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@caetanolealdev", color: "hover:text-red-500" },
  { icon: FaTiktok, label: "TikTok", href: "#", color: "hover:text-white" }, // ainda não criado
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/caetanoleal/", color: "hover:text-blue-400" },
  { icon: Github, label: "GitHub", href: "https://github.com/CaetanoLeal", color: "hover:text-white" },
  { icon: MessageCircle, label: "WhatsApp", href: whatsappUrl, color: "hover:text-green-500" },
];

const Contact = () => {
  return (
    <section id="contato" className="py-20 relative">
      <div className="absolute inset-0 grid-background opacity-10"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Entre em <span className="text-primary glow-cyan">Contato</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto glow-cyan-sm"></div>
          <p className="mt-4 text-muted-foreground">
            Vamos conversar sobre seu próximo projeto
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <form
            action="https://formsubmit.co/824fc4b8ef3b0613a2576258d80efc5a"
            method="POST"
            className="space-y-6"
          >
            {/* configs ocultas */}
            <input type="hidden" name="_subject" value="Novo contato pelo site!" />
            <input type="hidden" name="_captcha" value="false" />

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nome</label>
              <Input 
                name="name"
                placeholder="Seu nome completo" 
                required
                className="bg-card/50 border-primary/30 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">E-mail</label>
              <Input 
                type="email"
                name="email"
                placeholder="seu@email.com" 
                required
                className="bg-card/50 border-primary/30 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Mensagem</label>
              <Textarea 
                name="message"
                placeholder="Descreva seu projeto ou dúvida..."
                rows={5}
                required
                className="bg-card/50 border-primary/30 focus:border-primary resize-none"
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 box-glow-cyan hover:box-glow-cyan-strong"
              size="lg"
            >
              <Send className="w-5 h-5 mr-2" />
              Enviar Mensagem
            </Button>
          </form>

          {/* Social Links */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Conecte-se nas <span className="text-primary glow-cyan-sm">Redes Sociais</span>
              </h3>
              <p className="text-muted-foreground mb-6">
                Acompanhe conteúdo exclusivo sobre tecnologia, programação e inovação.
              </p>

              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`group flex flex-col items-center gap-2 p-4 border border-primary/30 rounded-lg hover-glow bg-card/30 backdrop-blur-sm transition-all ${social.color}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                      <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                        {social.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="p-6 border border-primary/30 rounded-lg bg-card/30 backdrop-blur-sm">
              <p className="text-center text-muted-foreground">
                Prefere WhatsApp?{" "}
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline glow-cyan-sm font-semibold"
                >
                  Clique aqui
                </a>{" "}
                para conversar diretamente comigo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
