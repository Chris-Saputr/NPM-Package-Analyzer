import { useState } from 'react'
import './App.css'

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  let val = bytes

  while (val >= 1024 && i < sizes.length - 1) {
    val /= 1024;
    i++;}
  return `${val.toFixed(1)} ${sizes[i]}`;
} 

export default function App() {
  const [pkg, setPkg] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  async function npmSearch() {
    const name = pkg.trim();
    if (!name) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(`https://registry.npmjs.org/${name}`);
      if (!res.ok) throw new Error("Package not found");
      const waiting = await res.json();

      const latestVersion = waiting["dist-tags"]?.latest;
      const latest = latestVersion ? waiting.versions[latestVersion] : null;
      if(!latest) throw new Error("Latest version info not found");

      // Downloads API
      const downloadsRes = await fetch(
        `https://api.npmjs.org/downloads/point/last-week/${name}`
      );
      const downloads = await downloadsRes.json();

      // Scorecard data
      const scorecard = {
        name: name,
        version: latestVersion,
        license: latest.license || "Unknown",
        dependencies: latest.dependencies ? Object.keys(latest.dependencies || {}).length : 0,
        unpackedSize: latest.dist?.unpackedSize ? formatBytes(latest.dist.unpackedSize) : "N/A",
        lastPublish: waiting.time?.modified || null,
        weeklyDownloads: downloads.downloads || 0
      };

      setData(scorecard);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  function EnterPressed(e) {
    if (e.key === 'Enter') npmSearch();
  }  

  // async function fetchPackageInfo() {
  //   try {
  //     setError(null);
  //     setData(null);

  //     // NPM Registry API
  //     const res = await fetch(`https://registry.npmjs.org/${pkg}`);
  //     if (!res.ok) throw new Error("Package not found");
  //     const json = await res.json();

  //     const latestVersion = json["dist-tags"].latest;
  //     const latest = json.versions[latestVersion];

  //     // Downloads API
  //     const downloadsRes = await fetch(
  //       `https://api.npmjs.org/downloads/point/last-week/${pkg}`
  //     );
  //     const downloadsJson = await downloadsRes.json();

  //     const scorecard = {
  //       name: pkg,
  //       version: latestVersion,
  //       license: latest.license || "Unknown",
  //       dependencies: latest.dependencies ? Object.keys(latest.dependencies).length : 0,
  //       unpackedSize: latest.dist?.unpackedSize || "N/A",
  //       lastPublish: json.time?.modified,
  //       weeklyDownloads: downloadsJson.downloads || 0
  //     };

  //     setData(scorecard);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // }

  return (
    <div className="p-6 max-w-lg mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">NPM Package Inspector</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="Enter package name..."
          value={pkg}
          onChange={(e) => setPkg(e.target.value)}
          onKeyDown={EnterPressed}
          style={{ flex: 1, padding: "10px 12px", border: "1px solid #ccc", borderRadius: 8 }}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={npmSearch}
          disabled={loading}
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
