"use client";

import { Canvas } from "@react-three/fiber";
import Scene from "./Scene.tsx";
import './page.css'


export default function Home() {
  return (
    <>
      <div
        className="hero relative h-[300vh] w-screen "
        style={{
          background:
            "linear-gradient(90deg, hsla(203, 77%, 79%, 1) 0%, hsla(216, 88%, 19%, 1) 100%)",
        }}
      >
        <div className="h-screen w-screen sticky top-0">
          <div className="overflow-hidden h-screen w-screen">
            <h1 className="stamp absolute flex self-center scale-[2] left-[21%] top-[8%] w-fit text-9xl text-white font-bold italic from-0%:opacity-0 to-100%:opacity-100"
            >
              BUILD FOR
            </h1>
            <button className="absolute bg-[#9cceef] shadow-[3px_3px_0px_white] font-bold hover:shadow-[0px_0px_0px_white] hover:scale-[1.1] active:scale-[0.95] transition-all inset-shadow-indigo-500 rounded-2xl p-2.5 right-[2%] top-[2%] w-[100px] h-[41px] text-5xl z-50 text-center flex justify-center items-center border-2 border-white text-white overflow-hidden">
              Buy
            </button>
            <h1 className="stamp delay absolute z-10 flex self-center scale-[2] right-[21%] bottom-[8%] w-fit text-9xl text-white font-bold italic">
              BOLD TYPE
            </h1>
            <Canvas shadows={"soft"}>
              {/* <OrbitControls/> */}
              <Scene />
            </Canvas>
          </div>
        </div>
      </div>
      {/* <div className="h-screen w-screen"></div> */}
    </>
  );
}
