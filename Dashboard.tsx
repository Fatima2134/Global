import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import WorldClock from "@/components/WorldClock";
import YearlyCalendar from "@/components/YearlyCalendar";
import GoogleCalendarIntegration from "@/components/GoogleCalendarIntegration";
import UpcomingMeetingsPage from "@/components/UpcomingMeetingsPage";
import { Calendar, Clock, Users, Video } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeView, setActiveView] = useState<'overview' | 'calendar' | 'clock' | 'meetings'>('overview');

  const renderMainContent = () => {
    switch (activeView) {
      case 'calendar':
        return (
          <div className="space-y-6">
            <YearlyCalendar />
            <GoogleCalendarIntegration />
          </div>
        );
      case 'clock':
        return <WorldClock />;
      case 'meetings':
        return <UpcomingMeetingsPage />;
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-global-200 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveView('clock')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-global-700">World Clock</CardTitle>
                  <Clock className="h-4 w-4 text-global-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-global-900">50+ Cities</div>
                  <p className="text-xs text-muted-foreground">
                    Available worldwide
                  </p>
                </CardContent>
              </Card>

              <Card className="border-global-200 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveView('calendar')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-global-700">Calendar</CardTitle>
                  <Calendar className="h-4 w-4 text-global-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-global-900">Yearly View</div>
                  <p className="text-xs text-muted-foreground">
                    With appointments
                  </p>
                </CardContent>
              </Card>

              <Card className="border-global-200 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setActiveView('meetings')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-global-700">Meetings</CardTitle>
                  <Users className="h-4 w-4 text-global-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-global-900">Upcoming</div>
                  <p className="text-xs text-muted-foreground">
                    View all meetings
                  </p>
                </CardContent>
              </Card>

              <Card className="border-global-200 hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-global-700">Working Hours</CardTitle>
                  <Video className="h-4 w-4 text-global-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-global-900">9-5</div>
                  <p className="text-xs text-muted-foreground">
                    Standard hours
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="w-full">
                <WorldClock />
              </div>
              <GoogleCalendarIntegration />
            </div>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar activeView={activeView} onViewChange={setActiveView} onLogout={onLogout} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-global-900 mb-2">
                {activeView === 'overview' && 'Dashboard Overview'}
                {activeView === 'calendar' && 'Global Calendar'}
                {activeView === 'clock' && 'World Clock'}
                {activeView === 'meetings' && 'Upcoming Meetings'}
              </h1>
              <p className="text-gray-600">
                {activeView === 'overview' && 'Connect with your global team across time zones'}
                {activeView === 'calendar' && 'Schedule meetings across multiple time zones with Google Calendar integration'}
                {activeView === 'clock' && 'Track time across 50+ cities worldwide'}
                {activeView === 'meetings' && 'View and manage all your scheduled meetings'}
              </p>
            </div>
            {renderMainContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
