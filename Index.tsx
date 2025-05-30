import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Clock, Calendar, Users, ArrowRight, CheckCircle } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'signup' | 'dashboard'>('home');

  const handleAuthSuccess = () => {
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentView('home');
  };

  if (currentView === 'dashboard') {
    return <Dashboard onLogout={handleLogout} />;
  }

  if (currentView === 'login') {
    return (
      <LoginForm 
        onSuccess={handleAuthSuccess}
        onBackToLanding={() => setCurrentView('home')}
        onSwitchToSignup={() => setCurrentView('signup')}
      />
    );
  }

  if (currentView === 'signup') {
    return (
      <SignupForm 
        onSuccess={handleAuthSuccess}
        onBackToLanding={() => setCurrentView('home')}
        onSwitchToLogin={() => setCurrentView('login')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-global-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-global-600" />
            <span className="text-2xl font-bold text-global-900">Global</span>
          </div>
          <div className="space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentView('login')}
              className="text-global-700 hover:text-global-900"
            >
              Login
            </Button>
            <Button 
              onClick={() => setCurrentView('signup')}
              className="gradient-bg hover:opacity-90 text-white"
            >
              Sign Up
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-global-900 mb-6 animate-fade-in">
            Connect Globally,
            <span className="gradient-bg bg-clip-text text-transparent block">
              Meet Seamlessly
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Schedule meetings across time zones effortlessly. Our platform helps global teams coordinate with intelligent timezone management and seamless calendar integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button 
              size="lg" 
              onClick={() => setCurrentView('signup')}
              className="gradient-bg hover:opacity-90 text-white px-8 py-3"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => setCurrentView('login')}
              className="border-global-300 text-global-700 hover:bg-global-50 px-8 py-3"
            >
              Login
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-global-900 mb-4">
            Everything You Need for Global Coordination
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful tools designed to make international collaboration effortless
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="border-global-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <Clock className="h-12 w-12 text-global-600 mb-4" />
              <CardTitle className="text-global-900">World Clock</CardTitle>
              <CardDescription>
                Track time across 50+ cities worldwide with real-time updates
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-global-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <Calendar className="h-12 w-12 text-global-600 mb-4" />
              <CardTitle className="text-global-900">Smart Calendar</CardTitle>
              <CardDescription>
                Yearly view with timezone overlap detection and appointment scheduling
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-global-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <Users className="h-12 w-12 text-global-600 mb-4" />
              <CardTitle className="text-global-900">Multi-Timezone</CardTitle>
              <CardDescription>
                Select up to 3 timezones and find optimal meeting windows
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-global-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <Globe className="h-12 w-12 text-global-600 mb-4" />
              <CardTitle className="text-global-900">Integrations</CardTitle>
              <CardDescription>
                Connect with Google Calendar and Zoom for seamless workflow
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-global-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-global-900 text-center mb-12">
              Why Choose Global?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-global-900 mb-2">Standard Working Hours</h3>
                    <p className="text-gray-600">Automatically set to 9 AM - 5 PM across all selected timezones for consistency.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-global-900 mb-2">Holiday Awareness</h3>
                    <p className="text-gray-600">Automatically blocks out national holidays for all selected countries.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-global-900 mb-2">Flexible Timezone Selection</h3>
                    <p className="text-gray-600">Choose anywhere from 1 to 3 timezones based on your team's needs.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-global-900 mb-2">Real-time Synchronization</h3>
                    <p className="text-gray-600">Live updates ensure everyone stays on the same page across time zones.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-global-900 mb-2">Easy Appointment Creation</h3>
                    <p className="text-gray-600">Click any date to instantly create appointments with timezone-aware scheduling.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-global-900 mb-2">One-Click Zoom Access</h3>
                    <p className="text-gray-600">Instant access to Zoom meetings directly from the sidebar.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-global-900 mb-6">
            Ready to Connect Your Global Team?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of teams who trust Global for their international coordination needs.
          </p>
          <Button 
            size="lg" 
            onClick={() => setCurrentView('signup')}
            className="gradient-bg hover:opacity-90 text-white px-8 py-3"
          >
            Start Coordinating Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-global-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Globe className="h-8 w-8 text-global-400" />
            <span className="text-2xl font-bold">Global</span>
          </div>
          <div className="text-center text-global-300">
            <p>&copy; 2024 Global. Connecting teams worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
