import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <>
        <div className="bg-dark text-light mx-0 mt-auto">
  <footer className="footer py-3">
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li className="nav-item"><Link className="link nav-link px-2" to="/">Home</Link></li>
      <li className="nav-item"><Link className="link nav-link px-2" to="/">Features</Link></li>
      <li className="nav-item"><Link className="link nav-link px-2" to="/">FAQ</Link></li>
      <li className="nav-item"><Link className="link nav-link px-2" to="/">Pricing</Link></li>
      <li className="nav-item"><Link className="link nav-link px-2" to="/">About</Link></li>
    </ul>
    <p className="text-center">Bez Racing Team © 2024 Simracing Event Manager</p>
  </footer>
</div>
        </>
    );
}