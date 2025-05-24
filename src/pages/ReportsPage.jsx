import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';

// Report list component
const ReportList = ({ reports, onView, onExport, onDelete }) => {
  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Generated Reports</h3>
        <p className="mt-1 text-sm text-gray-500">
          View, export, or delete previously generated reports
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created By
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                  No reports have been generated yet
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {report.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.createdBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onView(report.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button
                        onClick={() => onExport(report.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Export
                      </button>
                      <button
                        onClick={() => onDelete(report.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Report creator component
const ReportCreator = ({ onCreateReport }) => {
  const [reportData, setReportData] = useState({
    title: '',
    type: 'narrative',
    timeframe: 'week',
    narrativeIds: [],
    actorIds: [],
    includeCharts: true,
    includeRawData: false,
    includeRecommendations: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReportData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateReport(reportData);
  };

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg mb-6">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Create New Report</h3>
        <p className="mt-1 text-sm text-gray-500">
          Generate a customized report based on your criteria
        </p>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Report Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={reportData.title}
                  onChange={handleChange}
                  required
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="e.g., Weekly Misinformation Trends Report"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Report Type
              </label>
              <div className="mt-1">
                <select
                  id="type"
                  name="type"
                  value={reportData.type}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="narrative">Narrative Analysis</option>
                  <option value="actor">Actor Network Analysis</option>
                  <option value="trend">Trend Analysis</option>
                  <option value="summary">Executive Summary</option>
                  <option value="comprehensive">Comprehensive Report</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700">
                Timeframe
              </label>
              <div className="mt-1">
                <select
                  id="timeframe"
                  name="timeframe"
                  value={reportData.timeframe}
                  onChange={handleChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="day">Last 24 Hours</option>
                  <option value="week">Past Week</option>
                  <option value="month">Past Month</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-6">
              <fieldset>
                <legend className="text-sm font-medium text-gray-700">Report Content</legend>
                <div className="mt-2 space-y-2">
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="includeCharts"
                        name="includeCharts"
                        type="checkbox"
                        checked={reportData.includeCharts}
                        onChange={handleChange}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="includeCharts" className="font-medium text-gray-700">
                        Include Charts and Visualizations
                      </label>
                    </div>
                  </div>
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="includeRawData"
                        name="includeRawData"
                        type="checkbox"
                        checked={reportData.includeRawData}
                        onChange={handleChange}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="includeRawData" className="font-medium text-gray-700">
                        Include Raw Data Tables
                      </label>
                    </div>
                  </div>
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="includeRecommendations"
                        name="includeRecommendations"
                        type="checkbox"
                        checked={reportData.includeRecommendations}
                        onChange={handleChange}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="includeRecommendations" className="font-medium text-gray-700">
                        Include Recommendations
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Generate Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Export modal component
const ExportModal = ({ report, onClose, onExport }) => {
  const [format, setFormat] = useState('pdf');

  const handleExport = () => {
    onExport(report.id, format);
    onClose();
  };

  if (!report) return null;

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
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Export Report: {report.title}
                </h3>
                <div className="mt-4">
                  <label htmlFor="format" className="block text-sm font-medium text-gray-700">
                    Export Format
                  </label>
                  <select
                    id="format"
                    name="format"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="docx">Word Document (DOCX)</option>
                    <option value="csv">CSV Data Export</option>
                    <option value="json">JSON Data Export</option>
                    <option value="pptx">PowerPoint Presentation (PPTX)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleExport}
            >
              Export
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Report viewer modal component
const ReportViewerModal = ({ report, onClose }) => {
  if (!report) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto"> {/* Increased z-index */}
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full max-h-[90vh] overflow-y-auto">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {report.title}
                </h3>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Report Type: {report.type} | Created: {report.createdAt} | By: {report.createdBy}</p>
                </div>
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="prose max-w-none">
                    <h4>Executive Summary</h4>
                    <p>{report.summary}</p>
                    
                    <h4 className="mt-6">Key Findings</h4>
                    <ul>
                      {report.keyFindings.map((finding, index) => (
                        <li key={index}>{finding}</li>
                      ))}
                    </ul>
                    
                    {report.visualizations && (
                      <div className="mt-6">
                        <h4>Visualizations</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          {report.visualizations.map((viz, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                              <h5 className="text-sm font-medium text-gray-900">{viz.title}</h5>
                              <div className="h-64 bg-gray-100 rounded-md mt-2 flex items-center justify-center">
                                <p className="text-gray-500 text-sm">Visualization placeholder</p>
                              </div>
                              <p className="text-xs text-gray-500 mt-2">{viz.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {report.recommendations && (
                      <div className="mt-6">
                        <h4>Recommendations</h4>
                        <ul>
                          {report.recommendations.map((recommendation, index) => (
                            <li key={index}>{recommendation}</li>
                          ))}
                        </ul>
                      </div>
                    )}
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

// Main Reports Page component
const ReportsPage = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showViewerModal, setShowViewerModal] = useState(false);
  const [creatingReport, setCreatingReport] = useState(false);

  // Load reports data
  const loadReports = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would call the API
      // const response = await api.reports.getAll();
      // setReports(response.data);
      
      // Mock data for development
      setTimeout(() => {
        setReports([
          {
            id: '1',
            title: 'Weekly Misinformation Trends Report',
            type: 'Trend Analysis',
            createdAt: 'May 12, 2025',
            createdBy: 'John Doe',
            summary: 'This report provides an analysis of key misinformation trends observed during the past week leading up to the Nigerian presidential election. It highlights emerging narratives, influential actors, and recommended intervention strategies.',
            keyFindings: [
              'Significant increase (35%) in vote rigging narratives across platforms',
              'Coordinated network of 24 accounts spreading ethnic tension narratives',
              'Regional concentration of voter intimidation claims in northern states',
              'Cross-platform amplification pattern from Twitter to Facebook to WhatsApp'
            ],
            visualizations: [
              {
                title: 'Narrative Volume by Platform',
                description: 'Comparison of narrative prevalence across different social media platforms'
              },
              {
                title: 'Geographic Distribution of Narratives',
                description: 'Heat map showing concentration of misinformation narratives by region'
              },
              {
                title: 'Temporal Spread Pattern',
                description: 'Timeline showing how narratives evolved and spread over time'
              },
              {
                title: 'Key Actor Network',
                description: 'Network graph showing relationships between influential spreaders'
              }
            ],
            recommendations: [
              'Focus fact-checking efforts on vote rigging claims, particularly in Lagos and Kano',
              'Monitor the identified coordinated network for new narrative introduction',
              'Deploy targeted counter-messaging in northern regions addressing voter intimidation concerns',
              'Engage with platform representatives about the cross-platform amplification pattern'
            ]
          },
          {
            id: '2',
            title: 'Ballot Stuffing Narrative Analysis',
            type: 'Narrative Analysis',
            createdAt: 'May 10, 2025',
            createdBy: 'Jane Smith',
            summary: 'Detailed analysis of the "ballot stuffing" narrative that emerged on May 9th and rapidly spread across multiple platforms. This report examines the origin, spread patterns, key amplifiers, and impact of this specific narrative.',
            keyFindings: [
              'Narrative originated from a manipulated video shared by @election_truth',
              'Spread to 15,000+ shares within 6 hours of initial posting',
              'Amplified by 3 verified accounts with combined following of 500K+',
              'Generated 28 derivative narratives focusing on specific polling stations'
            ],
            visualizations: [
              {
                title: 'Narrative Spread Timeline',
                description: 'Hour-by-hour spread of the ballot stuffing narrative'
              },
              {
                title: 'Key Amplifier Network',
                description: 'Network of accounts that significantly boosted the narrative reach'
              }
            ],
            recommendations: [
              'Prioritize fact-checking of the original manipulated video',
              'Engage with verified accounts that amplified the narrative',
              'Monitor for similar narrative patterns at other polling locations',
              'Prepare counter-narrative resources for election officials'
            ]
          },
          {
            id: '3',
            title: 'Coordinated Inauthentic Behavior Report',
            type: 'Actor Network Analysis',
            createdAt: 'May 8, 2025',
            createdBy: 'Alex Johnson',
            summary: 'This report documents a network of accounts exhibiting coordinated inauthentic behavior around election integrity narratives. It analyzes account creation patterns, posting behaviors, content sharing patterns, and network relationships.',
            keyFindings: [
              'Network of 37 accounts created within the same 48-hour period',
              'Synchronized posting patterns with 92% content similarity',
              'Targeting of 5 specific electoral regions with tailored messaging',
              'Evidence of automation in posting schedule and response patterns'
            ],
            visualizations: [
              {
                title: 'Account Creation Timeline',
                description: 'Clustering of account creation dates showing coordinated setup'
              },
              {
                title: 'Content Similarity Matrix',
                description: 'Heat map showing content similarity between accounts in the network'
              }
            ],
            recommendations: [
              'Report network to platform trust and safety teams with supporting evidence',
              'Monitor for network reconstitution if accounts are removed',
              'Track narrative shifts from this network as a leading indicator',
              'Document tactics for future reference and training'
            ]
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading reports:', error);
      setLoading(false);
    }
  };

  // Load data on initial render
  useEffect(() => {
    loadReports();
  }, []);

  const handleCreateReport = async (reportData) => {
    setCreatingReport(true);
    try {
      // In a real implementation, this would call the API
      // const response = await api.reports.create(reportData);
      // const newReport = response.data;
      
      // Mock response for development
      setTimeout(() => {
        const newReport = {
          id: Date.now().toString(),
          title: reportData.title,
          type: reportData.type === 'narrative' ? 'Narrative Analysis' :
                reportData.type === 'actor' ? 'Actor Network Analysis' :
                reportData.type === 'trend' ? 'Trend Analysis' :
                reportData.type === 'summary' ? 'Executive Summary' : 'Comprehensive Report',
          createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          createdBy: 'Current User',
          summary: 'This newly generated report provides analysis based on your selected criteria.',
          keyFindings: [
            'Finding 1 based on selected parameters',
            'Finding 2 based on selected parameters',
            'Finding 3 based on selected parameters'
          ],
          visualizations: reportData.includeCharts ? [
            {
              title: 'Primary Visualization',
              description: 'Main visualization based on report type and parameters'
            },
            {
              title: 'Secondary Visualization',
              description: 'Supporting visualization based on report type and parameters'
            }
          ] : [],
          recommendations: reportData.includeRecommendations ? [
            'Recommendation 1 based on findings',
            'Recommendation 2 based on findings',
            'Recommendation 3 based on findings'
          ] : []
        };
        
        setReports(prevReports => [newReport, ...prevReports]);
        setCreatingReport(false);
      }, 2000);
    } catch (error) {
      console.error('Error creating report:', error);
      setCreatingReport(false);
    }
  };

  const handleViewReport = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    setSelectedReport(report);
    setShowViewerModal(true);
  };

  const handleExportReport = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    setSelectedReport(report);
    setShowExportModal(true);
  };

  const handleDeleteReport = async (reportId) => {
    try {
      // In a real implementation, this would call the API
      // await api.reports.delete(reportId);
      
      // Update local state
      setReports(prevReports => 
        prevReports.filter(report => report.id !== reportId)
      );
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  const handleExportConfirm = async (reportId, format) => {
    try {
      // In a real implementation, this would call the API
      // const response = await api.reports.export(reportId, format);
      // Handle download of exported file
      
      console.log(`Exporting report ${reportId} in ${format} format`);
      // Mock export success message
      alert(`Report exported successfully in ${format.toUpperCase()} format`);
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="mt-1 text-sm text-gray-500">
          Generate, view, and export reports on misinformation trends and narratives
        </p>
      </div>
      
      <ReportCreator onCreateReport={handleCreateReport} />
      
      {creatingReport && (
        <div className="bg-white shadow rounded-lg p-6 mb-6 flex items-center justify-center">
          <div className="animate-pulse flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-700">Generating report... This may take a moment.</span>
          </div>
        </div>
      )}
      
      {loading ? (
        <div className="bg-white shadow rounded-lg p-6 flex items-center justify-center h-64">
          <div className="animate-pulse text-gray-400">Loading reports...</div>
        </div>
      ) : (
        <ReportList 
          reports={reports} 
          onView={handleViewReport}
          onExport={handleExportReport}
          onDelete={handleDeleteReport}
        />
      )}
      
      {showExportModal && (
        <ExportModal 
          report={selectedReport} 
          onClose={() => setShowExportModal(false)} 
          onExport={handleExportConfirm}
        />
      )}
      
      {showViewerModal && (
        <ReportViewerModal 
          report={selectedReport} 
          onClose={() => setShowViewerModal(false)} 
        />
      )}
    </div>
  );
};

export default ReportsPage;
