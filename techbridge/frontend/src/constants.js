export const TABLE_HEADERS = [
    {
        title: 'Name',
        dataIndex: 'id',
        key: 'id',
        width: 200,
    },
    {
        title: 'Organization',
        dataIndex: 'company',
        key: 'company',
        width: 200,
    },
    {
        title: 'Organization Type',
        dataIndex: 'company_type',
        key: 'company_type',
        width: 200,
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        width: 200,
    },
];

export const METRIC_TABLE = [
    {
        title: 'Metric',
        key: 'metric',
    },
    {
        title: 'Value',
        key: 'value',
    },

]

export const PLOT_MAPPING = {
    'betweenness': 'Betweenness',
    'degree': 'Degree',
    'out_degree': 'Out Degree',
    'katz': 'Katz',
    'eigenvector': 'Eigen Vector'
}