import styled from 'styled-components';

export const Button = styled.button`
    padding: 10px 20px;
    margin: 10px;
    background-color: ${props => props.theme.whiteColor};
    color:${props => props.theme.primaryBlueColor};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 10px 20px;
`;

export const ShadowButton = styled(Button)`
    -webkit-box-shadow: 0px 5px 30px 0px ${props => props.theme.blackColor};
    -moz-box-shadow: 0px 5px 30px 0px ${props => props.theme.blackColor};
    box-shadow: 0px 5px 30px 0px ${props => props.theme.blackColor};
`;

export const CloseButton = styled(Button)`
    position: absolute;
    top: 5px;
    right: 5px;
`;