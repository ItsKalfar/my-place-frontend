import React, { useContext, useEffect, useState } from "react";
import { MyPlaceContext } from "../../context/MyPlaceContext";
import NftCard from "../../components/NftCard";
import { HashLoader } from "react-spinners";
import Banner from "../../components/Banner";
import Heading from "../../components/Heading";

export default function art() {
  const { isLoading, allItems } = useContext(MyPlaceContext);
  return (
    <>
      <Banner />
      <Heading
        heading={"Explore Art"}
        description={
          "An online community of makers, developers, and traders is pushing the art world into new territory. It all started with CryptoPunks, a set of 10,000 randomly generated punks that proved demand for the digital ownership of non-physical items and collectibles in 2017, and the market has evolved rapidly ever since."
        }
      />
      <section className="max-w-screen-xl mx-auto py-12  h-screen">
        {isLoading ? (
          <div className="w-full h-screen flex items-center justify-center ">
            <HashLoader color="#2193b0" />
          </div>
        ) : (
          <div>
            <div className="card-box">
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

                if (category === "art") {
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
          </div>
        )}
      </section>
    </>
  );
}
