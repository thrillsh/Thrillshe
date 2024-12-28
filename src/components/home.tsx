import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import MetricsPanel from "@/components/dashboard/MetricsPanel";

const Home = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          </div>

          {/* Metrics Panel */}
          <MetricsPanel />
        </div>
      </main>
    </div>
  );
};

export default Home;
