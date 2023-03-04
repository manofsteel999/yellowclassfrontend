import React from "react";

function Contact(props) {
  const { contact, onDeleteClick, onEditClick } = props;

  return (
    <div className="contact">
      <h3>{contact.name}</h3>
      <p>{contact.phone}</p>
      <p>{contact.email}</p>
      <button onClick={() => onEditClick(contact)}>Edit</button>
      <button onClick={() => onDeleteClick(contact)}>Delete</button>
    </div>
  );
}

export default Contact;
