  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser && loggedInUser.name) {
      document.getElementById('userNameDisplay').innerText = loggedInUser.name;
    } else {
      window.location.href = 'index.html';
    }

    document.addEventListener("DOMContentLoaded", function () {
      const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      const bookingSection = document.getElementById("bookingSection");

      if (bookings.length === 0) {
        bookingSection.innerHTML = `
          <div class="text-center mt-5">
            <div class="confirmation-card">
              <h2 class="text-warning">⚠️ No Bookings Found</h2>
              <p class="lead">Please make a booking first.</p>
              <a href="dashboard.html" class="btn btn-warning">🔙 Back to Dashboard</a>
            </div>
          </div>`;
        return;
      }

      bookings.forEach((booking, index) => {
        const card = document.createElement("div");
        card.className = "confirmation-card";

        card.innerHTML = `
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h5 class="text-warning"><i class="bi bi-clipboard-check-fill"></i> Booking ${index + 1}</h5>
    <span class="badge bg-secondary">${booking.date} at ${booking.time}</span>
  </div>
  <div class="row">
    <div class="col-md-6">
      <p><strong>👤 Name:</strong> ${booking.firstName} ${booking.lastName}</p>
      <p><strong>📧 Email:</strong> ${booking.email}</p>
      <p><strong>📞 Phone:</strong> ${booking.phone}</p>
      <p><strong>🚗 Vehicle:</strong> ${booking.vehicleName} (${booking.vehicleNumber})</p>
    </div>
    <div class="col-md-6">
      <p><strong>🧼 Service:</strong> <span class="badge bg-info text-dark">${booking.service}</span></p>
      <p><strong>💰 Price:</strong> ₹${booking.price}</p>
      <p><strong>💳 Payment Type:</strong> <span class="badge bg-success">${booking.paymentType}</span></p>
      <p><strong>🔒 Payment Detail:</strong> ${booking.paymentDetail || "N/A"}</p>
      <p><strong>📝 Message:</strong> ${booking.message || "None"}</p>
    </div>
  </div>
  <div class="text-end mt-3">
    <button class="btn btn-danger btn-sm" onclick="deleteBooking(${index})">🗑️ Delete Booking</button>
  </div>
`;


        bookingSection.appendChild(card);
      });
    });

    function deleteBooking(index) {
      if (confirm("Are you sure you want to delete this booking?")) {
        const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        bookings.splice(index, 1);
        localStorage.setItem("bookings", JSON.stringify(bookings));
        location.reload();
      }
    }

    function logout() {
      localStorage.removeItem('loggedInUser');
      window.location.href = 'index.html';
    }

    

  AOS.init({
    duration: 1200,  // how long animation lasts
    once: true       // animation plays only once
  });
