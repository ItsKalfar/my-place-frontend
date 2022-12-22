import React from "react";
import CreateNft from "../components/CreateNft";

export default function createNFT() {
  return (
    <section>
      <div className="container mx-auto flex flex-col items-start justify-start md:flex-row py-24 ">
        <CreateNft />
        <div className="w-full mt-4  md:w-1/2 md:ml-8 md:mt-0  lg:w-2/3">
          <div>My listed nfts</div>

          <div>My purchased nfts</div>
        </div>
      </div>
    </section>
  );
}
