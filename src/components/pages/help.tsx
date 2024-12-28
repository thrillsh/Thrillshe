import React from "react";
import Sidebar from "@/components/dashboard/Sidebar";

const Help = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
          {/* Add help content here */}
        </div>
      </main>
    </div>
  );
};

export default Help;
