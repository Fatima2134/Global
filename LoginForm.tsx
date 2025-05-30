import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, ArrowLeft, Mail, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface LoginFormProps {
  onSuccess: () => void;
  onBackToLanding: () => void;
  onSwitchToSignup: () => void;
}

const LoginForm = ({ onSuccess, onBackToLanding, onSwitchToSignup }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email && password.length >= 6) {
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });
      onSuccess();
    } else {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-global-50 via-white to-global-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-fade-in">
        <Button 
          variant="ghost" 
          onClick={onBackToLanding}
          className="mb-6 text-global-600 hover:text-global-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <Card className="border-global-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Globe className="h-8 w-8 text-global-600" />
              <span className="text-2xl font-bold text-global-800">Global</span>
            </div>
            <CardTitle className="text-2xl text-global-900">Welcome back</CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-global-800">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-global-200 focus:border-global-400"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-global-800">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-global-200 focus:border-global-400"
                    required
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full gradient-bg hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <Button 
                variant="link" 
                onClick={onSwitchToSignup}
                className="text-global-600 hover:text-global-700 p-0"
              >
                Sign up
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
