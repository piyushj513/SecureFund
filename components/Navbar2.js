import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import Link from 'next/link';
const Navbar2 = () => {
  return (
    <div>
      <nav className="navbar">
        <Container>
          <div className="nav-container">
            <Link href="/" className="nav-logo">
              SecureFund
            </Link>
            <ul className="nav-menu active">
              <li>
                <Button color="blue" inverted>
                  <Link href="/projects/login" className="nav-links">
                    Login
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
        </Container>
      </nav>
    </div>
  );
};

export default Navbar2;
