import React, { useState } from 'react';
import { Container, Button } from 'semantic-ui-react';
import Link from 'next/link';
import Metamask from './Metamask';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    router.push('/');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div>
      <nav className="navbar">
        <Container>
          <div className="nav-container">
            <Link href="/main" className="nav-logo">
              SecureFund
            </Link>

            {/* Hamburger Icon */}
            <div className="hamburger" onClick={toggleMenu}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>

            {/* Navigation Menu */}
            <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
              <li className="nav-item">
                <Link href="/projects/new" className="nav-links">
                  Create Project
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/projects/open" className="nav-links">
                  View Project
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/projects/reportmain" className="nav-links">
                  Report
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/projects/working" className="nav-links">
                  Working
                </Link>
              </li>
              <li className="nav-item-connect">
                <Metamask />
              </li>
              <li className="nav-item-connect">
                  <Button
                    onClick={logout}
                    compact
                    inverted
                    icon="sign-out"
                  ></Button>
              </li>
            </ul>
          </div>
        </Container>
      </nav>
    </div>
  );
};

export default Navbar;
