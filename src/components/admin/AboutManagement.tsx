import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface AboutContent {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  stats: any;
  is_active: boolean;
}

const AboutManagement = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadAboutContent();
  }, []);

  const loadAboutContent = async () => {
    try {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setAboutContent(data || {
        id: '',
        title: 'Welcome to Alpine Extreme Park',
        subtitle: 'Where Adventure Meets Nature',
        description: 'Nestled in the heart of breathtaking alpine landscapes...',
        stats: { years: '5+', adventurers: '50K+', activities: '15+', safety: '100%' },
        is_active: true
      });
    } catch (error) {
      console.error('Error loading about content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!aboutContent) return;
    setSaving(true);
    
    try {
      if (aboutContent.id) {
        const { error } = await supabase
          .from('about_content')
          .update({
            title: aboutContent.title,
            subtitle: aboutContent.subtitle,
            description: aboutContent.description,
            stats: aboutContent.stats,
            is_active: aboutContent.is_active,
            updated_at: new Date().toISOString()
          })
          .eq('id', aboutContent.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('about_content')
          .insert({
            title: aboutContent.title,
            subtitle: aboutContent.subtitle,
            description: aboutContent.description,
            stats: aboutContent.stats,
            is_active: aboutContent.is_active
          });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "About content updated successfully",
      });
      
      loadAboutContent();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save about content",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Section Management</CardTitle>
        <CardDescription>Manage the about section content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={aboutContent?.title || ''}
            onChange={(e) => setAboutContent(prev => prev ? {...prev, title: e.target.value} : null)}
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            value={aboutContent?.subtitle || ''}
            onChange={(e) => setAboutContent(prev => prev ? {...prev, subtitle: e.target.value} : null)}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={aboutContent?.description || ''}
            onChange={(e) => setAboutContent(prev => prev ? {...prev, description: e.target.value} : null)}
            rows={5}
          />
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AboutManagement;