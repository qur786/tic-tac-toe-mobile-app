import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

interface IconComponentProps {
  name: string;
  color: string;
  size?: number;
}

export function IconComponent({
  name,
  color,
  size,
}: IconComponentProps): JSX.Element {
  return <Icon name={name} color={color} size={size ?? 24} />;
}
