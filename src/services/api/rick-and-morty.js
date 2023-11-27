// import { gql } from '@apollo/client';

// export const ITEMS_PER_PAGE = 20;
// export const API_URL = 'https://rickandmortyapi.com/graphql';
// export const APP_NAME = 'Rick and Morty';
// export const LOGO_URL = '/images/RickAndMorty.png';

// const LOCATIONS_QUERY = {
//     gql: gql``,
//     params: {
//         page: 1,
//     },
//     key: 'locations',
//     conversions: {
//         name: 'title',
//         species: 'desc',
//     },
// };

// const SPECIES_QUERY = {
//     gql: gql``,
//     params: {
//         page: 1,
//     },
//     key: 'species',
//     conversions: {
//         name: 'title',
//         species: 'desc',
//     },
// };

// export const CHARACTERS_QUERY = {
//     gql: gql`
//         query getCharacters($page: Int!) {
//             characters(page: $page) {
//                 info {
//                     count
//                 }
//                 results {
//                     id
//                     name
//                     species
//                     image
//                 }
//             }
//         }
//     `,
//     params: {
//         page: 1,
//     },
//     key: 'characters',
//     conversions: {
//         name: 'title',
//         species: 'desc',
//     },
// };

// export const sections = {
//     'characters': CHARACTERS_QUERY,
//     'locations': LOCATIONS_QUERY,
//     'species': SPECIES_QUERY,
// };
