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
import { Edit, Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  event_date: string | null;
  price: string | null;
  is_featured: boolean;
  is_active: boolean;
}

const EventsManagement = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingEvent) return;

    try {
      if (editingEvent.id && editingEvent.id !== 'new') {
        const { error } = await supabase
          .from('events')
          .update({
            title: editingEvent.title,
            description: editingEvent.description,
            image_url: editingEvent.image_url,
            event_date: editingEvent.event_date,
            price: editingEvent.price,
            is_featured: editingEvent.is_featured,
            is_active: editingEvent.is_active,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingEvent.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('events')
          .insert({
            title: editingEvent.title,
            description: editingEvent.description,
            image_url: editingEvent.image_url,
            event_date: editingEvent.event_date,
            price: editingEvent.price,
            is_featured: editingEvent.is_featured,
            is_active: editingEvent.is_active
          });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Event saved successfully",
      });
      
      setIsDialogOpen(false);
      setEditingEvent(null);
      loadEvents();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save event",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Event deleted successfully",
      });
      
      loadEvents();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (event?: Event) => {
    setEditingEvent(event || {
      id: 'new',
      title: '',
      description: '',
      image_url: '',
      event_date: '',
      price: '',
      is_featured: false,
      is_active: true
    });
    setIsDialogOpen(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Events Management</CardTitle>
              <CardDescription>Manage special events and packages</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => openEditDialog()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingEvent?.id === 'new' ? 'Add New Event' : 'Edit Event'}
                  </DialogTitle>
                </DialogHeader>
                {editingEvent && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Event Title</Label>
                      <Input
                        id="title"
                        value={editingEvent.title}
                        onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={editingEvent.description || ''}
                        onChange={(e) => setEditingEvent({...editingEvent, description: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="event_date">Event Date</Label>
                      <Input
                        id="event_date"
                        type="date"
                        value={editingEvent.event_date || ''}
                        onChange={(e) => setEditingEvent({...editingEvent, event_date: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        value={editingEvent.price || ''}
                        onChange={(e) => setEditingEvent({...editingEvent, price: e.target.value})}
                        placeholder="$99 per person"
                      />
                    </div>

                    <div>
                      <Label htmlFor="image_url">Image URL</Label>
                      <Input
                        id="image_url"
                        value={editingEvent.image_url || ''}
                        onChange={(e) => setEditingEvent({...editingEvent, image_url: e.target.value})}
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={editingEvent.is_featured}
                          onCheckedChange={(checked) => setEditingEvent({...editingEvent, is_featured: checked})}
                        />
                        <Label>Featured</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={editingEvent.is_active}
                          onCheckedChange={(checked) => setEditingEvent({...editingEvent, is_active: checked})}
                        />
                        <Label>Active</Label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>
                        Save Event
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
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>{event.event_date ? new Date(event.event_date).toLocaleDateString() : 'TBD'}</TableCell>
                  <TableCell>{event.price || 'Contact for pricing'}</TableCell>
                  <TableCell>
                    <Badge variant={event.is_active ? "default" : "secondary"}>
                      {event.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(event)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(event.id)}
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

export default EventsManagement;