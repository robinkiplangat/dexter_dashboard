import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';

// Timeline visualization component
const TimelineVisualization = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="animate-pulse text-gray-400">Loading timeline data...</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-gray-400">No timeline data available for the selected filters</div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="relative h-96 overflow-hidden">
        {/* Timeline visualization would be implemented with a library like vis-timeline */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400">
            Timeline visualization will be implemented with vis-timeline or similar library
          </div>
        </div>
        
        {/* Placeholder timeline items */}
        <div className="absolute inset-0 p-4">
          <div className="border-l-2 border-blue-500 pl-4 space-y-6">
            {data.map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-6 mt-1.5 h-4 w-4 rounded-full bg-blue-500"></div>
                <div className="mb-1 text-sm font-semibold text-gray-900">{item.date}</div>
                <div className="mb-2 text-base font-medium text-gray-800">{item.title}</div>
                <div className="text-sm text-gray-600">{item.description}</div>
                <div className="mt-2 flex space-x-2">
                  {item.platforms.map((platform, i) => (
                    <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Timeline filters component
const TimelineFilters = ({ filters, setFilters, onApplyFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters(localFilters);
    onApplyFilters();
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Timeline Filters</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={localFilters.startDate}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={localFilters.endDate}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="narrativeId" className="block text-sm font-medium text-gray-700 mb-1">
              Narrative
            </label>
            <select
              id="narrativeId"
              name="narrativeId"
              value={localFilters.narrativeId}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Narratives</option>
              <option value="1">Vote Rigging Claims</option>
              <option value="2">Ethnic Profiling</option>
              <option value="3">Candidate Impersonation</option>
              <option value="4">Voter Intimidation</option>
              <option value="5">Procedural Misinformation</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-1">
              Platform
            </label>
            <select
              id="platform"
              name="platform"
              value={localFilters.platform}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Platforms</option>
              <option value="twitter">Twitter/X</option>
              <option value="facebook">Facebook</option>
              <option value="tiktok">TikTok</option>
              <option value="youtube">YouTube</option>
              <option value="telegram">Telegram</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              id="language"
              name="language"
              value={localFilters.language}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Languages</option>
              <option value="en">English</option>
              <option value="pcm">Pidgin</option>
              <option value="ha">Hausa</option>
              <option value="yo">Yoruba</option>
              <option value="ig">Igbo</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// Timeline statistics component
const TimelineStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center">
            <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Timeline Page component
const TimelinePage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [timelineData, setTimelineData] = useState([]);
  const [stats, setStats] = useState([]);
  const [filters, setFilters] = useState({
    startDate: searchParams.get('startDate') || '',
    endDate: searchParams.get('endDate') || '',
    narrativeId: searchParams.get('narrativeId') || '',
    platform: searchParams.get('platform') || '',
    language: searchParams.get('language') || '',
  });

  // Load timeline data
  const loadTimelineData = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would call the API
      // const response = await api.timeline.getAll(filters);
      // setTimelineData(response.data);
      
      // Mock data for development
      setTimeout(() => {
        setTimelineData([
          {
            date: '2025-05-12 09:15',
            title: 'New narrative emerged: "Ballot box stuffing in Lagos"',
            description: 'First detected on Twitter, quickly spread to Facebook and WhatsApp groups',
            platforms: ['Twitter', 'Facebook', 'WhatsApp']
          },
          {
            date: '2025-05-12 10:30',
            title: 'Key influencer amplification',
            description: 'Narrative picked up by @election_truth with 50K followers',
            platforms: ['Twitter']
          },
          {
            date: '2025-05-12 12:45',
            title: 'Content manipulation detected',
            description: 'Original video edited to remove context, showing only partial events',
            platforms: ['TikTok', 'YouTube']
          },
          {
            date: '2025-05-12 14:20',
            title: 'Coordinated sharing pattern identified',
            description: '15 accounts sharing identical content within 5 minute window',
            platforms: ['Facebook', 'Twitter']
          },
          {
            date: '2025-05-12 16:00',
            title: 'Counter-narrative emerges',
            description: 'Election officials release full video showing proper procedures',
            platforms: ['Official Website', 'Twitter']
          },
          {
            date: '2025-05-12 18:30',
            title: 'Fact-checking organization verification',
            description: 'Africa Check labels original claim as "Misleading"',
            platforms: ['Africa Check', 'Twitter']
          }
        ]);
        
        setStats([
          {
            title: 'Total Events',
            value: '24',
            color: 'bg-blue-100 text-blue-600',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            )
          },
          {
            title: 'Platforms',
            value: '6',
            color: 'bg-purple-100 text-purple-600',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
              </svg>
            )
          },
          {
            title: 'Peak Activity',
            value: '14:20',
            color: 'bg-yellow-100 text-yellow-600',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )
          },
          {
            title: 'Spread Velocity',
            value: 'High',
            color: 'bg-red-100 text-red-600',
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            )
          }
        ]);
        
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading timeline data:', error);
      setLoading(false);
    }
  };

  // Load data on initial render and when filters change
  useEffect(() => {
    loadTimelineData();
  }, []);

  const handleApplyFilters = () => {
    loadTimelineData();
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Timeline Analysis</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track how misinformation narratives evolve over time across platforms
        </p>
      </div>
      
      <TimelineStats stats={stats} />
      
      <TimelineFilters 
        filters={filters} 
        setFilters={setFilters} 
        onApplyFilters={handleApplyFilters} 
      />
      
      <TimelineVisualization 
        data={timelineData} 
        loading={loading} 
      />
    </div>
  );
};

export default TimelinePage;
