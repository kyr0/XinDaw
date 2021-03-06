import styled from "react-emotion";
import { transitions } from "src/styles/effects";
import { fonts, colors } from "src/styles/base";

export const Panel = styled('div')`
  width: ${(props:any) => props.w}%;
  height: 99vh;
  overflow-y: auto;
  float: left;
  padding: 1%
`;

export const Settings = styled('div')`
  display: ${(props:any) => props.open ? 'block' : 'none'};  
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0,0,0,0.9);
  top: 0px;
  left: 0px;
  padding: 20px;
  z-index: 10;
  color: white;
`;

export const BlockTitle = styled('h3')`
    ${fonts.base};
    font-size: ${(props:any) => props.s ? props.s : 16}px;
    text-transform: uppercase;
    font-weight: bold;
    margin: 30px 0px 20px 0px;
`

export const Li = styled('li')`
    ${fonts.base};
    font-size: 12px;
    margin: 0px 0px 0px 10px;
`

export const Ol = styled('ol')`
    ${fonts.base};
    font-size: 12px;
    margin: 0px 0px 0px 10px;
`

export const Input =  styled('input')`
  border: none;
  padding: 10px;
  background: rgba(226, 226, 226, 1);
`;

export const Button = styled('button')`
  border: none;
  padding: 10px;
  margin: 5px;
  background: none;
  border: 2px inset black;
  color: black;
  cursor: pointer;
  ${transitions.transition1};
  &:hover {
    background: black;
    color: white;
  }
`;

export const ButtonSmall = styled('button')`
  border: none;
  padding: 5px;
  background: ${colors.grey1};
  color: black;
  cursor: pointer;
  font-size: 10px;
  margin-left: 4px;
  margin-bottom: 4px;
  ${transitions.transition1};
  &:hover {
    background: black;
    color: white;
  }
`;