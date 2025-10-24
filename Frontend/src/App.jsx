import React, { useEffect, useState } from "react";
import axios from "axios";
import AddContact from "./components/AddContacts";
import ContactList from "./components/ContactList";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      const res = await axios.get("http://localhost:4002/api/users/all");
      console.log("Contacts from backend:", res.data);
      setContacts(sortContacts(res.data));
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = async (newContact) => {
    try {
      const res = await axios.post(
        "http://localhost:4002/api/users/add",
        newContact
      );
      const addedContact = res.data.user;

      const updatedContacts = sortContacts([...contacts, addedContact]);
      setContacts(updatedContacts);

      return { success: true };
    } catch (error) {
      console.error("Error adding contact:", error);
      return { success: false, error };
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      const res = await axios.delete(
        `http://localhost:4002/api/users/delete/${contactId}`
      );

      if (res.data.success) {
        const updatedContacts = contacts.filter(
          (contact) => contact._id !== contactId
        );
        setContacts(updatedContacts);
        return { success: true };
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      return { success: false, error };
    }
  };

  if (loading) return <p>Loading contacts...</p>;

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start justify-center p-6">
      

      <div className="w-full md:w-2/3 ">
        <ContactList
          contacts={contacts}
          onDeleteContact={handleDeleteContact}
        />
      </div>
      <div className="w-full md:w-1/3 space-y-4 ">
        <AddContact onAddContact={handleAddContact} />
      </div>
    </div>
  );
}

export default Contacts;
