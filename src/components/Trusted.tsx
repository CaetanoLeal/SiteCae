// IMPORTS DAS LOGOS
import logo1 from "@/assets/logo1.png";
import logo2 from "@/assets/logo2.png";
import logo3 from "@/assets/logo3.png";
import logo4 from "@/assets/logo4.png";
import logo5 from "@/assets/logo5.png";
import logo6 from "@/assets/logo6.png";

// IMPORTS DAS FOTOS
import customer1 from "@/assets/customer1.jpeg";
import customer2 from "@/assets/customer2.png";

const companies = [
  { name: "Escola técnica estadual Magalhães Barata", logo: logo1 },
  { name: "Colégio intelectual bílingue", logo: logo2 },
  { name: "Espaço terapias", logo: logo3 },
  { name: "Rk Marketing agency", logo: logo4 },
  { name: "EAS entire automatic solutions", logo: logo5 },
  { name: "Leal Sistemas", logo: logo6 },
];

const clients = [
  { name: "Elton Maia", role: "Secretário da educação de Ananindeua, Diretor de colégio", photo: customer1 },
  { name: "Fabrina Hanzen", role: "Psicologa, Empresaria", photo: customer2 },
  { name: "Aguardando permissão", role: "Você pode ser o próximo", placeholder: true },
  { name: "Aguardando permissão", role: "Você pode ser o próximo", placeholder: true },
];

const Trusted = () => {
  return (
    <section id="trusted" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-widest uppercase mb-4 block neon-text">
            &lt; Confiança /&gt;
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Quem <span className="text-primary neon-text">Confia</span> no Meu Trabalho
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Empresas e pessoas que já transformaram suas ideias em realidade com minha ajuda.
          </p>
        </div>

        {/* Logos */}
        <div className="mb-20">
          <h3 className="text-center text-sm font-mono text-primary/70 uppercase tracking-widest mb-10">
            Empresas parceiras
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {companies.map((company, index) => (
              <div
                key={index}
                className="group flex flex-col items-center justify-center p-6 rounded-xl border border-primary/10 bg-card/30 backdrop-blur-sm hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
              >
                <img
                  src={company.logo}
                  alt={`Logo ${company.name}`}
                  className="h-10 w-auto mb-3 transition-transform duration-300 group-hover:scale-110"
                />

                {/* Nome da empresa */}
                <p className="text-xs text-muted-foreground text-center group-hover:text-primary transition-colors duration-300">
                  {company.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Clientes */}
        <div>
          <h3 className="text-center text-sm font-mono text-primary/70 uppercase tracking-widest mb-10">
            Clientes satisfeitos
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clients.map((client, index) => (
              <div
                key={index}
                className="group relative rounded-xl overflow-hidden border border-primary/10 hover:border-primary/40 transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/10 to-background">
                  {client.placeholder ? (
                    <div className="text-center px-4">
                      <p className="text-sm font-semibold text-primary mb-1">
                        {client.role}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {client.name}
                      </p>
                    </div>
                  ) : (
                    <img
                      src={client.photo}
                      alt={`Foto com ${client.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <p className="font-semibold text-foreground">{client.name}</p>
                    <p className="text-sm text-primary/80">{client.role}</p>
                  </div>
                </div>

                <div className="p-4 bg-card/50 backdrop-blur-sm border-t border-primary/10">
                  <p className="font-semibold text-sm">{client.name}</p>
                  <p className="text-xs text-muted-foreground">{client.role}</p>
                </div>

                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trusted;
