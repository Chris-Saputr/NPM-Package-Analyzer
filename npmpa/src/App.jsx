import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  const [pkg, setPkg] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function fetchPackageInfo() {
    try {
      setError(null);
      setData(null);

      // NPM Registry API
      const res = await fetch(`https://registry.npmjs.org/${pkg}`);
      if (!res.ok) throw new Error("Package not found");
      const json = await res.json();

      const latestVersion = json["dist-tags"].latest;
      const latest = json.versions[latestVersion];

      // Downloads API
      const downloadsRes = await fetch(
        `https://api.npmjs.org/downloads/point/last-week/${pkg}`
      );
      const downloadsJson = await downloadsRes.json();

      const scorecard = {
        name: pkg,
        version: latestVersion,
        license: latest.license || "Unknown",
        dependencies: latest.dependencies ? Object.keys(latest.dependencies).length : 0,
        unpackedSize: latest.dist?.unpackedSize || "N/A",
        lastPublish: json.time?.modified,
        weeklyDownloads: downloadsJson.downloads || 0
      };

      setData(scorecard);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">NPM Package Inspector</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="Enter package name..."
          value={pkg}
          onChange={(e) => setPkg(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={fetchPackageInfo}
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div className="border rounded p-4 bg-gray-100">
          <h2 className="text-xl font-bold">{data.name}</h2>
          <p><strong>Version:</strong> {data.version}</p>
          <p><strong>License:</strong> {data.license}</p>
          <p><strong>Weekly Downloads:</strong> {data.weeklyDownloads.toLocaleString()}</p>
          <p><strong>Dependencies:</strong> {data.dependencies}</p>
          <p><strong>Unpacked Size:</strong> {data.unpackedSize}</p>
          <p><strong>Last Publish:</strong> {new Date(data.lastPublish).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
