import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import {
  headContentAnimation,
  headContainerAnimation,
  slideAnimation,
  headTextAnimation,
} from "../config/motion";
import { CustomButton } from "../components";

function Home() {
  // to use the initial states
  const snap = useSnapshot(state);
  return (
    <AnimatePresence>
      {/* if home page is there if render it by giving animation */}
      {snap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            {/* we provide left and down animation to the logo here */}
            <img
              src="./threejs.png"
              alt="logo"
              className="w-8 h-8 object-contain"
            />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET'S <br className="xl:block hidden" /> DO IT.
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-gray-600 text-base">
                Create your unique and exlusive shirt with our brand new 3D
                customization tool. <strong> Unleash your imagination</strong>{" "}
                and define your own style.
              </p>

              <CustomButton type="filled" title="Customize It" 
              // updating state in valtio
              handleClick={() => state.intro = false}
              customStyles = 'w-fit px-4 py-2.5 font-bold text-sm'
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default Home;
