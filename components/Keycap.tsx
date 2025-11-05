import * as THREE from "three";
import { Float, useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Keycap: THREE.Mesh;
  };
  materials: Record<string, unknown>;
};
interface KeycapProp {
  rotation?: [number, number, number];
  position?: [number, number, number];
  texture?: 1|2|3|4|5|6|7|8|9
}

export function Keycap({
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  texture =1
}: KeycapProp) {
  const { nodes } = useGLTF("/keycap.gltf") as unknown as GLTFResult;
  const KeycapTexture = useTexture(`/keycap_uv-${texture}.png`)
  KeycapTexture.flipY = false
  KeycapTexture.colorSpace = THREE.SRGBColorSpace
  
  const placeholderMat = new THREE.MeshStandardMaterial({
    map: KeycapTexture,
    roughness: 0.7,
    
  });

  return (
    <Float
      speed={0.4} // Animation speed, defaults to 1
      rotationIntensity={1} // XYZ rotation intensity, defaults to 1
      floatIntensity={0.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={[1,1]}
    >
      <group dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Keycap.geometry}
          material={placeholderMat}
          rotation={rotation}
          position={position}
          scale={10}
        />
      </group>
    </Float>
  );
}
