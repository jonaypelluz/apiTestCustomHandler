import { gql } from '@apollo/client';

export const PAGE_NUM = 1;
export const ITEMS_PER_PAGE = 20;
export const API_URL = 'https://rickandmortyapi.com/graphql';
export const APP_NAME = 'Rick and Morty';
export const LOGO_URL = '/images/RickAndMorty.png';

export const CHARACTERS_QUERY = {
    gql: gql`
        query getCharacters($page: Int!) {
            characters(page: $page) {
                info {
                    count
                }
                results {
                    id
                    name
                    species
                    image
                }
            }
        }
    `,
    params: {
        page: PAGE_NUM,
    },
    key: 'characters',
    conversions: {
        name: 'title',
        species: 'desc',
    },
};
