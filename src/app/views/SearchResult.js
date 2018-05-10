import React from 'react';
import * as qs from 'query-string';

export default function SearchResult(props) {
    const {q} = qs.parse(props.location.search);

    return (
        <p>{q}</p>
    );
}