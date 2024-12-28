import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
  onNavigate?: (path: string) => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: ShoppingCart, label: "Orders", path: "/orders" },
  { icon: Users, label: "Customers", path: "/customers" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: HelpCircle, label: "Help", path: "/help" },
];

const Sidebar = ({ className = "" }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={cn(
        "w-[280px] h-full bg-background border-r border-border flex flex-col",
        className,
      )}
    >
      {/* Logo Area */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">Order Management</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-muted-foreground hover:text-foreground",
                  location.pathname === item.path &&
                    "bg-accent text-accent-foreground",
                )}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-4">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
            alt="User Avatar"
            className="w-10 h-10 rounded-full bg-muted"
          />
          <div>
            <p className="font-medium text-foreground">Admin User</p>
            <p className="text-sm text-muted-foreground">admin@example.com</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={() => navigate("/logout")}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
