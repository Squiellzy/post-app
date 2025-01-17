import React from "react";
import './app-header.css';
import styled from "styled-components";

const Header = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    h1 {
        font-size: 26px;
        color: ${props => props.colored ? 'red' : 'black'};
        &:hover {
            color: blue;
        }
    }
    h2 {
        font-size: 1.2rem;
        color: grey;
    }
`
const AppHeader = ({liked, allPost}) => {
    return(
        <Header as="a">
            <h1>Vlad Yudenko</h1>
            <h2>{allPost} записів, з них уподобали {liked}</h2>
        </Header>
    )
}
export default AppHeader;