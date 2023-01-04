import Head from "next/head";
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Match from "../components/Match"

function Fixtures() {
  return (
    <div>
      <Head>
        <title>Fixtures</title>
      </Head>
      <Navbar />
      <Match />
      <Footer />
    </div>
  );
}

export default Fixtures;
