var xhr = new XMLHttpRequest();
var url = './health_article.json';
xhr.open('GET', url);
xhr.responseType = 'json';

xhr.onload = function () {
  var articlesDiv = document.getElementById('articles');
  var statusMessage = document.getElementById('status-message');
  var statusText = document.getElementById('status-text');

  if (xhr.status === 200) {
    var articles = xhr.response.articles;
    
    // Clear previous articles if any
    articlesDiv.innerHTML = '';

    articles.forEach(function (article) {
      // Create Main Card Container
      var articleDiv = document.createElement('div');
      articleDiv.className = 'bg-zinc-900/40 border border-white/5 rounded-3xl p-6 md:p-8 hover:border-white/10 hover:shadow-2xl hover:shadow-cyan-500/5 transition-all duration-300 flex flex-col gap-6';

      // Create Header Section
      var headerDiv = document.createElement('div');
      headerDiv.className = 'flex flex-col gap-2';

      var title = document.createElement('h2');
      title.className = 'font-heading text-2xl font-bold text-white tracking-tight';
      title.textContent = article.title;

      var description = document.createElement('p');
      description.className = 'text-zinc-400 text-sm md:text-base leading-relaxed';
      description.textContent = article.description;

      headerDiv.appendChild(title);
      headerDiv.appendChild(description);
      articleDiv.appendChild(headerDiv);

      // Create 2-Column Grid for Ways to Achieve and Benefits
      var gridDiv = document.createElement('div');
      gridDiv.className = 'grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5';

      // Column 1: Ways to Achieve
      var waysDiv = document.createElement('div');
      waysDiv.className = 'flex flex-col gap-3';
      
      var waysHeader = document.createElement('h3');
      waysHeader.className = 'font-heading text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5';
      waysHeader.innerHTML = '<span class="text-sm">⚡</span> Ways to Achieve';

      var waysList = document.createElement('ul');
      waysList.className = 'list-none pl-0 space-y-2';

      article.ways_to_achieve.forEach(function (way) {
        var listItem = document.createElement('li');
        listItem.className = 'flex items-start gap-2.5 text-zinc-300 text-sm leading-relaxed';
        
        var bullet = document.createElement('span');
        bullet.className = 'text-cyan-500 font-bold mt-0.5';
        bullet.textContent = '✦';

        var textSpan = document.createElement('span');
        textSpan.textContent = way;

        listItem.appendChild(bullet);
        listItem.appendChild(textSpan);
        waysList.appendChild(listItem);
      });

      waysDiv.appendChild(waysHeader);
      waysDiv.appendChild(waysList);
      gridDiv.appendChild(waysDiv);

      // Column 2: Benefits
      var benefitsDiv = document.createElement('div');
      benefitsDiv.className = 'flex flex-col gap-3';

      var benefitsHeader = document.createElement('h3');
      benefitsHeader.className = 'font-heading text-xs font-semibold uppercase tracking-wider text-teal-400 flex items-center gap-1.5';
      benefitsHeader.innerHTML = '<span class="text-sm">✓</span> Benefits';

      var benefitsList = document.createElement('ul');
      benefitsList.className = 'list-none pl-0 space-y-2';

      article.benefits.forEach(function (benefit) {
        var listItem = document.createElement('li');
        listItem.className = 'flex items-start gap-2.5 text-zinc-300 text-sm leading-relaxed';

        var bullet = document.createElement('span');
        bullet.className = 'text-teal-500 font-bold mt-0.5';
        bullet.textContent = '✓';

        var textSpan = document.createElement('span');
        textSpan.textContent = benefit;

        listItem.appendChild(bullet);
        listItem.appendChild(textSpan);
        benefitsList.appendChild(listItem);
      });

      benefitsDiv.appendChild(benefitsHeader);
      benefitsDiv.appendChild(benefitsList);
      gridDiv.appendChild(benefitsDiv);

      articleDiv.appendChild(gridDiv);
      articlesDiv.appendChild(articleDiv);
    });
  } else {
    // Show error state
    statusMessage.classList.remove('hidden');
    statusText.textContent = 'Failed to load health articles (Status Code: ' + xhr.status + ').';
  }
};

xhr.onerror = function () {
  var statusMessage = document.getElementById('status-message');
  var statusText = document.getElementById('status-text');
  statusMessage.classList.remove('hidden');
  statusText.textContent = 'An error occurred while fetching the health articles.';
};

xhr.send();
