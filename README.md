**API Test Custom Handler with Reactjs**

Work In Progess!!!

## APIs so far:

-   https://rickandmortyapi.com/
-   https://swapi.dev/
-   https://pokeapi.co/ WIP

## TODO:

-   Change Context API for Redux and Saga
-   cache system
-   events / subscribers
-   lazy loading
-   ...

## Config files

-   **appName**: Name of the API, this will shoe in the Home menu.
-   **apiType**: This at the moment can be GraphQL and Rest API.
-   **apiBaseUrl**: The base url for the Api.
-   **mainImage**: The image that will be use in the Home page.
-   **sections**: This will be the diferent sections that the Api has.
    -   **endpoint**: Part of the endpoint where it will gather the info for that section.
    -   **keys**: keys that will parse to get the info.
    -   **pagination**: if it is paginated and what it will use as a params in the Api call.
    -   **perPage**: Quatity of pages that the call willl receive by default.
    -   **query**: If GraphQL the query need it for this endpoint
    -   **params**: Params for this Api call.
    -   **conversions**: Properties changes it needs to print the info. The third option is a Regex.

```
{
    "appName": "Example APP",
    "apiType": "Api",
    "apiBaseUrl": "http://example.local/api/",
    "mainImage": "/images/ExampleImage.jpg",
    "sections": ["ExampleSection"],
    "ExampleSection": {
        "endpoint": "endpoint",
        "keys": ["id", "results"],
        "pagination": "page",
        "perPage": 10,
        "query": "",
        "params": ["page|int"],
        "conversions": ["name|title", "description|desc", "url|id|\\d+"]
    }
}
```
