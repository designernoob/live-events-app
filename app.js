document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const closeSidebarButton = document.getElementById('close-sidebar');
  
    closeSidebarButton.addEventListener('click', () => {
      sidebar.classList.add('hidden');
    });
  
    // Initialize the map (example using Leaflet.js)
    const map = L.map('map').setView([51.505, -0.09], 13);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    // Fetch events data (example URL, replace with actual API endpoint)
    fetch('https://api.example.com/events?location=nearby')
      .then(response => response.json())
      .then(data => {
        data.events.forEach(event => {
          const marker = L.marker([event.latitude, event.longitude]).addTo(map);
          marker.on('click', () => {
            document.getElementById('event-details').innerHTML = `
              <h2>${event.name}</h2>
              <p>${event.description}</p>
              <a href="${event.ticketLink}" target="_blank">Book Tickets</a>
            `;
            sidebar.classList.remove('hidden');
          });
        });
      })
      .catch(error => console.error('Error fetching events:', error));
  });
  