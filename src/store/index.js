import { proxy } from "valtio";

// its just like a react context. what ever you define here can be used anywhere in your application

const state = proxy({
    intro: true, // to check if we are currently in home page or are we not
    color: '#EFBD48', // default color
    isLogoTexture: true, // to check if we are currently dispaying the logo of our shirt
    isFullTexture: false,
    logoDecal: './threejs.png', // initial logo before any custom logo is provided
    fullDecal: './threejs.png' // initial full texture 
})

export default state
