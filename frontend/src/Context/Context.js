import { createContext } from "react";

const Context = createContext({
    isDrop: false,
    setIsDropVal: () => { }
})

export default Context;