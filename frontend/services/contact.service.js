import axios from 'axios';

const url = 'http://localhost:8080/api/contact';

const createContact = async (name, landline, cellphone, id) => {
  try {
    const { data } = await axios.post(`${url}/createContact`, {
      name,
      landline,
      cellphone,
      directoryId: id,
    });

    return `Contact ${data.name} created succesfully`;
  } catch (error) {
    return error.response.data;
  }
};
const isRegistered = async (id, name) => {
  try {
    const { data } = await axios.get(`${url}/isRegistered/${id}/${name}`);
    return data.message;
  } catch (error) {
    return error.response.data.message;
  }
};

const searchContact = async (id, name) => {
  try {
    const { data } = await axios.get(`${url}/searchContact/${id}/${name}`);
    return data.landline;
  } catch (error) {
    return error.response.data.message;
  }
};

const deleteContact = async (id, name) => {
  try {
    const { data } = await axios.delete(`${url}/delete/${id}/${name}`);
    return data.message;
  } catch (error) {
    return error.response.data.message;
  }
};
export { isRegistered, searchContact, createContact, deleteContact };
