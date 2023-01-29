import useConvert, { TYPES } from 'helpers/useConvert';
import { gql } from '@apollo/client';

export const PAGE_NUM = 1;

export const CHARACTERS_QUERY = {
    gql: gql`query GetCharacters($page: Int!) {
        characters(page: $page) {
            results {
                id
                name
                species
                image
            }
        }
    }`,
    variables: {
        variables: {
            page: PAGE_NUM
        }
    }
};
