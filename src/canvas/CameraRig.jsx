
import { useFrame } from "@react-three/fiber"
import {easing} from 'maath'
import { useSnapshot } from "valtio"
import state from "../store"
import { useRef } from "react"

function CameraRig({children}) {

    const group = useRef()
    const snap = useSnapshot(state)
    
    // setting the model rotation smoothly

    // useframe hook allows you execute code on every rendered frame
    useFrame((state, delta) => {
        // to make it responsive
        const isBreakpoint = window.innerWidth <= 1260
        const isMobile = window.innerWidth <= 600

        // setting the initial position of the model
        let targetPosition = [-0.4, 0, 2]
        if(snap.intro){
            if(isBreakpoint) targetPosition = [0, 0, 2]
            if(isMobile) targetPosition = [0, 0.2, 2.5]
        }else{
            isMobile ? targetPosition = [0, 0, 2.5] : targetPosition = [0, 0, 2]
        }

        // settting model camera position
        easing.dampE(state.camera.position, targetPosition, 0.25, delta)

        easing.dampE(
            group.current.rotation,
            [state.pointer.y / 10, -state.pointer.x / 5, 0], //X Y Z
            0.25, // smooth time
            delta // difference fromm the last frame that happened
        )
    })

    return (
    <group ref={group}>
        {children}
    </group>
  )
}

export default CameraRig