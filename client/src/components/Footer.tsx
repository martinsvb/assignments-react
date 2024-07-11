import styled from "styled-components";

const FooterStyled = styled.footer`
    display: flex;

    margin-top: 15px;
    padding-top: 15px;

    border-top: 1px solid;
    border-color: ${(props) => props.theme.colors.olive6};

    margin-top: auto;
`;

type FooterProps = {
    todoItems?: number;
    doneItems?: number;
};

export const Footer = ({ todoItems = 0, doneItems = 0 }: FooterProps) => {

    return (
        <FooterStyled>
            Todo: {todoItems}
            {`, `}
            Done: {doneItems}
        </FooterStyled>
    );
};
