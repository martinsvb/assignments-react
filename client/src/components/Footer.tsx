import styled from "styled-components";
import { selectTasksCount, useShallowEqualSelector } from "../redux";

const FooterStyled = styled.footer`
    display: flex;

    margin-top: 15px;
    padding-top: 15px;

    border-top: 1px solid;
    border-color: ${(props) => props.theme.colors.olive6};

    margin-top: auto;
`;

export const Footer = () => {

    const { inProgress, done } = useShallowEqualSelector(selectTasksCount);

    return (
        <FooterStyled>
            Todo: {inProgress}
            {`, `}
            Done: {done}
        </FooterStyled>
    );
};
