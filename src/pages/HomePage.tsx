import React from "react";
import "./HomePage.css";

type HomeProps = {
  catalogoHref?: string;
  citasHref?: string;
  consultasHref?: string;
};

export default function Home({
  catalogoHref = "/catalogo-propiedades",
  citasHref = "/gestion-citas",
  consultasHref = "/envio-consultas",
}: HomeProps) {
  return (
    <div className="simple-home">
      <main className="simple-container" aria-label="Accesos principales">
        <a className="opt" href={catalogoHref}>
          <span className="opt-emoji" aria-hidden>🏠</span>
          <span className="opt-title">Catálogo de Propiedades</span>
        </a>

        <a className="opt" href={citasHref}>
          <span className="opt-emoji" aria-hidden>📅</span>
          <span className="opt-title">Gestión de Citas</span>
        </a>

        <a className="opt" href={consultasHref}>
          <span className="opt-emoji" aria-hidden>✉️</span>
          <span className="opt-title">Envío de Consultas</span>
        </a>
      </main>
    </div>
  );
}
