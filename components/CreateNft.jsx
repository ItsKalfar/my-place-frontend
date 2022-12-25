import { ethers } from "ethers";
import React, { useContext, useState, useEffect } from "react";
import { MyPlaceContext } from "../context/MyPlaceContext";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { toast } from "react-hot-toast";
import MyPlaceABI from "../constants/MyPlaceABI.json";
import NFTABI from "../constants/NFT.json";
import { Buffer } from "buffer";

export default function CreateNft() {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const subdomain = process.env.NEXT_PUBLIC_SUBDOMAIN;
  const auth = `Basic ${Buffer.from(`${projectId}:${apiKey}`).toString(
    "base64"
  )}`;

  const client = ipfsHttpClient({
    host: "ipfs.infura.io",
    protocol: "https",
    port: 5001,
    headers: {
      authorization: auth,
    },
  });
  const { currentAccount, connectWallet } = useContext(MyPlaceContext);
  const MyPlaceContract = process.env.NEXT_PUBLIC_MY_PLACE_CONTRACT_ADDRESS;

  const NftContract = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: 0n,
    category: "art",
  });
  const [fileUrl, setFileUrl] = useState(null);

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `${subdomain}/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCreation = async () => {
    try {
      if (
        typeof window.ethereum !== "undefined" ||
        typeof window.web3 !== "undefined"
      ) {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const NFT = new ethers.Contract(NftContract, NFTABI.abi, signer);
          const MyPlace = new ethers.Contract(
            MyPlaceContract,
            MyPlaceABI.abi,
            signer
          );
          const { name, description, price, category } = values;
          if (!name || !description || !price || !category || !fileUrl) {
            return toast.error("Please Provide All Inputs");
          }
          const data = JSON.stringify({
            name,
            description,
            category,
            image: fileUrl,
          });
          toast.loading("Creating NFT...", { duration: 6000 });
          const added = await client.add(data);
          const url = `${subdomain}/ipfs/${added.path}`;
          let creation = await NFT.createNFT(url);
          let tx = await creation.wait();
          // Listening to Events
          let event = tx.events[0];
          toast.success("NFT Created!");
          let value = event.args[2];
          let tokenId = parseInt(value);
          let listingPrice = await MyPlace.getListingPrice();
          listingPrice = listingPrice.toString();
          toast.loading("Listing Your NFT", { duration: 4000 });
          listingNFT = await MyPlace.listNFT(
            NftContract,
            tokenId,
            price,
            category,
            { value: ethers.utils.parseEther("0.025") }
          );
          MyPlace.on("ItemListed", () => {
            toast.success("Item Listed Successfully");
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);
  return (
    <div className=" w-full bg-white  md:w-1/2 lg:w-1/3 px-6 py-10 rounded shadow-lg text-black">
      <h1 className="uppercase mb-4 text-xl text-center font-bold">
        Create NFT
      </h1>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Name
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
              price: ethers.utils.parseEther(e.target.value.toString()),
            }))
          }
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Category
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          onChange={(e) =>
            setValues((prev) => ({ ...prev, category: e.target.value }))
          }
        >
          <option className="p-2.5" defaultValue="art">
            Art
          </option>
          <option className="p-2.5" value="illustration">
            Illustration
          </option>
          <option className="p-2.5" value="Music">
            Music
          </option>
          <option className="p-2.5" value="photography">
            Photography
          </option>
          <option className="p-2.5" value="sports">
            Sports
          </option>
        </select>
      </div>
      {fileUrl ? (
        <div className="mb-8">
          <div className="flex items-center justify-center w-full">
            <p>Image Uploaded</p>
          </div>
        </div>
      ) : (
        <div className="mb-8">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
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
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileInput}
              />
            </label>
          </div>
        </div>
      )}

      <div>
        {currentAccount ? (
          <div className="btn-primary text-center" onClick={handleCreation}>
            Sell
          </div>
        ) : (
          <div
            className="btn-primary text-center"
            onClick={() => connectWallet()}
          >
            Connect Wallet
          </div>
        )}
      </div>
    </div>
  );
}
