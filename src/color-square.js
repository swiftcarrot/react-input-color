/** @jsx jsx */
import { jsx } from '@emotion/core';

const ColorSquare = ({color, onClick, disabled}) => {
  return (
    <div
      onClick={onClick}
      css={{...styles.square, ...(onClick && styles.button)}}
      style={{ cursor: (onClick && !disabled) ? 'pointer' : 'normal' }}
    >
      <div css={styles.content} style={{ backgroundColor: color }} />
    </div>
  );
};

ColorSquare.defaultProps = {
  onClick: undefined,
  disabled: false,
  recommendedColors: []
};

const styles = {
  button: {
    padding: 3,
    border: '1px solid #bebebe',
    borderRadius: 4,
  },
  square: {
    display: 'flex',
    width: 30,
    height: 30,
  },
  content: {
    flex: 1,
  }
};

export default ColorSquare;
