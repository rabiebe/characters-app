import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCharacters } from "../../api/api";
import StatusCharacterTemplate from "../StatusCharacterTemplate";

const CharactersList = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSpecies, setFilterSpecies] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleFilterStatusChange = (event) => {
    setFilterStatus(event.value);
  };

  const handleFilterSpeciesChange = (event) => {
    setFilterSpecies(event.value);
  };

  const handleFilterGenderChange = (event) => {
    setFilterGender(event.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCharacters(
        currentPage,
        searchTerm,
        filterStatus,
        filterSpecies,
        filterGender
      );
      setCharacters(data.results);
      setTotalPages(Math.ceil(data.info.count / itemsPerPage));
    };
    fetchData();
  }, [currentPage, searchTerm, filterStatus, filterSpecies, filterGender]);

  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-eye"
        title="Go to Details"
        onClick={() => {
          navigate(`/characters/${rowData.id}`);
        }}
      />
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <Image
        src={rowData.image}
        alt={rowData.name}
        width="100"
        preview
        imageStyle={{ objectFit: "cover", borderRadius: "10px" }}
      />
    );
  };

  const handlePageChange = (event) => {
    setCurrentPage(event.page);
  };

  return (
    <>
      <h1
        style={{ fontFamily: "fancy, cursive" }}
        className="text-3xl font-bold p-1"
      >
        <i className="pi pi-star mr-2 text-orange-500 text-xl"></i>
        <span>Characters</span>
        <i className="pi pi-star ml-2 text-orange-500 text-xl"></i>
      </h1>

      <div className="p-3">
        <InputText
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name"
          className="my-3"
        />

        <Dropdown
          value={filterSpecies}
          options={[
            { label: "All", value: "All" },
            { label: "Human", value: "Human" },
            { label: "Alien", value: "Alien" },
            { label: "Humanoid", value: "Humanoid" },
            { label: "Mythological", value: "Mythological" },
            { label: "Unknown", value: "Unknown" },
          ]}
          onChange={handleFilterSpeciesChange}
          placeholder="Filter by Species"
          className="my-3 mx-2"
        />
        <Dropdown
          value={filterGender}
          options={[
            { label: "All", value: "All" },
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
            { label: "Genderless", value: "Genderless" },
            { label: "Unknown", value: "Unknown" },
          ]}
          onChange={handleFilterGenderChange}
          placeholder="Filter by Gender"
          className="my-3 mx-2"
        />
        <Dropdown
          value={filterStatus}
          options={[
            { label: "All", value: "All" },
            { label: "Alive", value: "Alive" },
            { label: "Dead", value: "Dead" },
            { label: "Unknown", value: "Unknown" },
          ]}
          onChange={handleFilterStatusChange}
          placeholder="Filter by Status"
          className="my-3 mx-2"
        />
        <Link to="/favorites">
          <Button
            title="View Favorites"
            severity="danger"
            icon="pi pi-heart-fill"
            className="my-3 mx-2 "
          />
        </Link>
        <DataTable value={characters} tableStyle={{ minWidth: "50rem" }}>
          <Column
            field="Action"
            header="Action"
            body={actionBodyTemplate}
          ></Column>
          <Column
            field="image"
            header="Image"
            body={imageBodyTemplate}
          ></Column>
          <Column field="name" header="Name"></Column>

          <Column field="species" header="Species"></Column>
          <Column field="type" header="Type"></Column>
          <Column field="gender" header="Gender"></Column>
          <Column
            field="status"
            header="Status"
            body={(r) => <StatusCharacterTemplate rowData={r} />}
          ></Column>
        </DataTable>
        <Paginator
          first={currentPage * itemsPerPage}
          rows={itemsPerPage}
          totalRecords={totalPages * itemsPerPage}
          onPageChange={handlePageChange}
          rowsPerPageOptions={[10, 20, 50]}
          template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          className="mt-3"
        />
      </div>
    </>
  );
};
export default CharactersList;
