import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div>
      <h1>ℹ️ Acerca de</h1>
      <p>Esta es la página about.</p>
      
      <Link to="/">← Volver al inicio</Link>
    </div>
  )
}