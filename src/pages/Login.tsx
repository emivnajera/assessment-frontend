import React, { useState } from "react";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Por favor, completa tu correo y contraseña.");
      return;
    }

    try {
      setIsLoading(true);
      // TODO: Reemplaza por tu llamada de autenticación
      await new Promise((r) => setTimeout(r, 900));
      console.log({ email, password });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("No se pudo iniciar sesión. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-page">
      {/* Decoración de fondo */}
      <div className="bg-grid" aria-hidden />

      <div className="login-container">
        {/* Columna izquierda (branding) solo en pantallas grandes */}
        <aside className="login-aside">
          <div className="pill">Bienvenido de vuelta</div>
          <h1 className="title">
            Inicia sesión
            <span className="subtitle">y continúa donde te quedaste.</span>
          </h1>

          <div className="aside-cards">
            {[1, 2, 3, 4].map((i) => (
              <div className="mini-card" key={i}>
                <div className="mini-card-avatar" />
                <div className="mini-line w-75" />
                <div className="mini-line w-50" />
              </div>
            ))}
          </div>
        </aside>

        {/* Columna derecha (formulario) */}
        <main className="login-main">
          <div className="card">
            <header className="card-header">
              <div className="logo">L</div>
              <div className="header-text">
                <h2>Panel</h2>
                <p>Accede con tu cuenta</p>
              </div>
            </header>

            {error && <div className="alert">{error}</div>}

            <form onSubmit={onSubmit} className="form">
              <div className="field">
                <label htmlFor="email">Correo</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="field">
                <div className="field-row">
                  <label htmlFor="password">Contraseña</label>
                  <button
                    type="button"
                    className="link"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                <div className="password-wrap">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="input-icon" aria-hidden>
                    ⓘ
                  </span>
                </div>
              </div>

              <div className="actions-row">
                <label className="remember">
                  <input type="checkbox" />
                  <span>Recuérdame</span>
                </label>
                <a href="#" className="link">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <button className="btn-primary" type="submit" disabled={isLoading}>
                {isLoading ? "Ingresando…" : "Ingresar"}
                <span className="arrow">➜</span>
              </button>
            </form>

            <div className="divider">
              <span>o</span>
            </div>

            <div className="secondary-actions">
              <button className="btn-ghost">Continuar con correo mágico</button>
              <button className="btn-ghost">Crear cuenta</button>
            </div>

            <p className="footnote">Protección activada — sesiones seguras y cifradas.</p>
          </div>

          <p className="mobile-signup">
            ¿Nuevo por aquí? <a className="link" href="#">Crea una cuenta</a>
          </p>
        </main>
      </div>
    </div>
  );
}
