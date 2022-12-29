import React, { useContext, useEffect, useState } from "react";
import { MyPlaceContext } from "../../context/MyPlaceContext";
import NftCard from "../../components/NftCard";
import { HashLoader } from "react-spinners";
import { useRouter } from "next/router";
import Head from "next/head";
import Banner from "../../components/Banner";

export default function Details() {
  const { isLoading, allItems, currentAccount } = useContext(MyPlaceContext);
  const router = useRouter();
  const currentId = router.query.id;
  return (
    <>
      <Head>
        <title>MyPlace - Details</title>
      </Head>
      {currentAccount ? (
        <div>
          {" "}
          <Banner />
          <section className="max-w-screen-xl mx-auto py-12 border-2 border-black h-screen">
            {isLoading ? (
              <div className="w-full h-screen flex items-center justify-center border-2 border-black">
                <HashLoader color="#2193b0" />
              </div>
            ) : (
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

                  if (itemId == currentId) {
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
            )}
          </section>
        </div>
      ) : (
        <div className="h-screen w-full flex items-center justify-center">
          Please Connect Wallet First
        </div>
      )}
    </>
  );
}
