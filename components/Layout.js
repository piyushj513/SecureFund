import React from 'react';
import Navbar from './Navbar';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Footer from './Footer';

const Layout = (props) => {
  return (
    <>
      <Head>
        <link
          async
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />
      </Head>
      <Navbar />
      <Container>{props.children}</Container>
      <br></br>
      <br></br>
      <Footer />
    </>
  );
};

export default Layout;
