import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CustomerNotesProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  customerId?: string;
  notes?: Array<{
    id: string;
    content: string;
    createdAt: string;
    createdBy: {
      name: string;
      avatar?: string;
    };
  }>;
  onAddNote?: (note: string) => void;
}

const defaultNotes = [
  {
    id: "1",
    content: "Customer requested information about bulk ordering.",
    createdAt: "2024-01-15T10:30:00Z",
    createdBy: {
      name: "John Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
  },
  {
    id: "2",
    content: "Follow up on size exchange request for order #ORD-002.",
    createdAt: "2024-01-14T15:45:00Z",
    createdBy: {
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
  },
];

const CustomerNotes = ({
  open = false,
  onOpenChange,
  customerId,
  notes = defaultNotes,
  onAddNote = () => {},
}: CustomerNotesProps) => {
  const [newNote, setNewNote] = React.useState("");

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote);
      setNewNote("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Customer Notes</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Notes List */}
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="flex gap-4 p-4 bg-muted/50 rounded-lg"
                >
                  <Avatar>
                    <AvatarImage src={note.createdBy.avatar} />
                    <AvatarFallback>
                      {note.createdBy.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{note.createdBy.name}</p>
                      <time className="text-sm text-muted-foreground">
                        {new Date(note.createdAt).toLocaleString()}
                      </time>
                    </div>
                    <p className="mt-1 text-sm">{note.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Add Note */}
          <div className="space-y-4">
            <Textarea
              placeholder="Add a note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[100px]"
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange?.(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddNote}>Add Note</Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerNotes;
