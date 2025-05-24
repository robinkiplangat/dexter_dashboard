import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Correctly import and use useAuth

// User profile settings component
const ProfileSettings = ({ user, onSave }) => {
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    organization: user?.organization || '',
    regions: user?.regions || []
  });

  useEffect(() => {
    // Update profile state if user prop changes
    setProfile({
        name: user?.name || '',
        email: user?.email || '',
        organization: user?.organization || '',
        regions: user?.regions || []
    });
  }, [user]);

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
                readOnly // Email might be read-only if managed by auth provider
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
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
  const { user, loading } = useAuth(); // Use user from AuthContext
  // Potentially add an updateUser function to AuthContext if profile updates should reflect globally
  // For now, we'll assume saving here is local or calls a specific API endpoint
  const [activeTab, setActiveTab] = useState('profile');

  const handleSaveProfile = (profileData) => {
    console.log('Saving profile:', profileData);
    // Here you would typically call an API to update the user's profile.
    // If you added an `updateUser` to AuthContext, you could call it here.
    // For example: updateUserContext({ ...user, ...profileData });
    alert('Profile saved! (Simulated - implement API call)');
  };

  const handleSaveNotifications = (notificationData) => {
    console.log('Saving notification settings:', notificationData);
    alert('Notification settings saved! (Simulated)');
  };

  const handleSaveDataPrivacy = (dataPrivacyData) => {
    console.log('Saving data privacy settings:', dataPrivacyData);
    alert('Data privacy settings saved! (Simulated)');
  };

  if (loading || !user) { // Check loading state from context
    return (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
      <div className="mb-6 border-b border-gray-200">
        {/* Tabs as before */}
      </div>
      {activeTab === 'profile' && <ProfileSettings user={user} onSave={handleSaveProfile} />}
      {activeTab === 'notifications' && <NotificationSettings settings={user.notificationSettings || {}} onSave={handleSaveNotifications} />}
      {activeTab === 'dataPrivacy' && <DataPrivacySettings onSave={handleSaveDataPrivacy} />}
    </div>
  );
};

export default SettingsPage;
