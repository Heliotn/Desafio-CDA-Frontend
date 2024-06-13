import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
        font-family: 'Roboto', sans-serif;
    }

    body {

        background: transparent;
        -webkit-font-smoothing: antialiased;
        overflow: hidden;
    }

    button {
        cursor: pointer;
        outline: 0;
        border:none;
    }

    input {
        all: unset;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
`;
