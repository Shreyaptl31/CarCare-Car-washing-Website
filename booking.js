 const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (loggedInUser && loggedInUser.name) {
        document.getElementById("userNameDisplay").innerText = loggedInUser.name;
      } else {
        window.location.href = "index.html";
      }

      let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
      const bookingList = document.getElementById("bookingList");

      function renderBookings() {
        bookingList.innerHTML = "";

        if (bookings.length === 0) {
          bookingList.innerHTML = `<p class="text-center text-muted">No bookings found.</p>`;
          return;
        }

        bookings.forEach((booking, index) => {
          const status = booking.status || "Pending";
          const badgeClass =
            status === "Complete" ? "badge-complete" : "badge-pending";

          const card = document.createElement("div");
          card.className = "col-md-6 col-lg-4 mb-4";

          card.innerHTML = `
          <div class="booking-card">
            <h5 class="mb-2">🚗 ${booking.vehicleName} (${booking.vehicleNumber})</h5>
            <p class="mb-1"><strong>Name:</strong> ${booking.firstName} ${booking.lastName}</p>
            <p class="mb-1"><strong>Service:</strong> ${booking.service}</p>
            <p class="mb-1"><strong>Status:</strong> <span class="badge ${badgeClass}" id="status-${index}">${status}</span></p>
          </div>
        `;

          bookingList.appendChild(card);
        });
      }

      function markComplete(index) {
        bookings[index].status = "Complete";
        localStorage.setItem("bookings", JSON.stringify(bookings));
        renderBookings();
      }

      function markPending(index) {
        bookings[index].status = "Pending";
        localStorage.setItem("bookings", JSON.stringify(bookings));
        renderBookings();
      }

      renderBookings();

      function logout() {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
      }