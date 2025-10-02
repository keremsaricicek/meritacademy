(function(){
  const gridEl = document.getElementById('libraryGrid');
  const libraryView = document.getElementById('libraryView');
  const viewerView = document.getElementById('viewerView');
  const frame = document.getElementById('viewerFrame');
  const backBtn = document.getElementById('backBtn');
  const helpBtn = document.getElementById('helpBtn');
  const debugEl = document.getElementById('debug');
  const BOOKS = (window.BOOKS || []);

  function renderGrid(books){
    gridEl.innerHTML = '';
    if (!books || !books.length){
      gridEl.innerHTML = '<p style="opacity:.8">Kitap yok. books.js veya fallback boş.</p>';
      return;
    }
    for (const b of books){
      const card = document.createElement('article'); card.className='card';
      const img = document.createElement('img'); img.className='cover'; img.alt=b.title||'Kapak'; img.loading='lazy'; img.src=b.cover||'';
      const meta = document.createElement('div'); meta.className='meta';
      const title = document.createElement('div'); title.className='title'; title.textContent=b.title||'—';
      const sub = document.createElement('div'); sub.className='sub'; sub.textContent=[b.author,b.year].filter(Boolean).join(' • ');
      const btn = document.createElement('button'); btn.textContent='Aç'; btn.onclick=()=>openBook(b);
      meta.appendChild(title); meta.appendChild(sub);
      card.appendChild(img); card.appendChild(meta); card.appendChild(btn);
      gridEl.appendChild(card);
    }
  }

  function showLibrary(){ viewerView.hidden=true; frame.removeAttribute('src'); libraryView.hidden=false; backBtn.hidden=true; }
  function openBook(book){ libraryView.hidden=true; viewerView.hidden=false; backBtn.hidden=false; frame.src=book.path; }

  function showHelp(){
    alert([
      'Yeni kitap ekleme:',
      '1) books/<slug>/ içine kitabın klasörünü kopyala (index.html şart).',
      '2) Kapak: cover.jpg veya data/1.jpg yolunu cover alanına yaz.',
      '3) books/books.js içine kayıt ekle veya index.html fallbackte BOOKS dizisine ekle.',
      '',
      'Mevcut kitap: ' + (BOOKS[0] ? BOOKS[0].path : '-')
    ].join('\n'));
  }

  function init(){
    renderGrid(BOOKS);
    if (debugEl){
      debugEl.textContent = 'BOOKS: ' + BOOKS.length + ' | İlk path: ' + (BOOKS[0]?BOOKS[0].path:'-');
    }
    backBtn && backBtn.addEventListener('click', showLibrary);
    helpBtn && helpBtn.addEventListener('click', showHelp);
  }
  init();
})();