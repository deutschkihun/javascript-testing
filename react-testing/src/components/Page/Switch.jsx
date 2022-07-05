import React, {useState} from 'react'

export const Switch = () => {
    const [disabled, setDisabled] = useState(false);
    const [on, setOn] = useState(false);
  
    const handleClick = () => {
      setDisabled(true);
      // TODO: clean up
      setTimeout(() => {
        setOn(!on);
        setDisabled(false);
      }, 500);
    };
  
    return (
      <button disabled={disabled} onClick={handleClick}>
        {on ? "ON" : "OFF"}
      </button>
    );
}

