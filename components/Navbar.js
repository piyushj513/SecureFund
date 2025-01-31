import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import Link from 'next/link';
import Metamask from './Metamask';
const Navbar = () => {
  const logout = () => {
    localStorage.clear();
  };
  return (
    <div>
      <nav className="navbar">
        <Container>
          <div className="nav-container">
            <Link href="/main" className="nav-logo">
              SecureFund
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link href="/projects/new" className="nav-links">
                  Create Project
                </Link>
              </li>
              <li className="nav-item">
                <Link href={'/projects/open'} className="nav-links">
                  View Project
                </Link>
              </li>
              <li className="nav-item">
                <Link href={'/projects/reportmain'} className="nav-links">
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
            </ul>
            <Link href="/">
              <Button
                onClick={logout}
                floated="right"
                compact
                inverted
                icon="sign-out"
              />
            </Link>
          </div>
        </Container>
      </nav>
    </div>
  );
};

export default Navbar;
