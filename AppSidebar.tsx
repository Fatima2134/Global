import { useState } from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar 
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Calendar, 
  Clock, 
  Video,
  LogOut,
  Users
} from "lucide-react";

interface AppSidebarProps {
  activeView: string;
  onViewChange: (view: 'overview' | 'calendar' | 'clock' | 'meetings') => void;
  onLogout: () => void;
}

const AppSidebar = ({ activeView, onViewChange, onLogout }: AppSidebarProps) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const mainItems = [
    { 
      title: "Overview", 
      icon: Globe, 
      id: "overview",
      onClick: () => onViewChange('overview')
    },
    { 
      title: "Calendar", 
      icon: Calendar, 
      id: "calendar",
      onClick: () => onViewChange('calendar')
    },
    { 
      title: "World Clock", 
      icon: Clock, 
      id: "clock",
      onClick: () => onViewChange('clock')
    },
    { 
      title: "Meetings", 
      icon: Users, 
      id: "meetings",
      onClick: () => onViewChange('meetings')
    },
  ];

  const integrationItems = [
    { title: "Zoom", icon: Video, id: "zoom" },
  ];

  const handleZoomClick = () => {
    window.open('https://zoom.us/start/videomeeting', '_blank');
  };

  return (
    <Sidebar className={`${collapsed ? "w-14" : "w-64"} border-global-200`}>
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent className="bg-white">
        {/* Logo */}
        <div className="p-4 border-b border-global-200">
          <div className="flex items-center space-x-2">
            <Globe className="h-6 w-6 text-global-600" />
            {!collapsed && <span className="text-xl font-bold text-global-800">Global</span>}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-global-700">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={item.onClick}
                    className={`${
                      activeView === item.id 
                        ? "bg-global-100 text-global-700 font-medium" 
                        : "text-gray-600 hover:bg-global-50 hover:text-global-700"
                    } transition-colors`}
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Integrations */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-global-700">Integrations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {integrationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={item.id === 'zoom' ? handleZoomClick : undefined}
                    className="text-gray-600 hover:bg-global-50 hover:text-global-700 transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout */}
        <div className="mt-auto p-4 border-t border-global-200">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-600 hover:bg-red-50 hover:text-red-600"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
