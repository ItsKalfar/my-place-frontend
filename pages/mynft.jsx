import React, { useContext, useEffect, useState } from "react";
import CreateNft from "../components/CreateNft";
import { Toaster } from "react-hot-toast";
import { MyPlaceContext } from "../context/MyPlaceContext";
import { ethers } from "ethers";

export default function createNFT() {
  const { currentAccount, isLoading, allItems } = useContext(MyPlaceContext);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <section className="bg-slate-50">
        <div className="container mx-auto flex flex-col items-start justify-start md:flex-row py-24 ">
          <CreateNft />
          <div className="w-full mt-1  md:w-1/2 md:ml-8 md:mt-0  lg:w-2/3">
            <div>My NFTS</div>
            <div>
              {/* {allItems.map((item) => {
                let { price, category, itemId, owner, tokenId, seller, sold } =
                  item;

                price = price.toString();
                seller = seller.toString();
                tokenId = tokenId.toString();
                if (currentAccount === seller.toLowerCase()) {
                  return (
                    <div key={itemId}>
                      <p>{seller}</p>
                      <p>{tokenId}</p>
                    </div>
                  );
                }
              })} */}
            </div>

            <div>My purchased nfts</div>
            <div>
              {/* {allItems.map((item) => {
                let { price, category, itemId, owner, tokenId, seller, sold } =
                  item;

                let itemPrice = price.toString();
                let itemSeller = seller.toString();
                let itemOwner = owner.toString();
                if (currentAccount === itemOwner.toLowerCase()) {
                  return (
                    <div key={itemId}>
                      <p>{seller}</p>
                    </div>
                  );
                }
              })} */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
