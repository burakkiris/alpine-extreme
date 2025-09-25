import { Button } from '@/components/ui/button';
import { LogOut, Mountain } from 'lucide-react';

interface AdminNavigationProps {
  onLogout: () => void;
}

const AdminNavigation = ({ onLogout }: AdminNavigationProps) => {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Mountain className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-montserrat font-bold text-primary">
                Alpine Extreme Park
              </h1>
              <p className="text-sm text-muted-foreground">Admin Panel</p>
            </div>
          </div>
          
          <Button variant="ghost" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavigation;