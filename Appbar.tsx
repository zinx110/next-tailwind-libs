// This is a basic navbar-appbar component. put it on top of the layout. It is mobile responsive.

"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import { BiMenu } from "react-icons/bi";
import Button from "./Button";
import Link from "next/link";

const Appbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const handleSidebar = () => {
    setSidebarOpen((previous) => !previous);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <Navbar handleSidebar={handleSidebar} />
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </>
  );
};

export default Appbar;

const Sidebar = ({
  sidebarOpen,
  closeSidebar,
}: {
  sidebarOpen: boolean;
  closeSidebar: () => void;
}) => {
  return (
    <div
      className={`fixed w-full top-16  z-[800] md:hidden overflow-hidden flex justify-end `}
    >
      <div
        className={`w-52 h-[calc(100vh-64px)] fixed right-0   bg-[#00092a]  
          transition-all duration-500 ${
            sidebarOpen ? "translate-x-0" : "translate-x-52"
          }`}
      >
        <LinkList closeSidebar={closeSidebar} />
      </div>
    </div>
  );
};
const Navbar = ({ handleSidebar }: { handleSidebar: () => void }) => {
  return (
    <div className="bg-gradient-to-tr from-[#00092a] via-[#00092a] to-[#000721] w-full h-16 fixed md:h-20 top-0  flex justify-center z-[500]">
      <div className="w-full h-full flex items-center  px-5 md:px-10   max-w-7xl">
        <Logo />
        <div className="hidden md:flex m-auto">
          <LinkList />
        </div>
        <div className="flex gap-5 m-auto md:ml-auto md:mr-0">
          <Button
            type="2"
            onClick={() => {}}
            link="https://www.hoyolab.com/home/2"
          >
            Forum
          </Button>
          <Button type="1" onClick={() => {}}>
            Download
          </Button>
        </div>
        <button onClick={handleSidebar}>
          <BiMenu className="w-8 h-8 relative md:hidden text-white" />
        </button>{" "}
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="w-24 h-14 relative md:w-32 md:h-20 md:mr-auto flex items-center justify-start">
      <Image fill src="/assets/genshin.svg" alt="" className="object-contain" />
    </div>
  );
};

const Links = ["Home", "Hero", "News", "Live"];
const LinkList = ({ closeSidebar }: { closeSidebar?: () => void }) => {
  const [activeLink, setActiveLink] = useState(Links[0]);
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    // get the href and remove everything before the hash (#)
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");
    // get the element by id and use scrollIntoView
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <ul className="flex flex-col md:flex-row md:gap-10  ">
      {Links.map((link) => (
        <li key={link} className="pl-5 pr-10 md:pl-0 md:pr-0">
          <Link
            href={`#${link}`}
            onClick={(e) => {
              setActiveLink(link);
              handleScroll(e);
              closeSidebar && closeSidebar();
            }}
          >
            <p
              className={`text-base ${
                link === activeLink ? "text-white" : "text-white/50"
              } font-semibold font-Sarabun pl-5 py-10 md:pl-0 md:py-0 cursor-pointer`}
            >
              {link}
            </p>
          </Link>
          <div className="w-full h-px  bg-white md:hidden" />
        </li>
      ))}
    </ul>
  );
};
