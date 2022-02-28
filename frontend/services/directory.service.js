import axios from 'axios';

const createDirectory = async () => {
  const directory = await axios.post(
    'http://localhost:8080/api/directory/createDirectory',
    {}
  );
  return directory.data.savedDirectory._id;
};

const listContacts = async (id) => {
  try {
    const contacts = await axios.get(
      `http://localhost:8080/api/directory/${id}`
    );

    return contacts.data.contacts;
  } catch (error) {
    return error.response.data;
  }
};

const freeSpaces = async (id) => {
  try {
    const { data } = await axios.get(
      `http://localhost:8080/api/directory/freeSpaces/${id}`
    );
    return data.freeSpacesLeft;
  } catch (error) {
    return error.response.data;
  }
};
export { createDirectory, listContacts, freeSpaces };
