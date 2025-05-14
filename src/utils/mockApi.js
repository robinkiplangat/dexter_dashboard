/**
 * Mock API implementation for Dexter platform
 * Used for development and testing before backend integration
 */

import mockData from './mockData';

// Helper to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to simulate API errors (for testing error handling)
const simulateError = (probability = 0.05) => {
  return Math.random() < probability;
};

/**
 * Mock API service object with methods for different endpoints
 * Simulates real API behavior with delays and occasional errors
 */
export const mockApi = {
  // Authentication
  auth: {
    login: async (credentials) => {
      await delay(800);
      
      if (simulateError()) {
        throw new Error('Network error occurred');
      }
      
      const { email, password } = credentials;
      
      if (email && password) {
        const user = mockData.userData.users.find(u => u.email === email);
        
        if (user) {
          return { 
            success: true, 
            data: { 
              user,
              token: 'mock-jwt-token'
            } 
          };
        }
      }
      
      return { 
        success: false, 
        error: 'Invalid email or password' 
      };
    },
    
    logout: async () => {
      await delay(300);
      return { success: true };
    },
    
    getProfile: async () => {
      await delay(500);
      
      if (simulateError()) {
        throw new Error('Failed to fetch user profile');
      }
      
      return { 
        success: true, 
        data: mockData.userData.users[0]
      };
    }
  },
  
  // Dashboard
  dashboard: {
    getSummary: async () => {
      await delay(1000);
      
      if (simulateError()) {
        throw new Error('Failed to fetch dashboard summary');
      }
      
      return {
        success: true,
        data: {
          stats: mockData.dashboardData.stats,
          recentActivity: mockData.dashboardData.recentActivity,
          alerts: mockData.dashboardData.alerts
        }
      };
    },
    
    getStats: async () => {
      await delay(700);
      
      return {
        success: true,
        data: mockData.dashboardData.stats
      };
    },
    
    getActivity: async (params = {}) => {
      await delay(800);
      
      let activity = [...mockData.dashboardData.recentActivity];
      
      // Apply filters if provided
      if (params.limit) {
        activity = activity.slice(0, params.limit);
      }
      
      return {
        success: true,
        data: activity
      };
    },
    
    getTrends: async (params = {}) => {
      await delay(1200);
      
      if (simulateError()) {
        throw new Error('Failed to fetch trend data');
      }
      
      // Mock trend data
      const trendData = {
        narratives: [
          { date: '2025-05-06', count: 120 },
          { date: '2025-05-07', count: 145 },
          { date: '2025-05-08', count: 132 },
          { date: '2025-05-09', count: 167 },
          { date: '2025-05-10', count: 189 },
          { date: '2025-05-11', count: 214 },
          { date: '2025-05-12', count: 342 }
        ],
        platforms: {
          twitter: 42,
          facebook: 28,
          whatsapp: 15,
          telegram: 8,
          tiktok: 5,
          youtube: 2
        },
        categories: {
          VOTE_RIGGING: 35,
          ETHNIC_PROFILING: 25,
          CANDIDATE_IMPERSONATION: 15,
          VOTER_INTIMIDATION: 15,
          PROCEDURAL_MISINFORMATION: 10
        }
      };
      
      return {
        success: true,
        data: trendData
      };
    }
  },
  
  // Narratives
  narratives: {
    getAll: async (params = {}) => {
      await delay(1000);
      
      let narratives = [...mockData.narrativesData.narratives];
      
      // Apply filters if provided
      if (params.category) {
        narratives = narratives.filter(n => n.category === params.category);
      }
      
      if (params.language) {
        narratives = narratives.filter(n => n.languages.includes(params.language));
      }
      
      if (params.platform) {
        narratives = narratives.filter(n => n.platforms.includes(params.platform));
      }
      
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        narratives = narratives.filter(n => 
          n.title.toLowerCase().includes(searchLower) || 
          n.description.toLowerCase().includes(searchLower)
        );
      }
      
      return {
        success: true,
        data: narratives,
        meta: {
          total: narratives.length,
          page: params.page || 1,
          perPage: params.perPage || narratives.length
        }
      };
    },
    
    getById: async (id) => {
      await delay(800);
      
      const narrative = mockData.narrativesData.narratives.find(n => n.id === id);
      
      if (!narrative) {
        return {
          success: false,
          error: 'Narrative not found'
        };
      }
      
      return {
        success: true,
        data: narrative
      };
    },
    
    getRelated: async (id) => {
      await delay(900);
      
      // Find the target narrative
      const narrative = mockData.narrativesData.narratives.find(n => n.id === id);
      
      if (!narrative) {
        return {
          success: false,
          error: 'Narrative not found'
        };
      }
      
      // Find related narratives (same category or platforms)
      const related = mockData.narrativesData.narratives
        .filter(n => n.id !== id && 
          (n.category === narrative.category || 
           n.platforms.some(p => narrative.platforms.includes(p)))
        )
        .slice(0, 3);
      
      return {
        success: true,
        data: related
      };
    },
    
    getTimeline: async (id) => {
      await delay(1100);
      
      // Filter timeline events related to this narrative
      const events = mockData.timelineData.events
        .filter(e => e.narrativeId === id)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      
      return {
        success: true,
        data: events
      };
    }
  },
  
  // Actors
  actors: {
    getAll: async (params = {}) => {
      await delay(1000);
      
      let actors = [...mockData.actorsData.actors];
      
      // Apply filters if provided
      if (params.type) {
        actors = actors.filter(a => a.type === params.type);
      }
      
      if (params.platform) {
        actors = actors.filter(a => a.platform === params.platform || a.platform === 'MULTIPLE');
      }
      
      if (params.coordinated === true || params.coordinated === false) {
        actors = actors.filter(a => a.coordinated === params.coordinated);
      }
      
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        actors = actors.filter(a => 
          a.name.toLowerCase().includes(searchLower) || 
          a.location.toLowerCase().includes(searchLower)
        );
      }
      
      return {
        success: true,
        data: actors,
        meta: {
          total: actors.length,
          page: params.page || 1,
          perPage: params.perPage || actors.length
        }
      };
    },
    
    getById: async (id) => {
      await delay(800);
      
      const actor = mockData.actorsData.actors.find(a => a.id === id);
      
      if (!actor) {
        return {
          success: false,
          error: 'Actor not found'
        };
      }
      
      return {
        success: true,
        data: actor
      };
    },
    
    getNetwork: async (id) => {
      await delay(1200);
      
      // Find the target actor
      const actor = mockData.actorsData.actors.find(a => a.id === id);
      
      if (!actor) {
        return {
          success: false,
          error: 'Actor not found'
        };
      }
      
      // Generate mock network data
      const network = {
        nodes: [
          { id: actor.id, label: actor.name, type: 'primary' },
          ...mockData.actorsData.actors
            .filter(a => a.id !== id && actor.narratives.some(n => a.narratives.includes(n)))
            .map(a => ({ id: a.id, label: a.name, type: 'related' }))
        ],
        edges: mockData.actorsData.actors
          .filter(a => a.id !== id && actor.narratives.some(n => a.narratives.includes(n)))
          .map(a => ({ 
            from: actor.id, 
            to: a.id, 
            strength: Math.random().toFixed(2),
            narratives: actor.narratives.filter(n => a.narratives.includes(n))
          }))
      };
      
      return {
        success: true,
        data: network
      };
    },
    
    getActivity: async (id) => {
      await delay(900);
      
      // Find the target actor
      const actor = mockData.actorsData.actors.find(a => a.id === id);
      
      if (!actor) {
        return {
          success: false,
          error: 'Actor not found'
        };
      }
      
      // Generate mock activity data
      const activity = {
        volumeByDay: [
          { date: '2025-05-06', count: 12 },
          { date: '2025-05-07', count: 18 },
          { date: '2025-05-08', count: 15 },
          { date: '2025-05-09', count: 24 },
          { date: '2025-05-10', count: 32 },
          { date: '2025-05-11', count: 28 },
          { date: '2025-05-12', count: 45 }
        ],
        narrativeDistribution: actor.narratives.map(nId => {
          const narrative = mockData.narrativesData.narratives.find(n => n.id === nId);
          return {
            id: nId,
            title: narrative ? narrative.title : 'Unknown Narrative',
            percentage: Math.floor(Math.random() * 50) + 10
          };
        }),
        recentPosts: [
          {
            id: '1',
            content: 'Breaking: Evidence of ballot stuffing in Lagos polling stations! #NigeriaDecides2025',
            platform: 'TWITTER_X',
            timestamp: '2025-05-12T14:30:00Z',
            engagement: { likes: 245, shares: 132, comments: 67 }
          },
          {
            id: '2',
            content: 'Officials caught on camera manipulating votes. Share this before it gets taken down!',
            platform: 'FACEBOOK',
            timestamp: '2025-05-12T15:15:00Z',
            engagement: { likes: 189, shares: 95, comments: 42 }
          },
          {
            id: '3',
            content: 'Election commission refusing to address fraud allegations. What are they hiding?',
            platform: 'TWITTER_X',
            timestamp: '2025-05-12T16:45:00Z',
            engagement: { likes: 312, shares: 178, comments: 89 }
          }
        ]
      };
      
      return {
        success: true,
        data: activity
      };
    }
  },
  
  // Alerts
  alerts: {
    getAll: async (params = {}) => {
      await delay(800);
      
      let alerts = [...mockData.alertsData.alerts];
      
      // Apply filters if provided
      if (params.severity) {
        alerts = alerts.filter(a => a.severity === params.severity);
      }
      
      if (params.type) {
        alerts = alerts.filter(a => a.type === params.type);
      }
      
      if (params.timeframe) {
        // In a real implementation, this would filter by date
        // For mock data, we'll just return all alerts
      }
      
      return {
        success: true,
        data: alerts,
        meta: {
          total: alerts.length,
          page: params.page || 1,
          perPage: params.perPage || alerts.length
        }
      };
    },
    
    getById: async (id) => {
      await delay(600);
      
      const alert = mockData.alertsData.alerts.find(a => a.id === id);
      
      if (!alert) {
        return {
          success: false,
          error: 'Alert not found'
        };
      }
      
      return {
        success: true,
        data: alert
      };
    },
    
    acknowledge: async (id) => {
      await delay(500);
      
      return {
        success: true,
        data: { id, acknowledged: true }
      };
    },
    
    escalate: async (id) => {
      await delay(500);
      
      return {
        success: true,
        data: { id, escalated: true, severity: 'CRITICAL' }
      };
    }
  },
  
  // Timeline
  timeline: {
    getAll: async (params = {}) => {
      await delay(1000);
      
      let events = [...mockData.timelineData.events];
      
      // Apply filters if provided
      if (params.startDate) {
        events = events.filter(e => new Date(e.date) >= new Date(params.startDate));
      }
      
      if (params.endDate) {
        events = events.filter(e => new Date(e.date) <= new Date(params.endDate));
      }
      
      if (params.narrativeId) {
        events = events.filter(e => e.narrativeId === params.narrativeId);
      }
      
      if (params.platform) {
        events = events.filter(e => e.platforms.includes(params.platform));
      }
      
      // Sort by date
      events.sort((a, b) => new Date(a.date) - new Date(b.date));
      
      return {
        success: true,
        data: {
          events,
          stats: mockData.timelineData.stats
        }
      };
    }
  },
  
  // Reports
  reports: {
    getAll: async (params = {}) => {
      await delay(800);
      
      const reports = [...mockData.reportsData.reports];
      
      return {
        success: true,
        data: reports,
        meta: {
          total: reports.length,
          page: params.page || 1,
          perPage: params.perPage || reports.length
        }
      };
    },
    
    getById: async (id) => {
      await delay(700);
      
      const report = mockData.reportsData.reports.find(r => r.id === id);
      
      if (!report) {
        return {
          success: false,
          error: 'Report not found'
        };
      }
      
      return {
        success: true,
        data: report
      };
    },
    
    create: async (data) => {
      await delay(2000);
      
      if (simulateError(0.1)) {
        throw new Error('Failed to generate report');
      }
      
      // Create a new report with mock data
      const newReport = {
        id: `report-${Date.now()}`,
        title: data.title,
        type: data.type === 'narrative' ? 'Narrative Analysis' :
              data.type === 'actor' ? 'Actor Network Analysis' :
              data.type === 'trend' ? 'Trend Analysis' :
              data.type === 'summary' ? 'Executive Summary' : 'Comprehensive Report',
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        createdBy: 'Current User',
        summary: 'This newly generated report provides analysis based on your selected criteria.',
        keyFindings: [
          'Finding 1 based on selected parameters',
          'Finding 2 based on selected parameters',
          'Finding 3 based on selected parameters'
        ],
        visualizations: data.includeCharts ? [
          {
            title: 'Primary Visualization',
            description: 'Main visualization based on report type and parameters'
          },
          {
            title: 'Secondary Visualization',
            description: 'Supporting visualization based on report type and parameters'
          }
        ] : [],
        recommendations: data.includeRecommendations ? [
          'Recommendation 1 based on findings',
          'Recommendation 2 based on findings',
          'Recommendation 3 based on findings'
        ] : []
      };
      
      return {
        success: true,
        data: newReport
      };
    },
    
    export: async (id, format) => {
      await delay(1500);
      
      return {
        success: true,
        data: {
          id,
          format,
          url: `https://example.com/reports/${id}.${format.toLowerCase()}`
        }
      };
    }
  },
  
  // Lexicon
  lexicon: {
    getAll: async (params = {}) => {
      await delay(1000);
      
      // Mock lexicon data
      const lexicons = [
        {
          id: 'en',
          name: 'English',
          description: 'Standard English lexicon for election misinformation',
          termCount: 245
        },
        {
          id: 'pcm',
          name: 'Nigerian Pidgin',
          description: 'Nigerian Pidgin English lexicon for election misinformation',
          termCount: 187
        },
        {
          id: 'ha',
          name: 'Hausa',
          description: 'Hausa language lexicon for election misinformation',
          termCount: 156
        },
        {
          id: 'yo',
          name: 'Yoruba',
          description: 'Yoruba language lexicon for election misinformation',
          termCount: 142
        },
        {
          id: 'ig',
          name: 'Igbo',
          description: 'Igbo language lexicon for election misinformation',
          termCount: 128
        }
      ];
      
      return {
        success: true,
        data: lexicons
      };
    },
    
    getByLanguage: async (language) => {
      await delay(800);
      
      // Mock lexicon terms
      const terms = [
        { term: 'ballot stuffing', category: 'VOTE_RIGGING', translations: { pcm: 'ballot padding', ha: 'cika ƙuri\'a', yo: 'fifi ibo sinu apoti', ig: 'ịkpọnye vootu' } },
        { term: 'voter intimidation', category: 'VOTER_INTIMIDATION', translations: { pcm: 'voter fear fear', ha: 'tsoratarwa mai zabe', yo: 'ìdẹ́rùbà awọn aláṣẹ', ig: 'ịtụ egwu ndị ntuli aka' } },
        { term: 'fake results', category: 'PROCEDURAL_MISINFORMATION', translations: { pcm: 'fake result', ha: 'sakamakon karya', yo: 'àwọn èsì èké', ig: 'nsonaazụ ụgha' } }
      ];
      
      return {
        success: true,
        data: {
          language,
          terms
        }
      };
    }
  }
};

export default mockApi;
