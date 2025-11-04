import { Link } from "react-router-dom";
import "./HomePage.css";

const features = [
  {
    title: "Catálogo de Propiedades",
    description:
      "Explora propiedades destacadas, filtra por tipo y encuentra la inversión ideal para tus clientes.",
    action: "Ver catálogo",
    to: "#catalogo",
  },
  {
    title: "Gestión de Citas",
    description:
      "Programa visitas, confirma disponibilidad y mantén el control de tu agenda con recordatorios inteligentes.",
    action: "Organizar citas",
    to: "#citas",
  },
  {
    title: "Envío de Consultas",
    description:
      "Envía y recibe consultas en tiempo real, dando seguimiento a cada oportunidad desde un solo panel.",
    action: "Crear consulta",
    to: "#consultas",
  },
] as const;

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="bg-grid" aria-hidden />

      <header className="home-hero">
        <span className="pill">Bienvenido</span>
        <h1>
          Tu panel inmobiliario
          <span>Gestiona todo en un mismo lugar.</span>
        </h1>
        <p>
          Accede rápidamente a las herramientas clave para administrar tu cartera, coordinar a tu equipo y
          responder a tus clientes a tiempo.
        </p>
        <div className="hero-actions">
          <Link className="btn-primary" to="/login">
            Ir al login
            <span className="arrow">➜</span>
          </Link>
          <a className="btn-ghost" href="#catalogo">
            Ver novedades
          </a>
        </div>
      </header>

      <main className="home-content">
        <section className="feature-grid" aria-label="Herramientas principales">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <div className="feature-icon" aria-hidden>
                •
              </div>
              <div className="feature-body">
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
              <Link to={feature.to} className="feature-link">
                {feature.action}
                <span className="arrow">➜</span>
              </Link>
            </article>
          ))}
        </section>
      </main>

      <footer className="home-footer">
        <p>Protección activa — datos cifrados y accesos auditados.</p>
      </footer>
    </div>
  );
}
