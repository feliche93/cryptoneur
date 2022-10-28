import { BetaAnalyticsDataClient } from '@google-analytics/data'

const serviceAccount = {
    "type": process.env.TYPE,
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY,
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
}

const analyticsDataClient = new BetaAnalyticsDataClient(
    { credentials: serviceAccount },
);
const propertyId = "295633434";

const activeUsers30Days = {
    dateRanges: [
        {
            startDate: '60daysAgo',
            endDate: '30daysAgo',
            name: 'previous30days',
        },
        {
            startDate: '30daysAgo',
            endDate: 'today',
            name: 'last30days',
        },
    ],
    metrics: [
        {
            name: 'activeUsers',
        },
    ],
}

const activeUsers = {
    dateRanges: [
        {
            startDate: '2020-01-01',
            endDate: 'today',
            name: 'lifetime',
        },
    ],
    metrics: [
        {
            name: 'activeUsers',
        },
    ],
}

const averageSessionDuration30Days = {
    dateRanges: [
        {
            startDate: '60daysAgo',
            endDate: '30daysAgo',
            name: 'previous30days',
        },
        {
            startDate: '30daysAgo',
            endDate: 'today',
            name: 'last30days',
        },
    ],
    metrics: [
        {
            name: 'averageSessionDuration',
        },
    ],
}

async function runReport(query: object) {
    const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        ...query
    });

    // console.log('Report result:');
    // console.log(response.rows);
    let data = response.rows.map(row => {
        if (row) {
            const name = row.dimensionValues[0] ? row.dimensionValues[0]?.value : row.metricValues[0]?.oneValue;
            const value = parseInt(row.metricValues[0]?.value);
            return { name, value };
        }
    });


    data.length > 1 ? data.push({ name: 'changePercent', value: (data[0].value - data[1].value) / data[1].value * 100 }) : data.push({ 'change': 0 })
    data.length > 1 ? data.push({ name: 'changeAbsolut', value: (data[0].value - data[1].value) }) : data.push({ 'changeAbsolut': 0 })
    // console.log(data);
    return data;
}

export {
    runReport,
    activeUsers30Days,
    activeUsers,
    averageSessionDuration30Days
}