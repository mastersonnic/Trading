fetch('https://crypto-store.cc/?locale=en&cur_from=LTC&cur_to=BCH')
  .then(response => response.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const exchangeRate = doc.querySelector('.ng-tns-c3154908617-11.ng-star-inserted').textContent;
    console.log(exchangeRate);
  })
  .catch(error => console.error('Error:', error));
