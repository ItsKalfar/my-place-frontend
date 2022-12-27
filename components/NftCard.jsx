import React from "react";
import Image from "next/image";

export default function NftCard({
  price,
  category,
  itemId,
  owner,
  tokenId,
  seller,
  name,
  image,
  description,
}) {
  return (
    <div className="shadow rounded-xl my-8 w-1/2 hover:shadow-xl cursor-pointer">
      <Image
        src={image}
        alt={name}
        className="w-full h-64 rounded-t-xl"
        width={300}
        height={300}
      />
      <div className="p-4">
        <h1>{name}</h1>
        <p>{description}</p>
        <p>{category.toUpperCase()}</p>
        <p>{seller}</p>
        <p>{itemId}</p>
        <p>{tokenId}</p>
      </div>
    </div>
  );
}
