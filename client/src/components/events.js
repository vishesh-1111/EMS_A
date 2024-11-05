async function fetchEvents() {

    try {
        const response = await fetch('http://localhost:5000/events');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const events = await response.json();
        
        console.log(events);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// Call the function to fetch events
fetchEvents();
