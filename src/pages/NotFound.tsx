import './NotFound.css'

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-subtitle">Página no encontrada</h2>
      <p className="notfound-description">
        La ruta que estás buscando no existe o fue movida.
      </p>
      <a href="/" className="notfound-button">Volver al inicio</a>
    </div>
  )
}
