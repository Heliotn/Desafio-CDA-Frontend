import styled from 'styled-components';

export const CharactersWrapper = styled.div`
    display:flex;
    flex-direction: row;
`;

export const CharacterContainer = styled.div<{active:boolean}>`
    width:40px;
    height:40px;
    margin:5px;
    border-radius:.5vh;
    text-align:center;
    align-content:center;
    text-transform:uppercase;
    background-color:${props => props.active ? props.theme.yellowColor : props.theme.whiteColor};
    color:${props => props.theme.blackColor};
    font-weight:700;
    transition: background-color .2s linear;
`;