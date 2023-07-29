import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import config from "../config/config";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { DecalTypes, EditorTabs, FilterTabs } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  AIpicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../components";

function Customizer() {
  const snap = useSnapshot(state);

  // for uploading file
  const [file, setFile] = useState("");
  // for AI prompt
  const [prompt, setPrompt] = useState("");
  // loading state
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    // switch tab is going to look the active editor tab
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker />;
      case "aipicker":
        return <AIpicker />;
       default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => {setActiveEditorTab(tab.name)}} />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              handleClick={() => (state.intro = true)}
              title="Go Back"
              type="filled"
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                handleClick={() => {}}
                isFilterTab
                isActiveTab=""
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Customizer;
