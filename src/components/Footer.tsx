const Footer = () => {
  return (
    <footer className="relative py-8 border-t border-primary/30">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4">
          <p className="text-primary glow-cyan-sm font-bold text-lg">
            Caetano Leal
          </p>
          <p className="text-muted-foreground text-sm">
            Using code to make the world better.
          </p>
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Caetano Leal. Todos os direitos reservados.
          </p>
        </div>
      </div>
      
      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent glow-cyan-sm"></div>
    </footer>
  );
};

export default Footer;
