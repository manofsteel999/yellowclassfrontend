import React, { useState, useEffect } from "react";
import axios from "axios";
import Contact from "./Contact";
import ContactForm from "./ContactForm";

function Contacts({handleLogout ,authToken }) {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("/api/contacts", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setContacts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchContacts();
  }, [authToken]);

  const handleAddContact = (newContact) => {
    setContacts([...contacts, newContact]);
    setShowForm(false);
  };

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setContacts((prevContacts) => prevContacts.filter((c) => c._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditContact = async (id, updatedContact) => {
    try {
      await axios.put(`/api/contacts/${id}`, updatedContact, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setContacts((prevContacts) =>
        prevContacts.map((c) => (c._id === id ? updatedContact : c))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">My Contacts</h1>
      <button
        className="btn btn-primary mb-4"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Add Contact"}
      </button>
      {showForm && <ContactForm onAddContact={handleAddContact} />}
      <div className="row">
        {contacts.map((contact) => (
          <div key={contact._id} className="col-md-4 mb-4">
            <Contact
              contact={contact}
              onDeleteContact={handleDeleteContact}
              onEditContact={handleEditContact}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contacts;
