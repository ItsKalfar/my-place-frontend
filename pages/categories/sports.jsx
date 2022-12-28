import React, { useContext } from "react";
import { MyPlaceContext } from "../../context/MyPlaceContext";
import NftCard from "../../components/NftCard";
import { HashLoader } from "react-spinners";
import Banner from "../../components/Banner";
import Heading from "../../components/Heading";

export default function sports() {
  const { isLoading, allItems } = useContext(MyPlaceContext);
  return (
    <>
      <Banner />
      <Heading
        heading={"Explore Sport NFTs"}
        description={
          "Explore and own collectibles from some of the biggest sports teams and brands in the world."
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

                if (category === "sports") {
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
