import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Trusted from "@/components/Trusted";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <About />
      <Projects />
      <Trusted />
      <Services />
      <Products />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
