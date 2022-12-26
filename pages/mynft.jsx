import React, { useContext } from "react";
import CreateNft from "../components/CreateNft";
import { Toaster } from "react-hot-toast";
import { MyPlaceContext } from "../context/MyPlaceContext";

export default function createNFT() {
  const { currentAccount, allItems } = useContext(MyPlaceContext);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <section className="bg-slate-50">
        <div className="container mx-auto flex flex-col items-start justify-start md:flex-row py-24 ">
          <CreateNft />
          <div className="w-full mt-1  md:w-1/2 md:ml-8 md:mt-0  lg:w-2/3">
            <button
              className="p-2.5 border-black border-2"
              onClick={() => allNfts()}
            >
              Get NFTs
            </button>
            {/* <div>
              {allItems.map((item) => {
                const { itemId, tokenId, category, seller, owner, price } =
                  item;

                <div>
                  <p>{seller}</p>
                  <p>{owner}</p>
                  <p>{tokenId}</p>
                  <p>{itemId}</p>
                  <p>{category}</p>
                </div>;
              })}
            </div> */}

            <div>My purchased nfts</div>
          </div>
        </div>
      </section>
    </>
  );
}
