import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

// User profile settings component
const ProfileSettings = ({ user, onSave }) => {
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    organization: user?.organization || '',
    regions: user?.regions || []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(profile);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                value={profile.name}
                onChange={handleChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                value={profile.email}
                onChange={handleChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
              Organization
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="organization"
                id="organization"
                value={profile.organization}
                onChange={handleChange}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="regions" className="block text-sm font-medium text-gray-700">
              Regions of Interest
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="regions"
                id="regions"
                value={profile.regions.join(', ')}
                onChange={(e) => {
                  const regions = e.target.value.split(',').map(r => r.trim()).filter(Boolean);
                  setProfile(prev => ({ ...prev, regions }));
                }}
                placeholder="e.g., Lagos, Abuja"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
              <p className="mt-1 text-xs text-gray-500">Separate regions with commas</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

// Notification settings component
const NotificationSettings = ({ settings, onSave }) => {
  const [notifications, setNotifications] = useState(settings || {
    email: true,
    inApp: true,
    criticalAlerts: true,
    dailySummary: true,
    weeklyReport: true
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(notifications);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className="text-sm font-medium text-gray-700">Notification Channels</legend>
          <div className="mt-2 space-y-4">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="email"
                  name="email"
                  type="checkbox"
                  checked={notifications.email}
                  onChange={handleChange}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="email" className="font-medium text-gray-700">Email Notifications</label>
                <p className="text-gray-500">Receive notifications via email</p>
              </div>
            </div>
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="inApp"
                  name="inApp"
                  type="checkbox"
                  checked={notifications.inApp}
                  onChange={handleChange}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="inApp" className="font-medium text-gray-700">In-App Notifications</label>
                <p className="text-gray-500">Receive notifications within the application</p>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="text-sm font-medium text-gray-700">Notification Types</legend>
          <div className="mt-2 space-y-4">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="criticalAlerts"
                  name="criticalAlerts"
                  type="checkbox"
                  checked={notifications.criticalAlerts}
                  onChange={handleChange}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="criticalAlerts" className="font-medium text-gray-700">Critical Alerts</label>
                <p className="text-gray-500">Urgent notifications about high-priority events</p>
              </div>
            </div>
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="dailySummary"
                  name="dailySummary"
                  type="checkbox"
                  checked={notifications.dailySummary}
                  onChange={handleChange}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="dailySummary" className="font-medium text-gray-700">Daily Summary</label>
                <p className="text-gray-500">Daily digest of important activities</p>
              </div>
            </div>
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="weeklyReport"
                  name="weeklyReport"
                  type="checkbox"
                  checked={notifications.weeklyReport}
                  onChange={handleChange}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="weeklyReport" className="font-medium text-gray-700">Weekly Report</label>
                <p className="text-gray-500">Weekly summary of trends and activities</p>
              </div>
            </div>
          </div>
        </fieldset>

        <div className="mt-6">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Notification Settings
          </button>
        </div>
      </form>
    </div>
  );
};

// Main Settings Page component
const SettingsPage = () => {
  const { user } = useAuth();
  const [successMessage, setSuccessMessage] = useState('');

  const handleSaveProfile = (profileData) => {
    // In a real implementation, this would call the API
    console.log('Saving profile:', profileData);
    setSuccessMessage('Profile updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSaveNotifications = (notificationData) => {
    // In a real implementation, this would call the API
    console.log('Saving notification settings:', notificationData);
    setSuccessMessage('Notification settings updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>
      
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">{successMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      <ProfileSettings user={user} onSave={handleSaveProfile} />
      <NotificationSettings onSave={handleSaveNotifications} />
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Account Security</h2>
        <div className="space-y-4">
          <div>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Change Password
            </button>
          </div>
          <div>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Enable Two-Factor Authentication
            </button>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
