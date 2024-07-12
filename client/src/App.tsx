import { Provider } from 'react-redux';
import { Container } from "./components/Container";
import { Layout } from "./components/Layout";
import { List } from "./components/List";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { store } from './redux';

export const App = () => (
    <Provider store={store}>
        <ThemeProvider>
            <Container>
                <Layout>
                    <Header onItemAdd={() => console.warn("unimplemented")}>To Do app</Header>
                    <List />
                    <Footer />
                </Layout>
            </Container>
        </ThemeProvider>
    </Provider>
);
