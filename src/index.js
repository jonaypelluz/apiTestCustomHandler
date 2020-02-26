import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { render } from "react-dom";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { App } from "./App";
import { store } from "./Helpers";
import "./index.scss";
import messages_es from "./Translations/es.json";

const messages = {
    es: messages_es,
};
const language = "es"; //navigator.language.split(/[-_]/)[0]; // language without region code

render(
    <IntlProvider locale={language} messages={messages[language]}>
        <Provider store={store}>
            <App />
        </Provider>
    </IntlProvider>,
    document.getElementById("app"),
);
