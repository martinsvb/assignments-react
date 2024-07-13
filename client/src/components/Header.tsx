import { ReactNode, useCallback, useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import styled from "styled-components";
import { Form } from "./form";
import { apiPostContent, useAppDispatch } from "../redux";
import { ContentState, ContentTypes } from "../config";
import { Button } from "./Button";

const StyledDiv = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
                <Button
                    type="button"
                    onClick={handleAdd}
                    size="35px"
                    bgcolor="grass9"
                    color="#fff"
                >
                    <PlusIcon />
                </Button>
            }
        </StyledDiv>
    );
};
