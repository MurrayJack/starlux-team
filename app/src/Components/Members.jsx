import React from 'react';
import useSanityQuery from './sanityQuery';

const Members = () => {
    const [data, loading] = useSanityQuery("*[_type == 'members'] { name } | order (order)");

    if (loading) return null;

    return <ul style={{ listStyle: "none" }}>{data.map(e => <li>{e.name}</li>)}</ul>
}

export default Members;