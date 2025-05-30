
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface AddRewardModalProps {
  customerId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRewardAdded?: (points: number) => void;
}

const AddRewardModal = ({ customerId, open, onOpenChange, onRewardAdded }: AddRewardModalProps) => {
  const { toast } = useToast();
  const [points, setPoints] = useState<string>("0");
  const [reason, setReason] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const pointsValue = parseInt(points);
    
    if (!pointsValue || pointsValue <= 0) {
      toast({
        title: "Invalid points",
        description: "Please enter a valid positive number of points",
        variant: "destructive",
      });
      return;
    }
    
    if (!reason.trim()) {
      toast({
        title: "Reason required",
        description: "Please provide a reason for adding points",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    try {
      // This would typically be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Reward Points Added",
        description: `Added ${pointsValue} points to customer account`,
      });
      
      if (onRewardAdded) {
        onRewardAdded(pointsValue);
      }
      
      // Reset form and close modal
      setPoints("0");
      setReason("");
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Failed to add points",
        description: "An error occurred while adding rewards points",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Reward Points</DialogTitle>
          <DialogDescription>
            Add reward points to the customer's account
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="points" className="text-right">
                Points
              </Label>
              <Input
                id="points"
                type="number"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="col-span-3"
                min="1"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right">
                Reason
              </Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="col-span-3"
                placeholder="Reason for adding points"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Points"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRewardModal;
