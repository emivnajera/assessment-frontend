import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login as loginService } from "../services/auth.service"; // ajusta la ruta si cambia

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

   async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Completa correo y contraseña.");
      return;
    }
    try {
      setLoading(true);
      // ⬇️ Llama a Breeze (hace ensureCsrf + POST /login + GET /api/user)
      await loginService(email, password);
      // ⬇️ Éxito: ve al Home
      navigate("/home", { replace: true });
    } catch (err) {
      // mensajes amigables
      if (axios.isAxiosError(err)) {
        const s = err.response?.status ?? 0;
        if (s === 401) setError("Credenciales inválidas.");
        else if (s === 422) setError("Validación: revisa los campos.");
        else setError("Error del servidor. Intenta más tarde.");
      } else {
        setError("Ocurrió un error inesperado.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="lp2">
      {/* decoraciones */}
      <div className="blob blob-a" aria-hidden />
      <div className="blob blob-b" aria-hidden />
      <div className="grid-overlay" aria-hidden />

      <main className="card2" role="main" aria-labelledby="login-title">
        <header className="head">
          <div className="brand">
            <div className="logo">L</div>
            <div className="brand-text">
              <h1 id="login-title" className="title">Iniciar sesión</h1>
              <p className="sub">Bienvenido de vuelta</p>
            </div>
          </div>
        </header>

        {error && <div className="alert2">{error}</div>}

        <form className="form2" onSubmit={onSubmit}>
          <label className="label2" htmlFor="email">Correo</label>
          <input
            id="email"
            type="email"
            className="input2"
            placeholder="tu@correo.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label2" htmlFor="password">Contraseña</label>
          <div className="pwd-wrap">
            <input
              id="password"
              type={show ? "text" : "password"}
              className="input2"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle2"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {show ? "Ocultar" : "Mostrar"}
            </button>
          </div>

          <button className="btn2" type="submit" disabled={loading}>
            {loading ? "Ingresando…" : "Ingresar"}
          </button>
        </form>

      <footer className="foot2">
        <p className="signup">
          ¿No tienes cuenta?{" "}
          <a className="link2" href="/signup">Crear cuenta</a>
        </p>
      </footer>
      </main>
    </div>
  );
}
