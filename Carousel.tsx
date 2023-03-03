// Carousel component. has left-right arrow keys, bottom dots for going to different slides, changes slides on timer. The code may be mess, I've tried my best to keep it clean.

"use client";
//import Icon from "@/lib/Icon"; // I've already added the icon component inside this for easy use, so no need to import that for now. But separating these into different files would make it easier to work with. 
import Image from "next/image";
import React, { useEffect, useState } from "react";
interface iconProp {
  img: string;
}

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const arrowClicked = (dir: "left" | "right") => {
    let newIndex;
    if (dir === "left") {
      const isFirstSlide = currentIndex === 0;
      newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    } else {
      const isLastSlide = currentIndex === slides.length - 1;
      newIndex = isLastSlide ? 0 : currentIndex + 1;
    }
    setCurrentIndex(newIndex);
  };

  const goToSLide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < slides.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setCurrentIndex(0);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="w-full h-full  m-auto relative group overflow-hidden flex ">
      {slides.map((slide, key) => (
        <SingleSlide
          key={key}
          slide={slide}
          index={key}
          currentIndex={currentIndex}
        />
      ))}

      <ArrowButton
        place="left"
        img={"/assets/arrowleft.svg"}
        onClick={() => {
          arrowClicked("left");
        }}
      />
      <ArrowButton
        place="right"
        img={"/assets/arrowRight.svg"}
        onClick={() => {
          arrowClicked("right");
        }}
      />

      <div className="w-full gap-4 flex bottom-2 justify-center py-2 absolute">
        {slides.map((slide, key) => (
          <DotIcon
            key={slide.img}
            onClick={() => {
              goToSLide(key);
            }}
            active={key === currentIndex}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

interface ArrowButtonProps {
  place: "left" | "right";
  img: string;
  onClick: () => void;
}

const ArrowButton = ({ place, img, onClick }: ArrowButtonProps) => {
  return (
    <div
      className={`-${place}-14 group-hover:${place}-5 absolute top-[50%] -translate-x-0 translate-y-[-50%]  text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer  hover:bg-white/20 duration-500`}
      onClick={onClick}
    >
      <Icon img={img} />
    </div>
  );
};

interface DotIconProps {
  onClick: () => void;
  active: boolean;
}

const DotIcon = ({ onClick, active }: DotIconProps) => (
  <button
    className={`w-5 h-5 rounded-full ${
      active ? "bg-[#A100ED]" : "bg-white/80 hover:bg-white/50"
    } `}
    onClick={onClick}
  />
);

interface SingleSlideProps {
  slide: { img: string };
  index: number;
  currentIndex: number;
}
const SingleSlide = ({ slide, index, currentIndex }: SingleSlideProps) => {
  const [position, setPosition] = useState(index * 100);
  useEffect(() => {
    const pos = index - currentIndex;

    setPosition(pos * 100);
  }, [index, currentIndex]);

  return (
    <div
      style={{ backgroundImage: `url(${slide.img})` }}
      className={`absolute bg-gradient-to-b from-[rgb(161,0,237)]/25 to-[#DA00FE] backdrop-blur-sm w-full h-full rounded-2xl  translate-x-[${position}%] bg-center transition-all duration-500`}
    ></div>
  );
};

const slides = [
  {
    img: "https://images.pexels.com/photos/1309407/pexels-photo-1309407.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  },
  {
    img: "https://images.pexels.com/photos/1307929/pexels-photo-1307929.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  },
  {
    img: "https://images.pexels.com/photos/935490/pexels-photo-935490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const Icon = ({ img }: iconProp) => {
  return (
    <div className="w-[32px] h-[32px] relative flex justify-center items-center">
      <Image alt="." src={img} fill className="object-cover" />
    </div>
  );
};
