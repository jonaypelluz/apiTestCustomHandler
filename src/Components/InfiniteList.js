import React, { Fragment, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Badge } from "reactstrap";
import { getParameterByName } from "../Helpers";
import { items as fetchItems } from "../Services/ApiServices";

export default function InfiniteList(props) {
    const [items, setItems] = useState([]);
    const [preQuery, setPreQuery] = useState("");
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [noMore, setNoMore] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getData = load => {
        if (load && noMore === false) {
            fetchItems(preQuery, props.type).then(response => {
                if (response && response.results.length > 0) {
                    if (page > 1) {
                        setItems(items.concat(response.results));
                    } else {
                        setItems(response.results);
                    }
                    let nextPage = getParameterByName(
                        "page",
                        response.info.next,
                    );
                    if (nextPage === null || nextPage === page) {
                        setNoMore(true);
                    } else {
                        window.addEventListener("scroll", handleScroll);
                    }
                } else {
                    if (page === 1) {
                        setItems([]);
                    }
                    setNoMore(true);
                }
            });
        }
    };

    useEffect(() => {
        let _preQuery = page > 1 ? "page=" + page : "";
        if (query !== "") {
            _preQuery += _preQuery !== "" ? "&name=" + query : "name=" + query;
        }
        setPreQuery(_preQuery);
    }, [page, query]);

    useEffect(() => {
        if (props.query !== query && page > 1) {
            setPage(1);
        }
        setNoMore(false);
        setQuery(props.query);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.query]);

    useEffect(() => {
        getData(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preQuery]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleScroll = () => {
        const header = document.getElementById("header");
        const list = document.getElementById("list");
        if (
            window.scrollY + window.innerHeight - 50 >=
            list.clientHeight +
                list.offsetTop +
                header.clientHeight +
                header.offsetTop
        ) {
            window.removeEventListener("scroll", handleScroll);
            if (noMore === false) {
                setPage(page => page + 1);
            }
        }
    };

    return (
        <div id='list'>
            {items.map(item => (
                <article key={item.id} className='item-wrapper'>
                    <div className='item-content'>
                        {props.type === "character" ? (
                            <Fragment>
                                <img
                                    src={item.image}
                                    className='img-fluid'
                                    alt={item.name}
                                />
                                <h3 className='item-title'>
                                    <Badge
                                        href={"character/" + item.id}
                                        color='dark'>
                                        {item.name}
                                    </Badge>
                                </h3>
                                <p className='item-text'>
                                    <b>
                                        <FormattedMessage
                                            id='app.species'
                                            defaultMessage='Species'
                                        />
                                        :
                                    </b>{" "}
                                    {item.species}
                                    <br />
                                    <b>
                                        <FormattedMessage
                                            id='app.gender'
                                            defaultMessage='Gender'
                                        />
                                        :
                                    </b>{" "}
                                    {item.gender}
                                    <br />
                                    <b>
                                        <FormattedMessage
                                            id='app.location'
                                            defaultMessage='Location'
                                        />
                                        :
                                    </b>{" "}
                                    {item.location.name}
                                </p>
                            </Fragment>
                        ) : props.type === "location" ? (
                            <Fragment>
                                <h3 className='item-title'>
                                    <Badge
                                        href={"location/" + item.id}
                                        color='dark'>
                                        {item.name}
                                    </Badge>
                                </h3>
                                <p className='item-text'>
                                    <b>
                                        <FormattedMessage
                                            id='app.type'
                                            defaultMessage='Type'
                                        />
                                        :
                                    </b>{" "}
                                    {item.type}
                                    <br />
                                    <b>
                                        <FormattedMessage
                                            id='app.dimension'
                                            defaultMessage='Dimension'
                                        />
                                        :
                                    </b>{" "}
                                    {item.dimension}
                                </p>
                            </Fragment>
                        ) : props.type === "episode" ? (
                            <Fragment>
                                <h3 className='item-title'>
                                    <Badge
                                        href={"episode/" + item.id}
                                        color='dark'>
                                        {item.name}
                                    </Badge>
                                </h3>
                                <p className='item-text'>
                                    <b>
                                        <FormattedMessage
                                            id='app.airDate'
                                            defaultMessage='Air date'
                                        />
                                        :
                                    </b>{" "}
                                    {item.air_date}
                                    <br />
                                    <b>
                                        <FormattedMessage
                                            id='app.episode'
                                            defaultMessage='Episode'
                                        />
                                        :
                                    </b>{" "}
                                    {item.episode}
                                </p>
                            </Fragment>
                        ) : (
                            "Nothing found!"
                        )}
                    </div>
                </article>
            ))}
        </div>
    );
}
