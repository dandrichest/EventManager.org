document.addEventListener("DOMContentLoaded", () => {
    // Footer Dynamic Updates
    const updateFooter = () => {
      const currentYear = new Date().getFullYear();
      const lastModifiedDate = document.lastModified;
  
      const currentYearElement = document.getElementById("current-year");
      const lastModifiedElement = document.getElementById("lastModified");
  
      if (currentYearElement) {
        currentYearElement.innerHTML = `&copy; ${currentYear} ✿ Abuja Chamber of Commerce`;
      }
  
      if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Updated: ${lastModifiedDate}`;
      }
    };
  
    updateFooter();
  
    // Hamburger menu toggle
const hambutton = document.querySelector("#menu");
const navigation = document.querySelector("#animateme");

hambutton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  hambutton.classList.toggle("open");
});

});


  // Events Array 
const events = [
  {
    id: 1,
    name: "Tech Conference 2025",
    date: "2025-04-15",
    location: "Lagos, Nigeria",
    description: "A conference focused on emerging technologies and trends.",
    image: "images/lagos_island.webp",
    category: "Technology"
  },
  {
    id: 2,
    name: "Art Exhibition",
    date: "2025-05-10",
    location: "Abuja, Nigeria",
    description: "An exhibition showcasing contemporary artworks by local artists.",
    image: "images/abuja_city_gate.webp",
    category: "Art"
  },
  {
    id: 3,
    name: "Startup Pitch Night",
    date: "2025-06-20",
    location: "Port Harcourt, Nigeria",
    description: "An event for startups to pitch their ideas to investors.",
    image: "images/port_harcourt_city.webp",
    category: "Technology"
  },
  {
    id: 4,
    name: "Music Festival",
    date: "2025-07-05",
    location: "Ibadan, Nigeria",
    description: "A festival celebrating music from diverse genres and cultures.",
    image: "images/ibadan_city.webp",
    category: "Entertainment"
  },
  {
    id: 5,
    name: "Business Summit",
    date: "2025-08-12",
    location: "Kano, Nigeria",
    description: "A summit for business leaders to discuss market trends and strategies.",
    image: "images/kano_city.webp",
    category: "Business"
  },
  {
    id: 6,
    name: "Film Screening",
    date: "2025-09-18",
    location: "Enugu, Nigeria",
    description: "A screening of award-winning films by Nigerian filmmakers.",
    image: "images/enugu_city.webp",
    category: "Entertainment"
  },
  {
    id: 7,
    name: "Coding Bootcamp",
    date: "2025-10-25",
    location: "Jos, Nigeria",
    description: "A bootcamp for aspiring developers to learn coding skills.",
    image: "images/jos_city.webp",
    category: "Technology"
  },
  {
    id: 8,
    name: "Cultural Heritage Fair",
    date: "2025-11-15",
    location: "Benin City, Nigeria",
    description: "A fair showcasing Nigeria's rich cultural heritage.",
    image: "images/benin_city.webp",
    category: "Art"
  }
];

// Dynamically Render Cards
const container = document.querySelector(".card-container");

function displayEvents(eventsToDisplay) {
  container.innerHTML = ""; // Clear existing cards

  if (eventsToDisplay.length === 0) {
    container.innerHTML = "<p>No events found.</p>";
    return;
  }

  eventsToDisplay.forEach((event) => {
    const cardElement = `
      <div class="card">
        <h2 class="card-title">${event.name}</h2>
       <!-- Add lazy loading to the image -->
        <img src="${event.image}" alt="${event.name}" class="card-image" loading="lazy">
        <p class="card-date"><strong>Date:</strong> ${event.date}</p>
        <address class="card-address"><strong>Location:</strong> ${event.location}</address>
        <p class="card-description"><strong>Description:</strong> ${event.description}</p>
        <p class="card-category"><strong>Category:</strong> ${event.category}</p>
        <button class="view-details" onclick="window.location.href='registration.html?eventId=${event.id}';">Register for Event</button>

      </div>
    `;
    container.innerHTML += cardElement;
  });
}

// Sidebar Visit Message
const visitMessageElement = document.getElementById("visit-message");

function calculateDaysBetweenDates(lastVisitDate, currentDate) {
  const msPerDay = 24 * 60 * 60 * 1000; // Milliseconds in a day
  const timeDifference = currentDate - lastVisitDate;
  return Math.floor(timeDifference / msPerDay);
}

function displayVisitMessage() {
  const lastVisit = localStorage.getItem("lastVisitDate");
  const currentDate = new Date();

  if (!lastVisit) {
    visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const lastVisitDate = new Date(lastVisit);
    const daysBetweenVisits = calculateDaysBetweenDates(lastVisitDate, currentDate);

    if (daysBetweenVisits === 0) {
      visitMessageElement.textContent = "Back so soon! Awesome!";
    } else if (daysBetweenVisits === 1) {
      visitMessageElement.textContent = "You last visited 1 day ago.";
    } else {
      visitMessageElement.textContent = `You last visited ${daysBetweenVisits} days ago.`;
    }
  }

  localStorage.setItem("lastVisitDate", currentDate.toISOString());
}

// Filter Events
function filterEvents() {
  const category = document.getElementById("categoryFilter").value;
  const search = document.getElementById("searchEvents").value.toLowerCase();

  let filteredEvents = events;

  if (category !== "all") {
    filteredEvents = filteredEvents.filter((event) => event.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    filteredEvents = filteredEvents.filter((event) =>
      event.name.toLowerCase().includes(search)
    );
  }

  displayEvents(filteredEvents);
}

// Event Details Navigation
function viewDetails(eventId) {
  localStorage.setItem("selectedEvent", eventId);
  window.location.href = "events.html"; // Redirect to event details page
}

// Initialize Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  displayEvents(events); // Render all events on load
  displayVisitMessage(); // Show the visit message
  document.getElementById("categoryFilter").addEventListener("change", filterEvents);
  document.getElementById("searchEvents").addEventListener("input", filterEvents);
});



