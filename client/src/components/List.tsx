import { useEffect } from "react";
import styled from "styled-components";
import { useShallowEqualSelector, selectContentList, apiGetContentList, useAppDispatch } from "../redux";
import { ContentTypes } from "../config";

const StyledList = styled.div`
    display: flex;
    flex-direction: column;
`;

export const List = () => {

    const dispatch = useAppDispatch();
    
    const { data, isLoading, loaded } = useShallowEqualSelector((state) => selectContentList(state, ContentTypes.Task));
    
    useEffect(
        () => {
        if (!loaded) {
            dispatch(apiGetContentList({type: ContentTypes.Task}));
        }
        },
        [loaded, dispatch]
    );

    console.log({data, isLoading})

    return <StyledList />
}
