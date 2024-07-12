import { useState } from "react";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import styled from "styled-components";

import { Input } from "./Input";

const FormStyled = styled.form`
    display: flex;
`;

type FormProps = {
    initialValue: string;
    onSubmit: (value: string) => void;
    onCancel: () => void;
};

export const Form = (props: FormProps) => {
    const { initialValue, onSubmit, onCancel } = props;

    const [inputValue, setInputValue] = useState(initialValue);

    return (
        <FormStyled
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(inputValue);
            }}
            onReset={() => {
                onCancel();
            }}
        >
            <Input value={inputValue} onValueChange={setInputValue} />
            <button type={"submit"}>
                <CheckIcon />
            </button>
            <button type={"reset"}>
                <Cross1Icon />
            </button>
        </FormStyled>
    );
};
