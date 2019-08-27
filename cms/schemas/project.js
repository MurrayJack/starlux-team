export default {
    name: 'project',
    title: 'Project',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text'
        },
        {
            name: 'version',
            title: 'Latest Version',
            type: 'string'
        },
        {
            name: 'url',
            title: 'URL',
            type: 'url'
        },
        {
            name: 'wikiurl',
            title: 'Wiki URL',
            type: 'url'
        },
        {
            name: 'current',
            title: 'Currently In Develop',
            type: 'boolean'
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Application', value: 'Application' },
                    { title: 'UI Layer', value: 'UILayer' },
                ]
            }
        }
    ],
    preview: {
        select: {
            title: 'title',
        }
    }
}
