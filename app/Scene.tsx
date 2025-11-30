import { Keyboard, KeyboardRefs } from "@/components/Keyboard";
import { Keycap } from "@/components/Keycap";
import { Environment } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Scene = () => {
  const keyboardGroupRef = useRef<THREE.Group>(null);
  const keycapGroupRef = useRef<THREE.Group>(null);
  const keyboardAnimationRef = useRef<KeyboardRefs>(null);
  const [intensity, setintensity] = useState<number>(0);

  useGSAP(() => {
    if (!keyboardGroupRef.current) return;
    const keyboard = keyboardGroupRef.current;

    gsap.to(
      { intensity: 0 },
      {
        intensity: 1,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 0.5,
        onUpdate: function () {
          setintensity(this.targets()[0].intensity);
        },
      }
    );

    const tl = gsap.timeline({ ease: "power2.out" });
    tl.from(keyboard.position, {
      x: 0,
      y: -0.5,
      z: 2.8,
      duration: 1.5,
    })
      .from(
        keyboard.rotation,
        {
          x: Math.PI * 0.1,
          y: 0,
          z: Math.PI * 0.03,
          duration: 1.5,
        },
        "<"
      )
      .to(keyboard.position, {
        x: 0,
        y: -0.5,
        z: 3.8,
        duration: 1.5,
      })
      .to(
        keyboard.rotation,
        {
          x: Math.PI * 0.45,
          y: -Math.PI * 0.03,
          z: 0,
          duration: 1.5,
        },
        "<"
      )
      .call(() => {
        const keycaps = keycapGroupRef.current;
        if (!keyboard || !keycaps) return;

        const scrolltimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero",
            // markers: false,
            scrub: 1,
            start: "top top",
            end: "bottom bottom",
          },
        });

        scrolltimeline
          .to(keyboard.position, { x: 0, y: -0.5, z: 3 })
          .to(
            keyboard.rotation,
            {
              x: Math.PI * 2 + 1,
              y: 0,
              z: 0,
            },
            "<"
          )
          .to(keyboard.position, {
            x: 0,
            y: -0.5,
            z: 3.8,
          })
          .to(
            keycaps!.scale,
            {
              x: 5,
              y: 5,
              z: 5,
              duration: 1,
            },
            "0"
          );

        // Add wave animation to the scroll timeline
        if (keyboardAnimationRef.current) {
          // Collect all switches and keycaps from all rows
          const switchRefs = keyboardAnimationRef.current.switches;
          const individualKeys = keyboardAnimationRef.current.keys;

          // Collect all switches into a single array
          const allSwitches: THREE.Object3D[] = [];

          // Gather all switches from all rows
          [
            switchRefs.functionRow.current,
            switchRefs.numberRow.current,
            switchRefs.topRow.current,
            switchRefs.homeRow.current,
            switchRefs.bottomRow.current,
            switchRefs.modifiers.current,
            switchRefs.arrows.current,
          ].forEach((row) => {
            if (row) {
              allSwitches.push(...Array.from(row.children));
            }
          });

          // Define keycaps in actual left-to-right COLUMN order across the keyboard
          const keyboardColumns = [
            ["esc", "grave", "tab", "caps", "lshift", "lcontrol"],
            ["f1", "one", "q", "a", "z", "lalt"],
            ["f2", "two", "w", "s", "x", "lwin"],
            ["f3", "three", "e", "d", "c"],
            ["f4", "four", "r", "f", "v"],
            ["f5", "five", "t", "g", "b", "space"],
            ["f6", "six", "y", "h", "n"],
            ["f7", "seven", "u", "j", "m"],
            ["f8", "eight", "i", "k", "comma"],
            ["f9", "nine", "o", "l", "period"],
            ["f10", "zero", "dash", "p", "semicolon", "slash", "ralt"],
            [
              "f11",
              "lsquarebracket",
              "quote",
              "rshift",
              "fn",
              "arrowleft",
              "rsquarebracket",
              "enter",
              "f12",
              "equal",
              "arrowup",
            ],
            [],
            [
              "del",
              "backspace",
              "backslash",
              "pagedown",
              "end",
              "arrowdown",
              "pageup",
              "arrowright",
            ],
            [],
          ];

          // Group keycaps and switches by column
          const keyCapsByColumn: THREE.Mesh[][] = [];
          const switchesByColumn: THREE.Object3D[][] = [];

          // Sort switches by X position to match column order
          const sortedSwitches = allSwitches.sort(
            (a, b) => a.position.x - b.position.x
          );

          keyboardColumns.forEach((column, columnIndex) => {
            const columnKeycaps: THREE.Mesh[] = [];
            const columnSwitches: THREE.Object3D[] = [];

            column.forEach((keyName) => {
              if (keyName && individualKeys[keyName]?.current) {
                columnKeycaps.push(individualKeys[keyName].current);
              }
            });

            // Assign switches to columns based on their count
            const switchesPerColumn = Math.ceil(
              sortedSwitches.length / keyboardColumns.length
            );
            const startIndex = columnIndex * switchesPerColumn;
            const endIndex = Math.min(
              startIndex + switchesPerColumn,
              sortedSwitches.length
            );

            for (let i = startIndex; i < endIndex; i++) {
              if (sortedSwitches[i]) {
                columnSwitches.push(sortedSwitches[i]);
              }
            }

            keyCapsByColumn.push(columnKeycaps);
            switchesByColumn.push(columnSwitches);
          });

          // Add wave animation for each column to the scroll timeline
          keyCapsByColumn.forEach((columnKeycaps, columnIndex) => {
            const columnSwitches = switchesByColumn[columnIndex];

            if (columnKeycaps.length === 0 && columnSwitches.length === 0)
              return;

            // Calculate wave timing - spread across scroll timeline
            const waveProgress = columnIndex / (keyboardColumns.length - 1); // 0 to 1
            const waveStartTime = waveProgress * 2 + 0.5; // Spread wave across 2 time units

            // Animate keycaps up then down
            if (columnKeycaps.length > 0) {
              const keycapPositions = columnKeycaps.map(
                (keycap) => keycap.position
              );

              // Create temporary keyframe for wave peak
              scrolltimeline.to(
                keycapPositions,
                {
                  y: "+=0.08", // Lift keycaps up
                  duration: 0.5,
                  ease: "power2.inOut",
                },
                waveStartTime
              );

              // Return to original position
              scrolltimeline.to(
                keycapPositions,
                {
                  y: "-=0.08", // Bring keycaps back down
                  duration: 0.5,
                  ease: "power2.inOut",
                },
                waveStartTime + 0.5
              );
            }

            // Animate switches (follow keycaps with delay and less movement)
            if (columnSwitches.length > 0) {
              const switchPositions = columnSwitches.map(
                (switchObj) => switchObj.position
              );

              // Up phase (slightly delayed and lower)
              scrolltimeline.to(
                switchPositions,
                {
                  y: "+=0.04", // Less movement for switches
                  duration: 0.3,
                  ease: "power2.inOut",
                },
                waveStartTime + 0.2 // Slight delay
              );

              // Down phase
              scrolltimeline.to(
                switchPositions,
                {
                  y: "-=0.04",
                  duration: 0.3,
                  ease: "power2.inOut",
                },
                waveStartTime + 0.5
              );
            }
          });
        }
      });
  }, []);

  return (
    <group>
      <spotLight
        color={"white"}
        intensity={7 * intensity}
        position={[-0.3, 1, 5]}
        castShadow
        shadow-bias={-0.001}
        // shadow-biasT ={10}
      />
      <Environment
        background={false} // can be true, false or "only" (which only sets the background) (default: false)
        backgroundBlurriness={0} // optional blur factor between 0 and 1 (default: 0, only works with three 0.146 and up)
        backgroundIntensity={0 * intensity} // optional intensity factor (default: 1, only works with three 0.163 and up)
        backgroundRotation={[0, Math.PI / 2, 0]} // optional rotation (default: 0, only works with three 0.163 and up)
        // use a single equirectangular HDR:
        files={"/hdr/blue-studio.hdr"}
        environmentIntensity={0.14 * intensity}
        scene={undefined}
        // encoding={undefined} // adds the ability to pass a custom THREE.TextureEncoding
      />

      <group ref={keycapGroupRef}>
        <Keycap texture={1} rotation={[1, 1, 4]} position={[1, 0, 3.5]} />
        <Keycap texture={2} rotation={[1, -3, 0]} position={[1, 1, 3.5]} />
        <Keycap texture={3} rotation={[2, 5, 2.3]} position={[-1, 0.4, 4]} />
        <Keycap texture={4} rotation={[2, -3, 0]} position={[-1, -0.5, 4]} />
        <Keycap texture={5} rotation={[1, -4, 0]} position={[1.3, 0, 4]} />
        <Keycap texture={6} rotation={[3, -5, 1]} position={[1, -0.5, 4.2]} />
        <Keycap texture={7} rotation={[-1, 4.01, 0]} position={[-1, 1, 3]} />
        <Keycap texture={8} rotation={[1, -3, 0]} position={[1, 1, 4]} />
      </group>
      {/* <ambientLight color={'white'} intensity={1}/> */}

      <group
        position={[0, -0.5, 3.8]}
        rotation={[Math.PI * 0.45, -Math.PI * 0.03, 0]}
        ref={keyboardGroupRef}
      >
        <Keyboard scale={9} ref={keyboardAnimationRef} />
      </group>
    </group>
  );
};

export default Scene;
