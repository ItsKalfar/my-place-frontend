import React, { useContext, useEffect, useState } from "react";
import CreateNft from "../components/CreateNft";
import { Toaster } from "react-hot-toast";
import { MyPlaceContext } from "../context/MyPlaceContext";
import { ethers } from "ethers";
import Head from "next/head";
import Image from "next/image";

export default function createNFT() {
  const { currentAccount, isLoading, allItems } = useContext(MyPlaceContext);

  return (
    <>
      <Head>
        <title>MyPlace - My NFTs</title>
      </Head>
      <Toaster position="top-center" reverseOrder={false} />
      <section className="bg-slate-50">
        <div className="container mx-auto flex flex-col items-start justify-start md:flex-row py-24 ">
          <CreateNft />
          <div className="w-full mt-1  md:w-1/2 md:ml-8 md:mt-0  lg:w-2/3">
            <div>My NFTS</div>
            <div>
              {allItems.map((item) => {
                let {
                  price,
                  category,
                  itemId,
                  owner,
                  tokenId,
                  seller,
                  name,
                  image,
                  description,
                } = item;
                console.log(image, name);
                if (currentAccount === seller.toLowerCase()) {
                  return (
                    <div
                      key={itemId}
                      className="border-2 border-black rounded my-2 p-2"
                    >
                      <p>{tokenId}</p>
                      <p>{name}</p>
                      <p>{description}</p>

                      <Image
                        className="border-2 border-black"
                        src={image}
                        alt={name}
                        width={200}
                        height={200}
                      />
                    </div>
                  );
                }
              })}
            </div>

            <div>My purchased nfts</div>
            <div>
              {allItems.map((item) => {
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
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
