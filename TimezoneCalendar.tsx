import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Settings } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface TimezoneSettings {
  timezone1: string;
  timezone2: string;
  timezone3: string;
  workingHours: {
    start: number;
    end: number;
  };
}

const timezoneOptions = [
  { value: 'America/New_York', label: 'New York (EST)', flag: '🇺🇸' },
  { value: 'Europe/London', label: 'London (GMT)', flag: '🇬🇧' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)', flag: '🇯🇵' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST)', flag: '🇦🇺' },
  { value: 'Asia/Dubai', label: 'Dubai (GST)', flag: '🇦🇪' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (PST)', flag: '🇺🇸' },
  { value: 'Europe/Paris', label: 'Paris (CET)', flag: '🇫🇷' },
  { value: 'Asia/Singapore', label: 'Singapore (SGT)', flag: '🇸🇬' },
];

const TimezoneCalendar = () => {
  const [settings, setSettings] = useState<TimezoneSettings>({
    timezone1: 'America/New_York',
    timezone2: 'Europe/London',
    timezone3: 'Asia/Tokyo',
    workingHours: { start: 9, end: 17 }
  });
  const [showSettings, setShowSettings] = useState(false);

  const generateCalendarDays = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getOverlapHours = (date: Date) => {
    // Simplified overlap calculation for demo
    const hours = [];
    for (let hour = 0; hour < 24; hour++) {
      const time = new Date(date);
      time.setHours(hour, 0, 0, 0);
      
      // Get hours in each timezone
      const tz1Hour = parseInt(time.toLocaleTimeString('en-US', { 
        timeZone: settings.timezone1, 
        hour: '2-digit', 
        hour12: false 
      }));
      const tz2Hour = parseInt(time.toLocaleTimeString('en-US', { 
        timeZone: settings.timezone2, 
        hour: '2-digit', 
        hour12: false 
      }));
      const tz3Hour = parseInt(time.toLocaleTimeString('en-US', { 
        timeZone: settings.timezone3, 
        hour: '2-digit', 
        hour12: false 
      }));

      // Check if all timezones are within working hours
      const isWorkingHour = [tz1Hour, tz2Hour, tz3Hour].every(
        h => h >= settings.workingHours.start && h < settings.workingHours.end
      );

      if (isWorkingHour) {
        hours.push(hour);
      }
    }
    return hours;
  };

  const isHoliday = (date: Date) => {
    // Simplified holiday check - would integrate with real holiday API
    const month = date.getMonth();
    const day = date.getDate();
    
    // Example holidays
    const holidays = [
      { month: 11, day: 25 }, // Christmas
      { month: 0, day: 1 },   // New Year
      { month: 6, day: 4 },   // July 4th
    ];
    
    return holidays.some(h => h.month === month && h.day === day);
  };

  const calendarDays = generateCalendarDays();

  return (
    <Card className="border-global-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-global-600" />
            <CardTitle className="text-global-900">Timezone Calendar</CardTitle>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="border-global-300"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>
          Find optimal meeting times across selected time zones
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {showSettings && (
          <div className="p-4 border border-global-200 rounded-lg bg-global-50/50 space-y-4">
            <h4 className="font-semibold text-global-900">Timezone Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-global-700">Timezone 1</label>
                <Select 
                  value={settings.timezone1} 
                  onValueChange={(value) => setSettings({...settings, timezone1: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timezoneOptions.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        <span className="flex items-center space-x-2">
                          <span>{tz.flag}</span>
                          <span>{tz.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-global-700">Timezone 2</label>
                <Select 
                  value={settings.timezone2} 
                  onValueChange={(value) => setSettings({...settings, timezone2: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timezoneOptions.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        <span className="flex items-center space-x-2">
                          <span>{tz.flag}</span>
                          <span>{tz.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-global-700">Timezone 3</label>
                <Select 
                  value={settings.timezone3} 
                  onValueChange={(value) => setSettings({...settings, timezone3: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timezoneOptions.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        <span className="flex items-center space-x-2">
                          <span>{tz.flag}</span>
                          <span>{tz.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="font-semibold text-global-900">This Week</h4>
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-global-700 p-2">
                {day}
              </div>
            ))}
            {calendarDays.map((date, index) => {
              const overlapHours = getOverlapHours(date);
              const holiday = isHoliday(date);
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <div 
                  key={index}
                  className={`p-2 min-h-24 border border-global-200 rounded-lg ${
                    isToday ? 'bg-global-100 border-global-400' : 'bg-white'
                  } ${holiday ? 'bg-red-50 border-red-200' : ''}`}
                >
                  <div className="text-sm font-medium text-global-900 mb-1">
                    {date.getDate()}
                  </div>
                  {holiday && (
                    <Badge variant="destructive" className="text-xs mb-1">
                      Holiday
                    </Badge>
                  )}
                  {!holiday && overlapHours.length > 0 && (
                    <div className="space-y-1">
                      <Badge variant="secondary" className="text-xs">
                        {overlapHours.length}h overlap
                      </Badge>
                      <div className="text-xs text-gray-600">
                        {overlapHours.slice(0, 2).map(hour => (
                          <div key={hour}>
                            {hour}:00-{hour + 1}:00
                          </div>
                        ))}
                        {overlapHours.length > 2 && (
                          <div>+{overlapHours.length - 2} more</div>
                        )}
                      </div>
                    </div>
                  )}
                  {!holiday && overlapHours.length === 0 && (
                    <Badge variant="outline" className="text-xs">
                      No overlap
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-global-100 border border-global-400 rounded"></div>
            <span>Today</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-50 border border-red-200 rounded"></div>
            <span>Holiday</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
            <span>Overlap available</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimezoneCalendar;
