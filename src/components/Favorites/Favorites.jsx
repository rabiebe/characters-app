import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { Panel } from "primereact/panel";
import { ConfirmDialog } from "primereact/confirmdialog";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chip } from "primereact/chip";
import StatusCharacterTemplate from "../StatusCharacterTemplate";
function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [characterToDelete, setCharacterToDelete] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const getFavorites = () => {
      const storedFavorites = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      setFavorites(storedFavorites);
    };
    getFavorites();
  }, []);

  console.log({ favorites });

  const goBack = () => {
    navigate(-1);
  };

  const showConfirmationDialog = (favoriteId) => {
    setCharacterToDelete(favoriteId);
    setConfirmationVisible(true);
  };

  const hideConfirmationDialog = () => {
    setConfirmationVisible(false);
    setCharacterToDelete(null);
  };

  const removeFromFavorites = (favoriteId) => {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.id !== favoriteId
    );
    setFavorites(updatedFavorites);

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    localStorage.removeItem(`favorite-${favoriteId}`);
  };

  return (
    <div className="card p-5">
      <div className="flex justify-content-between align-items-center mb-5">
        <Button
          label="Back"
          severity="secondary"
          icon="pi pi-arrow-left"
          onClick={goBack}
          className="mr-2"
        />
      </div>
      {favorites.length === 0 ? (
        <div className="card">
          <p className="text-center text-6xl font-bold text-gray-500">
            No favorites yet!
          </p>
        </div>
      ) : (
        <>
          <Panel header="Favorites">
            <div className="card flex flex-wrap gap-4">
              {favorites.map((favorite) => (
                <div
                  className="card border-2 border-gray-200 rounded p-2 text-center"
                  style={{ backgroundColor: "#f5f5f5" }}
                  key={favorite.id}
                >
                  <Image
                    src={favorite.image}
                    alt={favorite.name}
                    height="200px"
                    imageStyle={{ objectFit: "cover", borderRadius: "10px" }}
                    preview
                  />
                  <p className="mt-2  font-bold text-gray-700">
                    {favorite.name}
                  </p>
                  <p className="text-gray-500">{favorite.species}</p>

                  <p className="text-gray-500">{favorite.gender}</p>
                  <p className="text-gray-500">
                    Location: {favorite.location?.name || "Unknown"}
                  </p>

                  <p>
                    <StatusCharacterTemplate rowData={favorite} />
                  </p>

                  <Button
                    label="Remove from Favorites"
                    icon="pi pi-heart"
                    severity="danger"
                    className="mb-5"
                    onClick={() => showConfirmationDialog(favorite.id)}
                  />
                </div>
              ))}
            </div>
          </Panel>
          <ConfirmDialog
            visible={confirmationVisible}
            header="Confirmation"
            message="Are you sure you want to remove this character from favorites?"
            icon="pi pi-exclamation-triangle"
            acceptLabel="Remove"
            acceptClassName="p-button-danger"
            rejectLabel="Cancel"
            rejectClassName="p-button-secondary"
            onHide={hideConfirmationDialog}
            accept={() => removeFromFavorites(characterToDelete)}
          />
        </>
      )}
    </div>
  );
}

export default Favorites;
