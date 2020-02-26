export function getParameterByName(name, url) {
    let match = RegExp("[?&]" + name + "=([^&]*)").exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}