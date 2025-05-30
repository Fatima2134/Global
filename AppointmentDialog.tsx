import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Globe2 } from "lucide-react";
import { type TimeZone } from "@/data/worldCities";

interface Appointment {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  timezones: TimeZone[];
}

interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date | null;
  selectedTimezones: TimeZone[];
  onCreateAppointment: (appointment: Omit<Appointment, 'id'>) => void;
}

const AppointmentDialog = ({
  open,
  onOpenChange,
  selectedDate,
  selectedTimezones,
  onCreateAppointment
}: AppointmentDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("09:00");

  const workingHours = { start: 9, end: 17 };

  const getWorkingHoursOverlap = (date: Date) => {
    if (selectedTimezones.length === 0) return [];
    
    const overlapHours = [];
    for (let hour = 0; hour < 24; hour++) {
      const testTime = new Date(date);
      testTime.setHours(hour, 0, 0, 0);
      
      const allInWorkingHours = selectedTimezones.every(tz => {
        const hourInTz = parseInt(testTime.toLocaleTimeString('en-US', { 
          timeZone: tz.timezone, 
          hour: '2-digit', 
          hour12: false 
        }));
        return hourInTz >= workingHours.start && hourInTz < workingHours.end;
      });

      if (allInWorkingHours) {
        overlapHours.push(hour);
      }
    }
    return overlapHours;
  };

  const getTimezoneWorkingHours = (date: Date, timezone: TimeZone) => {
    const workingHours = [];
    for (let hour = 9; hour < 17; hour++) {
      const timeInTz = new Date(date);
      timeInTz.setHours(hour, 0, 0, 0);
      
      const localHour = parseInt(timeInTz.toLocaleTimeString('en-US', { 
        timeZone: timezone.timezone, 
        hour: '2-digit', 
        hour12: false 
      }));
      
      workingHours.push(`${localHour.toString().padStart(2, '0')}:00`);
    }
    return workingHours;
  };

  const formatTimeRange = (hours: number[]) => {
    if (hours.length === 0) return "No overlap";
    const start = hours[0];
    const end = hours[hours.length - 1] + 1;
    return `${start.toString().padStart(2, '0')}:00 - ${end.toString().padStart(2, '0')}:00`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !title.trim()) return;

    onCreateAppointment({
      title: title.trim(),
      description: description.trim(),
      date: selectedDate,
      time,
      timezones: selectedTimezones
    });

    setTitle("");
    setDescription("");
    setTime("09:00");
  };

  const overlapHours = selectedDate ? getWorkingHoursOverlap(selectedDate) : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-black">Create Appointment</DialogTitle>
          <DialogDescription className="text-black">
            Schedule a meeting for {selectedDate?.toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {selectedTimezones.length > 0 && (
            <Card className="border-global-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2 text-black">
                  <Clock className="h-5 w-5" />
                  <span>Working Hours Analysis</span>
                </CardTitle>
                <CardDescription className="text-black">
                  Optimal meeting times based on selected timezones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedTimezones.length > 1 && (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">Overlap Hours (All Timezones)</h4>
                    <p className="text-green-700">
                      {overlapHours.length > 0 
                        ? `${formatTimeRange(overlapHours)} (${overlapHours.length} hours)`
                        : "No working hours overlap found"
                      }
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="font-medium text-black">Individual Timezone Working Hours (9 AM - 5 PM)</h4>
                  {selectedTimezones.map((tz) => {
                    const workingHours = getTimezoneWorkingHours(selectedDate!, tz);
                    return (
                      <div key={tz.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{tz.flag}</span>
                          <span className="font-medium text-black">{tz.name}</span>
                        </div>
                        <div className="text-sm text-black">
                          {workingHours[0]} - {workingHours[workingHours.length - 1]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-black">Meeting Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter meeting title"
                required
                className="text-black placeholder:text-gray-500"
              />
            </div>

            <div>
              <Label htmlFor="time" className="text-black">Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="text-black"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-black">Description (Optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add meeting details..."
                className="text-black placeholder:text-gray-500"
              />
            </div>

            {selectedTimezones.length > 0 && (
              <div>
                <Label className="text-black">Selected Timezones</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTimezones.map((tz) => (
                    <Badge key={tz.id} variant="outline" className="text-black border-gray-300">
                      {tz.flag} {tz.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="text-black">
                Cancel
              </Button>
              <Button type="submit" className="text-white">
                Create Appointment
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
