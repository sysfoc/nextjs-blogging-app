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
        }, 60000); // 1 minutes
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
      }, 60000); // 1 minute
    }
  };

  return (
    <div>
      <button
        onClick={handleBuild}
        type="button"
        disabled={buildLoading}
        className='w-fit py-3 px-4 bg-gradient-to-r from-[#FE4F70] to-[#FFA387] text-white rounded-full text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {buildLoading ? "Building..." : "Rebuild Site"}
      </button>
      {buildStatus && (
        <p className="text-sm text-[#FE4F70] mt-2">{buildStatus}</p>
      )}
    </div>
  );
};

export default RebuildButton;