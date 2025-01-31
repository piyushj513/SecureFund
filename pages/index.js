import React, { Component } from 'react';
import Footer from '@/components/Footer';
import Banner from '@/components/Banner';
import About from '@/components/About';
import Navbar2 from '@/components/Navbar2';

class CampaignIndex extends Component {
  render() {
    return (
      <>
        <Navbar2 />
        <Banner />
        <About />
        <Footer />
      </>
    );
  }
}

export default CampaignIndex;
