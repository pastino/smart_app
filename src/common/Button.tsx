import React, {FunctionComponent} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

interface Props {
  width: number;
  height: number;
  text: string;
  backColor: string;
  color: string;
  onClick: () => void;
}

const Button: FunctionComponent<Props> = ({
  width,
  height,
  text,
  backColor,
  color,
  onClick,
}) => {
  return (
    <TouchableOpacity onPress={() => onClick()}>
      <Wrapper
        width={width}
        height={height}
        backgroundColor={backColor}
        // style={{width, height, backgroundColor: backColor}}
      >
        <Text color={color}>{text}</Text>
      </Wrapper>
    </TouchableOpacity>
  );
};

interface WrapperProps {
  width: number;
  height: number;
  backgroundColor: string;
}

const Wrapper = styled.View<WrapperProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

interface TextProps {
  color: string;
}

const Text = styled.Text<TextProps>`
  color: ${(props) => props.color};
`;

export default Button;
