import Context from "./Context";
import { useState } from 'react'

function ContextProvider(props) {
    const [isDrop, setIsDrop] = useState(false);

    function setIsDropVal(val) {
        setIsDrop(val);
    }

    return (
        <Context.Provider value={{
            isDrop: isDrop,
            setIsDropVal: setIsDropVal
        }}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider