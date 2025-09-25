import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Mountain, 
  Image, 
  Star, 
  Settings,
  LogOut,
  BarChart3
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import AdminNavigation from '@/components/admin/AdminNavigation';
import HeroManagement from '@/components/admin/HeroManagement';
import AboutManagement from '@/components/admin/AboutManagement';
import ActivitiesManagement from '@/components/admin/ActivitiesManagement';
import TestimonialsManagement from '@/components/admin/TestimonialsManagement';
import EventsManagement from '@/components/admin/EventsManagement';
import GalleryManagement from '@/components/admin/GalleryManagement';
import ContactMessagesManagement from '@/components/admin/ContactMessagesManagement';
import SiteSettingsManagement from '@/components/admin/SiteSettingsManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    activities: 0,
    testimonials: 0,
    events: 0,
    messages: 0,
    unreadMessages: 0
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    loadStats();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
    }
  };

  const loadStats = async () => {
    try {
      const [
        { count: activitiesCount },
        { count: testimonialsCount },
        { count: eventsCount },
        { count: messagesCount },
        { count: unreadCount }
      ] = await Promise.all([
        supabase.from('activities').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('events').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'unread')
      ]);

      setStats({
        activities: activitiesCount || 0,
        testimonials: testimonialsCount || 0,
        events: eventsCount || 0,
        messages: messagesCount || 0,
        unreadMessages: unreadCount || 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of the admin panel",
      });
      navigate('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const statsCards = [
    {
      title: 'Activities',
      value: stats.activities,
      icon: Mountain,
      description: 'Total activities',
      color: 'text-primary'
    },
    {
      title: 'Testimonials',
      value: stats.testimonials,
      icon: Star,
      description: 'Customer reviews',
      color: 'text-accent'
    },
    {
      title: 'Events',
      value: stats.events,
      icon: Calendar,
      description: 'Upcoming events',
      color: 'text-secondary'
    },
    {
      title: 'Messages',
      value: stats.messages,
      icon: MessageSquare,
      description: 'Contact messages',
      color: 'text-muted-foreground',
      badge: stats.unreadMessages > 0 ? stats.unreadMessages : undefined
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation onLogout={handleLogout} />
      
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-montserrat font-bold text-primary mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your Alpine Extreme Park content
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="testimonials">Reviews</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsCards.map((card) => (
                <Card key={card.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {card.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      {card.badge && (
                        <Badge variant="destructive" className="text-xs">
                          {card.badge}
                        </Badge>
                      )}
                      <card.icon className={`h-4 w-4 ${card.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('activities')}
                  >
                    <Mountain className="w-4 h-4 mr-2" />
                    Manage Activities
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('messages')}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    View Messages
                    {stats.unreadMessages > 0 && (
                      <Badge variant="destructive" className="ml-auto">
                        {stats.unreadMessages}
                      </Badge>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setActiveTab('gallery')}
                  >
                    <Image className="w-4 h-4 mr-2" />
                    Manage Gallery
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest updates and changes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Dashboard loaded successfully</p>
                    <p>• Content management system active</p>
                    <p>• All systems operational</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="hero">
            <HeroManagement />
          </TabsContent>

          <TabsContent value="about">
            <AboutManagement />
          </TabsContent>

          <TabsContent value="activities">
            <ActivitiesManagement />
          </TabsContent>

          <TabsContent value="testimonials">
            <TestimonialsManagement />
          </TabsContent>

          <TabsContent value="events">
            <EventsManagement />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManagement />
          </TabsContent>

          <TabsContent value="messages">
            <ContactMessagesManagement />
          </TabsContent>

          <TabsContent value="settings">
            <SiteSettingsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;