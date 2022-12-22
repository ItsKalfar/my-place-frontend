import { ethers } from "ethers";
import React, { useContext, useState } from "react";
import { MyPlaceContext } from "../context/MyPlaceContext";

export default function CreateNft() {
  const { currentAccount } = useContext(MyPlaceContext);
  const [values, setValues] = useState({
    name: "",
    tokenId: 0,
    description: "",
    price: 0,
    category: "",
  });
  return (
    <div className=" w-full  md:w-1/2 lg:w-1/3 px-6 py-10 rounded shadow-lg text-black">
      <h1 className="uppercase mb-4 text-xl text-center font-bold">
        Create NFT
      </h1>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          NFT Name
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter NFT name..."
          onChange={(e) =>
            setValues((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Description
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter Description..."
          onChange={(e) =>
            setValues((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>
      <div className="mb-8">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Price
        </label>
        <input
          type="number"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter Price..."
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              price: ethers.utils.formatEther(e.target.value),
            }))
          }
        />
      </div>
      <div className="mb-8">
        <div className="flex items-center justify-center w-full">
          <label
            for="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 "
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
      </div>
      <div>
        {currentAccount ? (
          <div className="btn-primary text-center">Sell</div>
        ) : (
          <div className="btn-primary text-center">Connect Wallet</div>
        )}
      </div>
    </div>
  );
}
