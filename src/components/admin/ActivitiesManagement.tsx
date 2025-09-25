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

interface Activity {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  features: string[];
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
}

const ActivitiesManagement = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingActivity) return;

    try {
      if (editingActivity.id && editingActivity.id !== 'new') {
        const { error } = await supabase
          .from('activities')
          .update({
            name: editingActivity.name,
            description: editingActivity.description,
            image_url: editingActivity.image_url,
            features: editingActivity.features,
            is_featured: editingActivity.is_featured,
            is_active: editingActivity.is_active,
            sort_order: editingActivity.sort_order,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingActivity.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('activities')
          .insert({
            name: editingActivity.name,
            description: editingActivity.description,
            image_url: editingActivity.image_url,
            features: editingActivity.features,
            is_featured: editingActivity.is_featured,
            is_active: editingActivity.is_active,
            sort_order: editingActivity.sort_order
          });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Activity saved successfully",
      });
      
      setIsDialogOpen(false);
      setEditingActivity(null);
      loadActivities();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save activity",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('activities')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Activity deleted successfully",
      });
      
      loadActivities();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete activity",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (activity?: Activity) => {
    setEditingActivity(activity || {
      id: 'new',
      name: '',
      description: '',
      image_url: '',
      features: [],
      is_featured: false,
      is_active: true,
      sort_order: activities.length
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
              <CardTitle>Activities Management</CardTitle>
              <CardDescription>Manage park activities and experiences</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => openEditDialog()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Activity
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingActivity?.id === 'new' ? 'Add New Activity' : 'Edit Activity'}
                  </DialogTitle>
                </DialogHeader>
                {editingActivity && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Activity Name</Label>
                      <Input
                        id="name"
                        value={editingActivity.name}
                        onChange={(e) => setEditingActivity({...editingActivity, name: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={editingActivity.description || ''}
                        onChange={(e) => setEditingActivity({...editingActivity, description: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="image_url">Image URL</Label>
                      <Input
                        id="image_url"
                        value={editingActivity.image_url || ''}
                        onChange={(e) => setEditingActivity({...editingActivity, image_url: e.target.value})}
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={editingActivity.is_featured}
                          onCheckedChange={(checked) => setEditingActivity({...editingActivity, is_featured: checked})}
                        />
                        <Label>Featured</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={editingActivity.is_active}
                          onCheckedChange={(checked) => setEditingActivity({...editingActivity, is_active: checked})}
                        />
                        <Label>Active</Label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>
                        Save Activity
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
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.name}</TableCell>
                  <TableCell>
                    <Badge variant={activity.is_active ? "default" : "secondary"}>
                      {activity.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {activity.is_featured && <Badge variant="outline">Featured</Badge>}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(activity)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(activity.id)}
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

export default ActivitiesManagement;