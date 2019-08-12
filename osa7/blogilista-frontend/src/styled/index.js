/* eslint-disable no-undef */
import styled from 'styled-components';
import {Link} from 'react-router-dom';

// Variables
const bgColor = '#f5f5f5';
const bgColorDarker = '#e0b0e0';
const fontFamily = 'sans-serif';

export const Button = styled.button`
  background-color: pink;
  border: 2px solid hotpink;
  border-radius: 2px;
  font-family: ${fontFamily};
  margin: 0.2em;
  padding: 0.1em 0.8em;
  &:hover {
    background-color: hotpink;
    border-color: #ffaabb;
  }
`;

export const H1 = styled.h1`
  color: palevioletred;
  font-style: italic;
`;

export const Em = styled.em`
  color: palevioletred;
  font-style: italic;
  font-size: 110%;
  margin-top: 2em;
`;

export const NavBarLink = styled(Link)`
  padding-right: 1em;
`;

export const NavBarText = styled.span`
  padding-right: 1em;
`;

export const NavBar = styled.div`
  display: flex;
  background-color: ${bgColorDarker};
  margin-bottom: 5em;
  padding: 0.5em;
`;

export const Page = styled.div`
  background-color: ${bgColor};
  font-family: ${fontFamily};
  margin-top: 0px;
  padding: 0px;
`;

export const StyledNotification = styled(styled.div`
  ${(props) => !props.inactive ? 'display: none;' : `
    border-radius: 5px;
    border-style: solid;
    display: inherit;
    font-size: 20px;
    margin-bottom: 10px;
    padding: 10px;`}`
)`${(props) => props.type === 'success' ? `
  background-color: lightgreen;
  color: darkgreen` : props.type === 'error' ? `
  background-color: lightcoral;
  color: darkred;` : ''}`;
