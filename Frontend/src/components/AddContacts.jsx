import React, { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

function AddContact({ onAddContact }) {
  const [newContact, setNewContact] = useState({ name: "", number: "" });
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await onAddContact(newContact);

    if (result.success) {
      setNewContact({ name: "", number: "" });
      setOpen(false);
      toast.success("Contact added successfully!");
    } else {
      toast.error(result.message || "A contact with this name already exists.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="lg"
          className="w-full h-auto py-4 sm:py-6 shadow-lg hover:shadow-xl transition-all duration-200 text-base sm:text-lg font-semibold"
        >
          <UserPlus size={24} className="mr-2 sm:mr-3" />
          <span>Add New Contact</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-6">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-xl sm:text-2xl">
              Add New Contact
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Add a new contact to your list. Fill in the details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-6">
            <div className="grid gap-3">
              <Label
                htmlFor="name"
                className="text-sm sm:text-base font-medium"
              >
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter full name"
                value={newContact.name}
                onChange={(e) =>
                  setNewContact({ ...newContact, name: e.target.value })
                }
                required
                className="h-11 text-sm sm:text-base"
              />
            </div>
            <div className="grid gap-3">
              <Label
                htmlFor="number"
                className="text-sm sm:text-base font-medium"
              >
                Phone Number
              </Label>
              <Input
                id="number"
                name="number"
                type="tel"
                placeholder="Enter phone number"
                value={newContact.number}
                onChange={(e) =>
                  setNewContact({ ...newContact, number: e.target.value })
                }
                required
                maxLength={10}
                minLength={10}
                className="h-11 text-sm sm:text-base font-mono"
              />
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-2">
            <DialogClose asChild>
              <Button
                variant="outline"
                type="button"
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="w-full sm:w-auto cursor-pointer">
              Save Contact
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddContact;


