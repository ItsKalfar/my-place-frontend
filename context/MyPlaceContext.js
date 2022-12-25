import React, { useState, createContext, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import MyPlaceABI from "../constants/MyPlaceABI.json";
import NFTABI from "../constants/NFT.json";
import axios from "axios";

let eth;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

export const MyPlaceContext = createContext();

export const MyPlaceContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allItems, setAllItems] = useState([]);
  const [stateChanged, setStateChanged] = useState(false);
  const MyPlaceAbi = MyPlaceABI.abi;
  const MyPlaceContract = process.env.NEXT_PUBLIC_MY_PLACE_CONTRACT_ADDRESS;
  const NftAbi = NFTABI.abi;
  const NftContract = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;

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

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [currentAccount]);
  return (
    <MyPlaceContext.Provider
      value={{ connectWallet, currentAccount, allItems }}
    >
      {children}
    </MyPlaceContext.Provider>
  );
};
