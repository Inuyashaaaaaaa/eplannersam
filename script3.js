document.addEventListener('DOMContentLoaded', function () {
    const eventForm = document.getElementById('event-form');
    const eventList = document.querySelector('.event-list');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
  
    let events = JSON.parse(localStorage.getItem('events')) || [];
  
    function saveEventsToStorage() {
      localStorage.setItem('events', JSON.stringify(events));
      
    }

    

    eventForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const location = document.getElementById('location').value;
      const notes = document.getElementById('notes').value;
  
      const newEvent = {
        name,
        date,
        time,
        location,
        notes,
      };
  
      events.push(newEvent);
  
      displayEvents();
      saveEventsToStorage();
      eventForm.reset();
    });
  
    function displayEvents(filteredEvents = events) {
        eventList.innerHTML = '';
        
        
    
        filteredEvents.forEach((event, index) => {
          const row = document.createElement('tr');
    
          row.innerHTML = `
            <td>${event.name}</td>
            <td>${event.date}</td>
            <td>${event.time}</td>
            <td>${event.location}</td>
            <td>${event.notes}</td>
            <td>
              <button onclick="editEvent(${index})">Edit</button>
              <button onclick="deleteEvent(${index})">Delete</button>
            </td>
            
          `;
    
          eventList.appendChild(row);
        });
      }
    
      // Function to share event via email
    
  
    function deleteEvent(index) {
      events.splice(index, 1);
      displayEvents();
      saveEventsToStorage();
    }

    function viewOnMap(index) {
        const event = events[index];
  
        // Create a Leaflet map centered on the event location
        const map = L.map('map').setView([event.location], 13);
  
        // Add a marker for the event location
        L.marker([event.location]).addTo(map)
          .bindPopup(`<b>${event.name}</b><br>${event.location}`)
          .openPopup();
      }
  


    function editEvent(index) {
      const event = events[index];
  
      document.getElementById('name').value = event.name;
      document.getElementById('date').value = event.date;
      document.getElementById('time').value = event.time;
      document.getElementById('location').value = event.location;
      document.getElementById('notes').value = event.notes;
  
      events.splice(index, 1);
  
      displayEvents();
      saveEventsToStorage();
    }
  
    eventList.addEventListener('click', function (event) {
      if (event.target.tagName === 'BUTTON') {
        const index = event.target.parentNode.parentNode.rowIndex - 1;
  
        if (event.target.textContent === 'Edit') {
          editEvent(index);
        } else if (event.target.textContent === 'Delete') {
          deleteEvent(index);
        }
      }
    });
  
    searchButton.addEventListener('click', function () {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredEvents = events.filter(event =>
        event.name.toLowerCase().includes(searchTerm)
      );
  
      displayEvents(filteredEvents);
    });

    
    displayEvents();
  });
  