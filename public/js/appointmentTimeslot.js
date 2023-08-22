async function getExistingAppointments(selectedDate) {

    // Make GET request to API endpoint
    const response = await fetch(`/getTimeslots?date=${selectedDate}`);

    const appointments = await response.json();

    return appointments;

}


// Function to generate timeslot checkboxes for the selected date
async function generateTimeslots() {
    // Clear the previous timeslot checkboxes, if any
    const timeslotList = document.getElementById('timeslotList');
    timeslotList.innerHTML = '';

    // Get the selected date from the date picker
    const selectedDate = document.getElementById('appointmentDate');
    const selectedDateValue = selectedDate.value

    //Fetch existing appointments for the selected date
    const existingTimeslots = await getExistingAppointments(selectedDateValue);

    // Parse the selected date to a JavaScript Date object
    const dateObj = new Date(selectedDateValue);

    // Check if the date is valid
    if (!isNaN(dateObj)) {
        // Timeslots from 9:00 to 14:00 (in 30-minute intervals)
        const startTime = new Date(dateObj);
        startTime.setHours(9, 0, 0, 0);
        const endTime = new Date(dateObj);
        endTime.setHours(14, 0, 0, 0);

        // Create a container element to hold the checkboxes and labels
        const container = document.createElement('div');
        container.classList.add('timeslot-container');

        // Loop through each 30-minute interval
        while (startTime <= endTime) {
            const timeString = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

            // Remove the AM/PM from the time string
            const formattedTimeString = timeString.replace(/\s[APap][mM]$/, '');
            // Create a checkbox for each timeslot
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'timeslotList[]';
            checkbox.value = formattedTimeString;

            const label = document.createElement('label');

            // Check if the timeslot already exists in the existingTimeslots
            if (existingTimeslots.includes(formattedTimeString)) {
                checkbox.disabled = true;
                checkbox.checked = true; // Gray out the checkbox
                label.classList.add('disabled-label');
            }


            // Add a label for the checkbox displaying the timeslot

            label.textContent = formattedTimeString + ' ';

            // Append the checkbox and label to the timeslotList
            timeslotList.appendChild(checkbox);
            timeslotList.appendChild(label);

            // Increment the time by 30 minutes for the next interval
            startTime.setMinutes(startTime.getMinutes() + 30);
        }
        // Append the container to the timeslotList
        timeslotList.appendChild(container);
    }
}


// Event listener to detect changes in the date picker
document.getElementById('appointmentDate').addEventListener('change', generateTimeslots);
