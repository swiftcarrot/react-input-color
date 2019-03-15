/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useEffect } from 'react';
import { hex2rgb, rgb2hsv } from 'color-functions';
import ColorPicker from './color-picker';

export function parseColor(hexColor) {
  const rgb = hex2rgb(hexColor);
  const { r, g, b } = rgb;
  const hsv = rgb2hsv(r, g, b);

  return { ...hsv, r, g, b, a: 100, hex: hexColor };
}

const InputColor = ({ initialHexColor, onChange, ...props }) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(parseColor(initialHexColor));

  useEffect(() => {
    changeColor(parseColor(initialHexColor));
  }, [initialHexColor]);

  function changeColor(color) {
    if (onChange) {
      setColor(color);
      onChange(color);
    }
  }

  function handleClick() {
    setOpen(open => !open);
  }

  function handleCancel() {
    setOpen(false);
  }

  return (
    <span
      {...props}
      css={css`
        position: relative;
        display: inline-block;
        width: 49px;
        height: 24px;
        padding: 4px;
        padding-right: 15px;
        background-color: #ffffff;
        border: 1px solid #bebebe;
        border-radius: 3px;
        user-select: none;
      `}
    >
      <span
        css={css`
          display: block;
          width: 100%;
          height: 100%;
          cursor: pointer;
        `}
        style={{ backgroundColor: color.hex }}
        onClick={handleClick}
      />
      <span
        css={css`
          position: absolute;
          display: block;
          top: 0;
          right: 3px;
          cursor: pointer;
          color: #333;
        `}
        onClick={handleCancel}
      >
        &times;
      </span>
      {open ? (
        <div
          css={css`
            position: absolute;
            padding: 10px;
            background-color: #f5f5f5;
            z-index: 9999;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
          `}
        >
          <ColorPicker color={color} onChange={changeColor} />
        </div>
      ) : null}
    </span>
  );
};

export default InputColor;
