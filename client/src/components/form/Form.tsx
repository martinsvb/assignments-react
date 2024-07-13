import { useState } from "react";
import { CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
import styled from "styled-components";

import { Input } from "./Input";
import { Button } from "../Button";

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
            <Button
                type={"submit"}
                bgcolor="grass9"
                color="#fff"
                ml={1}
                mr={0.5}
            >
                <CheckIcon />
            </Button>
            <Button
                type={"reset"}
                bgcolor="olive9"
                color="#fff"
            >
                <Cross1Icon />
            </Button>
        </FormStyled>
    );
};
