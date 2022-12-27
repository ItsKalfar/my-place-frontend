import React, { useContext, useEffect, useState } from "react";
import { MyPlaceContext } from "../../context/MyPlaceContext";
import Image from "next/image";

export default function index() {
  const { currentAccount, isLoading, allItems } = useContext(MyPlaceContext);
  return (
    <section>
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

        return (
          <div key={itemId} className="border-2 border-black rounded my-2 p-2">
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
      })}
    </section>
  );
}
