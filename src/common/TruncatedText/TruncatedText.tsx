import React, { useState, useRef } from 'react';
import { Tooltip, Typography, TypographyVariant, Box } from '@mui/material';

const TO_PX_CONVERSION_NUMBER = 7; // TODO - should be caulculated based on font size
type Props = {
  text: string;
  width: number;
  typographyVariant: TypographyVariant;
  fontWeight?: number;
};

export const TruncatedText = ({ text, width, typographyVariant, fontWeight }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const textRef = useRef(null);

  const isTextOverflowing = text.length * TO_PX_CONVERSION_NUMBER > width;
  const truncatedText = isTextOverflowing
    ? `${text.slice(0, width / TO_PX_CONVERSION_NUMBER)}...`
    : text;

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <Box
      style={{ width: `${width}px`, overflow: 'hidden', textOverflow: 'ellipsis' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Tooltip title={text} open={isTextOverflowing ? showTooltip : false}>
        <Typography variant={typographyVariant} fontWeight={fontWeight}>
          {truncatedText}
        </Typography>
      </Tooltip>
    </Box>
  );
};
