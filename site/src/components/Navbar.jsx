import { useCallback, useEffect, useRef, useState } from "react";
import { navItems } from "../data/nav";
import logoDark from "../assets/manzil-mark-dark.svg";
import DemoLink from "./DemoLink";
import { Chevron } from "./Icons";
import "../styles/Navbar.css";

const HOVER_QUERY = "(hover: hover) and (min-width: 901px)";
const DESKTOP_MIN = 901;

function Dropdown({ item, open, onToggle, onHover }) {
  const panelId = `dd-${item.id}`;
  return (
    <div
      className={`dd${open ? " is-open" : ""}`}
      onMouseEnter={() => onHover(item.id, true)}
      onMouseLeave={() => onHover(item.id, false)}
    >
      <button
        className="dd__btn"
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={(e) => onToggle(item.id, e)}
      >
        {item.label} <Chevron />
      </button>
      <div className="dd__panel" id={panelId}>
        {item.children.map((child) => (
          <a key={child.title} href={child.href}>
            <strong>{child.title}</strong>
            <span>{child.text}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const burgerRef = useRef(null);
  const headerRef = useRef(null);
  const hoverTimer = useRef(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, []);

  // sticky bar gains a background once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock page scroll while the mobile menu is open; the menu covers the page, so make
  // everything outside the header unreachable by keyboard and screen readers too
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    const header = headerRef.current;
    const page = [...header.parentElement.children].filter((el) => el !== header);
    page.forEach((el) => el.toggleAttribute("inert", menuOpen));
    return () => {
      document.body.classList.remove("menu-open");
      page.forEach((el) => el.removeAttribute("inert"));
    };
  }, [menuOpen]);

  // click outside, Escape, and growing past the mobile breakpoint
  useEffect(() => {
    const onDocClick = (e) => {
      if (!e.target.closest(".dd")) setOpenDropdown(null);
    };
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpenDropdown(null);
      if (menuOpen) {
        setMenuOpen(false);
        burgerRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= DESKTOP_MIN) setMenuOpen(false);
    };
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  // On hover devices the mouse has already opened the panel, so a mouse click must not shut it
  // again. Keyboard activation (detail 0) and touch still toggle.
  const toggleDropdown = (id, e) => {
    if (e.detail > 0 && window.matchMedia(HOVER_QUERY).matches) setOpenDropdown(id);
    else setOpenDropdown((cur) => (cur === id ? null : id));
  };

  // hover opens dropdowns on desktop only; touch/mobile uses click
  const hoverDropdown = (id, entering) => {
    if (!window.matchMedia(HOVER_QUERY).matches) return;
    clearTimeout(hoverTimer.current);
    if (entering) setOpenDropdown(id);
    else hoverTimer.current = setTimeout(() => setOpenDropdown((cur) => (cur === id ? null : cur)), 120);
  };

  return (
    <header ref={headerRef} className={`nav${scrolled || menuOpen ? " is-scrolled" : ""}`}>
      <div className="nav__bar">
        <a className="brand" href="#" aria-label="Manzil AI home">
          <img src={logoDark} alt="" width="22" height="27" />
          <span>Manzil AI</span>
        </a>

        {/* before the menu in source order, so Tab moves from the button into the open menu */}
        <button
          ref={burgerRef}
          className="burger"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>

        <nav
          className={`nav__links${menuOpen ? " is-open" : ""}`}
          id="menu"
          aria-label="Main"
          onClick={(e) => { if (e.target.closest("a")) closeMenu(); }}
        >
          {navItems.map((item) =>
            item.children ? (
              <Dropdown
                key={item.id}
                item={item}
                open={openDropdown === item.id}
                onToggle={toggleDropdown}
                onHover={hoverDropdown}
              />
            ) : (
              <a key={item.id} className="nav__plain" href={item.href}>{item.label}</a>
            )
          )}
          <div className="nav__mobile-cta">
            <DemoLink />
          </div>
        </nav>

        <div className="nav__cta">
          <DemoLink className="btn--sm" />
        </div>

      </div>
    </header>
  );
}
