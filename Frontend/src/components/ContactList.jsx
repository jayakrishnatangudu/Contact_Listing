import React, { useState } from "react";
import { Search } from "lucide-react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function ContactList({ contacts, onDeleteContact }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

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
      } else {
        alert("Failed to delete contact. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="mb-5 relative max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        />
        <Input
          type="text"
          placeholder="Search by name or number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      {filteredContacts.length === 0 ? (
        <p className="text-muted-foreground">
          {searchQuery
            ? "No contacts match your search."
            : "No contacts found."}
        </p>
      ) : (
        <ul className="space-y-2">
          {filteredContacts.map((contact) => (
            <li
              key={contact._id}
              className="flex justify-between items-center p-3 border rounded-md hover:bg-accent"
            >
              <span>
                <strong>{contact.name || "Unknown"}</strong> - {contact.number}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4 " />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleDeleteClick(contact)}
                    className="text-destructive focus:text-destructive cursor-pointer"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          ))}
        </ul>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Contact</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <strong>{contactToDelete?.name}</strong>? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ContactList;

// import React, { useState } from "react";

// function ContactList({ contacts, onDeleteContact }) {
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredContacts = contacts.filter((contact) => {
//     const name = (contact.name || "").toLowerCase();
//     const number = (contact.number || "").toLowerCase();
//     const query = searchQuery.toLowerCase();

//     return name.includes(query) || number.includes(query);
//   });

//   const handleDelete = async (contactId, contactName) => {

//     const confirmed = window.confirm(`Are you sure you want to delete ${contactName}?`);

//     if (confirmed) {
//       const result = await onDeleteContact(contactId);

//       if (result.success) {
//         console.log("Contact deleted successfully");
//       } else {
//         alert("Failed to delete contact. Please try again.");
//       }
//     }
//   };

//   return (
//     <>
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Search by name or number..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           style={{
//             padding: "8px",
//             width: "100%",
//             maxWidth: "400px",
//             fontSize: "16px",
//             border: "1px solid #ccc",
//             borderRadius: "4px"
//           }}
//         />
//       </div>

//       {filteredContacts.length === 0 ? (
//         <p>{searchQuery ? "No contacts match your search." : "No contacts found."}</p>
//       ) : (
//         <ul style={{ listStyle: "none", padding: 0 }}>
//           {filteredContacts.map((contact) => (
//             <li
//               key={contact._id}
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 padding: "10px",
//                 marginBottom: "5px",
//                 border: "1px solid #ddd",
//                 borderRadius: "4px"
//               }}
//             >
//               <span>
//                 {contact.name || "Unknown"} - {contact.number}
//               </span>
//               <button
//                 onClick={() => handleDelete(contact._id, contact.name)}
//                 style={{
//                   padding: "5px 15px",
//                   backgroundColor: "#dc3545",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                   fontSize: "14px"
//                 }}
//                 onMouseOver={(e) => e.target.style.backgroundColor = "#c82333"}
//                 onMouseOut={(e) => e.target.style.backgroundColor = "#dc3545"}
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </>
//   );
// }

// export default ContactList;
