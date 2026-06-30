import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Eye, 
  Star, 
  FileSpreadsheet, 
  BarChart, 
  Globe, 
  ThumbsUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BarChart as ReChartsBar, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/lib/supabase"; 

import dashboard1 from "@/assets/dashboard1.png";
import dashboard2 from "@/assets/dashboard2.png";
import dashboard3 from "@/assets/dashboard3.png";

const dashboardIntelectualUrl = "/dashboards/verNaWeb/dashboard-intelectual.html";
const dashboardChatbotUrl = "/dashboards/verNaWeb/dashboard-chatbot.html";
const dashboardFaturamentoUrl = "/dashboards/verNaWeb/dashboard-faturamento-continentes.html";

const dashboardUrls: Record<string, string> = {
  atendimentos_bot: dashboardChatbotUrl,
  intelectual: dashboardIntelectualUrl,
  faturamento_continente: dashboardFaturamentoUrl,
};

// URLs dos arquivos para download
const excelFiles = {
  intelectual: "/dashboards/excell/relatorio-intelectual.xlsx",
};

const powerBiFiles = {
  faturamento_continente: "/dashboards/powerbi/relatorio-vendas.pbix",
};

// Mapa de quais dashboards têm arquivos disponíveis
const dashboardFiles = {
  atendimentos_bot: { excel: false, powerbi: false },
  intelectual: { excel: true, powerbi: false },
  faturamento_continente: { excel: false, powerbi: true },
};

const Dashboards = () => {
  const navigate = useNavigate();

  // --- ESTADOS DO SUPABASE ---
  const [pageViews, setPageViews] = useState<number>(0);
  const [loadingMetrics, setLoadingMetrics] = useState<boolean>(true);
  
  // Alterado: Não verifica mais o localStorage, sempre começa livre para votar ao atualizar
  const [hasVotedOrigin, setHasVotedOrigin] = useState<boolean>(false);
  const [selectedOrigin, setSelectedOrigin] = useState<string>("");

  const [originChartData, setOriginChartData] = useState([
    { name: "Site", acessos: 0 },
    { name: "WhatsApp", acessos: 0 },
    { name: "Indicação", acessos: 0 },
    { name: "Telegram", acessos: 0 },
    { name: "Instagram", acessos: 0 },
    { name: "LinkedIn", acessos: 0 },
    { name: "YouTube", acessos: 0 },
  ]);

  const [dashboardsList, setDashboardsList] = useState([
    { id: "atendimentos_bot", title: "Dashboard de Atendimentos (Telegram/WhatsApp)", description: "Criado para análise e coleta de dados dos clientes que usam meu sistema de atendimento, sendo possível ver empresas que mais tem conversão.", image: dashboard3, votosTotais: 0, notaMedia: 0, userRating: 0 },
    { id: "intelectual", title: "Dashboard Intelectual", description: "criado para análisar o marketing escolar, é possivel analisar qual consultor fez mais receitas e matricula e quais campanhas de marketing foram melhor.", image: dashboard2, votosTotais: 0, notaMedia: 0, userRating: 0 },
    { id: "faturamento_continente", title: "Faturamento de Empresas por Continente", description: "Criado apartir de uma base de dados com faturamentos de varias empresas, este foi o power bi mais bonito que fiz enquanto fazia curso de dados e que me fez tirar a melhor nota da turma.", image: dashboard1, votosTotais: 0, notaMedia: 0, userRating: 0 }
  ]);

  // Carrega todas as informações reais vindas do PostgreSQL no Supabase
  const fetchAllDataFromSupabase = async () => {
    try {
      // 1. Total de Views
      const { count: totalViews, error: errViews } = await supabase
        .from("page_views")
        .select("*", { count: "exact", head: true });

      if (!errViews && totalViews !== null) setPageViews(totalViews);

      // 2. Contagem agregada de Origens
      const { data: dataOrigens, error: errOrigens } = await supabase
        .from("origin_votes")
        .select("channel");

      if (!errOrigens && dataOrigens) {
        const counts: Record<string, number> = { Site: 0, WhatsApp: 0, Indicação: 0, Telegram: 0, Instagram: 0, LinkedIn: 0, YouTube: 0 };
        dataOrigens.forEach(vote => {
          if (counts[vote.channel] !== undefined) counts[vote.channel]++;
        });
        setOriginChartData(Object.keys(counts).map(key => ({ name: key, acessos: counts[key] })));
      }

      // 3. Avaliações agregadas dos dashboards
      const { data: dataRatings, error: errRatings } = await supabase
        .from("dashboard_ratings")
        .select("dashboard_id, rating");

      if (!errRatings && dataRatings) {
        setDashboardsList(prevList =>
          prevList.map(dash => {
            const dashVotes = dataRatings.filter(r => r.dashboard_id === dash.id);
            const totalVotos = dashVotes.length;
            const somaNotas = dashVotes.reduce((acc, curr) => acc + curr.rating, 0);
            const media = totalVotos > 0 ? parseFloat((somaNotas / totalVotos).toFixed(1)) : 0;

            return {
              ...dash,
              votosTotais: totalVotos,
              notaMedia: media,
              // Mantém o estado visual da última estrela clicada nesta sessão
              userRating: dash.userRating 
            };
          })
        );
      }
    } catch (e) {
      console.error("Erro ao sincronizar com o Supabase:", e);
    } finally {
      setLoadingMetrics(false);
    }
  };

  useEffect(() => {
    const initializePage = async () => {
      // Registra uma nova visualização real ao montar a tela
      await supabase.from("page_views").insert({});
      await fetchAllDataFromSupabase();
    };

    initializePage();
  }, []);

  // Envia voto de Origem diretamente para o banco
  const handleOriginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrigin) return;

    const { error } = await supabase
      .from("origin_votes")
      .insert({ channel: selectedOrigin });

    if (!error) {
      setHasVotedOrigin(true);
      fetchAllDataFromSupabase();
    }
  };

  const handleRateDashboard = async (id: string, rate: number) => {
    // Permite que o usuário mude o voto visual e envie um novo registro ao banco
    setDashboardsList(prev => prev.map(d => d.id === id ? { ...d, userRating: rate } : d));

    const { error } = await supabase
      .from("dashboard_ratings")
      .insert({ dashboard_id: id, rating: rate });

    if (!error) {
      fetchAllDataFromSupabase();
    }
  };

  const handleDownloadExcel = (dashId: string) => {
    const fileUrl = excelFiles[dashId as keyof typeof excelFiles];
    if (fileUrl) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `relatorio-${dashId}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownloadPowerBi = (dashId: string) => {
    const fileUrl = powerBiFiles[dashId as keyof typeof powerBiFiles];
    if (fileUrl) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `relatorio-${dashId}.pbix`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground pb-20">
        <div className="container mx-auto px-4 md:px-6 pt-10 max-w-6xl">
        
        <Button
          variant="outline"
          className="border-primary/50 hover:bg-primary/10 mb-8"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao site
        </Button>

        {/* --- SEÇÃO 1: METRICAS DO BANCO --- */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Métricas de Interação</h1>
              <p className="text-muted-foreground text-sm">Dados reais centralizados coletados em tempo real e automaticamente montando os gráficos ao lado. O portfólio de dashboard já começa aqui!</p>
            </div>
            
            <div className="flex items-center gap-3 bg-primary/10 border border-primary/20 px-4 py-2 rounded-xl">
              <Eye className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Acessos Globais</p>
                <p className="text-xl font-black text-primary">
                  {loadingMetrics ? "..." : pageViews}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 mb-6">
            
            {/* Formulário de Origem */}
            <Card className="border-primary/20 bg-card/70 p-6 backdrop-blur-sm flex flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold mb-2">Por onde você me conheceu?</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Seu voto altera o gráfico de repercussão imediatamente.
                </p>
                
                {!hasVotedOrigin ? (
                  <form onSubmit={handleOriginSubmit} className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {["Site", "WhatsApp", "Indicação", "Telegram", "Instagram", "LinkedIn", "YouTube"].map((origem) => (
                        <button
                          key={origem}
                          type="button"
                          onClick={() => setSelectedOrigin(origem)}
                          className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                            selectedOrigin === origem
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background/50 border-muted hover:border-primary/50"
                          }`}
                        >
                          {origem}
                        </button>
                      ))}
                    </div>
                    <Button type="submit" size="sm" className="w-full mt-2" disabled={!selectedOrigin}>
                      Computar meu voto
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-3">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-4 rounded-lg text-xs flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4 shrink-0" />
                      Seu voto foi salvo globalmente! Obrigado pelo feedback.
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs w-full" onClick={() => setHasVotedOrigin(false)}>
                      Votar novamente nesta sessão
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {/* Gráfico 1: Origens/Canais */}
            <Card className="border-primary/20 bg-card/70 p-4 backdrop-blur-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Redes com Maior Repercussão</h3>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ReChartsBar data={originChartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                    <RechartsTooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                    <Bar dataKey="acessos" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </ReChartsBar>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Gráfico 2: Ranking de Dashboards */}
            <Card className="border-primary/20 bg-card/70 p-4 backdrop-blur-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Melhores Dashboards (Ranking Global)</h3>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ReChartsBar 
                    data={dashboardsList.map(d => ({ name: d.title.split(" ")[2] || d.title.split(" ")[1], nota: d.notaMedia }))} 
                    layout="vertical"
                    margin={{ top: 5, right: 5, left: -10, bottom: 5 }}
                  >
                    <XAxis type="number" domain={[0, 5]} stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis dataKey="name" type="category" stroke="#888888" fontSize={9} tickLine={false} axisLine={false} />
                    <RechartsTooltip />
                    <Bar dataKey="nota" fill="#eab308" radius={[0, 4, 4, 0]} barSize={12} />
                  </ReChartsBar>
                </ResponsiveContainer>
              </div>
            </Card>

          </div>
        </section>

        <hr className="my-10 border-muted/50" />

        {/* --- SEÇÃO 2: DISCLAIMER LGPD --- */}
        <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex gap-3 items-start">
          <div>
            <h4 className="font-semibold text-amber-500 text-sm">Respeito à LGPD (Lei Geral de Proteção de Dados)</h4>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              <strong>Importante:</strong> Os painéis listados a seguir representam projetos e estruturas reais customizadas para cenários corporativos, contudo, todos os dados, nomes, faturamentos e registros numéricos expostos são 100% fictícios, gerados exclusivamente para fins de portfólio e demonstração técnica.
            </p>
          </div>
        </div>

        {/* --- SEÇÃO 3: PORTFÓLIO --- */}
        <section className="space-y-6">
          <div className="mb-4">
            <h2 className="text-2xl font-bold tracking-tight">Portfólio de Dashboards</h2>
            <p className="text-sm text-muted-foreground">Avalie clicando nas estrelas para ver as médias ponderadas subirem em tempo real.</p>
          </div>

          {dashboardsList.map((dash) => (
            <Card key={dash.id} className="border-primary/15 bg-card/40 backdrop-blur-sm p-4 md:p-6 overflow-hidden">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                
                <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden border border-muted shrink-0 bg-muted">
                  <img src={dash.image} alt={dash.title} className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-300" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-bold text-card-foreground">{dash.title}</h3>
                    
                    {/* Avaliação Individual Individual Livre */}
                    <div className="flex flex-col items-end gap-0.5 bg-background/50 px-3 py-1 rounded-lg border">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-amber-500">{dash.notaMedia}</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleRateDashboard(dash.id, star)}
                              className="transition-all hover:scale-110 active:scale-125 cursor-pointer"
                            >
                              <Star 
                                className={`h-4 w-4 ${
                                  dash.userRating >= star 
                                    ? "fill-amber-400 text-amber-400" 
                                    : "text-muted-foreground/30"
                                }`} 
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{dash.votosTotais} avaliações globais</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">{dash.description}</p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          asChild
                          size="sm"
                          variant="default"
                          className="bg-primary hover:bg-primary/90 text-xs flex items-center gap-2"
                        >
                          <a href={dashboardUrls[dash.id]} target="_blank" rel="noreferrer">
                            <Globe className="h-3.5 w-3.5" /> Ver na Web
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Sem downloads e seguro</TooltipContent>
                    </Tooltip>

                    {/* Botão Excel - comentado se não houver arquivo */}
                    {dashboardFiles[dash.id as keyof typeof dashboardFiles].excel ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 text-xs flex items-center gap-2 cursor-pointer"
                            onClick={() => handleDownloadExcel(dash.id)}
                          >
                            <FileSpreadsheet className="h-3.5 w-3.5" /> Baixar Arquivo Excel
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Suscetível a erros de acordo com a versão do software instalado na sua máquina</TooltipContent>
                      </Tooltip>
                    ) : (
                      /* <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled
                            className="border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 text-xs flex items-center gap-2 opacity-50 cursor-not-allowed"
                          >
                            <FileSpreadsheet className="h-3.5 w-3.5" /> Baixar Arquivo Excel
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Suscetível a erros de acordo com a versão do software instalado na sua máquina</TooltipContent>
                      </Tooltip> */
                      null
                    )}

                    {/* Botão Power BI - comentado se não houver arquivo */}
                    {dashboardFiles[dash.id as keyof typeof dashboardFiles].powerbi ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-amber-500/30 text-amber-600 hover:bg-amber-500/10 text-xs flex items-center gap-2 cursor-pointer"
                            onClick={() => handleDownloadPowerBi(dash.id)}
                          >
                            <BarChart className="h-3.5 w-3.5" /> Baixar Arquivo Power BI
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Suscetível a erros de acordo com a versão do software instalado na sua máquina</TooltipContent>
                      </Tooltip>
                    ) : (
                      /* <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled
                            className="border-amber-500/30 text-amber-600 hover:bg-amber-500/10 text-xs flex items-center gap-2 opacity-50 cursor-not-allowed"
                          >
                            <BarChart className="h-3.5 w-3.5" /> Baixar Arquivo Power BI
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Suscetível a erros de acordo com a versão do software instalado na sua máquina</TooltipContent>
                      </Tooltip> */
                      null
                    )}
                  </div>
                </div>

              </div>
            </Card>
          ))}
        </section>

        </div>
      </div>
    </TooltipProvider>
  );
};

export default Dashboards;