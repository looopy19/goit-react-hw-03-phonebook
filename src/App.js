import React, { Component } from 'react';
import contactsData from './components/data/ContactsList.json';
import Form from './components/Form';
import Section from './components/Section';
import Contacts from './components/Contacts';
import Filter from './components/Filter';
import { v4 as uuidv4 } from 'uuid';

class App extends Component {
  state = {
    contacts: contactsData,
    filter: '',
  };

   componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  formSubmitHandler = data => {
    const { contacts } = this.state;
    const isContactValid = this.validateContact(data, contacts);

    if (isContactValid) {
      data.id = uuidv4();
      this.setState(({ contacts }) => ({
        contacts: [data, ...contacts],
      }));
    }
  };

  validateContact = (data, contacts) => {
    if (contacts.some(({ name }) => name === data.name)) {
      alert(`${data.name} is already in contacts.`);
      return false;
    } else return true;
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleSearch = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  getFiltredContacts() {
    const { contacts, filter } = this.state;
    const lowerCaseFilter = filter.toLowerCase();
    return contacts.filter(person =>
      person.name.toLowerCase().includes(lowerCaseFilter),
    );
  }

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFiltredContacts();

    return (
      <>
        <Section title="Phonebook">
          <Form onSubmit={this.formSubmitHandler} />
        </Section>

        <Section title="Contacts">
          <Filter value={filter} onChange={this.handleSearch} />
          <Contacts
            contacts={filteredContacts}
            onDeleteBtnClick={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}

export default App;