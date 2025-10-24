import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp, Phone } from "lucide-react";
import { MoreVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function ContactList({ contacts, onDeleteContact }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [expandedContactId, setExpandedContactId] = useState(null);

  const filteredContacts = contacts.filter((contact) => {
    const name = (contact.name || "").toLowerCase();
    const number = (contact.number || "").toLowerCase();
    const query = searchQuery.toLowerCase();

    return name.includes(query) || number.includes(query);
  });

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (contactToDelete) {
      const result = await onDeleteContact(contactToDelete._id);

      if (result.success) {
        console.log("Contact deleted successfully");
        setDeleteDialogOpen(false);
        setContactToDelete(null);
      }
    }
  };

  const toggleContact = (contactId) => {
    setExpandedContactId(expandedContactId === contactId ? null : contactId);
  };

  return (
    <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
      {/* Search Header */}
      <div className="p-4 sm:p-6 bg-muted/30 border-b border-border">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <Input
            type="text"
            placeholder="Search by name or number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 text-sm sm:text-base shadow-sm"
          />
        </div>
        {/* Contact Count */}
        <div className="mt-3 text-xs sm:text-sm text-muted-foreground">
          {filteredContacts.length} contact
          {filteredContacts.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {/* Contact List */}
      <div className="p-4 sm:p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
            </div>
            <p className="text-base sm:text-lg font-medium text-foreground mb-1">
              {searchQuery ? "No matches found" : "No contacts yet"}
            </p>
            <p className="text-sm text-muted-foreground">
              {searchQuery
                ? "Try adjusting your search"
                : "Add your first contact to get started"}
            </p>
          </div>
        ) : (
          <ul className="space-y-2 sm:space-y-3">
            {filteredContacts.map((contact) => (
              <li
                key={contact._id}
                className="group border border-border rounded-lg sm:rounded-xl hover:shadow-md hover:border-primary/50 transition-all duration-200 bg-card"
              >
                <div className="flex items-center justify-between p-3 sm:p-4">
                  <div
                    onClick={() => toggleContact(contact._id)}
                    className="flex-1 cursor-pointer min-w-0"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      {/* Avatar */}
                      <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm sm:text-base">
                        {(contact.name || "U").charAt(0).toUpperCase()}
                      </div>

                      {/* Name and Chevron */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <strong className="text-sm sm:text-base font-semibold text-foreground truncate">
                            {contact.name || "Unknown"}
                          </strong>
                          {expandedContactId === contact._id ? (
                            <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0" />
                          ) : (
                            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground shrink-0" />
                          )}
                        </div>

                        {/* Phone Number (Expanded) */}
                        {expandedContactId === contact._id && (
                          <div className="mt-2 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground animate-in slide-in-from-top-1 duration-200">
                            <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="font-mono">{contact.number}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-8 w-8 sm:h-9 sm:w-9 p-0 opacity-70 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(contact)}
                        className="text-destructive focus:text-destructive cursor-pointer"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] mx-4">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">
              Delete Contact
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Are you sure you want to delete{" "}
              <strong>{contactToDelete?.name}</strong>? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="w-full sm:w-auto"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ContactList;
