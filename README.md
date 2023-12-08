**CraftAPIxplorer with Reactjs**

Work In Progess!!!

## APIs so far:

-   https://rickandmortyapi.com/
-   https://swapi.dev/
-   https://pokeapi.co/
-   https://api.potterdb.com/

## TODO:

-   Add error boundary
-   Add Saga middleware
-   Add cache system
-   Open AI Image generation (Bash created, credits need it)
-   ...

## Config files

-   **appName**: Name of the API, this will shoe in the Home menu.
-   **apiType**: This at the moment can be GraphQL and Rest API.
-   **apiBaseUrl**: The base url for the Api.
-   **mainImage**: The image that will be use in the Home page.
-   **sections**: This will be the diferent sections that the Api has.
    -   **endpoint**: Part of the endpoint where it will gather the info for that section.
    -   **keys**: keys that will parse to get the info.
    -   **pagination**: This is the type of pagination ['offset-limit', 'page-number', 'page-number-page-size'].
    -   **perPage**: Quatity of pages that the call willl receive by default.
    -   **singleQuery**: If GraphQL the query need it for single item endpoints.
    -   **query**: If GraphQL the query need it for multiple items endpoint.
    -   **itemIncludedKeys**: Keys that will be included in the response items and print.
    -   **conversions**: Properties changes it needs to print the info. The third option is a Regex.

```
{
    "appName": "Example APP",
    "apiType": "RESTful",
    "apiBaseUrl": "http://example.local/api/",
    "mainImage": "/images/ExampleImage.jpg",
    "sections": ["ExampleSection"],
    "ExampleSection": {
        "endpoint": "endpoint",
        "keys": ["count", "results"],
        "pagination": "page-number",
        "perPage": 10,
        "singleQuery": "",
        "query": "",
        "itemIncludedKeys": ["height", "width", "status"],
        "conversions": ["name|title", "description|desc", "url|id|\\d+"]
    }
}
```
