import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomerMessageProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  customerData?: {
    name: string;
    email: string;
    phone: string;
  };
  onSendMessage?: (message: {
    type: string;
    subject: string;
    content: string;
  }) => void;
}

const CustomerMessage = ({
  open = false,
  onOpenChange,
  customerData = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
  },
  onSendMessage = () => {},
}: CustomerMessageProps) => {
  const [messageType, setMessageType] = React.useState("email");
  const [subject, setSubject] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleSend = () => {
    onSendMessage({
      type: messageType,
      subject,
      content,
    });
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Send Message to Customer</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Message Type</Label>
            <Select value={messageType} onValueChange={setMessageType}>
              <SelectTrigger>
                <SelectValue placeholder="Select message type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>To</Label>
            <Input
              value={
                messageType === "email"
                  ? customerData.email
                  : customerData.phone
              }
              disabled
            />
          </div>

          {messageType === "email" && (
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input
                placeholder="Enter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea
              placeholder="Type your message here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>
            Cancel
          </Button>
          <Button onClick={handleSend}>Send Message</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerMessage;
