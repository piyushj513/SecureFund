import About from '@/components/About';
import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

export default function Main() {
  return (
    <div>
    <Navbar/>
    <Banner/>
    <About/>
    <Footer/>
    </div>
  )
}
