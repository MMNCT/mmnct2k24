import React from "react";
import { useState } from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { db } from "../../components/db/Firebase";
import {
  collection,
  doc,
  query,
  getDocs,
  getDoc,
  where,
} from "firebase/firestore";
import Image from "next/image";

//getserversideprops for fetching url query params
export async function getServerSideProps(context) {
  const { team_id } = context.query;
  let teamDetails = {};
  let members = [];

  // Get the document from the collection participating-teams having the id as team_id
  await getDoc(doc(db, "participating-teams", team_id)).then(
    async (docSnap) => {
      if (docSnap.exists()) {
        let data = docSnap.data();
        data.id = docSnap.id;
        teamDetails = data;

        // Get all the documents from the collection participating-team-member having the teamId as data.id
        let member_col = collection(db, "participating-team-member");
        let q = query(member_col, where("teamId", "==", data.id));
        await getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let data = doc.data();
            data.id = doc.id;
            data.teamId = team_id;
            members.push(data);
          });
        });
      } else {
        console.log("No such document!");
      }
    }
  );

  return {
    props: {
      teamDetails,
      members,
    },
  };
}

function teamDetails({ teamDetails, members }) {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <Head>
        <title>Team: {teamDetails.teamName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-gray-200 bg-opacity-50">
          <Image
            src="/loader.gif"
            alt="loading"
            width={300}
            height={300}
            className="rounded-full"
          />
        </div>
      )}
      <div className="min-h-screen">
        <div className="flex justify-center items-center my-4">
          <div className="w-11/12 md:w-3/4 lg:w-5/12 shadow-lg border">
            <div className="flex flex-col md:flex-row justify-center items-center gap-x-8">
              <div className="w-full md:w-7/12 border">
                {teamDetails.teamLogo != "" ? (
                  <Image
                    src={teamDetails.teamLogo}
                    alt="team logo"
                    width={1920}
                    height={1080}
                  />
                ) : (
                  <div className="flex justify-center items-center h-60">
                    <p className="text-2xl font-semibold text-gray-500">
                      No Logo
                    </p>
                  </div>
                )}
              </div>
              <div className="md:w-5/12 py-4">
                <div className="flex flex-col justify-center items-center md:items-start gap-y-4">
                  <div className="flex flex-col justify-center items-center md:items-start">
                    <p className="font-semibold">Team Name</p>
                    <p className="text-gray-500">{teamDetails.teamName}</p>
                  </div>
                  <div className="flex flex-col justify-center items-center md:items-start">
                    <p className="font-semibold">Group</p>
                    <p className="text-gray-500">{teamDetails.teamType}</p>
                  </div>
                  <div className="flex flex-col justify-center items-center md:items-start">
                    <p className="font-semibold">Gender</p>
                    <p className="text-gray-500">{teamDetails.teamGender}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {members.length == 0 ? (
          <div className="pt-44 text-xl text-center font-semibold text-gray-500 ">
            <p>Team members are not decided yet.</p>
            <p>Please, stay tuned for more updates.</p>
          </div>
        ) : (
          <div className="pt-16 flex flex-col gap-8 pb-6">
            <div className="flex flex-col justify-center items-center">
              <p className="text-2xl font-semibold mx-auto">Team members</p>
              <div className="mt-2 mb-12 lg:mb-12 border-b-4 border-[#F4A68D] w-8/12 md:w-2/5 lg:w-3/12 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-4 md:mx-16 gap-6">
              {members.map((member, index) => (
                <div className="relative" key={index}>
                  <Image
                    src={
                      member.imgUrl != ""
                        ? member.imgUrl
                        : teamDetails.teamGender == "Male"
                        ? "/male.jpg"
                        : "/female/jpg"
                    }
                    alt="team member"
                    width={1920}
                    height={1080}
                    className="rounded-xl"
                  />
                  <div class="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-700"></div>
                  <div className="absolute bottom-2 w-full text-white text-center font-light">
                    <p className="text-sm font-semibold">{member.name}</p>
                    <p className="text-xs">{member.type}</p>
                    {member.branch != "" && (
                      <p className="text-xs">{member.branch}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default teamDetails;
