import React, { useState, createContext, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import MyPlaceABI from "../constants/MyPlaceABI.json";
import NFTABI from "../constants/NFT.json";
import { concat } from "ethers/lib/utils";
import axios from "axios";

let eth;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

export const MyPlaceContext = createContext();

export const MyPlaceContextProvider = ({ children }) => {
  const MyPlaceContract = process.env.NEXT_PUBLIC_MY_PLACE_CONTRACT_ADDRESS;
  const NftContract = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;
  const [currentAccount, setCurrentAccount] = useState(null);
  const [allItems, setAllItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stateChanged, setStateChanged] = useState(false);

  const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) return toast.error("Please install Metamask First");

      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);

      toast.success("Wallet Connected!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const checkIfWalletIsConnected = async (metamask = eth) => {
    try {
      if (!metamask) return toast.error("Please install Metamask First");

      const accounts = await metamask.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllItems = async () => {
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const MyPlace = new ethers.Contract(
        MyPlaceContract,
        MyPlaceABI.abi,
        signer
      );
      const NFT = new ethers.Contract(NftContract, NFTABI.abi, signer);
      let itemId = await MyPlace.getitemId();
      itemId = parseInt(itemId);
      console.log(itemId);
      for (let index = 1; index <= itemId; index++) {
        let getItem = await MyPlace.getListing(index);
        let tokenId = getItem.tokenId;
        tokenId = tokenId.toString();
        console.log(tokenId);
        const tokenUri = await NFT.tokenURI(tokenId);
        const meta = await axios.get(tokenUri);
        const price = getItem.price.toString();
        const priceInETH = ethers.utils.formatEther(price);
        let item = {
          price: priceInETH,
          itemId: getItem.itemId.toString(),
          tokenId: tokenId,
          seller: getItem.seller,
          owner: getItem.owner,
          image: meta.data.image,
          name: meta.data.name,
          category: meta.data.category,
          description: meta.data.description,
        };
        setAllItems((prev) => [item, ...prev]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    getAllItems();
  }, []);

  return (
    <MyPlaceContext.Provider
      value={{ connectWallet, currentAccount, allItems, isLoading }}
    >
      {children}
    </MyPlaceContext.Provider>
  );
};
