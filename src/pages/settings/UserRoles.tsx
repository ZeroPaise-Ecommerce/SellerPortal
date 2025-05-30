
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Pencil, Trash2, Shield } from "lucide-react";

const UserRoles = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: "John Smith", 
      email: "john@example.com", 
      role: "Admin", 
      lastActive: "Today at 10:30 AM",
      status: "active"
    },
    { 
      id: 2, 
      name: "Sara Williams", 
      email: "sara@example.com", 
      role: "Manager", 
      lastActive: "Yesterday at 4:15 PM",
      status: "active"
    },
    { 
      id: 3, 
      name: "Michael Johnson", 
      email: "michael@example.com", 
      role: "Staff", 
      lastActive: "May 8, 2025",
      status: "active"
    },
    { 
      id: 4, 
      name: "Emily Davis", 
      email: "emily@example.com", 
      role: "Staff", 
      lastActive: "Apr 29, 2025",
      status: "inactive"
    }
  ]);
  
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      description: "Full access to all settings and features",
      permissions: {
        products: { view: true, create: true, edit: true, delete: true },
        orders: { view: true, create: true, edit: true, delete: true },
        customers: { view: true, create: true, edit: true, delete: true },
        settings: { view: true, edit: true },
        reports: { view: true },
        billing: { view: true, edit: true }
      },
      isDefault: false,
      isSystem: true
    },
    {
      id: 2,
      name: "Manager",
      description: "Can manage most aspects but cannot modify critical settings",
      permissions: {
        products: { view: true, create: true, edit: true, delete: false },
        orders: { view: true, create: true, edit: true, delete: false },
        customers: { view: true, create: true, edit: true, delete: false },
        settings: { view: true, edit: false },
        reports: { view: true },
        billing: { view: true, edit: false }
      },
      isDefault: true,
      isSystem: true
    },
    {
      id: 3,
      name: "Staff",
      description: "Limited access to manage day-to-day operations",
      permissions: {
        products: { view: true, create: false, edit: false, delete: false },
        orders: { view: true, create: true, edit: false, delete: false },
        customers: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, edit: false },
        reports: { view: false },
        billing: { view: false, edit: false }
      },
      isDefault: false,
      isSystem: true
    },
    {
      id: 4,
      name: "Content Manager",
      description: "Can manage products and content only",
      permissions: {
        products: { view: true, create: true, edit: true, delete: false },
        orders: { view: true, create: false, edit: false, delete: false },
        customers: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, edit: false },
        reports: { view: false },
        billing: { view: false, edit: false }
      },
      isDefault: false,
      isSystem: false
    }
  ]);
  
  const handleSave = () => {
    toast({
      title: "User settings saved",
      description: "User roles and permissions have been updated.",
    });
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">User Roles & Permissions</h1>
      
      <div className="space-y-8">
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Users</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Invite User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Invite New User</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="name">Name</label>
                    <Input id="name" placeholder="Enter user's name" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="email">Email</label>
                    <Input id="email" type="email" placeholder="user@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="role">Role</label>
                    <select 
                      id="role" 
                      className="w-full h-10 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue="3"
                    >
                      {roles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => {
                    toast({
                      title: "Invitation sent",
                      description: "The user has been invited to join your store.",
                    });
                  }}>Send Invitation</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Role</th>
                    <th className="text-left p-4">Last Active</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-right p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{user.name}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">{user.role}</td>
                      <td className="p-4">{user.lastActive}</td>
                      <td className="p-4">
                        <Badge className={user.status === "active" ? "bg-green-500" : "bg-gray-400"}>
                          {user.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
        
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Roles & Permissions</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Create Role
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Create New Role</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="role-name">Role Name</label>
                    <Input id="role-name" placeholder="Enter role name" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="role-desc">Description</label>
                    <Input id="role-desc" placeholder="Brief description of this role" />
                  </div>
                  
                  <div className="grid gap-4 pt-2">
                    <h4 className="font-medium">Permissions</h4>
                    
                    <div className="space-y-4">
                      <div className="border rounded-md">
                        <div className="bg-gray-50 p-3 font-medium border-b">Products</div>
                        <div className="p-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch id="prod-view" defaultChecked />
                            <label htmlFor="prod-view">View</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="prod-create" defaultChecked />
                            <label htmlFor="prod-create">Create</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="prod-edit" defaultChecked />
                            <label htmlFor="prod-edit">Edit</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="prod-delete" />
                            <label htmlFor="prod-delete">Delete</label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-md">
                        <div className="bg-gray-50 p-3 font-medium border-b">Orders</div>
                        <div className="p-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch id="order-view" defaultChecked />
                            <label htmlFor="order-view">View</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="order-create" defaultChecked />
                            <label htmlFor="order-create">Create</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="order-edit" defaultChecked />
                            <label htmlFor="order-edit">Edit</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="order-delete" />
                            <label htmlFor="order-delete">Delete</label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-md">
                        <div className="bg-gray-50 p-3 font-medium border-b">Settings</div>
                        <div className="p-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch id="settings-view" />
                            <label htmlFor="settings-view">View</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="settings-edit" />
                            <label htmlFor="settings-edit">Edit</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => {
                    toast({
                      title: "Role created",
                      description: "New role has been created successfully.",
                    });
                  }}>Create Role</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {roles.map(role => (
              <Card key={role.id} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{role.name}</h3>
                        {role.isDefault && (
                          <Badge variant="outline" className="border-blue-500 text-blue-500">Default</Badge>
                        )}
                        {role.isSystem && (
                          <Badge variant="outline" className="border-gray-500 text-gray-500">
                            <Shield className="h-3 w-3 mr-1" /> System
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-500 text-sm mt-1">{role.description}</p>
                    </div>
                    
                    {!role.isSystem && (
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Permissions:</h4>
                    <div className="grid grid-cols-3 gap-y-2 text-sm">
                      <div>Products:</div>
                      <div className="col-span-2 flex flex-wrap gap-1">
                        {role.permissions.products.view && <Badge className="bg-gray-200 text-gray-800 whitespace-nowrap">View</Badge>}
                        {role.permissions.products.create && <Badge className="bg-gray-200 text-gray-800 whitespace-nowrap">Create</Badge>}
                        {role.permissions.products.edit && <Badge className="bg-gray-200 text-gray-800 whitespace-nowrap">Edit</Badge>}
                        {role.permissions.products.delete && <Badge className="bg-gray-200 text-gray-800 whitespace-nowrap">Delete</Badge>}
                      </div>
                      
                      <div>Orders:</div>
                      <div className="col-span-2 flex flex-wrap gap-1">
                        {role.permissions.orders.view && <Badge className="bg-gray-200 text-gray-800 whitespace-nowrap">View</Badge>}
                        {role.permissions.orders.create && <Badge className="bg-gray-200 text-gray-800 whitespace-nowrap">Create</Badge>}
                        {role.permissions.orders.edit && <Badge className="bg-gray-200 text-gray-800 whitespace-nowrap">Edit</Badge>}
                        {role.permissions.orders.delete && <Badge className="bg-gray-200 text-gray-800 whitespace-nowrap">Delete</Badge>}
                      </div>
                      
                      <div>Settings:</div>
                      <div className="col-span-2 flex flex-wrap gap-1">
                        {role.permissions.settings.view && <Badge className="bg-gray-200 text-gray-800 whitespace-nowrap">View</Badge>}
                        {role.permissions.settings.edit && <Badge className="bg-gray-200 text-gray-800 whitespace-nowrap">Edit</Badge>}
                      </div>
                      
                      <div>Billing:</div>
                      <div className="col-span-2 flex flex-wrap gap-1">
                        {role.permissions.billing.view && <Badge className="bg-gray-200 text-gray-800 whitespace-nowrap">View</Badge>}
                        {role.permissions.billing.edit && <Badge className="bg-gray-200 text-gray-800 whitespace-nowrap">Edit</Badge>}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
        
        <div className="pt-4 border-t">
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default UserRoles;
