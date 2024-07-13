import type { Parameters, Decorator } from "@storybook/react";
import { Provider } from 'react-redux';
import { ThemeProvider } from "../src/components/providers/ThemeProvider";
import { store } from '../src/redux';

export const decorators: Decorator[] = [
    (Story) => (
        <Provider store={store}>
            <ThemeProvider>
                <Story />
            </ThemeProvider>
        </Provider>
    ),
];

export const parameters: Parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
};
