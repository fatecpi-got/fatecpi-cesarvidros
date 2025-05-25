type Path = { name: string; path: string };

interface HeaderProps {
  paths: Path[];
}

import './header.css';

export default function Header({ paths }: HeaderProps) {
  return (
    <header className="header">
      <div className="logo">
        <h1>Logo</h1>
      </div>
      <nav className="navbar">
        <ul className="nav-list">
          {paths.map((item: Path) => (
            <li key={item.name} className="nav-item">
              <a href={item.path} className="nav-link">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
