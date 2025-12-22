// app/(admin)/components/RebuildButton.tsx
"use client";
import React, { useState } from "react";

const RebuildButton = () => {
  const [buildLoading, setBuildLoading] = useState(false);
  const [buildStatus, setBuildStatus] = useState<string | null>(null);

  const handleBuild = async () => {
    if (!confirm("Are you sure you want to rebuild the site?")) return;
    
    setBuildLoading(true);
    setBuildStatus("Building... Please wait 2-3 minutes");
    
    try {
      const res = await fetch("/api/v1/build/trigger", {
        method: "POST",
      });
      const data = await res.json();
      
      if (res.ok) {
        setBuildStatus(null);
        
        // Build complete check - 3 minutes wait
        setTimeout(() => {
          alert("✅ Build completed successfully!");
        }, 180000); // 3 minutes
      } else {
        setBuildStatus(null);
        alert("❌ " + data.message);
      }
    } catch (error: any) {
      setBuildStatus(null);
      alert("❌ Build failed: " + error.message);
    } finally {
      setTimeout(() => {
        setBuildLoading(false);
      }, 180000); // 3 minutes
    }
  };

  return (
    <div>
      <button
        onClick={handleBuild}
        type="button"
        disabled={buildLoading}
        className='w-fit py-3 px-4 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {buildLoading ? "Building..." : "Rebuild Site"}
      </button>
      {buildStatus && (
        <p className="text-sm text-blue-600 mt-2">{buildStatus}</p>
      )}
    </div>
  );
};

export default RebuildButton;