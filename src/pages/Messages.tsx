import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Search, Send, Plus, User, Paperclip, Smile, Tag, Check, ChevronDown, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

// Sample chat data
const chatData = [
  {
    id: "chat-1",
    customer: {
      id: "cust-1",
      name: "John Smith",
      avatar: null,
      initials: "JS",
      lastSeen: new Date(2023, 4, 7, 14, 45),
    },
    messages: [
      {
        id: "msg-1",
        content: "Hello, I was wondering when my order #7652 will be shipped?",
        timestamp: new Date(2023, 4, 7, 14, 32),
        sender: "customer",
        status: "read",
      },
      {
        id: "msg-2",
        content: "Hi John, your order is being processed and will be shipped out today. You should receive a tracking number by email in the next few hours.",
        timestamp: new Date(2023, 4, 7, 14, 40),
        sender: "admin",
        status: "read",
      },
      {
        id: "msg-3",
        content: "Thank you for the quick response! I appreciate it.",
        timestamp: new Date(2023, 4, 7, 14, 43),
        sender: "customer",
        status: "read",
      },
    ],
    unreadCount: 0,
  },
  {
    id: "chat-2",
    customer: {
      id: "cust-2",
      name: "Emily Johnson",
      avatar: null,
      initials: "EJ",
      lastSeen: new Date(2023, 4, 7, 10, 20),
    },
    messages: [
      {
        id: "msg-4",
        content: "I'd like to return the item I received yesterday because it's the wrong size.",
        timestamp: new Date(2023, 4, 7, 10, 15),
        sender: "customer",
        status: "unread",
      },
    ],
    unreadCount: 1,
  },
  {
    id: "chat-3",
    customer: {
      id: "cust-3",
      name: "Michael Brown",
      avatar: null,
      initials: "MB",
      lastSeen: new Date(2023, 4, 6, 17, 0),
    },
    messages: [
      {
        id: "msg-5",
        content: "Do you have the wireless headphones in black color?",
        timestamp: new Date(2023, 4, 6, 16, 48),
        sender: "customer",
        status: "read",
      },
      {
        id: "msg-6",
        content: "Yes, we do have the wireless headphones in black. Would you like me to place an order for you?",
        timestamp: new Date(2023, 4, 6, 16, 55),
        sender: "admin",
        status: "read",
      },
    ],
    unreadCount: 0,
  },
  {
    id: "chat-4",
    customer: {
      id: "cust-4",
      name: "Sarah Wilson",
      avatar: null,
      initials: "SW",
      lastSeen: new Date(2023, 4, 6, 9, 30),
    },
    messages: [
      {
        id: "msg-7",
        content: "I'm trying to place an order but having trouble with the international shipping address.",
        timestamp: new Date(2023, 4, 6, 9, 22),
        sender: "customer",
        status: "read",
      },
      {
        id: "msg-8",
        content: "I understand the difficulty. Could you please provide your complete address including postal code and country?",
        timestamp: new Date(2023, 4, 6, 9, 28),
        sender: "admin",
        status: "read",
      },
    ],
    unreadCount: 0,
  },
  {
    id: "chat-5",
    customer: {
      id: "cust-5",
      name: "David Taylor",
      avatar: null,
      initials: "DT",
      lastSeen: new Date(2023, 4, 5, 15, 40),
    },
    messages: [
      {
        id: "msg-9",
        content: "I tried to use the SUMMER20 discount code but it says it's expired.",
        timestamp: new Date(2023, 4, 5, 15, 37),
        sender: "customer",
        status: "read",
      },
      {
        id: "msg-10",
        content: "I apologize for the confusion. The SUMMER20 code expired yesterday. I can offer you a new discount code SPECIAL15 that will give you 15% off your purchase today.",
        timestamp: new Date(2023, 4, 5, 15, 39),
        sender: "admin",
        status: "read",
      },
    ],
    unreadCount: 0,
  },
  {
    id: "chat-6",
    customer: {
      id: "cust-6",
      name: "Jennifer Davis",
      avatar: null,
      initials: "JD",
      lastSeen: new Date(2023, 4, 5, 11, 5),
    },
    messages: [
      {
        id: "msg-11",
        content: "I just wanted to let you know that I'm very satisfied with my recent purchase. The quality is excellent!",
        timestamp: new Date(2023, 4, 5, 11, 3),
        sender: "customer",
        status: "read",
      },
      {
        id: "msg-12",
        content: "Thank you for your kind feedback, Jennifer! We're thrilled to hear you're enjoying your purchase. Is there anything else we can assist you with?",
        timestamp: new Date(2023, 4, 5, 11, 5),
        sender: "admin",
        status: "read",
      },
    ],
    unreadCount: 0,
  },
];

// Sample labels
const initialLabels = [
  { id: "label-1", name: "VIP", color: "#FF5630" },
  { id: "label-2", name: "New Customer", color: "#36B37E" },
  { id: "label-3", name: "Support", color: "#6554C0" },
  { id: "label-4", name: "Prospect", color: "#FFAB00" },
];

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChat, setActiveChat] = useState(chatData[0]);
  const [newMessage, setNewMessage] = useState("");
  const [showNewChatDialog, setShowNewChatDialog] = useState(false);
  const [filteredChats, setFilteredChats] = useState(chatData);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [newLabelDialog, setNewLabelDialog] = useState(false);
  const [newLabelName, setNewLabelName] = useState("");
  const [newLabelColor, setNewLabelColor] = useState("#6554C0");
  const [labels, setLabels] = useState(initialLabels);
  const [showLabelDialog, setShowLabelDialog] = useState(false);
  const [customerLabels, setCustomerLabels] = useState({});

  // Filter chats based on search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = chatData.filter(chat => 
        chat.customer.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredChats(filtered);
    } else {
      setFilteredChats(chatData);
    }
  };

  // Filter chats by label
  const filterByLabel = (labelId) => {
    setSelectedLabel(labelId);
    
    if (!labelId) {
      setFilteredChats(chatData);
      return;
    }
    
    // Filter chats that have the selected label
    const filtered = chatData.filter(chat => 
      customerLabels[chat.id] && customerLabels[chat.id].includes(labelId)
    );
    
    setFilteredChats(filtered);
  };

  // Send a new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const updatedChat = {
      ...activeChat,
      messages: [
        ...activeChat.messages,
        {
          id: `msg-${Date.now()}`,
          content: newMessage,
          timestamp: new Date(),
          sender: "admin",
          status: "sent",
        }
      ]
    };

    // Update the active chat
    setActiveChat(updatedChat);
    
    // Update the chat in the list
    const updatedChats = filteredChats.map(chat => 
      chat.id === activeChat.id ? updatedChat : chat
    );
    setFilteredChats(updatedChats);
    
    // Clear the input
    setNewMessage("");
  };

  // Handle keydown for sending messages with Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Create a new label
  const handleCreateLabel = () => {
    if (!newLabelName.trim()) return;
    
    const newLabel = {
      id: `label-${Date.now()}`,
      name: newLabelName,
      color: newLabelColor
    };
    
    setLabels([...labels, newLabel]);
    setNewLabelName("");
    setNewLabelDialog(false);
  };

  // Assign a label to a customer
  const assignLabel = (chatId, labelId) => {
    setCustomerLabels(prev => {
      const currentLabels = prev[chatId] || [];
      
      // If label already exists, remove it (toggle functionality)
      if (currentLabels.includes(labelId)) {
        return {
          ...prev,
          [chatId]: currentLabels.filter(id => id !== labelId)
        };
      }
      
      // Otherwise add the label
      return {
        ...prev,
        [chatId]: [...currentLabels, labelId]
      };
    });
    
    // If we're currently filtering by a label, refresh the filtered list
    if (selectedLabel) {
      filterByLabel(selectedLabel);
    }
  };

  const getCustomerLabels = (chatId) => {
    return (customerLabels[chatId] || []).map(labelId => 
      labels.find(label => label.id === labelId)
    ).filter(Boolean);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center">
        <div className="mr-3">
          <MessageSquare size={24} className="text-brand-blue" />
        </div>
        <div>
          <h1 className="text-lg font-bold">Messages</h1>
          <p className="text-sm text-gray-500">Manage customer communications</p>
        </div>
      </div>

      <Card className="h-[calc(100vh-190px)] flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Customer Conversations</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden">
          <div className="flex h-full">
            {/* Left sidebar - Chat list */}
            <div className="w-1/3 border-r flex flex-col h-full">
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-8 text-sm h-9"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Labels filter section */}
              <div className="flex justify-between items-center px-3 py-2 border-b">
                <div className="text-sm font-medium">Labels</div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2"
                  onClick={() => setNewLabelDialog(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <ScrollArea className="h-10 border-b">
                <div className="flex gap-1 px-3 py-1 overflow-x-auto">
                  <Button 
                    variant={!selectedLabel ? "default" : "outline"}
                    size="sm" 
                    className="h-7 text-xs whitespace-nowrap"
                    onClick={() => filterByLabel("")}
                  >
                    All
                  </Button>
                  {labels.map(label => (
                    <Button 
                      key={label.id}
                      variant={selectedLabel === label.id ? "default" : "outline"}
                      size="sm" 
                      className="h-7 text-xs whitespace-nowrap"
                      style={{borderColor: label.color, color: selectedLabel === label.id ? "white" : label.color, backgroundColor: selectedLabel === label.id ? label.color : "transparent"}}
                      onClick={() => filterByLabel(label.id)}
                    >
                      <span className="w-2 h-2 rounded-full mr-1" style={{backgroundColor: selectedLabel === label.id ? "white" : label.color}}></span>
                      {label.name}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="flex justify-between items-center px-3 py-2 border-b">
                <div className="text-sm font-medium">Recent Chats</div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2"
                  onClick={() => setShowNewChatDialog(!showNewChatDialog)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <ScrollArea className="flex-1">
                {showNewChatDialog && (
                  <div className="p-3 border-b bg-slate-50">
                    <h3 className="text-sm font-medium mb-2">New Conversation</h3>
                    <Input
                      placeholder="Search customer..."
                      className="text-sm mb-2"
                    />
                    <div className="flex space-x-2 justify-end mt-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowNewChatDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button size="sm">Start Chat</Button>
                    </div>
                  </div>
                )}
                
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={cn(
                      "flex items-start gap-3 p-3 hover:bg-slate-50 cursor-pointer transition-colors",
                      activeChat?.id === chat.id && "bg-slate-100"
                    )}
                    onClick={() => setActiveChat(chat)}
                  >
                    <Avatar>
                      <AvatarFallback className="bg-brand-blue text-white">
                        {chat.customer.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="font-medium text-sm">
                          {chat.customer.name}
                          {chat.unreadCount > 0 && (
                            <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                              {chat.unreadCount}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {format(chat.messages[chat.messages.length - 1].timestamp, 'HH:mm')}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 truncate mt-1">
                        {chat.messages[chat.messages.length - 1].sender === 'admin' ? 'You: ' : ''}
                        {chat.messages[chat.messages.length - 1].content}
                      </div>
                      {/* Display assigned labels */}
                      {getCustomerLabels(chat.id).length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {getCustomerLabels(chat.id).map(label => (
                            <span 
                              key={label.id} 
                              className="text-xs py-0.5 px-1.5 rounded-full" 
                              style={{backgroundColor: `${label.color}20`, color: label.color}}
                            >
                              {label.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
            
            {/* Right side - Chat area */}
            {activeChat ? (
              <div className="w-2/3 flex flex-col h-full">
                {/* Chat header */}
                <div className="p-4 border-b flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback className="bg-brand-blue text-white text-xs">
                        {activeChat.customer.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{activeChat.customer.name}</div>
                      <div className="text-xs text-gray-500">
                        Last seen {format(activeChat.customer.lastSeen, 'MMM d, yyyy HH:mm')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => setShowLabelDialog(true)}
                    >
                      <Tag className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <User className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Chat messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {activeChat.messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          message.sender === "admin" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[70%] rounded-lg p-3",
                            message.sender === "admin"
                              ? "bg-brand-blue text-white"
                              : "bg-gray-100"
                          )}
                        >
                          <div className="text-sm break-words">{message.content}</div>
                          <div className="flex justify-end mt-1 items-center gap-1">
                            <span className="text-xs opacity-70">
                              {format(message.timestamp, 'HH:mm')}
                            </span>
                            {message.sender === "admin" && (
                              <>
                                {message.status === "sent" && (
                                  <Check className="h-3 w-3 opacity-70" />
                                )}
                                {message.status === "delivered" && (
                                  <Check className="h-3 w-3 opacity-70" />
                                )}
                                {message.status === "read" && (
                                  <Check className="h-3 w-3 opacity-70" />
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                {/* Message input */}
                <div className="p-3 border-t flex gap-2 items-end">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full p-0">
                      <Paperclip className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full p-0">
                      <Smile className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Type your message..."
                      className="p-3 min-h-[50px] text-sm resize-none"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  <Button 
                    className="h-[50px] w-[50px] rounded-full p-0 flex items-center justify-center"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="w-2/3 flex items-center justify-center">
                <div className="text-center p-8">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium">No conversation selected</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Select a conversation from the sidebar or start a new one
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Create new label dialog */}
      <Dialog open={newLabelDialog} onOpenChange={setNewLabelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Label</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="label-name" className="text-sm font-medium">Label Name</label>
              <Input
                id="label-name"
                placeholder="Enter label name"
                value={newLabelName}
                onChange={(e) => setNewLabelName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Label Color</label>
              <div className="flex gap-2">
                {["#FF5630", "#FFAB00", "#36B37E", "#00B8D9", "#6554C0", "#8777D9"].map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`w-8 h-8 rounded-full border-2 ${newLabelColor === color ? 'border-black' : 'border-transparent'}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setNewLabelColor(color)}
                  ></button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewLabelDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateLabel}>Create Label</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign labels dialog */}
      <Dialog open={showLabelDialog} onOpenChange={setShowLabelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Labels</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2">
              {labels.map(label => (
                <div key={label.id} className="flex items-center gap-2">
                  <Checkbox 
                    id={`label-${label.id}`}
                    checked={customerLabels[activeChat?.id]?.includes(label.id)}
                    onCheckedChange={() => activeChat && assignLabel(activeChat.id, label.id)}
                  />
                  <label 
                    htmlFor={`label-${label.id}`}
                    className="text-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-3 h-3 rounded-full" style={{backgroundColor: label.color}}></span>
                    {label.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setNewLabelDialog(true)}>Create New Label</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Messages;
