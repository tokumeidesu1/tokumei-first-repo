// Global variables for services
const googleServices = [
  // Page 1
  { name: 'アカウント', url: 'https://myaccount.google.com/', icon: 'https://www.google.com/s2/favicons?domain=myaccount.google.com&sz=64' },
  { name: 'Gmail', url: 'https://mail.google.com/', icon: 'https://www.google.com/s2/favicons?domain=gmail.com&sz=64' },
  { name: 'カレンダー', url: 'https://calendar.google.com/', icon: 'https://www.google.com/s2/favicons?domain=calendar.google.com&sz=64' },
  { name: 'ドライブ', url: 'https://drive.google.com/', icon: 'https://www.google.com/s2/favicons?domain=drive.google.com&sz=64' },
  { name: 'フォト', url: 'https://photos.google.com/', icon: 'https://www.google.com/s2/favicons?domain=photos.google.com&sz=64' },
  { name: 'Meet', url: 'https://meet.google.com/', icon: 'https://www.google.com/s2/favicons?domain=meet.google.com&sz=64' },
  { name: 'チャット', url: 'https://chat.google.com/', icon: 'https://www.google.com/s2/favicons?domain=chat.google.com&sz=64' },
  { name: '検索', url: 'https://www.google.com/', icon: 'https://www.google.com/s2/favicons?domain=google.com&sz=64' },
  { name: 'YouTube', url: 'https://www.youtube.com/', icon: 'https://www.google.com/s2/favicons?domain=youtube.com&sz=64' },
  { name: 'Play', url: 'https://play.google.com/', icon: 'https://www.google.com/s2/favicons?domain=play.google.com&sz=64' },
  { name: 'ニュース', url: 'https://news.google.com/', icon: 'https://www.google.com/s2/favicons?domain=news.google.com&sz=64' },
  { name: '連絡先', url: 'https://contacts.google.com/', icon: 'https://www.google.com/s2/favicons?domain=contacts.google.com&sz=64' },
  { name: 'Googleマップ', url: 'https://maps.google.com/', icon: 'https://www.google.com/s2/favicons?domain=maps.google.com&sz=64' },
  { name: '翻訳', url: 'https://translate.google.com/', icon: 'https://www.google.com/s2/favicons?domain=translate.google.com&sz=64' },
  { name: 'マイアドセンター', url: 'https://myadcenter.google.com/', icon: 'https://www.google.com/s2/favicons?domain=myadcenter.google.com&sz=64' },
  { name: 'ショッピング', url: 'https://shopping.google.com/', icon: 'https://www.google.com/s2/favicons?domain=shopping.google.com&sz=64' },
  { name: 'ビジネスプロフィール', url: 'https://www.google.com/business/', icon: 'https://www.google.com/s2/favicons?domain=business.google.com&sz=64' },
  { name: 'Gemini', url: 'https://gemini.google.com/', icon: 'https://www.google.com/s2/favicons?domain=gemini.google.com&sz=64' },
  // Page 2
  { name: 'Finance', url: 'https://www.google.com/finance/', icon: 'https://www.google.com/s2/favicons?domain=google.com/finance&sz=64' },
  { name: 'ドキュメント', url: 'https://docs.google.com/document/', icon: 'https://www.google.com/s2/favicons?domain=docs.google.com&sz=64' },
  { name: 'スプレッドシート', url: 'https://docs.google.com/spreadsheets/', icon: 'https://www.google.com/s2/favicons?domain=docs.google.com&sz=64' },
  { name: 'スライド', url: 'https://docs.google.com/presentation/', icon: 'https://www.google.com/s2/favicons?domain=docs.google.com&sz=64' },
  { name: 'ブックス', url: 'https://books.google.com/', icon: 'https://www.google.com/s2/favicons?domain=books.google.com&sz=64' },
  { name: 'Blogger', url: 'https://www.blogger.com/', icon: 'https://www.google.com/s2/favicons?domain=blogger.com&sz=64' },
  { name: 'Keep', url: 'https://keep.google.com/', icon: 'https://www.google.com/s2/favicons?domain=keep.google.com&sz=64' },
  { name: 'クラスルーム', url: 'https://classroom.google.com/', icon: 'https://www.google.com/s2/favicons?domain=classroom.google.com&sz=64' },
  { name: 'アース', url: 'https://earth.google.com/', icon: 'https://www.google.com/s2/favicons?domain=earth.google.com&sz=64' },
  { name: '保存済み', url: 'https://www.google.com/interests/saved', icon: 'https://www.google.com/s2/favicons?domain=google.com&sz=64' },
  { name: '芸術文化', url: 'https://artsandculture.google.com/', icon: 'https://www.google.com/s2/favicons?domain=artsandculture.google.com&sz=64' },
  { name: 'Google広告', url: 'https://ads.google.com/', icon: 'https://www.google.com/s2/favicons?domain=ads.google.com&sz=64' },
  { name: 'GoogleOne', url: 'https://one.google.com/', icon: 'https://www.google.com/s2/favicons?domain=one.google.com&sz=64' },
  { name: '旅行', url: 'https://www.google.com/travel/', icon: 'https://www.google.com/s2/favicons?domain=google.com/travel&sz=64' },
  { name: 'フォーム', url: 'https://docs.google.com/forms/', icon: 'https://www.google.com/s2/favicons?domain=docs.google.com&sz=64' },
  { name: 'Googleストア', url: 'https://store.google.com/', icon: 'https://www.google.com/s2/favicons?domain=store.google.com&sz=64' },
  { name: 'Chromeウェブストア', url: 'https://chromewebstore.google.com/', icon: 'https://www.google.com/s2/favicons?domain=chromewebstore.google.com&sz=64' },
  { name: 'Merchants', url: 'https://merchants.google.com/', icon: 'https://www.google.com/s2/favicons?domain=merchants.google.com&sz=64' },
  { name: 'パスワード', url: 'https://passwords.google.com/', icon: 'https://www.google.com/s2/favicons?domain=passwords.google.com&sz=64' },
  { name: 'Analytics', url: 'https://analytics.google.com/', icon: 'https://www.google.com/s2/favicons?domain=analytics.google.com&sz=64' }
];

let currentPage = 0;
const ITEMS_PER_PAGE = 18;

// Initialize services after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('services-toggle-button');
  const servicesGrid = document.getElementById('services-grid');

  if (toggleButton && servicesGrid) {
    // Initialize the grid with the first page
    updateServicesGrid();

    toggleButton.addEventListener('click', (e) => {
      e.stopPropagation();
      servicesGrid.classList.toggle('active');
    });

    // Only close grid when clicking outside both the button and the grid
    document.addEventListener('click', (e) => {
      if (!servicesGrid.contains(e.target) && !toggleButton.contains(e.target)) {
        servicesGrid.classList.remove('active');
      }
    });
  }
});

function updateServicesGrid() {
  const servicesGrid = document.getElementById('services-grid');
  if (!servicesGrid) return;

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentServices = googleServices.slice(startIndex, endIndex);

  // Clear existing content
  servicesGrid.innerHTML = '';

  // Add service items
  currentServices.forEach(service => {
    const serviceItem = document.createElement('a');
    serviceItem.href = service.url;
    serviceItem.className = 'service-item';
    serviceItem.target = '_blank';
    serviceItem.innerHTML = `
      <img src="${service.icon}" alt="${service.name}" />
      <span>${service.name}</span>
    `;
    servicesGrid.appendChild(serviceItem);
  });

  // Add pagination
  const totalPages = Math.ceil(googleServices.length / ITEMS_PER_PAGE);
  const pagination = document.createElement('div');
  pagination.className = 'services-pagination';
  
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('div');
    dot.className = `page-dot${i === currentPage ? ' active' : ''}`;
    dot.addEventListener('click', (e) => {
      e.stopPropagation();  // Prevent event from bubbling up
      currentPage = i;
      updateServicesGrid();
    });
    pagination.appendChild(dot);
  }
  
  servicesGrid.appendChild(pagination);
}