import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CalendarMonth from "@/components/calendar/CalendarMonth";
import TimezoneSettings from "@/components/calendar/TimezoneSettings";
import AppointmentDialog from "@/components/calendar/AppointmentDialog";
import { worldCities, type TimeZone } from "@/data/worldCities";
import { holidays } from "@/data/holidays";

interface Appointment {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  timezones: TimeZone[];
}

const YearlyCalendar = () => {
  const currentYear = new Date().getFullYear();
  const [selectedTimezones, setSelectedTimezones] = useState<TimeZone[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const months = [];
  for (let i = 0; i < 12; i++) {
    const firstDay = new Date(currentYear, i, 1);
    const lastDay = new Date(currentYear, i + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let j = 0; j < 42; j++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + j);
      
      if (currentDate.getMonth() === i) {
        days.push(currentDate);
      } else {
        days.push(null);
      }
    }
    
    months.push({
      name: new Date(currentYear, i, 1).toLocaleDateString('en-US', { month: 'long' }),
      days,
      monthIndex: i
    });
  }

  const availableTimezones = worldCities.filter(
    city => !selectedTimezones.find(selected => selected.id === city.id)
  );

  const handleAddTimezone = (timezoneId: string) => {
    const timezone = worldCities.find(city => city.id === timezoneId);
    if (timezone && selectedTimezones.length < 3) {
      setSelectedTimezones([...selectedTimezones, timezone]);
    }
  };

  const handleRemoveTimezone = (timezoneId: string) => {
    setSelectedTimezones(selectedTimezones.filter(tz => tz.id !== timezoneId));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsDialogOpen(true);
  };

  const handleCreateAppointment = (appointmentData: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
    };
    setAppointments([...appointments, newAppointment]);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card className="border-global-200">
        <CardHeader>
          <CardTitle className="text-global-900">Global Calendar {currentYear}</CardTitle>
          <CardDescription>
            Schedule meetings across multiple time zones. Click on any date to create an appointment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <TimezoneSettings
            selectedTimezones={selectedTimezones}
            availableTimezones={availableTimezones}
            onAddTimezone={handleAddTimezone}
            onRemoveTimezone={handleRemoveTimezone}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {months.map((month) => (
              <CalendarMonth
                key={month.monthIndex}
                month={month}
                selectedTimezones={selectedTimezones}
                appointments={appointments}
                holidays={holidays}
                onDateClick={handleDateClick}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <AppointmentDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedDate={selectedDate}
        selectedTimezones={selectedTimezones}
        onCreateAppointment={handleCreateAppointment}
      />
    </div>
  );
};

export default YearlyCalendar;
