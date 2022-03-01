import axios from 'axios';

const url = 'http://localhost:8080/api/directory';
const createDirectory = async () => {
  const directory = await axios.post(`${url}/createDirectory`, {});
  return directory.data.savedDirectory._id;
};

const listContacts = async (id) => {
  try {
    const { data } = await axios.get(`${url}/${id}`);

    const newContacts = data.contacts.map(
      ({ _id, directory, registerDate, __v, ...rest }) => rest
    );
    return newContacts;
  } catch (error) {
    return error.response.data;
  }
};

const freeSpaces = async (id) => {
  try {
    const { data } = await axios.get(`${url}/freeSpaces/${id}`);
    return data.freeSpacesLeft;
  } catch (error) {
    return error.response.data;
  }
};
export { createDirectory, listContacts, freeSpaces };
