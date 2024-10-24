import Head from "next/head";
import React from "react";
import Navbar from "../components/Navbar";
import Teamcard from "../components/Teamcard";
import Footer from "../components/Footer";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../components/db/Firebase";
import Image from "next/image";

//Next js server side props for fetching data from firebase
export async function getServerSideProps() {
  const querySnapshot = await getDocs(
    query(
      collection(db, "team"),
      where("edition", "==", "17"),
      orderBy("name", "desc")
    )
  );
  let coordinators = [];
  let developers = [];
  let designers = [];
  let content_creators = [];
  let in_house = [];
  let president = [];
  let sponsorship=[];
  querySnapshot.forEach((doc) => {
    let data = doc.data();
    if (data.position == "president") {
      president.push(data);
    } else if (data.position == "coordinator") {
      coordinators.push(data);
    } else if (data.position == "developer") {
      developers.push(data);
    } else if (data.position == "designer") {
      designers.push(data);
    } else if (data.position == "content writer") {
      content_creators.push(data);
    } else if (data.position == "Infra and In-House") {
      in_house.push(data);
    }
    else if (data.position == "sponsorship") {
      sponsorship.push(data);
    }
  });
  president = president.reverse()
  return {
    props: {
      president,
      coordinators,
      designers,
      content_creators,
      in_house,
      sponsorship
    },
  };
}

export default function Organisers({
  president,
  coordinators,
  designers,
  content_creators,
  in_house,
  sponsorship
}) {
  console.log(sponsorship);
  return (
    <div>
      <Head>
        <title>Organising Team</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="text-center mt-10 mb-24">
        <h1 className="text-3xl font-semibold mb-2">Lead Organiser</h1>
        <div className="border-b-4 border-[#F4A68D] w-9/12 md:w-2/5 lg:w-2/12 mx-auto mb-4 lg:mb-8"></div>
        {president.length == 0 && (
          <Image
            src="/loader.gif"
            width={330}
            height={400}
            className="w-full md:w-2/5 md:mx-auto md:rounded-xl"
            alt="loading"
          />
        )}
        <div className="grid gap-2 lg:grid-cols-2 justify-items-center place-items-center ">
          {president.length != 0 &&
            president.map((president, index) => {
              return <Teamcard details={president} key={index} />;
            })}
        </div>
      </div>
      <div className="text-center mt-10 mb-24">
        <h1 className="text-3xl font-semibold mb-2">Coordinators</h1>
        <div className="border-b-4 border-[#F4A68D] w-9/12 md:w-2/5 lg:w-2/12 mx-auto mb-4 lg:mb-8"></div>
        {coordinators.length == 0 && (
          <Image
            src="/loader.gif"
            width={330}
            height={400}
            className="w-full md:w-2/5 md:mx-auto md:rounded-xl"
            alt="loading"
          />
        )}
        <div className="grid gap-2 lg:grid-cols-2 justify-items-center place-items-center ">
          {coordinators.length != 0 &&
            coordinators.map((coordinator, index) => {
              return <Teamcard details={coordinator} key={index} />;
            })}
        </div>
      </div>
      <div className="text-center mt-28 mb-10">
        <h1 className="text-3xl font-semibold mb-2">Infra and Ground work</h1>
        <div className="border-b-4 border-[#F4A68D] w-9/12 md:w-2/5 lg:w-3/12 mx-auto mb-4 lg:mb-8"></div>
        {in_house.length == 0 && (
          <Image
            src="/loader.gif"
            width={330}
            height={400}
            className="w-full md:w-2/5 md:mx-auto md:rounded-xl"
            alt="loading"
          />
        )}
        <div className="grid gap-2 lg:grid-cols-1 justify-items-center place-items-center ">
          {in_house.length != 0 &&
            in_house.map((person, index) => {
              return <Teamcard details={person} key={index} />;
            })}
        </div>
      </div>
      <div className="text-center mt-28 mb-10">
        <h1 className="text-3xl font-semibold mb-2">Content</h1>
        <div className="border-b-4 border-[#F4A68D] w-9/12 md:w-2/5 lg:w-2/12 mx-auto mb-4 lg:mb-8"></div>
        {content_creators.length == 0 && (
          <Image
            src="/loader.gif"
            width={330}
            height={400}
            className="w-full md:w-2/5 md:mx-auto md:rounded-xl"
            alt="loading"
          />
        )}
        <div className="grid gap-2 lg:grid-cols-2 justify-items-center place-items-center ">
          {content_creators.length != 0 &&
            content_creators.map((content_creator, index) => {
              return <Teamcard details={content_creator} key={index} />;
            })}
        </div>
      </div>
      <div className="text-center mt-28 mb-10">
        <h1 className="text-3xl font-semibold mb-2">Designers</h1>
        <div className="border-b-4 border-[#F4A68D] w-9/12 md:w-2/5 lg:w-3/12 mx-auto mb-4 lg:mb-8"></div>
        {designers.length == 0 && (
          <Image
            src="/loader.gif"
            width={330}
            height={400}
            className="w-full md:w-2/5 md:mx-auto md:rounded-xl"
            alt="loading"
          />
        )}
        <div className="grid gap-2 lg:grid-cols-1 justify-items-center place-items-center ">
          {designers.length != 0 &&
            designers.map((designer, index) => {
              return <Teamcard details={designer} key={index} />;
            })}
        </div>
      </div>
      <div className="text-center mt-28 mb-10">
        <h1 className="text-3xl font-semibold mb-2">Sponsorship</h1>
        <div className="border-b-4 border-[#F4A68D] w-9/12 md:w-2/5 lg:w-3/12 mx-auto mb-4 lg:mb-8"></div>
        {sponsorship.length == 0 && (
          <Image
            src="/loader.gif"
            width={330}
            height={400}
            className="w-full md:w-2/5 md:mx-auto md:rounded-xl"
            alt="loading"
          />
        )}
        <div className="grid gap-2 lg:grid-cols-1 justify-items-center place-items-center ">
          {sponsorship.length != 0 &&
            sponsorship.map((sponsor, index) => {
              return <Teamcard details={sponsor} key={index} />;
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
