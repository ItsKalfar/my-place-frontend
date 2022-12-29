import React, { useContext, useEffect, useState } from "react";
import CreateNft from "../components/CreateNft";
import { Toaster } from "react-hot-toast";
import { MyPlaceContext } from "../context/MyPlaceContext";
import { ethers } from "ethers";
import Head from "next/head";
import Image from "next/image";
import NftCard from "../components/NftCard";
import { HashLoader } from "react-spinners";

export default function createNFT() {
  const { currentAccount, isLoading, allItems } = useContext(MyPlaceContext);

  return (
    <>
      <Head>
        <title>MyPlace - My NFTs</title>
      </Head>
      <Toaster position="top-center" reverseOrder={false} />
      {currentAccount ? (
        isLoading ? (
          <div className="w-full h-screen flex items-center justify-center ">
            <HashLoader color="#2193b0" />
          </div>
        ) : (
          <div>
            <section className="">
              <div className="max-w-screen-2xl mx-auto flex flex-col items-start justify-start md:flex-row py-24 ">
                <CreateNft />
                <div className="w-full mt-1  md:w-1/2 md:ml-8 md:mt-0  lg:w-2/3">
                  <div>My NFTS</div>
                  <div className="card-wrapper">
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
                              seller={seller}
                            />
                          </div>
                        );
                      }
                    })}
                  </div>

                  <div>My purchased nfts</div>
                  <div>
                    {allItems.map((item) => {
                      let {
                        price,
                        category,
                        itemId,
                        owner,
                        tokenId,
                        seller,
                        sold,
                      } = item;

                      if (currentAccount === owner.toLowerCase()) {
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
          </div>
        )
      ) : (
        <div className="h-screen w-full flex items-center justify-center">
          Please Connect Wallet First
        </div>
      )}
    </>
  );
}
