import React, { useState } from 'react';
import { Link2, ExternalLink, BarChart3 } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{ urlCode: string; clicks: number } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShortUrl(null);
    setStats(null);

    try {
      const response = await fetch('http://localhost:8001/api/url/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl: url }),
      });

      if (!response.ok) {
        throw new Error('Failed to shorten URL');
      }

      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStats = async (urlCode: string) => {
    try {
      const response = await fetch(`http://localhost:8001/api/url/stats/${urlCode}`);
      if (!response.ok) throw new Error('Failed to get stats');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError('Failed to fetch stats');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Link2 className="h-16 w-16 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">URL Shortener</h1>
          <p className="text-lg text-gray-600">Transform your long URLs into short, memorable links</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your URL
              </label>
              <div className="flex gap-4">
                <input
                  type="url"
                  id="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/very-long-url"
                  className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Shortening...' : 'Shorten'}
                </button>
              </div>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {shortUrl && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your shortened URL</h2>
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
                >
                  {shortUrl}
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shortUrl);
                    alert('Copied to clipboard!');
                  }}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  Copy
                </button>
              </div>
              <button
                onClick={() => getStats(shortUrl.split('/').pop()!)}
                className="mt-4 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <BarChart3 className="h-4 w-4" />
                View Statistics
              </button>
            </div>
          )}

          {stats && (
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold text-indigo-900 mb-2">Link Statistics</h3>
              <p className="text-indigo-700">Total Clicks: {stats.clicks}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;