import Link from 'next/link';

export default function Menu() {
  return (
    <nav className="floating-menu" aria-label="Navegação principal">
      <p className="menu-title">Coluna de navegação</p>
      <Link href="/">Início</Link>
      <Link href="/projetos">Projetos</Link>
      <Link href="/github">GitHub</Link>
      <Link href="#tarefas">Tarefas</Link>
    </nav>
  );
}