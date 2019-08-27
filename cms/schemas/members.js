export default {
    name: 'members',
    title: 'Members',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'alumni',
            title: 'Alumni',
            type: 'boolean'
        },
        {
            name: 'order',
            title: 'Order',
            type: 'number'
        },
    ],
    orderings: [
        {
            title: 'Order',
            name: 'Order',
            by: [
                { field: 'order', direction: 'asc' }
            ]
        },
    ],
    preview: {
        select: {
            title: 'name',
        }
    }
}
