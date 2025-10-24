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

function AddContact({ onAddContact }) {
  const [newContact, setNewContact] = useState({ name: "", number: "" });
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await onAddContact(newContact);

    if (result.success) {
      setNewContact({ name: "", number: "" });
      setOpen(false); // Close dialog on success
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {" "}
          <UserPlus size={24} className="mr-2 text-gray-700" />
          <span className="text-gray-800 font-medium">Add</span>{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
            <DialogDescription>
              Add a new contact to your list. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter name"
                value={newContact.name}
                onChange={(e) =>
                  setNewContact({ ...newContact, name: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="number">Phone Number</Label>
              <Input
                id="number"
                name="number"
                placeholder="Enter phone number"
                value={newContact.number}
                onChange={(e) =>
                  setNewContact({ ...newContact, number: e.target.value })
                }
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer">Save Contact</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddContact;

// import React, { useState } from "react";

// function AddContact({ onAddContact }) {
//   const [newContact, setNewContact] = useState({ name: "", number: "" });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const result = await onAddContact(newContact);

//     if (result.success) {
//       setNewContact({ name: "", number: "" });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Name"
//         value={newContact.name}
//         onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Phone Number"
//         value={newContact.number}
//         onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
//         required
//       />
//       <button type="submit" className="hover: cursor-pointer">Add Contact</button>
//     </form>
//   );
// }

// export default AddContact;
