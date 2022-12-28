import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEthereum } from "react-icons/fa";

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
    <Link href={`/categories/${itemId}`}>
      <div className="max-w-sm my-4 bg-white rounded-lg shadow-lg md:w-10/12 lg:w-11/12 hover:scale-105  transition-all duration-100 cursor-pointer ">
        <div>
          <Image
            className="rounded-t-lg w-full h-72"
            src={image}
            alt={name}
            width={200}
            height={200}
          />
        </div>
        <div className="p-5">
          <div>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
              {name}
            </h5>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex text-md font-medium text-gray-900 items-start justify-center">
              <FaEthereum className="mt-1 mr-1" /> {price}
            </div>

            <div className="btn-primary">Buy</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
