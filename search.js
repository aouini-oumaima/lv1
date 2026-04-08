(function () {
  var input = document.querySelector('.search-wrap input');
  var btn   = document.querySelector('.search-wrap button');
  if (!input) return;

  var onProductsPage = input.id === 'prod-search-input';

  function doSearch() {
    var q = input.value.trim();
    if (!q) return;
    if (onProductsPage) {
      // Already on products page — just fire the live filter
      input.dispatchEvent(new Event('input', { bubbles: true }));
    } else {
      // Other pages — redirect to products page with query
      window.location.href = 'produits-company.html?q=' + encodeURIComponent(q);
    }
  }

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); doSearch(); }
  });
  if (btn) btn.addEventListener('click', doSearch);

  // On produits-company.html: pre-fill from ?q= URL param
  if (onProductsPage) {
    var params = new URLSearchParams(window.location.search);
    var q = params.get('q');
    if (q) {
      input.value = q;
      // small delay so inline filter listeners are guaranteed to be ready
      setTimeout(function () {
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.focus();
      }, 50);
    }
  }
})();
