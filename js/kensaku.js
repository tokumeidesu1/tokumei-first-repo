const kensakuEngines = {
  'google': 'https://www.google.co.jp/search?q=',
  'google_images': 'https://www.google.co.jp/imghp?q=',
  'bing': 'https://www.bing.com/search?q=',
  'bing_images': 'https://www.bing.com/images/search?q=',
  'yahoo': 'https://search.yahoo.co.jp/search?p=',
  'duckduckgo': 'https://duckduckgo.com/?q=',
  'brave': 'https://search.brave.com/search?q=',
  'startpage': 'https://www.startpage.com/search?q=',
  'ecosia': 'https://www.ecosia.org/search?q=',
  'kagi': 'https://kagi.com/search?q=',
  'you': 'https://you.com/search?q=',
  'perplexity': 'https://www.perplexity.ai/search/new?q=',
  'excite': 'https://websearch.excite.co.jp/?q=',
  'noiseless': 'http://pasokatu.com/nsearch#gsc.tab=0&gsc.q=',
  'youtube': 'https://www.youtube.com/results?search_query=',
  'youtube_music': 'https://music.youtube.com/search?q=',
  'spotify': 'https://open.spotify.com/search/',
  'apple_music': 'https://music.apple.com/jp/search?term=',
  'niconico': 'https://www.nicovideo.jp/search/',
  'abema': 'https://abema.tv/search?q=',
  'tver': 'https://tver.jp/search/',
  'amazon': 'https://www.amazon.co.jp/s?k=',
  'rakuten': 'https://search.rakuten.co.jp/search/mall/',
  'twitter': 'https://twitter.com/search?q=',
  'tiktok': 'https://www.tiktok.com/search?q=',
  'reddit': 'https://www.reddit.com/search/?q=',
  'facebook': 'https://www.facebook.com/search/top?q=',
  'quora': 'https://jp.quora.com/search?q=',
  'chatgpt_search': 'https://chatgpt.com/search?q=',
  'chatgpt': 'https://chatgpt.com/?q=',
  'copilot': 'https://copilot.microsoft.com/?q=',
  'claude': 'https://claude.ai/new?q=',
  'genspark': 'https://www.genspark.ai/search?query='
};

// 検索エンジンごとの色テーマ
const engineThemes = {
  'google': '#4285f4',
  'google_images': '#4285f4',
  'bing': '#008373',
  'bing_images': '#008373',
  'yahoo': '#ff0033',
  'duckduckgo': '#de5833',
  'brave': '#fb542b',
  'startpage': '#6573ff',
  'ecosia': '#2fb344',
  'kagi': '#ff6b6b',
  'you': '#8e44ad',
  'perplexity': '#6F4BB2',
  'excite': '#0066cc',
  'noiseless': '#4a4a4a',
  'youtube': '#FF0000',
  'youtube_music': '#FF0000',
  'spotify': '#1DB954',
  'apple_music': '#fc3c44',
  'niconico': '#252525',
  'abema': '#2b2b2b',
  'tver': '#00a0e9',
  'amazon': '#FF9900',
  'rakuten': '#bf0000',
  'twitter': '#1DA1F2',
  'tiktok': '#000000',
  'reddit': '#FF4500',
  'facebook': '#1877f2',
  'quora': '#b92b27',
  'chatgpt_search': '#19C37D',
  'chatgpt': '#19C37D',
  'copilot': '#0078d4',
  'claude': '#6B4BF7',
  'genspark': '#2E7D32'
};

const kensakuInput = document.getElementById('kensaku-input');
const kensakuButton = document.getElementById('kensaku-button');
const kensakuEngineSelect = document.getElementById('kensaku-engine');

function updateSearchBarStyle(engine) {
  const searchBar = document.querySelector('.kensaku-bar');
  if (searchBar && engineThemes[engine]) {
    searchBar.style.borderColor = engineThemes[engine];
    searchBar.style.boxShadow = `0 0 10px ${engineThemes[engine]}40`;
  }
}

function kensakuSuru() {
  const query = kensakuInput.value.trim();
  if (!query) return;
  
  const selectedEngine = kensakuEngineSelect.value;
  const searchUrl = kensakuEngines[selectedEngine] + encodeURIComponent(query);
  window.location.href = searchUrl;
}

kensakuButton.addEventListener('click', kensakuSuru);
kensakuInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') kensakuSuru();
});

kensakuEngineSelect.addEventListener('change', (e) => {
  updateSearchBarStyle(e.target.value);
});

document.addEventListener('DOMContentLoaded', () => {
  updateSearchBarStyle(kensakuEngineSelect.value);
});