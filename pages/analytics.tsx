import React from 'react';

const AnalyticsDashboard = () => {
    return (
        <div>
            <h1>Video Performance Metrics</h1>
            <div className="performance-metrics">
                <h2>Overview</h2>
                <p>Here you can view metrics such as views, likes, comments, and shares for each video.</p>
                <table>
                    <thead>
                        <tr>
                            <th>Video Title</th>
                            <th>Views</th>
                            <th>Likes</th>
                            <th>Comments</th>
                            <th>Shares</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Sample Data */}
                        <tr>
                            <td>Sample Video 1</td>
                            <td>1200</td>
                            <td>300</td>
                            <td>50</td>
                            <td>20</td>
                        </tr>
                        <tr>
                            <td>Sample Video 2</td>
                            <td>900</td>
                            <td>150</td>
                            <td>20</td>
                            <td>10</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="creator-insights">
                <h2>Creator Insights</h2>
                <p>Insights into how your content is performing and where to improve.</p>
                <ul>
                    <li>Engagement Rate: 25%</li>
                    <li>Top Performing Video: Sample Video 1</li>
                    <li>Best Times to Post: 6 PM - 9 PM</li>
                </ul>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;