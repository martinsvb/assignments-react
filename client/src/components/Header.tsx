import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import styled from "styled-components";

const StyledDiv = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        display: flex;

        justify-content: center;
        align-items: center;
    
        cursor: pointer;

        width: 35px;
        height: 35px;

        background-color: ${(props) => props.theme.colors.grass9};
        border: 0;
        border-radius: 50%;

        color: #fff;
    }
`;

type HeaderProps = {
    children: React.ReactNode;
    onItemAdd: (label: string) => void;
};

export const Header = ({ children }: HeaderProps) => {

    return (
        <StyledDiv>
            <h1>{children}</h1>
            <button
                type="button"
            >
                <PlusIcon />
            </button>
        </StyledDiv>
    );
};
