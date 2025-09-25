import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface HeroContent {
  id: string;
  title: string;
  subtitle: string | null;
  background_image: string | null;
  cta_text: string;
  cta_link: string;
  is_active: boolean;
}

const HeroManagement = () => {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadHeroContent();
  }, []);

  const loadHeroContent = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_content')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setHeroContent(data || {
        id: '',
        title: 'Reach the Peak of Adrenaline!',
        subtitle: 'Experience the ultimate outdoor adventure in the heart of stunning alpine landscapes',
        background_image: '/src/assets/hero-mountain.jpg',
        cta_text: 'Discover Activities',
        cta_link: '#activities',
        is_active: true
      });
    } catch (error) {
      console.error('Error loading hero content:', error);
      toast({
        title: "Error",
        description: "Failed to load hero content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!heroContent) return;

    setSaving(true);
    try {
      if (heroContent.id) {
        // Update existing
        const { error } = await supabase
          .from('hero_content')
          .update({
            title: heroContent.title,
            subtitle: heroContent.subtitle,
            background_image: heroContent.background_image,
            cta_text: heroContent.cta_text,
            cta_link: heroContent.cta_link,
            is_active: heroContent.is_active,
            updated_at: new Date().toISOString()
          })
          .eq('id', heroContent.id);

        if (error) throw error;
      } else {
        // Create new
        const { error } = await supabase
          .from('hero_content')
          .insert({
            title: heroContent.title,
            subtitle: heroContent.subtitle,
            background_image: heroContent.background_image,
            cta_text: heroContent.cta_text,
            cta_link: heroContent.cta_link,
            is_active: heroContent.is_active
          });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Hero content updated successfully",
      });
      
      loadHeroContent(); // Reload to get the ID if it was a new record
    } catch (error) {
      console.error('Error saving hero content:', error);
      toast({
        title: "Error",
        description: "Failed to save hero content",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof HeroContent, value: any) => {
    if (!heroContent) return;
    setHeroContent({ ...heroContent, [field]: value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section Management</CardTitle>
        <CardDescription>
          Manage the main hero section that visitors see first
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Main Title</Label>
              <Input
                id="title"
                value={heroContent?.title || ''}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="Enter hero title"
              />
            </div>

            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea
                id="subtitle"
                value={heroContent?.subtitle || ''}
                onChange={(e) => updateField('subtitle', e.target.value)}
                placeholder="Enter hero subtitle"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="background_image">Background Image URL</Label>
              <Input
                id="background_image"
                value={heroContent?.background_image || ''}
                onChange={(e) => updateField('background_image', e.target.value)}
                placeholder="/src/assets/hero-mountain.jpg"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="cta_text">Call to Action Text</Label>
              <Input
                id="cta_text"
                value={heroContent?.cta_text || ''}
                onChange={(e) => updateField('cta_text', e.target.value)}
                placeholder="Discover Activities"
              />
            </div>

            <div>
              <Label htmlFor="cta_link">Call to Action Link</Label>
              <Input
                id="cta_link"
                value={heroContent?.cta_link || ''}
                onChange={(e) => updateField('cta_link', e.target.value)}
                placeholder="#activities"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={heroContent?.is_active || false}
                onCheckedChange={(checked) => updateField('is_active', checked)}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroManagement;