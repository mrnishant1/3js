"use client";

import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { OrbitControls } from "@react-three/drei";

export default function Home() {
  return (
    <>
      <div
        className="relative h-screen w-screen overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg, hsla(203, 77%, 79%, 1) 0%, hsla(216, 88%, 19%, 1) 100%)",
        }}
      >
        <h1 className="absolute flex self-center scale-[2] left-[21%] top-[8%] w-fit text-9xl text-white font-bold italic">
          BUILD FOR
        </h1>
        <h1 className="absolute z-10 flex self-center scale-[2] right-[21%] bottom-[8%] w-fit text-9xl text-white font-bold italic">
          BOLD TYPE
        </h1>
        <div className="absolute z-10 left-0 top-3 inset-x-10"></div>
        <Canvas shadows={"soft"}>
          <Scene />
        </Canvas>
      </div>
    </>
  );
}
