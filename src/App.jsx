import { useState } from "react";
import ColorList from "./Components/ColorList";
import Form from "./Components/Form";
import Values from "values.js";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [colors, setColors] = useState(new Values("#30bb91").all(10));
  const [isError, setIsError] = useState(true);
  // toast.error("error!!!");

  function hexToRGB(hex) {
    hex = hex.replace("#", "");

    if (hex.length === 3) {
      hex = hex
        .split("")
        .map(function (char) {
          return char + char;
        })
        .join("");
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
  }
  const luminance = ({ r, g, b }) => {
    return 0.299 * r + 0.587 * g + 0.114 * b;
  };

  const addColors = (color, diff) => {
    try {
      const newColors = new Values(color).all(diff);
      setIsError(false);
      if (diff <= 100 && diff > 0)
        toast.success(
          `Displaying ${Math.floor(100 / diff)} shades and ${Math.floor(
            100 / diff
          )} tints for: ${color}`
        );
      else {
        toast.error(
          "Cannot display any shades or tints as value provided is out of range(0-100]"
        );
        setIsError(true);
      }
      setColors(newColors);
    } catch (e) {
      setIsError(true);
      toast.error(e.message);
      // console.log(e);
    }
  };

  return (
    <main>
      <Form addColors={addColors} hexToRGB={hexToRGB} luminance={luminance} />
      <ColorList colors={colors} setIsError={setIsError} />
      <ToastContainer position={isError ? "top-center" : "bottom-center"} />
    </main>
  );
};
export default App;
