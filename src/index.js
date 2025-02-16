document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  const houseSelect = document.getElementById("house-select");
  const charactersDiv = document.getElementById("characters");

  // Fetch Harry Potter characters
  fetch("https://hp-api.onrender.com/api/characters")
    .then((response) => response.json())
    .then((data) => {
      displayCharacters(data);
      houseSelect.addEventListener("change", () => {
        const selectedHouse = houseSelect.value;
        const filteredCharacters = filterCharactersByHouse(data, selectedHouse);
        displayCharacters(filteredCharacters);
      });
    })
    .catch((error) => {
      console.error("Error fetching characters:", error);
    });

  function filterCharactersByHouse(characters, house) {
    if (house === "all") {
      return characters;
    } else if (house === "Other") {
      return characters.filter(
        (character) =>
          !["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"].includes(
            character.house
          )
      );
    } else {
      return characters.filter((character) => character.house === house);
    }
  }

  function displayCharacters(characters) {
    charactersDiv.innerHTML = "";
    characters.forEach((character) => {
      const characterDiv = document.createElement("div");
      characterDiv.classList.add("character");

      const characterImg = document.createElement("img");
      characterImg.src =
        character.image || getDefaultHouseImage(character.house);
      characterImg.alt = `${character.name}`;

      const characterName = document.createElement("p");
      characterName.textContent = `${character.name} (${character.house})`;

      const characterDetails = document.createElement("div");
      characterDetails.classList.add("character-details");

      const characterActor = document.createElement("p");
      characterActor.textContent = `Actor: ${character.actor}`;

      const characterDOB = document.createElement("p");
      characterDOB.textContent = `Date of Birth: ${character.dateOfBirth}`;

      const characterAncestry = document.createElement("p");
      characterAncestry.textContent = `Ancestry: ${character.ancestry}`;

      characterDetails.appendChild(characterActor);
      characterDetails.appendChild(characterDOB);
      characterDetails.appendChild(characterAncestry);

      characterDiv.appendChild(characterImg);
      characterDiv.appendChild(characterName);
      characterDiv.appendChild(characterDetails);
      charactersDiv.appendChild(characterDiv);
    });
  }

  function getDefaultHouseImage(house) {
    switch (house) {
      case "Gryffindor":
        return "src/images/gryffindor.png";
      case "Hufflepuff":
        return "src/images/hufflepuff.png";
      case "Ravenclaw":
        return "src/images/ravenclaw.png";
      case "Slytherin":
        return "src/images/slytherin.png";
      default:
        return "src/images/other.png";
    }
  }
});
