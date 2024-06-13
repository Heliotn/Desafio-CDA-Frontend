import styled from 'styled-components';

export const H1 = styled.h1`
    font-size:1.8rem;
    font-weight:700;
    color:${props => props.theme.whiteColor};
    text-transform:uppercase;
`;

export const Span = styled.span`
    font-size:0.8rem;
    color:${props => props.theme.whiteColor};
`;