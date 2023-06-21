import Head from "next/head";
import i1 from "@/assets/1.jpeg";
import i2 from "@/assets/2.jpeg";
import i3 from "@/assets/3.jpeg";
import i4 from "@/assets/4.jpeg";
import Image from "next/image";
import Header from "@/components/Header";

export default function Example() {
  return (
    <div>
      <Head>
        <title>ttya</title>
        <style>
          {`body {
              background-color: black;
            }`}
        </style>
      </Head>
      <Header />

      <div className="flex justify-center">
        <div className="p-20 flex gap-20 text-center flex-col">
          <div className="flex flex-col">
            <h1 className="text-8xl font-bold font-syne shadow-xl  bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-200 to-fuchsia-300 ">
              Talk to your Art
            </h1>
            <span className="text-gray-300 text-center font-syne text-xl">
              Imagine, Innovate, Interact! Breathe Life into Your Fictional
              Creations and make them a part of your life!
            </span>
          </div>
          <div className="flex gap-4 md:flex-row xl:flex-row flex-col  lg:flex-row">
            <Image
              src={i1}
              className="h-80 ring-1 ring-white/60 opacity-90 hover:opacity-100 rounded-md w-72"
              alt=""
            />
            <Image
              src={i2}
              className="h-80 ring-1 ring-white/60 opacity-90 hover:opacity-100  rounded-md w-72"
              alt=""
            />
            <Image
              src={i3}
              className="h-80 ring-1 ring-white/60 opacity-90 hover:opacity-100  rounded-md w-72"
              alt=""
            />
            <Image
              src={i4}
              className="h-80 ring-1 ring-white/60 opacity-90 hover:opacity-100  rounded-md w-72"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
