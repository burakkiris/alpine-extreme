import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface SiteSetting {
  id: string;
  key: string;
  value: any;
  description: string | null;
}

const SiteSettingsManagement = () => {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (error) throw error;

      const settingsMap = data?.reduce((acc: Record<string, any>, setting: SiteSetting) => {
        acc[setting.key] = setting.value;
        return acc;
      }, {}) || {};

      setSettings(settingsMap);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, value: any) => {
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key,
          value,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setSettings(prev => ({ ...prev, [key]: value }));
      
      toast({
        title: "Success",
        description: "Setting updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update setting",
        variant: "destructive",
      });
    }
  };

  const handleSaveContactInfo = async () => {
    setSaving(true);
    try {
      await updateSetting('contact_info', settings.contact_info || {});
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSocialMedia = async () => {
    setSaving(true);
    try {
      await updateSetting('social_media', settings.social_media || {});
    } finally {
      setSaving(false);
    }
  };

  const updateContactInfo = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      contact_info: {
        ...prev.contact_info,
        [field]: value
      }
    }));
  };

  const updateSocialMedia = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      social_media: {
        ...prev.social_media,
        [field]: value
      }
    }));
  };

  if (loading) return <div>Loading...</div>;

  const contactInfo = settings.contact_info || {};
  const socialMedia = settings.social_media || {};

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Site Settings</CardTitle>
          <CardDescription>
            Manage global site settings and configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="contact" className="space-y-6">
            <TabsList>
              <TabsTrigger value="contact">Contact Info</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="general">General</TabsTrigger>
            </TabsList>

            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Update business contact details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={contactInfo.phone || ''}
                      onChange={(e) => updateContactInfo('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactInfo.email || ''}
                      onChange={(e) => updateContactInfo('email', e.target.value)}
                      placeholder="info@alpineextreme.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Physical Address</Label>
                    <Textarea
                      id="address"
                      value={contactInfo.address || ''}
                      onChange={(e) => updateContactInfo('address', e.target.value)}
                      placeholder="123 Mountain View Drive, Alpine Valley, CO 80424"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="hours">Business Hours</Label>
                    <Input
                      id="hours"
                      value={contactInfo.hours || ''}
                      onChange={(e) => updateContactInfo('hours', e.target.value)}
                      placeholder="Daily 8:00 AM - 6:00 PM"
                    />
                  </div>

                  <Button onClick={handleSaveContactInfo} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Contact Info'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social">
              <Card>
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                  <CardDescription>
                    Update social media handles and links
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="instagram">Instagram Handle</Label>
                    <Input
                      id="instagram"
                      value={socialMedia.instagram || ''}
                      onChange={(e) => updateSocialMedia('instagram', e.target.value)}
                      placeholder="@alpineextreme"
                    />
                  </div>

                  <div>
                    <Label htmlFor="facebook">Facebook Page</Label>
                    <Input
                      id="facebook"
                      value={socialMedia.facebook || ''}
                      onChange={(e) => updateSocialMedia('facebook', e.target.value)}
                      placeholder="alpineextremepark"
                    />
                  </div>

                  <div>
                    <Label htmlFor="youtube">YouTube Channel</Label>
                    <Input
                      id="youtube"
                      value={socialMedia.youtube || ''}
                      onChange={(e) => updateSocialMedia('youtube', e.target.value)}
                      placeholder="alpineextremechannel"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tiktok">TikTok Handle</Label>
                    <Input
                      id="tiktok"
                      value={socialMedia.tiktok || ''}
                      onChange={(e) => updateSocialMedia('tiktok', e.target.value)}
                      placeholder="@alpineextreme"
                    />
                  </div>

                  <Button onClick={handleSaveSocialMedia} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Social Media'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Other site configuration options
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Additional settings can be added here as needed.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteSettingsManagement;