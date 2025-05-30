import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, RefreshCw, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const GoogleCalendarIntegration = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const handleConnect = () => {
    setIsLoading(true);
    // Simulate Google Calendar OAuth flow
    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
      setLastSync(new Date());
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAutoSync(true);
    setLastSync(null);
    setShowSettings(false);
  };

  const handleSync = () => {
    setIsLoading(true);
    // Simulate sync
    setTimeout(() => {
      setIsLoading(false);
      setLastSync(new Date());
    }, 1500);
  };

  return (
    <Card className="border-global-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-global-600" />
            <CardTitle className="text-global-900">Google Calendar</CardTitle>
            {isConnected && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Connected
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {isConnected && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
              >
                <Settings className="h-4 w-4" />
              </Button>
            )}
            {isConnected && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSync}
                disabled={isLoading}
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Sync
              </Button>
            )}
          </div>
        </div>
        <CardDescription>
          {isConnected 
            ? `Your Google Calendar is connected${autoSync ? ' with auto-sync enabled' : ''}`
            : "Connect your Google Calendar to sync events"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Connect your Google Calendar to automatically sync your Global meetings with your existing calendar.
            </p>
            <Button 
              onClick={handleConnect}
              disabled={isLoading}
              className="gradient-bg hover:opacity-90"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Connect Google Calendar
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {showSettings && (
              <div className="p-4 border border-global-200 rounded-lg bg-global-50/50 space-y-4">
                <h4 className="font-semibold text-global-900">Sync Settings</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="auto-sync">Automatic Synchronization</Label>
                    <p className="text-sm text-gray-600">
                      Automatically sync appointments with Google Calendar
                    </p>
                  </div>
                  <Switch
                    id="auto-sync"
                    checked={autoSync}
                    onCheckedChange={setAutoSync}
                  />
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• {autoSync ? 'Auto-sync: Enabled' : 'Auto-sync: Disabled (manual sync only)'}</p>
                  <p>• Two-way sync: {autoSync ? 'Enabled' : 'Disabled'}</p>
                  <p>• Timezone conversion: Always enabled</p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div>
                <p className="font-medium text-green-800">Successfully Connected</p>
                <p className="text-sm text-green-600">
                  {lastSync ? `Last sync: ${lastSync.toLocaleTimeString()}` : 'Never synced'}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDisconnect}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                Disconnect
              </Button>
            </div>

            <div className="text-sm text-gray-600 space-y-2">
              <p>✓ {autoSync ? 'Auto-sync enabled' : 'Manual sync only'}</p>
              <p>✓ Automatic timezone conversion</p>
              <p>✓ Meeting invitations sent to participants</p>
              <p>✓ Holiday awareness for selected countries</p>
            </div>

            {!autoSync && (
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Manual sync mode:</strong> Use the sync button to update your calendar when needed.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoogleCalendarIntegration;
