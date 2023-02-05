/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useEffect } from 'react';
import Popover from '@xkit/popover';
import ColorPicker from './color-picker';
import { parseColor } from './utils';

const InputColor = ({ initialValue, onChange, placement, disabled, recommendedColors, ...props }) => {
  const [color, setColor] = useState(parseColor(initialValue));

  useEffect(() => {
    changeColor(parseColor(initialValue));
  }, [initialValue]);

  function changeColor(color) {
    if (onChange) {
      setColor(color);
      onChange(color);
    }
  }

  return (
    <Popover
      placement={placement}
      body={(
        <ColorPicker
          color={color}
          onChange={changeColor}
          disabled={disabled}
          recommendedColors={recommendedColors}
        />
      )}
    >
      <span
        {...props}
        css={css`
          position: relative;
          display: inline-block;
          box-sizing: border-box;
          width: 49px;
          height: 24px;
          padding: 4px;
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
          style={{ backgroundColor: color.rgba }}
        />
      </span>
    </Popover>
  );
};

InputColor.defaultProps = {
  placement: 'bottom',
  disabled: false,
  recommendedColors: []
};

export default InputColor;
