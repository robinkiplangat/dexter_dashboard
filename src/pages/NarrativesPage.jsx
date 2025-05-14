import React, { useState } from 'react';
import Layout from '../components/layouts/Layout';

const NarrativesPage = () => {
  const [selectedNarrative, setSelectedNarrative] = useState(null);
  const [filterView, setFilterView] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for narratives
  const narratives = [
    {
      id: 1,
      title: "Vote Rigging in Lagos",
      category: "VOTE_RIGGING",
      confidence: 0.89,
      contentCount: 342,
      firstDetected: "2023-05-15T14:30:00Z",
      lastUpdated: "2023-05-16T08:45:00Z",
      keywords: ["rigging", "vote stuffing", "ballot box", "lagos"],
      hashtags: ["#LagosDecides", "#RiggedElection2023", "#VoterFraud"],
      languages: ["English", "Pidgin"],
      description: "Claims of ballot stuffing and vote manipulation in Lagos polling stations, particularly in Eti-Osa and Alimosho areas."
    },
    {
      id: 2,
      title: "Ethnic Profiling of Northern Voters",
      category: "ETHNIC_PROFILING",
      confidence: 0.76,
      contentCount: 187,
      firstDetected: "2023-05-14T09:15:00Z",
      lastUpdated: "2023-05-16T10:22:00Z",
      keywords: ["north", "ethnic", "voters", "intimidation"],
      hashtags: ["#StopEthnicProfiling", "#ProtectNorthernVoters"],
      languages: ["English", "Hausa"],
      description: "Narratives targeting and discouraging northern Nigerian voters from participating in the election through intimidation and ethnic profiling."
    },
    {
      id: 3,
      title: "Fake Presidential Statement on Election Delay",
      category: "PROCEDURAL_MISINFORMATION",
      confidence: 0.94,
      contentCount: 529,
      firstDetected: "2023-05-16T06:30:00Z",
      lastUpdated: "2023-05-16T11:15:00Z",
      keywords: ["president", "delay", "postpone", "announcement"],
      hashtags: ["#ElectionPostponed", "#OfficialStatement", "#FakeNews"],
      languages: ["English"],
      description: "False claims that the president has issued a statement postponing elections in certain regions due to security concerns."
    },
    {
      id: 4,
      title: "Candidate Impersonation on Social Media",
      category: "CANDIDATE_IMPERSONATION",
      confidence: 0.82,
      contentCount: 98,
      firstDetected: "2023-05-13T18:45:00Z",
      lastUpdated: "2023-05-15T21:30:00Z",
      keywords: ["candidate", "impersonation", "fake account", "statement"],
      hashtags: ["#FakeCandidate", "#VerifyAccounts"],
      languages: ["English", "Yoruba"],
      description: "Multiple fake social media accounts claiming to be official accounts of the leading presidential candidate, spreading misinformation about policy positions."
    },
    {
      id: 5,
      title: "Foreign Interference Claims",
      category: "FOREIGN_INTERFERENCE",
      confidence: 0.71,
      contentCount: 156,
      firstDetected: "2023-05-15T11:20:00Z",
      lastUpdated: "2023-05-16T09:10:00Z",
      keywords: ["foreign", "interference", "international", "manipulation"],
      hashtags: ["#HandsOffOurElection", "#ForeignInterference"],
      languages: ["English", "Pidgin", "Igbo"],
      description: "Narratives claiming foreign governments are manipulating election results through international observers and diplomatic pressure."
    }
  ];

  const getCategoryColor = (category) => {
    const colorMap = {
      'VOTE_RIGGING': 'bg-red-100 text-red-800',
      'ETHNIC_PROFILING': 'bg-orange-100 text-orange-800',
      'PROCEDURAL_MISINFORMATION': 'bg-blue-100 text-blue-800',
      'CANDIDATE_IMPERSONATION': 'bg-purple-100 text-purple-800',
      'VOTER_INTIMIDATION': 'bg-yellow-100 text-yellow-800',
      'FOREIGN_INTERFERENCE': 'bg-green-100 text-green-800'
    };
    return colorMap[category] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const filteredNarratives = narratives.filter(narrative => {
    // Apply search filter
    if (searchQuery && !narrative.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !narrative.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !narrative.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())) &&
        !narrative.hashtags.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Apply category filter
    if (filterView !== 'all' && narrative.category !== filterView) {
      return false;
    }
    
    return true;
  });

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Narratives</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track and analyze misinformation themes across platforms
        </p>
      </div>

      {/* Filters and search bar */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-1 md:col-span-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search narratives, keywords, hashtags..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <select
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={filterView}
            onChange={(e) => setFilterView(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="VOTE_RIGGING">Vote Rigging</option>
            <option value="ETHNIC_PROFILING">Ethnic Profiling</option>
            <option value="PROCEDURAL_MISINFORMATION">Procedural Misinformation</option>
            <option value="CANDIDATE_IMPERSONATION">Candidate Impersonation</option>
            <option value="VOTER_INTIMIDATION">Voter Intimidation</option>
            <option value="FOREIGN_INTERFERENCE">Foreign Interference</option>
          </select>
        </div>
        
        <div>
          <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            Advanced Filters
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Narratives List */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Narrative List
                <span className="ml-2 text-sm font-normal text-gray-500">
                  {filteredNarratives.length} results
                </span>
              </h3>
            </div>
            <ul className="divide-y divide-gray-200 max-h-[calc(100vh-300px)] overflow-y-auto">
              {filteredNarratives.map(narrative => (
                <li 
                  key={narrative.id} 
                  className={`cursor-pointer hover:bg-gray-50 ${selectedNarrative === narrative.id ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedNarrative(narrative.id)}
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">
                        {narrative.title}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(narrative.category)}`}>
                          {narrative.category.replace(/_/g, ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                          {narrative.contentCount} posts
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {Math.round(narrative.confidence * 100)}% confidence
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p>
                          Last updated: {formatDate(narrative.lastUpdated)}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Narrative Detail */}
        <div className="w-full lg:w-1/2">
          {selectedNarrative ? (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Narrative Details</h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                {narratives.filter(n => n.id === selectedNarrative).map(narrative => (
                  <div key={narrative.id}>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-gray-900">{narrative.title}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(narrative.category)}`}>
                        {narrative.category.replace(/_/g, ' ')}
                      </span>
                    </div>
                    
                    <p className="mt-2 text-sm text-gray-600">{narrative.description}</p>
                    
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="bg-gray-50 rounded-md p-4">
                        <h4 className="text-sm font-medium text-gray-500">Confidence Score</h4>
                        <div className="mt-2 relative pt-1">
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                            <div style={{ width: `${narrative.confidence * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                          </div>
                          <div className="mt-1 text-right text-xs font-semibold text-gray-700">
                            {Math.round(narrative.confidence * 100)}%
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-md p-4">
                        <h4 className="text-sm font-medium text-gray-500">Content Count</h4>
                        <p className="mt-2 text-2xl font-semibold text-gray-800">{narrative.contentCount}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500">Detection Timeline</h4>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500">First Detected</p>
                          <p className="text-sm font-medium text-gray-800">{formatDate(narrative.firstDetected)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Last Updated</p>
                          <p className="text-sm font-medium text-gray-800">{formatDate(narrative.lastUpdated)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500">Languages</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {narrative.languages.map(lang => (
                          <span key={lang} className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500">Keywords</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {narrative.keywords.map(keyword => (
                          <span key={keyword} className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-500">Hashtags</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {narrative.hashtags.map(hashtag => (
                          <span key={hashtag} className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            {hashtag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 flex space-x-3">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        View Related Content
                      </button>
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        View Timeline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Narrative Details</h3>
              </div>
              <div className="px-4 py-5 sm:p-6 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No narrative selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select a narrative from the list to view its details.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NarrativesPage;