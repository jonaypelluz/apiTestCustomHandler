import { TYPES } from 'helpers/useConvert';
import { gql } from '@apollo/client';

export const PAGE_NUM = 1;

export const CHARACTERS_QUERY = {
    gql: gql`
        query getCharacters($page: Int!) {
            characters(page: $page) {
                results {
                    id
                    name
                    species
                    image
                }
            }
        }
    `,
    variables: {
        variables: {
            page: PAGE_NUM
        }
    },
    key: 'characters',
    type: TYPES.CHARACTERS
};
