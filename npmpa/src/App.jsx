import { useState } from 'react'
import './util.js'
import './App.css'
import { sizeBytes } from './util.js';
 

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
        unpackedSize: latest.dist?.unpackedSize ? sizeBytes(latest.dist.unpackedSize) : "N/A",
        lastPublish: waiting.time?.[latestVersion] || waiting.time?.modified || null,
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

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>NPM Package Dependency Inspector</h1>
       <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          placeholder="Enter package name (e.g., react)"
          value={pkg}
          onChange={(e) => setPkg(e.target.value)}
          onKeyDown={EnterPressed}
          style={{ flex: 1, padding: "10px 12px", border: "1px solid #ccc", borderRadius: 8 }}
        />
        <button
          onClick={npmSearch}
          disabled={loading}
        >
          Search
        </button>
      </div>

      {error && <div style={{ color: "#dc2626", marginBottom: 12 }}>{error}</div>}


      {data && (
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, background: "#242121ff" }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{data.name}</div>
           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <p><strong>Version:</strong> {data.version}</p>
          <p><strong>License:</strong> {data.license}</p>
          <p><strong>Weekly Downloads:</strong> {data.weeklyDownloads.toLocaleString()}</p>
          <p><strong>Dependencies:</strong> {data.dependencies}</p>
          <p><strong>Unpacked Size:</strong> {data.unpackedSize}</p>
          <p><strong>Last Publish:</strong> {new Date(data.lastPublish).toLocaleString()}</p>
        </div>
        </div>
      )}
    </div>
  );
}
