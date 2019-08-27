import React from 'react';
import useSanityQuery from './sanityQuery';
import Loader from './Loader';

const Projects = () => {
    const [data, loading] = useSanityQuery("*[_type == 'project'] {title, description, url, version } | order (title)");

    if (loading) return <Loader />

    return data.map(e => <Project {...e} />);
}

const Project = ({title, description, url, version}) => {
    return <div>
        <h2><a target="_new" href={url}>{title}</a></h2>
        <p>{description}</p>
        <hr />
    </div>
}


export default Projects;

