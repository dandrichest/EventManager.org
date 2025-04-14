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
  
  })  
  

// DOM References
const addEventButton = document.getElementById("addEventButton");
const eventDialog = document.getElementById("eventDialog");
const closeDialogButton = document.getElementById("closeDialogButton");
const eventForm = document.getElementById("eventForm");
const eventContainer = document.getElementById("event-container");

// Helper function to fetch events from the API
async function fetchApiEvents() {
  const apiKey = "cc9ea177da9bdd9065a69c49aca559eadaf77508d5044a51ecd34d4c9e84a56c"; 
  const apiUrl = `https://serpapi.com/search.json?engine=google_events&q=Events+in+Austin&hl=en&gl=us&api_key=${apiKey}`; 

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

    const apiEvents = await response.json();
    return apiEvents; // Return fetched events
  } catch (error) {
    console.error("Error fetching API events:", error);
    return []; // Return an empty array if fetching fails
  }
}


// Get user-created events from localStorage
function getUserCreatedEvents() {
  return JSON.parse(localStorage.getItem("userEvents")) || [];
}

// Save a new user-created event
function saveUserEvent(event) {
  const userEvents = getUserCreatedEvents();
  userEvents.push(event);
  localStorage.setItem("userEvents", JSON.stringify(userEvents));
}

// Display events in the UI
function displayEvents(events) {
  eventContainer.innerHTML = ""; // Clear previous content

  if (events.length === 0) {
    eventContainer.innerHTML = "<p>No events found.</p>";
    return;
  }

  events.forEach((event) => {
    const eventCard = `
      <div class="event-card">
        <h3>${event.name}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Description:</strong> ${event.description}</p>
        <a href="registration.html?eventId=${event.id}" class="register-button">Register for Event</a>
      </div>
    `;
    eventContainer.innerHTML += eventCard;
  });
}

// Handle new event submission
eventForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newEvent = {
    id: Date.now(), // Unique ID based on timestamp
    name: document.getElementById("eventName").value,
    date: document.getElementById("eventDate").value,
    location: document.getElementById("eventLocation").value,
    description: document.getElementById("eventDescription").value,
  };

  saveUserEvent(newEvent); // Save event to localStorage
  eventDialog.close(); // Close dialog
  displayApiAndUserEvents(); // Refresh displayed events
});

// Open the dialog
addEventButton.addEventListener("click", () => {
  eventDialog.showModal();
});

// Close the dialog
closeDialogButton.addEventListener("click", () => {
  eventDialog.close();
});

// Display combined events (API + local + user-created)
async function displayApiAndUserEvents() {
  const localEvents = [
    { id: 1, name: "Tech Conference 2025", date: "2025-04-15", location: "Lagos, Nigeria", description: "A conference focused on emerging technologies and trends." },
    { id: 2, name: "Art Exhibition", date: "2025-05-10", location: "Abuja, Nigeria", description: "An exhibition showcasing contemporary artworks by local artists." },
  ];

  const apiEvents = await fetchApiEvents(); // Fetch API events
  const userEvents = getUserCreatedEvents(); // Get user-created events
  const combinedEvents = [...localEvents, ...apiEvents, ...userEvents]; // Combine events

  displayEvents(combinedEvents); // Render combined events in the UI
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  displayApiAndUserEvents(); // Display all events when the page loads
});

// --- PAGE LOGIC --- //
// Function to get user-created events
function populateEventDropdown() {
  try {
    const userEvents = getUserCreatedEvents(); // Get user-created events
    const localEvents = [
      {
        id: 1,
        name: "Tech Conference 2025",
        date: "2025-04-15",
        location: "Lagos, Nigeria",
        description: "A conference focused on emerging technologies and trends.",
      },
      {
        id: 2,
        name: "Art Exhibition",
        date: "2025-05-10",
        location: "Abuja, Nigeria",
        description: "An exhibition showcasing contemporary artworks by local artists.",
      },
    ]; // Predefined local events

    const combinedEvents = [...localEvents, ...userEvents]; // Combine local events and user-created events
    console.log("Combined Events:", combinedEvents);

    const eventDropdown = document.getElementById("eventDropdown");
    if (!eventDropdown) {
      console.error("Dropdown element not found!");
      return;
    }

    // Clear existing options
    eventDropdown.innerHTML = "";

    // Populate dropdown with events
    combinedEvents.forEach((event) => {
      const option = document.createElement("option");
      option.value = event.id; // Event ID as value
      option.textContent = event.name; // Event name as display text
      eventDropdown.appendChild(option);
    });

    console.log("Dropdown populated successfully");
  } catch (error) {
    console.error("Error populating event dropdown:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");
  populateEventDropdown();
});

localStorage.setItem("userEvents", JSON.stringify([
  { id: 3, name: "User-Created Event", date: "2025-06-01", location: "Ibadan, Nigeria", description: "A user-generated event." }
]));


document.getElementById("registrationForm").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload

  const registrationData = {
    eventName: document.getElementById("eventDropdown").value, // Event ID from dropdown
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    preferences: document.getElementById("preferences").value,
  };

  // Retrieve previous registrations or create an empty array
  const registrations = JSON.parse(localStorage.getItem("registrations")) || [];
  registrations.push(registrationData); // Add new registration
  localStorage.setItem("registrations", JSON.stringify(registrations)); // Save updated registrations

  // Appreciate the user
  alert(`Thank you, ${registrationData.name}, for registering for the event!`);

  // Reset form fields
  document.getElementById("registrationForm").reset();
});