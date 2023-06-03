import React, { useState, createContext, useEffect } from "react";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import MyPlaceABI from "../constants/MyPlaceABI.json";
import NFTABI from "../constants/NFTABI.json";
import ZetherABI from "../constants/ZetherABI.json";
import axios from "axios";

let eth;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

export const MyPlaceContext = createContext();

export const MyPlaceContextProvider = ({ children }) => {
  const MyPlaceContract = process.env.NEXT_PUBLIC_MY_PLACE_CONTRACT_ADDRESS;
  const NftContract = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS;
  const ZetherContract = process.env.NEXT_PUBLIC_ZETHER_CONTRACT_ADDRESS;
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

  const createSale = async (url, price, category) => {
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
          toast.loading("Creating NFT...", { duration: 6000 });
          let creation = await NFT.createNFT(url);
          let tx = await creation.wait();
          // Listening to Events
          let event = tx.events[0];
          toast.success("NFT Created!");
          let value = event.args[2];
          let tokenId = parseInt(value);
          const MyPlace = new ethers.Contract(
            MyPlaceContract,
            MyPlaceABI.abi,
            signer
          );
          toast.loading("Listing Your NFT", { duration: 4000 });
          const Zether = new ethers.Contract(
            ZetherContract,
            ZetherABI.abi,
            signer
          );
          await Zether.approve(MyPlaceContract, 1);
          let listingNFT = await MyPlace.listNFT(
            NftContract,
            tokenId,
            price,
            category
          );
          MyPlace.on("ItemListed", () => {
            toast.success("Item Listed Successfully");
          });
          setStateChanged(!stateChanged);
          getAllItems();
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllItems = async () => {
    try {
      if (
        typeof window.ethereum !== "undefined" ||
        typeof window.web3 !== "undefined"
      ) {
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
        for (let index = 1; index <= itemId; index++) {
          let getItem = await MyPlace.getListing(index);
          let tokenId = getItem.tokenId;
          tokenId = parseInt(tokenId.toString());
          const tokenUri = await NFT.tokenURI(tokenId);
          const meta = await axios.get(tokenUri);
          const price = getItem.price.toString();
          let priceInETH = ethers.utils.formatEther(price);
          priceInETH = parseInt(priceInETH);
          let itemId = await MyPlace.getitemId();
          itemId = parseInt(itemId);

          let item = {
            price: priceInETH,
            itemId: tokenId,
            tokenId: tokenId,
            seller: getItem.seller.toString().toLowerCase(),
            owner: getItem.owner.toString().toLowerCase(),
            image: meta.data.image,
            name: meta.data.name,
            category: meta.data.category,
            description: meta.data.description,
            nftContract: getItem.nftContract,
            sold: getItem.sold,
          };
          setAllItems((prev) => [item, ...prev]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buyItem = async (itemId, nftContract, price) => {
    try {
      if (
        typeof window.ethereum !== "undefined" ||
        typeof window.web3 !== "undefined"
      ) {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const MyPlace = new ethers.Contract(
          MyPlaceContract,
          MyPlaceABI.abi,
          signer
        );
        toast.loading("Processing Your Purchase", { duration: 4000 });
        const Zether = new ethers.Contract(
          ZetherContract,
          ZetherABI.abi,
          signer
        );
        await Zether.approve(MyPlaceContract, price);
        let buyNft = await MyPlace.buyNFT(itemId, nftContract);
        MyPlace.on("ItemBought", () => {
          toast.success("Item Bought");
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    if (currentAccount) {
      getAllItems();
    }
  }, [currentAccount]);

  return (
    <MyPlaceContext.Provider
      value={{
        connectWallet,
        currentAccount,
        allItems,
        isLoading,
        createSale,
        buyItem,
      }}
    >
      {children}
    </MyPlaceContext.Provider>
  );
};
