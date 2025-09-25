import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Plus, Trash2, Image } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface GalleryItem {
  id: string;
  title: string | null;
  image_url: string;
  thumbnail_url: string | null;
  category: string;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
}

const GalleryManagement = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      setGalleryItems(data || []);
    } catch (error) {
      console.error('Error loading gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingItem) return;

    try {
      if (editingItem.id && editingItem.id !== 'new') {
        const { error } = await supabase
          .from('gallery')
          .update({
            title: editingItem.title,
            image_url: editingItem.image_url,
            thumbnail_url: editingItem.thumbnail_url,
            category: editingItem.category,
            is_featured: editingItem.is_featured,
            is_active: editingItem.is_active,
            sort_order: editingItem.sort_order,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingItem.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('gallery')
          .insert({
            title: editingItem.title,
            image_url: editingItem.image_url,
            thumbnail_url: editingItem.thumbnail_url,
            category: editingItem.category,
            is_featured: editingItem.is_featured,
            is_active: editingItem.is_active,
            sort_order: editingItem.sort_order
          });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Gallery item saved successfully",
      });
      
      setIsDialogOpen(false);
      setEditingItem(null);
      loadGalleryItems();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save gallery item",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Gallery item deleted successfully",
      });
      
      loadGalleryItems();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete gallery item",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (item?: GalleryItem) => {
    setEditingItem(item || {
      id: 'new',
      title: '',
      image_url: '',
      thumbnail_url: '',
      category: 'general',
      is_featured: false,
      is_active: true,
      sort_order: galleryItems.length
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
              <CardTitle>Gallery Management</CardTitle>
              <CardDescription>Manage photo gallery and media content</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => openEditDialog()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Photo
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem?.id === 'new' ? 'Add New Photo' : 'Edit Photo'}
                  </DialogTitle>
                </DialogHeader>
                {editingItem && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={editingItem.title || ''}
                        onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                        placeholder="Photo title"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="image_url">Image URL</Label>
                      <Input
                        id="image_url"
                        value={editingItem.image_url}
                        onChange={(e) => setEditingItem({...editingItem, image_url: e.target.value})}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Input
                        id="category"
                        value={editingItem.category}
                        onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                        placeholder="e.g., activities, landscapes, events"
                      />
                    </div>

                    <div>
                      <Label htmlFor="sort_order">Sort Order</Label>
                      <Input
                        id="sort_order"
                        type="number"
                        value={editingItem.sort_order}
                        onChange={(e) => setEditingItem({...editingItem, sort_order: parseInt(e.target.value)})}
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={editingItem.is_featured}
                          onCheckedChange={(checked) => setEditingItem({...editingItem, is_featured: checked})}
                        />
                        <Label>Featured</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={editingItem.is_active}
                          onCheckedChange={(checked) => setEditingItem({...editingItem, is_active: checked})}
                        />
                        <Label>Active</Label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>
                        Save Photo
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
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {galleryItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.image_url ? (
                      <img 
                        src={item.image_url} 
                        alt={item.title || 'Gallery image'} 
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                        <Image className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{item.title || 'Untitled'}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge variant={item.is_active ? "default" : "secondary"}>
                        {item.is_active ? "Active" : "Inactive"}
                      </Badge>
                      {item.is_featured && <Badge variant="outline">Featured</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
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

export default GalleryManagement;