import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

interface IconComponentProps {
  name: string;
  size?: number;
}

export function IconComponent({ name, size }: IconComponentProps): JSX.Element {
  let component = (
    <Icon name="question-circle" color="#DAE0E2" size={size ?? 24} />
  );

  switch (name) {
    case "x":
      component = <Icon name="times" color="#45CE30" size={size ?? 24} />;
      break;
    case "o":
      component = <Icon name="circle-thin" color="#F0DF87" size={size ?? 24} />;
      break;
    default:
      break;
  }
  return component;
}
