import { Meta, StoryObj } from "@storybook/react";
import { CheckIcon, Cross1Icon, Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import styled from "styled-components";

import { Button } from "./Button";

const StyledWrapper = styled.div`
    width: 100%;
`;

const meta = {
    title: "Button",
    component: StyledWrapper,
} as Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof Button>;

const StyledList = styled.div`
    display: flex;
    flex-direction: column;
    width: 600px;
`;

const StyledItem = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    margin-top: 8px;
`;

const StyledText = styled.p`
    display: flex;
`;

export const Default: Story = {
    args: {
        children: (
            <>
                <StyledList>
                    <StyledItem>
                        <StyledText>Bigger primary button</StyledText>
                        <Button
                            type="button"
                            onClick={() => null}
                            size="35px"
                            bgcolor="grass9"
                            color="#fff"
                        >
                            <PlusIcon />
                        </Button>
                    </StyledItem>
                    <StyledItem>
                        <StyledText>Primary button</StyledText>
                        <Button
                            type="button"
                            onClick={() => null}
                            bgcolor="grass9"
                            color="#fff"
                        >
                            <CheckIcon />
                        </Button>
                    </StyledItem>
                    <StyledItem>
                        <StyledText>Secondary button</StyledText>
                        <Button
                            type="button"
                            onClick={() => null}
                            bgcolor="olive9"
                            color="#fff"
                        >
                            <Cross1Icon />
                        </Button>
                    </StyledItem>
                    <StyledItem>
                        <StyledText>Action button</StyledText>
                        <Button onClick={() =>  null}>
                            <Pencil1Icon />
                        </Button>
                    </StyledItem>
                </StyledList>
            </>
        ),
    },
};
