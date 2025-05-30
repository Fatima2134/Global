import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import { type TimeZone } from "@/data/worldCities";

interface Appointment {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  timezones: TimeZone[];
}

interface UpcomingMeetingsSidebarProps {
  appointments: Appointment[];
}

const UpcomingMeetingsSidebar = ({ appointments }: UpcomingMeetingsSidebarProps) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingAppointments = appointments
    .filter(apt => apt.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <Card className="border-global-200 h-fit">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-global-600" />
          <CardTitle className="text-global-900">Upcoming Meetings</CardTitle>
        </div>
        <CardDescription>
          {upcomingAppointments.length} scheduled meetings
        </CardDescription>
      </CardHeader>
      <CardContent>
        {upcomingAppointments.length === 0 ? (
          <p className="text-gray-500 text-sm">No upcoming meetings scheduled</p>
        ) : (
          <div className="space-y-3">
            {upcomingAppointments.slice(0, 5).map((appointment) => (
              <div key={appointment.id} className="p-3 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-1">{appointment.title}</h4>
                
                <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                  <Calendar className="h-3 w-3" />
                  <span>{appointment.date.toLocaleDateString()}</span>
                  <Clock className="h-3 w-3 ml-2" />
                  <span>{appointment.time}</span>
                </div>
                
                {appointment.timezones.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {appointment.timezones.map((tz) => (
                      <Badge key={tz.id} variant="outline" className="text-xs">
                        {tz.flag} {tz.name}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {appointment.description && (
                  <p className="text-xs text-gray-500 truncate">{appointment.description}</p>
                )}
              </div>
            ))}
            
            {upcomingAppointments.length > 5 && (
              <p className="text-xs text-gray-500 text-center">
                +{upcomingAppointments.length - 5} more meetings
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingMeetingsSidebar;
