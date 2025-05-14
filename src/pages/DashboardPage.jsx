import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorBoundary from '../components/common/ErrorBoundary';

// Dashboard widget components
const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3 ${color}`}>
            {icon}
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-gray-500 truncate">
              {title}
            </p>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              {value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecentActivity = ({ activities }) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
      </div>
      <div className="overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {activities.map((activity, index) => (
            <li key={index}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${activity.iconBg} text-white`}>
                    {activity.icon}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <p className="text-sm text-gray-500">{activity.description}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 text-center">
        <Link to="/timeline" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          View all activity
        </Link>
      </div>
    </div>
  );
};

const AlertsWidget = ({ alerts }) => {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Alerts</h3>
      </div>
      <div className="overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {alerts.map((alert, index) => (
            <li key={index}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full ${
                    alert.severity === 'CRITICAL' ? 'bg-red-500' :
                    alert.severity === 'HIGH' ? 'bg-orange-500' :
                    alert.severity === 'MEDIUM' ? 'bg-yellow-500' : 'bg-blue-500'
                  } mr-3`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 text-center">
        <Link to="/alerts" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          View all alerts
        </Link>
      </div>
    </div>
  );
};

const NarrativesTrendChart = ({ trendsData }) => {
  // In a real app, this would use a charting library like Chart.js or recharts
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Top Narratives Trends</h3>
      
      {!trendsData ? (
        <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
          <p className="text-gray-500 text-sm">Loading trend data...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Narrative Trends Bar Chart */}
          {trendsData.narratives && trendsData.narratives.length > 0 ? (
            <div className="h-48 bg-gray-50 rounded-md p-4 relative">
              {/* Simple bar chart visualization */}
              <div className="absolute inset-x-0 bottom-0 h-40 flex items-end justify-around px-4">
                {trendsData.narratives.map((item, index) => {
                  const maxCount = Math.max(...trendsData.narratives.map(d => d.count || 0));
                  const heightPercentage = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-blue-500 rounded-t" 
                        style={{ height: `${heightPercentage}%` }}
                      ></div>
                      <div className="text-xs text-gray-500 mt-1">
                        {item.date ? item.date.split('-')[2] : `Day ${index + 1}`}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="absolute top-2 left-2 text-xs font-medium text-gray-500">Volume</div>
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-500 text-sm">No narrative trend data available</p>
            </div>
          )}
          
          {/* Platform Distribution */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-md p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Platform Distribution</h4>
              {trendsData.platforms && Object.keys(trendsData.platforms).length > 0 ? (
                <div className="space-y-2">
                  {Object.entries(trendsData.platforms || {}).map(([platform, count], index) => {
                    const total = Object.values(trendsData.platforms || {}).reduce((a, b) => a + (Number(b) || 0), 0);
                    const widthPercentage = total > 0 ? (count / total) * 100 : 0;
                    return (
                      <div key={index} className="flex items-center">
                        <div className="text-xs text-gray-600 w-24">{platform}</div>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${widthPercentage}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600 ml-2">{count}%</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-12 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500 text-xs">No platform data available</p>
                </div>
              )}
            </div>
            
            {/* Category Distribution */}
            <div className="bg-gray-50 rounded-md p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Category Distribution</h4>
              {trendsData.categories && Object.keys(trendsData.categories).length > 0 ? (
                <div className="space-y-2">
                  {Object.entries(trendsData.categories || {}).map(([category, count], index) => {
                    const total = Object.values(trendsData.categories || {}).reduce((a, b) => a + (Number(b) || 0), 0);
                    const widthPercentage = total > 0 ? (count / total) * 100 : 0;
                    return (
                      <div key={index} className="flex items-center">
                        <div className="text-xs text-gray-600 w-24">{category.split('_')[0]}</div>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${widthPercentage}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600 ml-2">{count}%</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-12 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500 text-xs">No category data available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-3 text-center">
        <Link to="/narratives" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          View detailed trends
        </Link>
      </div>
    </div>
  );
};

const ActorNetworkWidget = () => {
  // In a real app, this would use a graph visualization library like Vis.js or D3.js
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Actor Network</h3>
      <div className="h-64 bg-gray-50 rounded-md relative overflow-hidden">
        {/* Simple network visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full max-w-md">
            {/* Central node */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium z-10">
              Central
            </div>
            
            {/* Connected nodes */}
            <div className="absolute top-1/4 left-1/4 w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-white text-xs font-medium">
              Node 1
            </div>
            <div className="absolute top-1/4 right-1/4 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-white text-xs font-medium">
              Node 2
            </div>
            <div className="absolute bottom-1/4 left-1/3 w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center text-white text-xs font-medium">
              Node 3
            </div>
            <div className="absolute bottom-1/4 right-1/3 w-10 h-10 rounded-full bg-red-400 flex items-center justify-center text-white text-xs font-medium">
              Node 4
            </div>
            
            {/* Connections */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
              <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="#CBD5E0" strokeWidth="2" />
              <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="#CBD5E0" strokeWidth="2" />
              <line x1="50%" y1="50%" x2="33%" y2="75%" stroke="#CBD5E0" strokeWidth="2" />
              <line x1="50%" y1="50%" x2="67%" y2="75%" stroke="#CBD5E0" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
      <div className="mt-3 text-center">
        <Link to="/actors" className="text-sm font-medium text-blue-600 hover:text-blue-500">
          Explore network
        </Link>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: [],
    recentActivity: [],
    alerts: []
  });
  const [trendsData, setTrendsData] = useState(null);

  // Mock dashboard data
  const mockStats = [
    { id: 'active-narratives', title: 'Active Narratives', value: '24', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>, color: 'bg-blue-100 text-blue-800' },
    { id: 'active-actors', title: 'Active Actors', value: '42', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, color: 'bg-purple-100 text-purple-800' },
    { id: 'new-alerts', title: 'New Alerts', value: '7', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>, color: 'bg-red-100 text-red-800' },
    { id: 'reports-generated', title: 'Reports Generated', value: '12', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>, color: 'bg-green-100 text-green-800' }
  ];
  
  const mockRecentActivity = [
    { id: 1, type: 'NARRATIVE_DETECTED', title: 'New Narrative Detected', description: 'Vote rigging claims in Lagos', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
    { id: 2, type: 'ALERT_TRIGGERED', title: 'High Priority Alert', description: 'Coordinated disinformation campaign detected', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
    { id: 3, type: 'ACTOR_ADDED', title: 'New Actor Identified', description: 'Media organization linked to multiple narratives', timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString() },
    { id: 4, type: 'REPORT_GENERATED', title: 'Weekly Report Generated', description: 'Election misinformation summary for week 24', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() },
    { id: 5, type: 'NARRATIVE_UPDATE', title: 'Narrative Update', description: 'Ballot stuffing narrative gaining traction', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() }
  ];
  
  const mockAlerts = [
    { id: 1, title: 'Coordinated Campaign Detected', severity: 'HIGH', type: 'COORDINATED_ACTIVITY', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
    { id: 2, title: 'Viral Misinformation Spreading', severity: 'MEDIUM', type: 'VIRAL_CONTENT', timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString() },
    { id: 3, title: 'New Influential Actor Detected', severity: 'LOW', type: 'NEW_ACTOR', timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString() }
  ];
  
  const mockTrendsData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Vote Rigging',
        data: [12, 19, 15, 27, 34, 42],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
      },
      {
        label: 'Ballot Stuffing',
        data: [8, 12, 9, 17, 22, 28],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
      },
      {
        label: 'Voter Suppression',
        data: [5, 9, 13, 18, 14, 19],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
      },
    ],
    // Add the narratives property expected by the component
    narratives: [
      { date: '2023-05-10', count: 12, label: 'Day 1' },
      { date: '2023-05-11', count: 19, label: 'Day 2' },
      { date: '2023-05-12', count: 15, label: 'Day 3' },
      { date: '2023-05-13', count: 27, label: 'Day 4' },
      { date: '2023-05-14', count: 34, label: 'Day 5' },
      { date: '2023-05-15', count: 42, label: 'Day 6' },
    ]
  };

  // Load user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('dexterUser');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
  }, []);

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        // Simulate API call with mock data
        setTimeout(() => {
          setDashboardData({
            stats: mockStats,
            recentActivity: mockRecentActivity,
            alerts: mockAlerts
          });
          setTrendsData(mockTrendsData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const stats = dashboardData.stats || [
    {
      title: "Active Narratives",
      value: "28",
      color: "bg-blue-100 text-blue-600",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
      )
    },
    {
      title: "Flagged Actors",
      value: "47",
      color: "bg-red-100 text-red-600",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      )
    },
    {
      title: "New Alerts",
      value: "5",
      color: "bg-yellow-100 text-yellow-600",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
      )
    },
    {
      title: "Data Freshness",
      value: "12m",
      color: "bg-green-100 text-green-600",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const activities = dashboardData.recentActivity || [
    {
      title: "New narrative detected",
      description: "Vote rigging claims in Lagos state polling stations",
      time: "10 minutes ago",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      ),
      iconBg: "bg-blue-500"
    },
    {
      title: "High activity actor detected",
      description: "User @election_truth showing coordinated behavior with 12 other accounts",
      time: "25 minutes ago",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      iconBg: "bg-red-500"
    },
    {
      title: "Report generated",
      description: "Weekly summary of ethnic profiling narratives",
      time: "2 hours ago",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      iconBg: "bg-green-500"
    },
    {
      title: "Verification status updated",
      description: "Claims about closed polling stations marked as 'Partially False'",
      time: "5 hours ago",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      iconBg: "bg-purple-500"
    }
  ];

  const alerts = dashboardData.alerts || [
    {
      title: "Volume spike in 'Voter intimidation' narrative",
      time: "15 minutes ago",
      severity: "HIGH"
    },
    {
      title: "New coordinated network detected",
      time: "45 minutes ago",
      severity: "CRITICAL"
    },
    {
      title: "Geographic shift in 'vote rigging' claims",
      time: "1 hour ago",
      severity: "MEDIUM"
    },
    {
      title: "New hashtag trending: #ElectionFraud2023",
      time: "3 hours ago",
      severity: "LOW"
    }
  ];

  // Fallback UI components for error boundaries
  const statCardFallback = (
    <div className="bg-white rounded-lg shadow overflow-hidden p-5">
      <p className="text-sm text-gray-500">Unable to load statistics</p>
    </div>
  );
  
  const chartFallback = (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Chart Widget</h3>
      <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
        <p className="text-sm text-gray-500">Unable to load chart data</p>
      </div>
    </div>
  );
  
  const activityFallback = (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Widget</h3>
      <div className="h-32 flex items-center justify-center bg-gray-100 rounded-md">
        <p className="text-sm text-gray-500">Unable to load activity data</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Welcome banner */}
      <div className="mb-6 bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Welcome back, {user?.name || 'Researcher'}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Here's what's happening with election misinformation today
              </p>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              Generate Report
            </button>
          </div>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <ErrorBoundary key={index} fallback={statCardFallback}>
            <StatCard {...stat} />
          </ErrorBoundary>
        ))}
      </div>
      
      {/* Middle section - chart and alerts */}
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
        <ErrorBoundary fallback={chartFallback}>
          <NarrativesTrendChart trendsData={trendsData} />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={chartFallback}>
          <ActorNetworkWidget />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={activityFallback}>
          <AlertsWidget alerts={alerts} />
        </ErrorBoundary>
      </div>
      
      {/* Bottom section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ErrorBoundary fallback={activityFallback}>
          <RecentActivity activities={activities} />
        </ErrorBoundary>
        
        <ErrorBoundary fallback={chartFallback}>
          <ActorNetworkWidget />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default DashboardPage;