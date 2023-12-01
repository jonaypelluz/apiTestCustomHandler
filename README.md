**API Test Custom Handler with Reactjs**

Work In Progess!!!

## APIs so far:

-   https://rickandmortyapi.com/
-   https://swapi.dev/

## TODO:

-   cache system
-   events / subscribers
-   lazy loading
-   ...

## Config files

-   **appName**: Name of the API, this will shoe in the Home menu.
-   **apiType**: This at the moment can be GraphQL and Rest API.
-   **apiBaseUrl**: The base url for the Api
-   **mainImage**:
-   **sections**:
    -   **endpoint**:
    -   **keys**:
    -   **pagination**:
    -   **perPage**:
    -   **query**:
    -   **params**:
    -   **conversions**:

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
