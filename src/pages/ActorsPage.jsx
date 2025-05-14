import React, { useState, useEffect } from 'react';

const ActorsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [actors, setActors] = useState([]);

  // Mock data for actors
  const mockActors = [
    {
      id: 1,
      name: 'Political Party A',
      type: 'ORGANIZATION',
      influence: 'HIGH',
      narrativeCount: 12,
      activity: 'INCREASING',
      lastActive: '2023-05-15T14:30:00Z',
    },
    {
      id: 2,
      name: 'News Network B',
      type: 'MEDIA',
      influence: 'MEDIUM',
      narrativeCount: 8,
      activity: 'STABLE',
      lastActive: '2023-05-14T09:15:00Z',
    },
    {
      id: 3,
      name: 'Influencer C',
      type: 'INDIVIDUAL',
      influence: 'MEDIUM',
      narrativeCount: 5,
      activity: 'DECREASING',
      lastActive: '2023-05-13T18:45:00Z',
    },
  ];

  useEffect(() => {
    // Simulate API call
    const fetchActors = () => {
      setTimeout(() => {
        setActors(mockActors);
        setIsLoading(false);
      }, 800);
    };

    fetchActors();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Key Actors</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Active Actors</h2>
          <p className="text-gray-600">Tracking {actors.length} actors involved in election misinformation</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Influence</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Narratives</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {actors.map((actor) => (
                <tr key={actor.id} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{actor.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {actor.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${actor.influence === 'HIGH' ? 'bg-red-100 text-red-800' : actor.influence === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                      {actor.influence}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {actor.narrativeCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${actor.activity === 'INCREASING' ? 'bg-red-100 text-red-800' : actor.activity === 'STABLE' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {actor.activity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(actor.lastActive).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActorsPage;