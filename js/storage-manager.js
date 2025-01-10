const STORAGE_KEY = '8313-supiido-daiaru';

function saveDaiaruItems() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(daiaruItems));
}

function loadDaiaruItems() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      daiaruItems = JSON.parse(saved);
      daiaruItems.forEach(item => {
        const element = createDaiaruItem(item.title, item.url, item.iconUrl);
        supiidoDaiaruContainer.appendChild(element);
      });
    }
  } catch (error) {
    console.error('Loading error:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadDaiaruItems);