import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="container" style={{ paddingBlock: '20vh' }}>
      <h1 style={{ fontWeight: 800 }}>404</h1>
      <p style={{ color: 'var(--muted)' }}>That page doesn't exist.</p>
      <Link to="/" style={{ textDecoration: 'underline' }}>Back home</Link>
    </main>
  );
}
