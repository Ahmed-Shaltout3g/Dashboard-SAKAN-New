import React, { useEffect, useState } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import axios from 'axios';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBump } from '@nivo/bump';
import { ResponsiveAreaBump } from '@nivo/bump';

export default function Analyze() {
    const [data, setData] = useState([])
    async function getProductsAccepted() {
        const { data } = await axios.get('https://zunis-node-js.vercel.app/product/?page=1&isAccepted=true');
        setData(data.data)
        console.log(data.data);

    };

    useEffect(() => {
        getProductsAccepted()
    }, [])
    const chartData = data.reduce((acc, property) => {
        const category = property.categoryId.name;
        const existingCategory = acc.find(item => item.category === category);
        if (existingCategory) {
            existingCategory.count += 1;
        } else {
            acc.push({ category, count: 1 });
        }
        return acc;
    }, []);


    // second char 
    const categoryCounts = {};
    const statusCounts = {};

    data?.forEach(property => {
        const category = property.categoryId.name;
        const status = property.status;

        // Count categories
        if (category in categoryCounts) {
            categoryCounts[category] += 1;
        } else {
            categoryCounts[category] = 1;
        }

        // Count statuses
        if (status in statusCounts) {
            statusCounts[status] += 1;
        } else {
            statusCounts[status] = 1;
        }
    });

    const categoryData = Object.keys(categoryCounts).map(key => ({ id: key, value: categoryCounts[key] }));
    const statusData = Object.keys(statusCounts).map(key => ({ id: key, value: statusCounts[key] }));

    const data2 = [
        {
            "id": "Appartment",
            "data": [
                { "x": "2021", "y": 12 },
                { "x": "2022", "y": 8 },
                { "x": "2023", "y": 10 },
                { "x": "2024", "y": 6 }
            ]
        },
        {
            "id": "Home",
            "data": [
                { "x": "2021", "y": 10 },
                { "x": "2022", "y": 12 },
                { "x": "2023", "y": 8 },
                { "x": "2024", "y": 10 }
            ]
        },
        {
            "id": "Land",
            "data": [
                { "x": "2021", "y": 8 },
                { "x": "2022", "y": 6 },
                { "x": "2023", "y": 12 },
                { "x": "2024", "y": 8 }
            ]
        },
        {
            "id": "Shop",
            "data": [
                { "x": "2021", "y": 6 },
                { "x": "2022", "y": 10 },
                { "x": "2023", "y": 6 },
                { "x": "2024", "y": 12 }
            ]
        }
    ];

    return (
        <div className='page'>
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <div style={{ height: '300px' }}>
                            <ResponsiveBar
                                data={chartData}
                                keys={['count']}
                                indexBy="category"
                                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                                padding={0.3}
                                valueScale={{ type: 'linear' }}
                                indexScale={{ type: 'band', round: true }}
                                colors={{ scheme: 'nivo' }}
                                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                                axisTop={null}
                                axisRight={null}
                                axisBottom={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'Category',
                                    legendPosition: 'middle',
                                    legendOffset: 32
                                }}
                                axisLeft={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'Count',
                                    legendPosition: 'middle',
                                    legendOffset: -40
                                }}
                                labelSkipWidth={12}
                                labelSkipHeight={12}
                                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                                legends={[
                                    {
                                        dataFrom: 'keys',
                                        anchor: 'bottom-right',
                                        direction: 'column',
                                        justify: false,
                                        translateX: 120,
                                        translateY: 0,
                                        itemsSpacing: 2,
                                        itemWidth: 100,
                                        itemHeight: 20,
                                        itemDirection: 'left-to-right',
                                        itemOpacity: 0.85,
                                        symbolSize: 20,
                                        effects: [
                                            {
                                                on: 'hover',
                                                style: {
                                                    itemOpacity: 1
                                                }
                                            }
                                        ]
                                    }
                                ]}
                                animate={true}
                                motionStiffness={90}
                                motionDamping={15}
                            />
                        </div>
                    </div>
                    <div className="col-md-4 " style={{ height: '300px' }}>
                        <h2>Property Categories</h2>
                        <ResponsivePie
                            data={categoryData}
                            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            activeOuterRadiusOffset={8}
                            colors={{ scheme: 'nivo' }}
                            borderWidth={1}
                            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                            arcLinkLabelsSkipAngle={10}
                            arcLinkLabelsTextColor="#333333"
                            arcLinkLabelsThickness={2}
                            arcLinkLabelsColor={{ from: 'color' }}
                            arcLabelsSkipAngle={10}
                            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                            legends={[
                                {
                                    anchor: 'bottom',
                                    direction: 'row',
                                    justify: false,
                                    translateX: 0,
                                    translateY: 56,
                                    itemsSpacing: 0,
                                    itemWidth: 100,
                                    itemHeight: 18,
                                    itemTextColor: '#999',
                                    itemDirection: 'left-to-right',
                                    itemOpacity: 1,
                                    symbolSize: 18,
                                    symbolShape: 'circle',
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemTextColor: '#000'
                                            }
                                        }
                                    ]
                                }
                            ]}
                        />
                    </div>
                    <div className="col-md-4 " style={{ height: '300px' }}>
                        <h2>Property Statuses</h2>
                        <ResponsivePie
                            data={statusData}
                            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            activeOuterRadiusOffset={8}
                            colors={{ scheme: 'nivo' }}
                            borderWidth={1}
                            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                            arcLinkLabelsSkipAngle={10}
                            arcLinkLabelsTextColor="#333333"
                            arcLinkLabelsThickness={2}
                            arcLinkLabelsColor={{ from: 'color' }}
                            arcLabelsSkipAngle={10}
                            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                            legends={[
                                {
                                    anchor: 'bottom',
                                    direction: 'row',
                                    justify: false,
                                    translateX: 0,
                                    translateY: 56,
                                    itemsSpacing: 0,
                                    itemWidth: 100,
                                    itemHeight: 18,
                                    itemTextColor: '#999',
                                    itemDirection: 'left-to-right',
                                    itemOpacity: 1,
                                    symbolSize: 18,
                                    symbolShape: 'circle',
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemTextColor: '#000'
                                            }
                                        }
                                    ]
                                }
                            ]}
                        />
                    </div>
                </div>

                <div className="row mt-5 ">
                    <div className="col-md-6">
                        <div style={{ height: '300px' }}>
                            <h2>Property Categories Over Time</h2>
                            <ResponsiveBump
                                data={data2}
                                margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
                                colors={{ scheme: 'spectral' }}
                                lineWidth={3}
                                activeLineWidth={6}
                                inactiveLineWidth={3}
                                inactiveOpacity={0.15}
                                pointSize={10}
                                activePointSize={16}
                                inactivePointSize={0}
                                pointColor={{ theme: 'background' }}
                                pointBorderWidth={3}
                                activePointBorderWidth={3}
                                pointBorderColor={{ from: 'serie.color' }}
                                axisTop={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: '',
                                    legendPosition: 'middle',
                                    legendOffset: -36
                                }}
                                axisBottom={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: '',
                                    legendPosition: 'middle',
                                    legendOffset: 32
                                }}
                                axisLeft={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'Ranking',
                                    legendPosition: 'middle',
                                    legendOffset: -40
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">

                        <div style={{ height: '300px' }}>
                            <h2>Property Categories Over Time</h2>
                            <ResponsiveAreaBump
                                data={data2}
                                margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
                                spacing={8}
                                colors={{ scheme: 'nivo' }}
                                blendMode="multiply"
                                startLabel="id"
                                endLabel="id"
                                axisTop={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: '',
                                    legendPosition: 'middle',
                                    legendOffset: -36
                                }}
                                axisBottom={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: '',
                                    legendPosition: 'middle',
                                    legendOffset: 32
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
