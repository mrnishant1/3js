import { Keyboard } from "@/components/Keyboard";
import { Keycap } from "@/components/Keycap";

const Scene = () => {
  return (
    <group>
      <spotLight
        color={"white"}
        intensity={8}
        position={[-0.3, 1, 5]}
        castShadow
        shadow-bias={-0.001}
      />
      <group>
        <Keycap texture={1} rotation={[1,1,4]} position={[1,0,3.5]}/>
        <Keycap texture={2} rotation={[1,-3,0]} position={[1,1,3.5]}/>
        <Keycap texture={3} rotation={[2,5,2.3]} position={[-1,0.4,4]}/>
        <Keycap texture={4} rotation={[2,-3,0]} position={[-1,-0.5,4]}/>
        <Keycap texture={5} rotation={[1,-4,0]} position={[1.3,0,4]}/>
        <Keycap texture={6} rotation={[3,-5,1]} position={[1,-0.5,4.2]}/>
        <Keycap texture={7} rotation={[-1,4.01,0]} position={[-1,1,3]}/>
        <Keycap texture={8} rotation={[1,-3,0]} position={[1,1,4]}/>
        
      </group>
      {/* <ambientLight color={'white'} intensity={1}/> */}
      <Keyboard
        scale={9}
        position={[0, -0.5, 3.8]}
        rotation={[Math.PI * 0.45, -Math.PI * 0.03, 0]}
      />
    </group>
  );
};

export default Scene;
