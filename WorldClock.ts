import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Plus, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { worldCities, defaultTimezones, type TimeZone } from "@/data/worldCities";

const WorldClock = () => {
  const [currentTimes, setCurrentTimes] = useState<{ [key: string]: string }>({});
  const [displayedTimezones, setDisplayedTimezones] = useState<TimeZone[]>(defaultTimezones);
  const [selectedTimezone, setSelectedTimezone] = useState<string>("");

  useEffect(() => {
    const updateTimes = () => {
      const times: { [key: string]: string } = {};
      displayedTimezones.forEach(tz => {
        const now = new Date();
        const timeInZone = new Intl.DateTimeFormat('en-US', {
          timeZone: tz.timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }).format(now);
        
        const dateInZone = new Intl.DateTimeFormat('en-US', {
          timeZone: tz.timezone,
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }).format(now);
        
        times[tz.id] = `${timeInZone} • ${dateInZone}`;
      });
      setCurrentTimes(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, [displayedTimezones]);

  const addTimezone = () => {
    if (selectedTimezone) {
      const timezone = worldCities.find(tz => tz.id === selectedTimezone);
      if (timezone && !displayedTimezones.find(tz => tz.id === timezone.id)) {
        setDisplayedTimezones([...displayedTimezones, timezone]);
        setSelectedTimezone("");
      }
    }
  };

  const removeTimezone = (timezoneId: string) => {
    if (displayedTimezones.length > 1) {
      setDisplayedTimezones(displayedTimezones.filter(tz => tz.id !== timezoneId));
    }
  };

  const availableToAdd = worldCities.filter(
    tz => !displayedTimezones.find(displayed => displayed.id === tz.id)
  );

  return (
    <Card className="border-global-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-global-600" />
            <CardTitle className="text-global-900">World Clock</CardTitle>
          </div>
          {availableToAdd.length > 0 && (
            <div className="flex items-center space-x-2">
              <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Add city" />
                </SelectTrigger>
                <SelectContent>
                  {availableToAdd.map((tz) => (
                    <SelectItem key={tz.id} value={tz.id}>
                      <span className="flex items-center space-x-2">
                        <span>{tz.flag}</span>
                        <span>{tz.name}, {tz.country}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                size="sm" 
                onClick={addTimezone}
                disabled={!selectedTimezone}
                className="gradient-bg hover:opacity-90"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <CardDescription>
          Track time across different regions in real-time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedTimezones.map((timezone) => (
            <div 
              key={timezone.id} 
              className="relative p-4 border border-global-200 rounded-lg hover:shadow-md transition-shadow bg-gradient-to-br from-white to-global-50"
            >
              {displayedTimezones.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTimezone(timezone.id)}
                  className="absolute top-2 right-2 h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">{timezone.flag}</span>
                <div>
                  <h3 className="font-semibold text-global-900">{timezone.name}</h3>
                  <p className="text-xs text-gray-500">{timezone.country}</p>
                </div>
              </div>
              <div className="text-lg font-mono text-global-700">
                {currentTimes[timezone.id] || 'Loading...'}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorldClock;
