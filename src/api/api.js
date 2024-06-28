import axios from "axios";

const baseUrl = "https://rickandmortyapi.com/api/character";

export const fetchCharacters = async (
  page,
  searchTerm,
  filterStatus,
  filterSpecies,
  filterGender
) => {
  let url = `${baseUrl}?page=${page + 1}`;

  if (searchTerm) {
    url += `&name=${searchTerm}`;
  }

  if (filterStatus && filterStatus !== "All") {
    url += `&status=${filterStatus}`;
  }

  if (filterSpecies && filterSpecies !== "All") {
    url += `&species=${filterSpecies}`;
  }

  if (filterGender && filterGender !== "All") {
    url += `&gender=${filterGender}`;
  }

  const response = await axios.get(url);
  return response.data;
};

export const fetchCharacter = async (id) => {
  const url = `${baseUrl}/${id}`;
  const response = await axios.get(url);
  return response.data;
};
