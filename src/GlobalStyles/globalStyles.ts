import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *{
        box-sizing: border-box;
        /* margin: 0; */
        /* padding: 0; */
        color: aliceblue;

    }
    body{
        margin: 0;
        font-family: 'Roboto', sans-serif;
    }
    
`;
export default GlobalStyles;
