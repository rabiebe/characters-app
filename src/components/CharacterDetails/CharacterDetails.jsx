import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Divider } from "primereact/divider";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { fetchCharacter } from "../../api/api";

function CharacterDetails() {
  const [favorites, setFavorites] = useState([]);
  const [character, setCharacter] = useState(null);
  const params = useParams();
  const favoriteByLocalStorage = localStorage.getItem(`favorite-${params.id}`);
  const [isFavorite, setIsFavorite] = useState(
    favoriteByLocalStorage === "true"
  );
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(character);
      setIsFavorite(false);
      localStorage.removeItem(`favorite-${character.id}`);
    } else {
      addFavorite(character);
      setIsFavorite(true);
      localStorage.setItem(`favorite-${character.id}`, "true");
    }
  };

  const addFavorite = (character) => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = [...storedFavorites, character];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (character) => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = storedFavorites.filter(
      (fav) => fav.id !== character.id
    );
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const storedFavorite = localStorage.getItem(`favorite-${params.id}`);
    setIsFavorite(storedFavorite === "true");
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      // Check if ID exists
      const fetchCharacterData = async () => {
        const character = params.id ? await fetchCharacter(params.id) : null;

        setCharacter(character);
      };
      fetchCharacterData();
    }
  }, [params.id]);

  if (!character)
    return (
      <div className="flex justify-content-center align-items-center h-screen">
        <i className="pi pi-spin pi-spinner"></i>
      </div>
    );

  return (
    <div className="character-details">
      <div className="card p-5">
        <div className="flex justify-content-between align-items-center mb-5">
          <Button
            label="Back"
            severity="secondary"
            icon="pi pi-arrow-left"
            onClick={goBack}
            className="mr-2"
          />
          <span className="text-3xl font-bold">{character.name}</span>
        </div>

        <Divider />

        <div className="flex flex-justify-between flex-align-center">
          <div className="mr-5">
            <Image
              src={character.image}
              alt={character.name}
              width="200px"
              height="200px"
              imageStyle={{ objectFit: "cover", borderRadius: "10px" }}
              preview
            />
          </div>
          <div className="info-section">
            <p>Status: {character.status}</p>
            <p>Species: {character.species}</p>
            <p>Gender: {character.gender}</p>
            <p>Origin: {character.origin?.name || "Unknown"}</p>
            <p>Location: {character.location?.name || "Unknown"}</p>
            <p>Created: {character.created}</p>
            <Button
              label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              severity={isFavorite ? "danger" : "info"}
              icon={isFavorite ? "pi pi-heart-fill" : "pi pi-heart"}
              onClick={toggleFavorite}
              className="mb-5"
            />
          </div>
        </div>
        <Divider />
        <p>Episodes: </p>
        <div className="p-d-flex p-flex-wrap">
          {character.episode.map((episodeURL) => (
            <Chip
              key={episodeURL}
              label={episodeURL.split("/").pop()}
              href={episodeURL}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 mb-2"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CharacterDetails;
