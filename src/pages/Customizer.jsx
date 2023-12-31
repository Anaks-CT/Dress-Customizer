import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import { reader } from "../config/helpers";
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
        return <FilePicker file={file} setFile={setFile} readFile={readFile}/>;
      case "aipicker":
        return <AIpicker 
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />;
       default:
        return null;
    }
  };

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");
  
    try {
      // calling the backend to generate an ai image
      setGeneratingImg(true);
      const response = await fetch('https://project-threejs-48u7.onrender.com/api/v1/dalle', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt
        })
      });
  
      const data = await response.json(); // Parse the response body as JSON
  
      console.log(data.photo);
      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab('');
    }
  }


  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type]

    // updating the state
    state[decalType.stateProperty] = result

    // figuring our if the decaltype  is currently active
    if(!setActiveFilterTab[decalType.filterTab]){
      handleActiveFilterTab(decalType.filterTab)
    }

  }

  // are we showing the logo or are we showing the texture or are we showing both
  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
          state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
          state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab(prevState => ({... prevState, [tabName]: !prevState[tabName]}))
  }



  const readFile = type => {
    reader(file)
      .then(result => {
        handleDecals(type, result)
        setActiveEditorTab('')
      })
  }

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
                handleClick={() => {handleActiveFilterTab(tab.name)}}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Customizer;
