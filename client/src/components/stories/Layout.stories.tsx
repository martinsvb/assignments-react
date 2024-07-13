import { Meta, StoryObj } from "@storybook/react";

import { Layout } from "../Layout";
import { Header } from "../Header";
import { List } from "../List";
import { Footer } from "../Footer";

const meta = {
    title: "Layout",
    component: Layout,
    argTypes: {
        onItemAdd: { action: "item added" },
    },
} as Meta<typeof Layout>;
export default meta;
type Story = StoryObj<typeof Layout>;

export const Default: Story = {
    args: {
        children: (
            <>
                <Header onItemAdd={() => console.warn("unimplemented")}>Example app</Header>
                <List />
                <Footer />
            </>
        ),
    },
};
