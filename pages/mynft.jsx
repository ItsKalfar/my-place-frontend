import React from "react";
import CreateNft from "../components/CreateNft";
import { Toaster } from "react-hot-toast";

export default function createNFT() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <section className="bg-slate-50">
        <div className="container mx-auto flex flex-col items-start justify-start md:flex-row py-24 ">
          <CreateNft />
          <div className="w-full mt-1  md:w-1/2 md:ml-8 md:mt-0  lg:w-2/3">
            <div>My listed nfts</div>

            <div>My purchased nfts</div>
          </div>
        </div>
      </section>
    </>
  );
}
