const fetchCharacter = async (id) => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      if (!response.ok) throw new Error('Error fetching character');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  let currentId = 1;
  
  const updateCarousel = async () => {
    const characterDisplay = document.getElementById('character-display');
    characterDisplay.innerHTML = '<p>Loading...</p>';
  
    const character = await fetchCharacter(currentId);
    if (character) {
      characterDisplay.innerHTML = `
        <h3>${character.name}</h3>
        <img src="${character.image}" alt="${character.name}">
      `;
    } else {
      characterDisplay.innerHTML = '<p>Error</p>';
    }
  };
  
  document.getElementById('prev-btn').addEventListener('click', () => {
    currentId = Math.max(1, currentId - 1);
    updateCarousel();
  });
  
  document.getElementById('next-btn').addEventListener('click', () => {
    currentId += 1;
    updateCarousel();
  });
  
  const fetchGallery = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character/');
      if (!response.ok) throw new Error('Error');
      const data = await response.json();
  
      const galleryContainer = document.getElementById('gallery-container');
      galleryContainer.innerHTML = data.results.map(character => `
        <div class="character-card">
          <img src="${character.image}" alt="${character.name}">
          <h4>${character.name}</h4>
        </div>
      `).join('');
    } catch (error) {
      console.error(error);
      document.getElementById('gallery-container').innerHTML = '<p>Error</p>';
    }
  };
  
  updateCarousel();
  fetchGallery();
  