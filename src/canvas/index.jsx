import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import Shirt from "./Shirt";
import CameraRig from "./CameraRig";
import Backdrop from "./Backdrop";

function CanvasModel() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Canvas
        // to make the shirt big
        shadows
        camera={{ position: [0, 0, 0], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
        className="w-full max-w-full h-full transition-all ease-in"
      >
        <ambientLight intensity={0.5} />
        <Environment preset="city" />

        <CameraRig>
          <Backdrop />
          <Center>
            <Shirt />
          </Center>
        </CameraRig>
      </Canvas>
    </div>
  );
}

export default CanvasModel;
