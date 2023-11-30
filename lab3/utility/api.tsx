import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  cell: string;
  email: string;
  favorite: boolean;
}

const mapContact = (contact: any): Contact => {
  const {
    name, picture, phone, cell, email,
  } = contact;
  return {
    id: uuidv4(),
    name: name.first + ' ' + name.last,
    avatar: picture.large,
    phone,
    cell,
    email,
    favorite: Math.random() >= 0.5, // randomly generate favorite contacts
  };
};

const fetchContacts = async (): Promise<Contact[]> => {
  const response = await fetch('https://randomuser.me/api/?results=100&seed=fullstackio');
  const contactData = await response.json();
  return contactData.results.map(mapContact);
};

const fetchUserContact = async (): Promise<Contact> => {
  const response = await fetch('https://randomuser.me/api/?seed=fullstackio');
  const userData = await response.json();
  return mapContact(userData.results[0]);
};

const fetchRandomContact = async (): Promise<Contact> => {
  const response = await fetch('https://randomuser.me/api/');
  const userData = await response.json();
  return mapContact(userData.results[0]);
};

export { fetchContacts, fetchUserContact, fetchRandomContact };

