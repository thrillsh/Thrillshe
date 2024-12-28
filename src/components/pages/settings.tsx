import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";

const Settings = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          {/* Add settings content here */}
        </div>
      </main>
    </div>
  );
};

export default Settings;
