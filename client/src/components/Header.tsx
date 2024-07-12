import { ReactNode, useCallback, useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import styled from "styled-components";
import { Form } from "./form";
import { apiPostContent, useAppDispatch } from "../redux";
import { ContentState, ContentTypes } from "../config";

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
    children: ReactNode;
    onItemAdd: (label: string) => void;
};

export const Header = ({ children }: HeaderProps) => {

    const dispatch = useAppDispatch();

    const [showForm, setShowForm] = useState(false);

    const handleAdd = useCallback(
        () => {
            setShowForm(true);
        },
        []
    );

    const handleCancel = useCallback(
        () => {
            setShowForm(false);
        },
        []
    );

    const handleSubmit = useCallback(
        (title: string) => {
            dispatch(
                apiPostContent({
                  body: {
                    title,
                    text: 'text',
                    state: ContentState.InProgress
                  },
                  type: ContentTypes.Task,
                  onSuccess: () => {
                    setShowForm(false);
                  }
                })
              );
        },
        [dispatch]
    );

    return (
        <StyledDiv>
            <h1>{children}</h1>
            {showForm ?
                <Form
                    initialValue={''}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
                :
                <button
                    type="button"
                    onClick={handleAdd}
                >
                    <PlusIcon />
                </button>
            }
        </StyledDiv>
    );
};
