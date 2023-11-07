import React from 'react';

import {Icon} from 'react-native-vector-icons/FontAwesome';

export const MyIcon = ({ name, size, color, style }) => {
  return (
    <Icon
      name={name}
      size={size}
      color={color}
      style={style}
    />
  );
};
