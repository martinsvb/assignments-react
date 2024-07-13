import { useState, useCallback } from "react";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import styled from "styled-components";
import { Checkbox } from "./Checkbox";
import { ContentState, ContentTypes } from "../config";
import { apiPatchContent, useAppDispatch } from "../redux";
import { Form } from "./form";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`;

const Label = styled.label`
    margin-left: 15px;
`;

const Buttons = styled.div`
    margin-left: auto;
`;

export type ListItemProps = {
    id?: string;
    label: string;
    isDone: boolean;
    onItemDelete: () => void;
};

export const ListItem = ({ label, id, isDone, onItemDelete }: ListItemProps) => {

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

    return (
        <StyledDiv>
            {showForm ?
                <Form
                    initialValue={label}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
                :
                <>
                    <Checkbox checked={isDone} onCheckedChange={handleToggleTodo} />
                    <Label>{label}</Label>
                    <Buttons>
                        <button onClick={handleEdit}>
                            <Pencil1Icon />
                        </button>
                        <button onClick={() => onItemDelete()}>
                            <TrashIcon />
                        </button>
                    </Buttons>
                </>
            }
        </StyledDiv>
    );
};
