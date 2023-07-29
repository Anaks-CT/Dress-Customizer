import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import {
  headContentAnimation,
  headContainerAnimation,
  slideAnimation,
  headTextAnimation,
} from "../config/motion";

function Home() {
  // to use the initial states
  const snap = useSnapshot(state);
  return (
      <div></div>
  );
}

export default Home;
