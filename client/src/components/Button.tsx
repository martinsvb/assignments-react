import styled from "styled-components";

type ButtonBgColors = 'grass9' | 'olive9' | 'orange9';

interface ButtonProps {
    bgcolor?: ButtonBgColors;
    size?: string;
    color?: string;
    m?: number;
    mr?: number;
    ml?: number;
    mt?: number;
    mb?: number;
}

export const Button = styled.button<ButtonProps>`
    display: flex;

    justify-content: center;
    align-items: center;

    cursor: pointer;

    width: ${({size}) => size || '30px'};
    height: ${({size}) => size || '30px'};

    m: ${({m}) => m ? `${m * 8}px` : undefined};
    margin-right: ${({mr}) => mr ? `${mr * 8}px` : undefined};
    margin-left: ${({ml}) => ml ? `${ml * 8}px` : undefined};
    margin-top: ${({mt}) => mt ? `${mt * 8}px` : undefined};
    margin-bottom: ${({mb}) => mb ? `${mb * 8}px` : undefined};

    background-color: ${({bgcolor, theme}) => bgcolor ? theme.colors[bgcolor] : 'transparent'};
    border: 0;
    border-radius: 50%;

    color: ${({color}) => color || '#000'};

    &:hover {
        background-color: ${({bgcolor, theme}) => {
            let color = 'olive';
            let scale = 5;
            if (bgcolor) {
                color = bgcolor.substring(0, bgcolor.length - 1)
                scale = Number(bgcolor.slice(-1)) + 1;
            }

            return theme.colors[`${color}${scale}`]
        }};
    }
`;
