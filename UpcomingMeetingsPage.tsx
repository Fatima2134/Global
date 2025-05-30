import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Video, Edit, Trash2 } from "lucide-react";
import { type TimeZone } from "@/data/worldCities";

interface Appointment {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  timezones: TimeZone[];
}

const UpcomingMeetingsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Team Standup',
      description: 'Daily team synchronization meeting',
      date: new Date(2024, 11, 15),
      time: '09:00',
      timezones: []
    },
    {
      id: '2', 
      title: 'Project Review',
      description: 'Quarterly project review with stakeholders',
      date: new Date(2024, 11, 20),
      time: '14:00',
      timezones: []
    }
  ]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingAppointments = appointments
    .filter(apt => apt.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const pastAppointments = appointments
    .filter(apt => apt.date < today)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const handleJoinZoom = () => {
    window.open('https://zoom.us/start/videomeeting', '_blank');
  };

  const handleEdit = (appointmentId: string) => {
    console.log('Edit appointment:', appointmentId);
  };

  const handleDelete = (appointmentId: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
  };

  const AppointmentCard = ({ appointment, isPast = false }: { appointment: Appointment, isPast?: boolean }) => (
    <Card className={`border-global-200 ${isPast ? 'opacity-60' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-black">{appointment.title}</CardTitle>
          <div className="flex space-x-2">
            {!isPast && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(appointment.id)}
                  className="text-black"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(appointment.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleJoinZoom}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Join
                </Button>
              </>
            )}
          </div>
        </div>
        <CardDescription className="text-black">
          {appointment.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center space-x-4 text-black">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-global-600" />
              <span>{appointment.date.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-global-600" />
              <span>{appointment.time}</span>
            </div>
          </div>
          
          {appointment.timezones.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {appointment.timezones.map((tz) => (
                <Badge key={tz.id} variant="outline" className="text-black border-gray-300">
                  {tz.flag} {tz.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Upcoming Meetings */}
      <div>
        <div className="flex items-center space-x-2 mb-6">
          <Calendar className="h-6 w-6 text-global-600" />
          <h2 className="text-2xl font-bold text-black">Upcoming Meetings</h2>
          <Badge variant="secondary" className="text-black">
            {upcomingAppointments.length}
          </Badge>
        </div>
        
        {upcomingAppointments.length === 0 ? (
          <Card className="border-global-200">
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-black text-lg">No upcoming meetings scheduled</p>
              <p className="text-gray-600 mt-2">Create appointments in the calendar to see them here</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        )}
      </div>

      {/* Past Meetings */}
      {pastAppointments.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <Clock className="h-6 w-6 text-gray-500" />
            <h2 className="text-2xl font-bold text-black">Past Meetings</h2>
            <Badge variant="outline" className="text-black border-gray-300">
              {pastAppointments.length}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} isPast />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingMeetingsPage;
