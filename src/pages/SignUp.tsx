import React, { useState } from "react";
import "./signup.css";
import { register } from "../services/auth.service"; // ajusta la ruta si cambia


type SignupProps = {
  onSubmitForm?: (payload: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) => Promise<void> | void; // opcional: conéctalo a tu register() del service
  onGoLogin?: () => void; // opcional: navega a /login
};

export default function Signup({ onSubmitForm, onGoLogin }: SignupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (!name || !email || !pw || !pw2) {
      setErr("Completa todos los campos.");
      return;
    }
    if (pw !== pw2) {
      setErr("Las contraseñas no coinciden.");
      return;
    }

    try {
  setLoading(true);
  if (onSubmitForm) {
    await onSubmitForm({
      name,
      email,
      password: pw,
      password_confirmation: pw2,
    });
  } else {
    // ⬇️ llamada real al backend
    await register({
      name,
      email,
      password: pw,
      password_confirmation: pw2,
    });
  }

  // ⬇️ redirección simple al login
  window.location.href = "/login";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (e) {
  setErr("No se pudo crear la cuenta. Intenta de nuevo.");
} finally {
  setLoading(false);
}

  }

  return (
    <div className="su">
      {/* fondo sutil */}
      <div className="su-blob su-blob-a" aria-hidden />
      <div className="su-blob su-blob-b" aria-hidden />
      <div className="su-grid" aria-hidden />

      <main className="su-card" role="main" aria-labelledby="signup-title">
        <header className="su-head">
          <div className="su-logo">L</div>
          <div>
            <h1 id="signup-title" className="su-title">Crear cuenta</h1>
            <p className="su-sub">Regístrate para empezar</p>
          </div>
        </header>

        {err && <div className="su-alert">{err}</div>}

        <form className="su-form" onSubmit={onSubmit}>
          <label className="su-label" htmlFor="name">Nombre</label>
          <input
            id="name"
            className="su-input"
            placeholder="Tu nombre"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="su-label" htmlFor="email">Correo</label>
          <input
            id="email"
            type="email"
            className="su-input"
            placeholder="tu@correo.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="su-label" htmlFor="pw">Contraseña</label>
          <div className="su-pw">
            <input
              id="pw"
              type={show ? "text" : "password"}
              className="su-input"
              placeholder="••••••••"
              autoComplete="new-password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
            <button
              type="button"
              className="su-toggle"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {show ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          <label className="su-label" htmlFor="pw2">Confirmar contraseña</label>
          <input
            id="pw2"
            type={show ? "text" : "password"}
            className="su-input"
            placeholder="••••••••"
            autoComplete="new-password"
            value={pw2}
            onChange={(e) => setPw2(e.target.value)}
          />

          <button className="su-btn" type="submit" disabled={loading}>
            {loading ? "Creando cuenta…" : "Crear cuenta"}
          </button>
        </form>

        <p className="su-foot">
          ¿Ya tienes cuenta?{" "}
          {onGoLogin ? (
            <button className="su-link" onClick={onGoLogin}>Inicia sesión</button>
          ) : (
            <a className="su-link" href="/login">Inicia sesión</a>
          )}
        </p>
      </main>
    </div>
  );
}
