import { Meta, StoryObj } from "@storybook/react";

import { List } from "../List";
import { ListItem } from "../ListItem";
import { ContentState } from "../../config";

const meta = {
    title: "List",
    component: List,
} as Meta<typeof List>;
export default meta;

type Story = StoryObj<typeof List>;

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
        "id": "e377433d-3b92-4dfc-a38a-2f581f196b16",
        "title": "next test",
        "text": "text",
        "type": "task",
        "state": ContentState.InProgress,
        "published": false,
        "createdAt": "2024-07-13T12:46:48.087Z",
        "updatedAt": "2024-07-13T12:46:48.087Z"
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
    {
        "id": "34e942c8-3ed4-42d3-a8b4-504628e325fe",
        "title": "anther test",
        "text": "text",
        "type": "task",
        "state": ContentState.Done,
        "published": false,
        "createdAt": "2024-07-13T16:46:05.024Z",
        "updatedAt": "2024-07-13T16:46:05.024Z"
    }
]

export const WithItems: Story = {
    args: {
        children: [
            <ListItem {...data[0]} />,
            <ListItem {...data[1]} />,
            <ListItem {...data[2]} />,
        ],
    },
};
