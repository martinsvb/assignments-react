import { Meta, StoryObj } from "@storybook/react";

import { ListItem } from "../ListItem";
import { ContentState } from "../../config";

const meta = {
    title: "List Item",
    component: ListItem,
} as Meta<typeof ListItem>;

export default meta;

type Story = StoryObj<typeof ListItem>;

const data = [
    {
        "id": "35fa624c-3f81-452d-acf3-50168d2853f6",
        "title": "new test",
        "text": "text",
        "type": "task",
        "state": ContentState.InProgress,
        "published": false,
        "createdAt": "2024-07-13T13:09:00.340Z",
        "updatedAt": "2024-07-13T13:09:14.601Z"
    },
    {
        "id": "732caada-9a24-46d6-828c-43bf590eeb25",
        "title": "test",
        "text": "text",
        "type": "task",
        "state": ContentState.Done,
        "published": false,
        "createdAt": "2024-07-13T12:46:40.854Z",
        "updatedAt": "2024-07-13T12:47:14.978Z"
    },
]

export const ToDo: Story = {
    args: data[0],
};

export const Done: Story = {
    args: data[1],
};
