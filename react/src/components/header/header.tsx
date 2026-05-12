import { useState } from 'react'

import './header.scss'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  function toggleMenu() {
    setMenuOpen(!menuOpen)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="header w-full bg-white shadow-md">
      <div className="header__container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-1 cursor-pointer">
          <svg className="header__icon w-10 h-10">
            <use href="/svg/icons.svg#icon-cat" />
          </svg>

          <span className="hidden md:inline text-2xl font-semibold tracking-wider primary-color">
            CATLAB
          </span>
        </div>

        {/* Botão Mobile */}
        <button
          className="header__toggle md:hidden"
          onClick={toggleMenu}
        >
          <span className="primary-color">
            {menuOpen ? '✕' : '☰'}
          </span>
        </button>

        {/* Navegação */}
        <nav
          className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}
        >
          <a
            href="/"
            onClick={closeMenu}
            className="header__link"
          >
            HOME
          </a>

          <a
            href="/sobre"
            onClick={closeMenu}
            className="header__link"
          >
            SOBRE
          </a>

          <a
            href="/tecnologias"
            onClick={closeMenu}
            className="header__link"
          >
            TECNOLOGIAS
          </a>

          <a
            href="/doc/Analise_v1.0.pdf"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="header__link"
          >
            DOCS
          </a>
        </nav>
      </div>
    </header>
  )
}