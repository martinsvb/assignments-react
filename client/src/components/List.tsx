import { useEffect } from "react";
import styled from "styled-components";
import { useShallowEqualSelector, selectContentList, apiGetContentList, useAppDispatch } from "../redux";
import { ContentState, ContentTypes } from "../config";
import { ListItem } from "./ListItem";

const StyledList = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledTodosWrapper = styled.div<{bgcolor: string}>`
    background-color: ${({bgcolor, theme}) => theme.colors[bgcolor]};
    margin-top: 8px;
    margin-bottom: 8px;
    padding: 8px;
    padding-bottom: 0;
    border-radius: 4px;
`;

export const List = () => {

    const dispatch = useAppDispatch();
    
    const { data, loaded } = useShallowEqualSelector((state) => selectContentList(state, ContentTypes.Task));
    
    useEffect(
        () => {
        if (!loaded) {
            dispatch(apiGetContentList({type: ContentTypes.Task}));
        }
        },
        [loaded, dispatch]
    );

    const inProgress = data.filter(({state}) => state !== ContentState.Done);

    const done = data.filter(({state}) => state === ContentState.Done);

    return (
        <StyledList>
            {!!inProgress.length &&
                <StyledTodosWrapper bgcolor="orange5">
                    {inProgress.map((todo) => (
                        <ListItem
                            key={todo.id}
                            {...todo}
                        />
                    ))}
                </StyledTodosWrapper>
            }
            {!!done.length &&
                <StyledTodosWrapper bgcolor="green5">
                    {done.map((todo) => (
                        <ListItem
                            key={todo.id}
                            {...todo}
                        />
                    ))}
                </StyledTodosWrapper>
            }
        </StyledList>
    )
}
