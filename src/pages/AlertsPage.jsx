import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';

// Alert severity badge component
const SeverityBadge = ({ severity }) => {
  const severityStyles = {
    CRITICAL: 'bg-red-100 text-red-800',
    HIGH: 'bg-orange-100 text-orange-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    LOW: 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${severityStyles[severity]}`}>
      {severity}
    </span>
  );
};

// Alert type badge component
const TypeBadge = ({ type }) => {
  const typeStyles = {
    VOLUME_SPIKE: 'bg-purple-100 text-purple-800',
    NEW_NARRATIVE: 'bg-blue-100 text-blue-800',
    NEW_INFLUENCER: 'bg-green-100 text-green-800',
    COORDINATED_ACTIVITY: 'bg-red-100 text-red-800',
    GEOGRAPHIC_SHIFT: 'bg-yellow-100 text-yellow-800',
  };

  const typeLabels = {
    VOLUME_SPIKE: 'Volume Spike',
    NEW_NARRATIVE: 'New Narrative',
    NEW_INFLUENCER: 'New Influencer',
    COORDINATED_ACTIVITY: 'Coordinated Activity',
    GEOGRAPHIC_SHIFT: 'Geographic Shift',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeStyles[type]}`}>
      {typeLabels[type]}
    </span>
  );
};

// Alert list component
const AlertList = ({ alerts, onAcknowledge, onEscalate, onView }) => {
  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Active Alerts</h3>
        <p className="mt-1 text-sm text-gray-500">
          Alerts requiring attention or action
        </p>
      </div>
      <ul className="divide-y divide-gray-200">
        {alerts.length === 0 ? (
          <li className="px-4 py-5 sm:px-6 text-center text-gray-500">
            No active alerts at this time
          </li>
        ) : (
          alerts.map((alert) => (
            <li key={alert.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full ${
                    alert.severity === 'CRITICAL' ? 'bg-red-500' :
                    alert.severity === 'HIGH' ? 'bg-orange-500' :
                    alert.severity === 'MEDIUM' ? 'bg-yellow-500' : 'bg-blue-500'
                  } mr-3`}></div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{alert.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <SeverityBadge severity={alert.severity} />
                      <TypeBadge type={alert.type} />
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {alert.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onView(alert.id)}
                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View
                  </button>
                  <button
                    onClick={() => onAcknowledge(alert.id)}
                    className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Acknowledge
                  </button>
                  <button
                    onClick={() => onEscalate(alert.id)}
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Escalate
                  </button>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

// Alert detail modal component
const AlertDetailModal = ({ alert, onClose }) => {
  if (!alert) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                  <span className={`inline-block h-3 w-3 rounded-full mr-2 ${
                    alert.severity === 'CRITICAL' ? 'bg-red-500' :
                    alert.severity === 'HIGH' ? 'bg-orange-500' :
                    alert.severity === 'MEDIUM' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></span>
                  {alert.title}
                </h3>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <SeverityBadge severity={alert.severity} />
                    <TypeBadge type={alert.type} />
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {alert.timestamp}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-4">{alert.description}</p>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Related Narratives</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {alert.relatedNarratives.map((narrative, index) => (
                        <li key={index}>{narrative}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {alert.relatedActors.length > 0 && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Related Actors</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {alert.relatedActors.map((actor, index) => (
                          <li key={index}>{actor}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Recommended Actions</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {alert.recommendedActions.map((action, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Alert filters component
const AlertFilters = ({ filters, setFilters, onApplyFilters }) => {
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
      <h2 className="text-lg font-medium text-gray-900 mb-4">Alert Filters</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="severity" className="block text-sm font-medium text-gray-700 mb-1">
              Severity
            </label>
            <select
              id="severity"
              name="severity"
              value={localFilters.severity}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Severities</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Alert Type
            </label>
            <select
              id="type"
              name="type"
              value={localFilters.type}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="VOLUME_SPIKE">Volume Spike</option>
              <option value="NEW_NARRATIVE">New Narrative</option>
              <option value="NEW_INFLUENCER">New Influencer</option>
              <option value="COORDINATED_ACTIVITY">Coordinated Activity</option>
              <option value="GEOGRAPHIC_SHIFT">Geographic Shift</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700 mb-1">
              Timeframe
            </label>
            <select
              id="timeframe"
              name="timeframe"
              value={localFilters.timeframe}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
              <option value="all">All Time</option>
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

// Main Alerts Page component
const AlertsPage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filters, setFilters] = useState({
    severity: searchParams.get('severity') || '',
    type: searchParams.get('type') || '',
    timeframe: searchParams.get('timeframe') || 'today',
  });

  // Load alerts data
  const loadAlerts = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would call the API
      // const response = await api.alerts.getAll(filters);
      // setAlerts(response.data);
      
      // Mock data for development
      setTimeout(() => {
        setAlerts([
          {
            id: '1',
            title: 'Sudden spike in "ballot stuffing" narrative',
            description: 'Volume increased by 450% in the last hour across Twitter and Facebook',
            severity: 'CRITICAL',
            type: 'VOLUME_SPIKE',
            timestamp: '15 minutes ago',
            isAcknowledged: false,
            relatedNarratives: [
              'Ballot stuffing in Lagos polling stations',
              'Electoral commission corruption allegations'
            ],
            relatedActors: [
              '@election_truth (50K followers)',
              '@nigeria_watchdog (35K followers)'
            ],
            recommendedActions: [
              'Monitor related hashtags #NigeriaDecides2025 and #LagosVotes',
              'Track geographic spread of narrative',
              'Identify original sources and verify claims',
              'Alert fact-checking partners'
            ]
          },
          {
            id: '2',
            title: 'New coordinated network detected',
            description: '15 accounts showing synchronized posting patterns around election fraud claims',
            severity: 'HIGH',
            type: 'COORDINATED_ACTIVITY',
            timestamp: '45 minutes ago',
            isAcknowledged: false,
            relatedNarratives: [
              'Election officials compromised',
              'Foreign interference in voting process'
            ],
            relatedActors: [
              'Network of 15 accounts created in the last 30 days',
              'Central node: @truth_seeker_ng'
            ],
            recommendedActions: [
              'Analyze account creation patterns and relationships',
              'Document coordinated posting behavior',
              'Report to platform for potential violation of terms',
              'Monitor for network expansion'
            ]
          },
          {
            id: '3',
            title: 'New influential actor promoting misinformation',
            description: 'Verified account with 120K followers sharing manipulated polling station video',
            severity: 'MEDIUM',
            type: 'NEW_INFLUENCER',
            timestamp: '2 hours ago',
            isAcknowledged: false,
            relatedNarratives: [
              'Voter intimidation in northern regions',
              'Ethnic targeting at polling stations'
            ],
            relatedActors: [
              '@political_insider (120K followers, verified)'
            ],
            recommendedActions: [
              'Analyze account history and recent activity patterns',
              'Document reach and engagement of manipulated content',
              'Identify original source of manipulated video',
              'Contact platform about potential policy violation'
            ]
          },
          {
            id: '4',
            title: 'Geographic shift in narrative spread',
            description: 'Ethnic tension narrative spreading from online spaces to on-ground incidents',
            severity: 'HIGH',
            type: 'GEOGRAPHIC_SHIFT',
            timestamp: '3 hours ago',
            isAcknowledged: false,
            relatedNarratives: [
              'Ethnic profiling at polling stations',
              'Targeted voter suppression'
            ],
            relatedActors: [
              'Multiple local community groups',
              'Regional political influencers'
            ],
            recommendedActions: [
              'Alert local observers in affected regions',
              'Track geographic correlation between online narrative and incidents',
              'Identify key amplifiers in transition from online to offline',
              'Prepare counter-messaging resources for local partners'
            ]
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading alerts:', error);
      setLoading(false);
    }
  };

  // Load data on initial render and when filters change
  useEffect(() => {
    loadAlerts();
  }, []);

  const handleApplyFilters = () => {
    loadAlerts();
  };

  const handleAcknowledge = async (alertId) => {
    try {
      // In a real implementation, this would call the API
      // await api.alerts.acknowledge(alertId);
      
      // Update local state
      setAlerts(prevAlerts => 
        prevAlerts.filter(alert => alert.id !== alertId)
      );
    } catch (error) {
      console.error('Error acknowledging alert:', error);
    }
  };

  const handleEscalate = async (alertId) => {
    try {
      // In a real implementation, this would call the API
      // await api.alerts.escalate(alertId);
      
      // Update local state
      setAlerts(prevAlerts => 
        prevAlerts.map(alert => 
          alert.id === alertId 
            ? { ...alert, severity: 'CRITICAL' } 
            : alert
        )
      );
    } catch (error) {
      console.error('Error escalating alert:', error);
    }
  };

  const handleViewAlert = (alertId) => {
    const alert = alerts.find(a => a.id === alertId);
    setSelectedAlert(alert);
  };

  const handleCloseModal = () => {
    setSelectedAlert(null);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Alerts</h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor and respond to critical events requiring attention
        </p>
      </div>
      
      <AlertFilters 
        filters={filters} 
        setFilters={setFilters} 
        onApplyFilters={handleApplyFilters} 
      />
      
      {loading ? (
        <div className="bg-white shadow rounded-lg p-6 flex items-center justify-center h-64">
          <div className="animate-pulse text-gray-400">Loading alerts...</div>
        </div>
      ) : (
        <AlertList 
          alerts={alerts} 
          onAcknowledge={handleAcknowledge}
          onEscalate={handleEscalate}
          onView={handleViewAlert}
        />
      )}
      
      {selectedAlert && (
        <AlertDetailModal 
          alert={selectedAlert} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default AlertsPage;
