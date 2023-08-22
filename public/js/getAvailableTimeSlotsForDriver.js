async function getExistingAppointments(selectedDate) {

  // Make GET request to API endpoint
  const response = await fetch(`/getTimeslots?date=${selectedDate}`);
  const appointments = await response.json();
  return appointments;

}

async function getBookedTimeSlot(selectedDate) {
  const response = await fetch(`/getBookedTimeslots?date=${selectedDate}`);

  const bookedAppointments = await response.json();
  console.log('bookedAppointments:', bookedAppointments)
  return bookedAppointments;
}

async function generateTimeSlotsForDriver() {

  // Clear the previous timeslot checkboxes, if any
  const timeslotList = document.getElementById('availableTimeslotList');
  timeslotList.innerHTML = '';

  // Get the selected date from the date picker
  const selectedDate = document.getElementById('appointmentDate');
  const selectedDateValue = selectedDate.value

  //Fetch existing appointments for the selected date
  const existingTimeslots = await getExistingAppointments(selectedDateValue);

  //get booked timeslot from User collection
  const getBookedTimeSlots = await getBookedTimeSlot(selectedDateValue);

  if (getBookedTimeSlots) {
    console.log(getBookedTimeSlots)
  }

  // Create a container element to hold the checkboxes and labels
  const container = document.createElement('div');
  container.classList.add('timeslot-container');

  // Create heading
  const heading = document.createElement('p');
  heading.textContent = 'Appointment Time';
  timeslotList.appendChild(heading);
  heading.classList.add('heading-p');


  existingTimeslots.forEach(time => {


    // Create checkbox
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'appointmentTime'; // Give each radio button the same name
    radio.value = time;

    // Create label
    const label = document.createElement('label');
    label.textContent = time;

    // Disable if slot is in booked slots
    if (getBookedTimeSlots.includes(time)) {
      radio.disabled = true;
      label.classList.add('disabled-label');
    }

    // Append to container
    //const container = document.getElementById('timeslot-container');
    timeslotList.appendChild(radio);
    timeslotList.appendChild(label);
  });
  // Append the container to the timeslotList
  timeslotList.appendChild(container);
}

// Event listener to detect changes in the date picker
document.getElementById('appointmentDate').addEventListener('change', generateTimeSlotsForDriver);
