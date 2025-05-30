
import { Badge } from "@/components/ui/badge";
import { type TimeZone } from "@/data/worldCities";

interface Holiday {
  name: string;
  date: string;
  countries: string[];
}

interface Appointment {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  timezones: TimeZone[];
}

interface CalendarMonthProps {
  month: {
    name: string;
    days: (Date | null)[];
    monthIndex: number;
  };
  selectedTimezones: TimeZone[];
  appointments: Appointment[];
  holidays: Holiday[];
  onDateClick: (date: Date) => void;
}

const CalendarMonth = ({ 
  month, 
  selectedTimezones, 
  appointments, 
  holidays,
  onDateClick 
}: CalendarMonthProps) => {
  const workingHours = { start: 9, end: 17 };

  const getOverlapHours = (date: Date) => {
    if (selectedTimezones.length === 0) return [];
    
    const hours = [];
    for (let hour = 0; hour < 24; hour++) {
      const time = new Date(date);
      time.setHours(hour, 0, 0, 0);
      
      const allInWorkingHours = selectedTimezones.every(tz => {
        const hourInTz = parseInt(time.toLocaleTimeString('en-US', { 
          timeZone: tz.timezone, 
          hour: '2-digit', 
          hour12: false 
        }));
        return hourInTz >= workingHours.start && hourInTz < workingHours.end;
      });

      if (allInWorkingHours) {
        hours.push(hour);
      }
    }
    return hours;
  };

  const isHoliday = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${month}-${day}`;
    
    const selectedCountries = [...new Set(selectedTimezones.map(tz => tz.countryCode))];
    
    const matchingHolidays = holidays.filter(holiday => 
      holiday.date === dateString && 
      holiday.countries.some(country => selectedCountries.includes(country))
    );
    
    return matchingHolidays;
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(apt => 
      apt.date.toDateString() === date.toDateString()
    );
  };

  return (
    <div className="border border-global-200 rounded-lg p-4">
      <h3 className="font-semibold text-center mb-4 text-global-900">{month.name}</h3>
      <div className="grid grid-cols-7 gap-1 text-xs">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
          <div key={day} className="text-center font-medium text-gray-500 p-1">
            {day}
          </div>
        ))}
        {month.days.map((date, index) => {
          if (!date) {
            return <div key={index} className="p-1"></div>;
          }
          
          const overlapHours = getOverlapHours(date);
          const dayHolidays = isHoliday(date);
          const isToday = date.toDateString() === new Date().toDateString();
          const isPast = isPastDate(date);
          const dayAppointments = getAppointmentsForDate(date);
          const isHolidayDate = dayHolidays.length > 0;
          
          return (
            <div 
              key={index}
              className={`p-1 text-center rounded transition-colors relative ${
                isPast || isHolidayDate
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'cursor-pointer hover:bg-global-50'
              } ${isToday ? 'bg-global-100 font-bold' : ''} ${
                isHolidayDate ? 'bg-red-50 text-red-600' : ''
              }`}
              onClick={() => !isPast && !isHolidayDate && onDateClick(date)}
              title={isHolidayDate ? dayHolidays.map(h => h.name).join(', ') : ''}
            >
              <div className="text-sm">{date.getDate()}</div>
              
              {dayAppointments.length > 0 && (
                <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1"></div>
              )}
              
              {isHolidayDate && (
                <div className="w-1 h-1 bg-red-500 rounded-full mx-auto absolute top-1 right-1"></div>
              )}
              
              {!isHolidayDate && overlapHours.length > 0 && selectedTimezones.length > 1 && !isPast && (
                <div className="w-1 h-1 bg-green-500 rounded-full mx-auto absolute bottom-1 left-1"></div>
              )}
              
              {!isHolidayDate && overlapHours.length > 0 && selectedTimezones.length > 1 && !isPast && (
                <div className="text-xs text-green-600 font-medium">{overlapHours.length}h</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarMonth;
