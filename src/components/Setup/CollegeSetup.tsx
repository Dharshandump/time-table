import React, { useState } from 'react';
import { api } from '../../lib/api';
import type { College } from '../../types';

interface CollegeSetupProps {
  onComplete: (college: College) => void;
  userId: string;
}

export default function CollegeSetup({ onComplete, userId }: CollegeSetupProps) {
  const [formData, setFormData] = useState({
    name: '',
    short_name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    primary_color: '#2563EB',
    secondary_color: '#4F46E5'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const college = await api.createCollege({
        ...formData,
        admin_user_id: userId
      });
      onComplete(college);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Setup Your Institution
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Configure your college or university details
          </p>
        </div>

        <form className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Institution Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., ABC University"
              />
            </div>

            <div>
              <label htmlFor="short_name" className="block text-sm font-medium text-gray-700">
                Short Name *
              </label>
              <input
                type="text"
                id="short_name"
                required
                value={formData.short_name}
                onChange={(e) => setFormData({ ...formData, short_name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., ABCU"
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address *
            </label>
            <textarea
              id="address"
              required
              rows={3}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter complete address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="contact@university.edu"
              />
            </div>
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Website (Optional)
            </label>
            <input
              type="url"
              id="website"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://www.university.edu"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="primary_color" className="block text-sm font-medium text-gray-700">
                Primary Color
              </label>
              <input
                type="color"
                id="primary_color"
                value={formData.primary_color}
                onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                className="mt-1 block w-full h-10 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="secondary_color" className="block text-sm font-medium text-gray-700">
                Secondary Color
              </label>
              <input
                type="color"
                id="secondary_color"
                value={formData.secondary_color}
                onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                className="mt-1 block w-full h-10 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Setting up...' : 'Complete Setup'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}