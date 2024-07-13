import { useState, useCallback } from "react";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import styled from "styled-components";
import { Checkbox } from "./Checkbox";
import { ContentData, ContentState, ContentTypes } from "../config";
import { apiDeleteContent, apiPatchContent, useAppDispatch } from "../redux";
import { Form } from "./form";
import { Button } from "./Button";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`;

const Label = styled.label`
    margin-left: 15px;
`;

const Buttons = styled.div`
    display: flex;
    margin-left: auto;
`;

export const ListItem = ({ title, id, state }: ContentData) => {

    const [showForm, setShowForm] = useState(false);

    const dispatch = useAppDispatch();

    const handleEdit = useCallback(
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
            if (id) {
                dispatch(
                    apiPatchContent({
                        body: { title },
                        id,
                        type: ContentTypes.Task,
                        onSuccess: () => {
                            setShowForm(false);
                        }
                    })
                );
            }
        },
        [dispatch, id]
    );

    const handleToggleTodo = useCallback(
        (checked: boolean) => {
            if (id) {
                dispatch(
                    apiPatchContent({
                        body: {state: checked ? ContentState.Done : ContentState.InProgress},
                        id,
                        type: ContentTypes.Task
                    })
                );
            }
        },
        [dispatch, id]
    );

    const handleDelete = useCallback(
        () => {
            if (id) {
                dispatch(
                    apiDeleteContent({
                        id,
                        type: ContentTypes.Task,
                        onSuccess: () => {
                            alert(`Todo: ${title} was deleted.`);
                        }
                    })
                );
            }
        },
        [dispatch, id]
    );

    return (
        <StyledDiv>
            {showForm ?
                <Form
                    initialValue={title}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
                :
                <>
                    <Checkbox checked={state === ContentState.Done} onCheckedChange={handleToggleTodo} />
                    <Label>{title}</Label>
                    <Buttons>
                        <Button onClick={handleEdit} mr={0.5}>
                            <Pencil1Icon />
                        </Button>
                        <Button onClick={handleDelete}>
                            <TrashIcon />
                        </Button>
                    </Buttons>
                </>
            }
        </StyledDiv>
    );
};
