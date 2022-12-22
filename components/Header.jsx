import Link from "next/link";
import { useState, useContext } from "react";
import {
  BiPhotoAlbum,
  BiMusic,
  BiAperture,
  BiBasketball,
  BiEditAlt,
} from "react-icons/bi";
import { motion } from "framer-motion";
import Sticky from "react-stickynode";
import { MyPlaceContext } from "../context/MyPlaceContext";

const Header = () => {
  const { connectWallet, currentAccount } = useContext(MyPlaceContext);
  const [isSticky, setIsSticky] = useState(false);

  const handleStateChange = (status) => {
    if (status.status === Sticky.STATUS_FIXED) {
      setIsSticky(true);
    } else if (status.status === Sticky.STATUS_ORIGINAL) {
      setIsSticky(false);
    }
  };

  return (
    <Sticky innerZ={1001} top={0} onStateChange={handleStateChange}>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <nav id="navbar" className={isSticky ? "sticky" : "unsticky"}>
          <div className="container mx-auto p-6 flex items-center justify-between">
            <div className="flex w-full items-center justify-between">
              <Link href="/">MyPlace</Link>
              <ul className="flex items-center justify-between">
                <li className="navbar-link">
                  <Link href="/">Home</Link>
                </li>

                <li className="navbar-link group relative">
                  <Link href="#services" className="">
                    Categories
                  </Link>
                  <div className="group-hover:block dropdown-menu absolute hidden h-full">
                    <ul className="top-0 mt-6 -ml-20 w-60 bg-white shadow-xl flex flex-col">
                      <li className="p-6 hover:shadow-md block cursor-pointer hover:font-semibold text-lg hover:text-blue-500 ">
                        <Link href="/categories/" className="flex items-start ">
                          {" "}
                          <BiAperture
                            className="mr-2 mt-1"
                            size="1.25em"
                          />{" "}
                          <span>All NFT</span>
                        </Link>
                      </li>
                      <li className="p-6 hover:shadow-md block cursor-pointer hover:font-semibold text-lg hover:text-blue-500 ">
                        <Link
                          href="/categories/art"
                          className="flex items-start "
                        >
                          {" "}
                          <BiEditAlt className="mr-2 mt-1" size="1.25em" />{" "}
                          <span>Art</span>
                        </Link>
                      </li>
                      <li className="p-6 hover:shadow-md block cursor-pointer hover:font-semibold text-lg hover:text-blue-500 ">
                        <Link
                          href="/categories/illustration"
                          className="flex items-start "
                        >
                          {" "}
                          <BiEditAlt className="mr-2 mt-1" size="1.25em" />{" "}
                          <span>Illustrations</span>
                        </Link>
                      </li>
                      <li className="p-6 hover:shadow-md block cursor-pointer hover:font-semibold text-lg hover:text-blue-500 ">
                        <Link
                          href="/categories/music"
                          className="flex items-start "
                        >
                          {" "}
                          <BiMusic className="mr-2 mt-1" size="1.25em" />{" "}
                          <span>Music</span>
                        </Link>
                      </li>

                      <li className="p-6 hover:shadow-md block cursor-pointer hover:font-semibold text-lg hover:text-blue-500 ">
                        <Link
                          href="/categories/photography"
                          className="flex items-start "
                        >
                          {" "}
                          <BiPhotoAlbum
                            className="mr-2 mt-1"
                            size="1.25em"
                          />{" "}
                          <span>Photography</span>
                        </Link>
                      </li>
                      <li className="p-6 hover:shadow-md block cursor-pointer hover:font-semibold text-lg hover:text-blue-500 ">
                        <Link
                          href="/categories/sports"
                          className="flex items-start "
                        >
                          {" "}
                          <BiBasketball
                            className="mr-2 mt-1"
                            size="1.25em"
                          />{" "}
                          <span>Sports</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="navbar-link">
                  <Link href="/mynft">My NFTs</Link>
                </li>
                <li className="navbar-link">
                  <Link href="/swap">Swap</Link>
                </li>
                <li className="navbar-link btn-primary">
                  {currentAccount ? (
                    <button>
                      {currentAccount.slice(0, 5) +
                        "..." +
                        currentAccount.slice(38, 42)}
                    </button>
                  ) : (
                    <button onClick={() => connectWallet()}>Connect</button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </motion.div>
    </Sticky>
  );
};

export default Header;
