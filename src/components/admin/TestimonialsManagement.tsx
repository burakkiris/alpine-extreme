import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Plus, Trash2, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  location: string | null;
  avatar_url: string | null;
  is_featured: boolean;
  is_active: boolean;
}

const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingTestimonial) return;

    try {
      if (editingTestimonial.id && editingTestimonial.id !== 'new') {
        const { error } = await supabase
          .from('testimonials')
          .update({
            name: editingTestimonial.name,
            content: editingTestimonial.content,
            rating: editingTestimonial.rating,
            location: editingTestimonial.location,
            avatar_url: editingTestimonial.avatar_url,
            is_featured: editingTestimonial.is_featured,
            is_active: editingTestimonial.is_active,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingTestimonial.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert({
            name: editingTestimonial.name,
            content: editingTestimonial.content,
            rating: editingTestimonial.rating,
            location: editingTestimonial.location,
            avatar_url: editingTestimonial.avatar_url,
            is_featured: editingTestimonial.is_featured,
            is_active: editingTestimonial.is_active
          });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Testimonial saved successfully",
      });
      
      setIsDialogOpen(false);
      setEditingTestimonial(null);
      loadTestimonials();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save testimonial",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      });
      
      loadTestimonials();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (testimonial?: Testimonial) => {
    setEditingTestimonial(testimonial || {
      id: 'new',
      name: '',
      content: '',
      rating: 5,
      location: '',
      avatar_url: '',
      is_featured: false,
      is_active: true
    });
    setIsDialogOpen(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Testimonials Management</CardTitle>
              <CardDescription>Manage customer reviews and testimonials</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => openEditDialog()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Testimonial
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingTestimonial?.id === 'new' ? 'Add New Testimonial' : 'Edit Testimonial'}
                  </DialogTitle>
                </DialogHeader>
                {editingTestimonial && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Customer Name</Label>
                      <Input
                        id="name"
                        value={editingTestimonial.name}
                        onChange={(e) => setEditingTestimonial({...editingTestimonial, name: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="content">Review Content</Label>
                      <Textarea
                        id="content"
                        value={editingTestimonial.content}
                        onChange={(e) => setEditingTestimonial({...editingTestimonial, content: e.target.value})}
                        rows={4}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={editingTestimonial.location || ''}
                        onChange={(e) => setEditingTestimonial({...editingTestimonial, location: e.target.value})}
                        placeholder="City, State"
                      />
                    </div>

                    <div>
                      <Label htmlFor="rating">Rating (1-5)</Label>
                      <Input
                        id="rating"
                        type="number"
                        min="1"
                        max="5"
                        value={editingTestimonial.rating}
                        onChange={(e) => setEditingTestimonial({...editingTestimonial, rating: parseInt(e.target.value)})}
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={editingTestimonial.is_featured}
                          onCheckedChange={(checked) => setEditingTestimonial({...editingTestimonial, is_featured: checked})}
                        />
                        <Label>Featured</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={editingTestimonial.is_active}
                          onCheckedChange={(checked) => setEditingTestimonial({...editingTestimonial, is_active: checked})}
                        />
                        <Label>Active</Label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>
                        Save Testimonial
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell className="font-medium">{testimonial.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={testimonial.is_active ? "default" : "secondary"}>
                      {testimonial.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {testimonial.is_featured && <Badge variant="outline">Featured</Badge>}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(testimonial)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(testimonial.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestimonialsManagement;