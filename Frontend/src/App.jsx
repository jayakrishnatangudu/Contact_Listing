import React, { useEffect, useState } from "react";
import axios from "axios";
import AddContact from "./components/AddContacts";
import ContactList from "./components/ContactList";
import { toast } from "sonner";

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Always use your deployed backend (Render)
  const API_BASE_URL = "https://contact-listing-4qy2.onrender.com/api/users";


  useEffect(() => {
    fetchContacts();
  }, []);

  const sortContacts = (contactArray) => {
    return [...contactArray].sort((a, b) =>
      (a.name || "").toLowerCase().localeCompare((b.name || "").toLowerCase())
    );
  };

  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/all`);
      console.log("Contacts from backend:", res.data);
      setContacts(sortContacts(res.data));
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to load contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (newContact) => {
    try {
      const existingName = contacts.find(
        (contact) =>
          contact.name.toLowerCase().trim() ===
          newContact.name.toLowerCase().trim()
      );

      if (existingName) {
        return {
          success: false,
          message: `A contact with the name "${newContact.name}" already exists.`,
        };
      }

      const existingNumber = contacts.find(
        (contact) => contact.number.trim() === newContact.number.trim()
      );

      if (existingNumber) {
        return {
          success: false,
          message: "This phone number already exists.",
        };
      }

      const res = await axios.post(`${API_BASE_URL}/add`, newContact);
      const addedContact = res.data.user;

      const updatedContacts = sortContacts([...contacts, addedContact]);
      setContacts(updatedContacts);

      toast.success("Contact added successfully!");
      return { success: true };
    } catch (error) {
      console.error("Error adding contact:", error);

      if (error.response?.status === 409) {
        return {
          success: false,
          message:
            error.response.data.message || "This contact already exists.",
        };
      }

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to add contact. Please try again.",
      };
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/delete/${contactId}`);

      if (res.data.success) {
        const updatedContacts = contacts.filter(
          (contact) => contact._id !== contactId
        );
        setContacts(updatedContacts);
        toast.success("Contact deleted successfully!");
        return { success: true };
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact. Please try again.");
      return { success: false, error };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg text-muted-foreground">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-muted/20 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            My Contacts
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your contact list efficiently
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Contact List */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <ContactList
              contacts={contacts}
              onDeleteContact={handleDeleteContact}
            />
          </div>

          {/* Add Contact */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="sticky top-4">
              <AddContact onAddContact={handleAddContact} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
