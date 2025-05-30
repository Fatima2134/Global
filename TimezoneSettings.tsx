import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type TimeZone } from "@/data/worldCities";

interface TimezoneSettingsProps {
  selectedTimezones: TimeZone[];
  availableTimezones: TimeZone[];
  onAddTimezone: (timezoneId: string) => void;
  onRemoveTimezone: (timezoneId: string) => void;
}

const TimezoneSettings = ({ 
  selectedTimezones, 
  availableTimezones, 
  onAddTimezone, 
  onRemoveTimezone 
}: TimezoneSettingsProps) => {
  return (
    <div className="p-4 border border-global-200 rounded-lg bg-global-50/50 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-global-900">Selected Timezones ({selectedTimezones.length}/3)</h4>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {selectedTimezones.map((tz) => (
          <Badge key={tz.id} variant="secondary" className="px-3 py-1">
            <span className="mr-2">{tz.flag}</span>
            {tz.name}
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-4 w-4 p-0"
              onClick={() => onRemoveTimezone(tz.id)}
            >
              ×
            </Button>
          </Badge>
        ))}
      </div>

      {selectedTimezones.length < 3 && availableTimezones.length > 0 && (
        <div className="flex items-center space-x-2">
          <Select onValueChange={onAddTimezone}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Add timezone (optional)" />
            </SelectTrigger>
            <SelectContent>
              {availableTimezones.map((tz) => (
                <SelectItem key={tz.id} value={tz.id}>
                  <span className="flex items-center space-x-2">
                    <span>{tz.flag}</span>
                    <span>{tz.name}, {tz.country}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default TimezoneSettings;
