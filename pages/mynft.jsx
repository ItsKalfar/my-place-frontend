import React, { useContext, useEffect, useState } from "react";
import CreateNft from "../components/CreateNft";
import { Toaster } from "react-hot-toast";
import { MyPlaceContext } from "../context/MyPlaceContext";
import { ethers } from "ethers";
import Head from "next/head";
import Image from "next/image";
import NftCard from "../components/NftCard";

export default function createNFT() {
  const { currentAccount, isLoading, allItems } = useContext(MyPlaceContext);

  return (
    <>
      <Head>
        <title>MyPlace - My NFTs</title>
      </Head>
      <Toaster position="top-center" reverseOrder={false} />
      <section className="">
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

                if (currentAccount === seller.toLowerCase()) {
                  return (
                    <div key={itemId}>
                      <NftCard
                        image={image}
                        name={name}
                        price={price}
                        category={category}
                        itemId={itemId}
                        owner={owner}
                        tokenId={tokenId}
                        description={description}
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
                      <NftCard
                        image={image}
                        name={name}
                        price={price}
                        category={category}
                        itemId={itemId}
                        owner={owner}
                        tokenId={tokenId}
                        description={description}
                      />
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
