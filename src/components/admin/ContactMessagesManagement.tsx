import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Eye, MessageSquare, Mail, Phone } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: 'unread' | 'read' | 'replied';
  admin_notes: string | null;
  created_at: string;
}

const ContactMessagesManagement = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (id: string, status: 'read' | 'replied') => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Message marked as ${status}`,
      });
      
      loadMessages();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive",
      });
    }
  };

  const saveAdminNotes = async () => {
    if (!selectedMessage) return;

    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ 
          admin_notes: adminNotes,
          status: 'read',
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedMessage.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin notes saved successfully",
      });
      
      setIsDialogOpen(false);
      loadMessages();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save admin notes",
        variant: "destructive",
      });
    }
  };

  const openMessageDialog = (message: ContactMessage) => {
    setSelectedMessage(message);
    setAdminNotes(message.admin_notes || '');
    setIsDialogOpen(true);
    
    if (message.status === 'unread') {
      updateMessageStatus(message.id, 'read');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unread':
        return <Badge variant="destructive">Unread</Badge>;
      case 'read':
        return <Badge variant="secondary">Read</Badge>;
      case 'replied':
        return <Badge variant="default">Replied</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Messages</CardTitle>
          <CardDescription>
            Manage customer inquiries and contact form submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message) => (
                <TableRow 
                  key={message.id}
                  className={message.status === 'unread' ? 'bg-blue-50' : ''}
                >
                  <TableCell className="font-medium">
                    <div>
                      <p>{message.name}</p>
                      <p className="text-sm text-gray-500">{message.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="font-medium">{message.subject || 'No subject'}</p>
                      <p className="text-sm text-gray-500 truncate">
                        {message.message.substring(0, 100)}...
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(message.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(message.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openMessageDialog(message)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {message.email && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`mailto:${message.email}`)}
                        >
                          <Mail className="w-4 h-4" />
                        </Button>
                      )}
                      {message.phone && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`tel:${message.phone}`)}
                        >
                          <Phone className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Message from {selectedMessage?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <p className="mt-1">{selectedMessage.name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="mt-1">{selectedMessage.email}</p>
                </div>
                {selectedMessage.phone && (
                  <div>
                    <Label>Phone</Label>
                    <p className="mt-1">{selectedMessage.phone}</p>
                  </div>
                )}
                <div>
                  <Label>Subject</Label>
                  <p className="mt-1">{selectedMessage.subject || 'No subject'}</p>
                </div>
              </div>

              <div>
                <Label>Message</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              <div>
                <Label htmlFor="admin_notes">Admin Notes</Label>
                <Textarea
                  id="admin_notes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add your notes about this message..."
                  rows={3}
                />
              </div>

              <div className="flex justify-between">
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => updateMessageStatus(selectedMessage.id, 'replied')}
                  >
                    Mark as Replied
                  </Button>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Close
                  </Button>
                  <Button onClick={saveAdminNotes}>
                    Save Notes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactMessagesManagement;