import React from "react";
import { toast } from "react-toastify";

function SingleColor({ index, color, colors, setIsError }) {
  const { hex, weight } = color;
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

  const rgbValue = hexToRGB(hex);
  const lum = luminance(rgbValue);

  const copyToClipboard = async () => {
    console.log(hex);

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(`#${hex}`);
      setIsError(false);
      toast.success("Color copied to clipboard!");
    } else {
      setIsError("true");
      toast.error("Clipboard access not available");
    }
  };

  return (
    <article
      // className={
      //   index > colors.length / 3 || (colors.length == 1 && hex === "000000")
      //     ? "color color-light"
      //     : "color"
      // }
      className={lum < 128 ? "color color-light" : "color"}
      style={{ background: `#${hex}` }}
      onClick={copyToClipboard}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color-value">#{hex}</p>
    </article>
  );
}

export default SingleColor;
