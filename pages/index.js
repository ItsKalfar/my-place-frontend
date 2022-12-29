import { Toaster } from "react-hot-toast";
import CreateNft from "../components/CreateNft";
import HeroSection from "../components/HeroSection";
import LatestNft from "../components/LatestNft";
import Head from "next/head";
import { useContext } from "react";
import { MyPlaceContext } from "../context/MyPlaceContext";

export default function Home() {
  const { currentAccount } = useContext(MyPlaceContext);
  return (
    <>
      <Head>
        <title>MyPlace - NFT Marketplace</title>
      </Head>
      <div>
        <Toaster position="top-center" reverseOrder={false} />

        {currentAccount ? (
          <div>
            <HeroSection />
            <LatestNft />
            <div className="gradient-bg">
              <div className="max-w-screen-2xl mx-auto flex flex-col items-start justify-between md:flex-row py-24 px-8">
                <div className="w-full  md:w-1/2 lg:w-1/2 py-4">
                  <h1 className="font-bold text-2xl md:text-6xl lg:text-8xl uppercase text-white">
                    Unlock the value of your digital assets with NFTs
                  </h1>
                  <p className="my-4 pr-4 md:text-md lg:text-lg text-white font-semibold leading-5 ">
                    Welcome to MyPlace, the go-to destination for buying and
                    selling the most unique and valuable non-fungible tokens
                    (NFTs) on the market. Our marketplace is home to a curated
                    selection of NFTs from top creators and artists, and we're
                    dedicated to providing a seamless and secure experience for
                    our users.
                  </p>
                  <p className="my-4 pr-4 md:text-md lg:text-lg text-white font-semibold leading-5">
                    Our marketplace is designed to make it easy for buyers and
                    sellers to connect and transact with each other. We offer a
                    wide selection of NFTs from a diverse group of creators, and
                    our platform is user-friendly and intuitive. We also have a
                    team of support staff on hand to help with any questions or
                    issues that may arise.
                  </p>
                </div>
                <CreateNft />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-screen w-full flex items-center justify-center">
            Please Connect Wallet First
          </div>
        )}
      </div>
    </>
  );
}
