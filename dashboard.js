document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser && loggedInUser.name) {
    document.getElementById("userNameDisplay").innerText = loggedInUser.name;
  } else {
    window.location.href = "index.html";
  }

  const servicePrices = {
    "Basic Wash": 300,
    "Full Detailing": 1200,
    "Oil Change": 500,
    "Engine Check": 800,
  };

  function updatePrice() {
    const service = document.getElementById("service").value;
    document.getElementById("price").value = servicePrices[service] || "";
  }

  // Attach event listeners after DOM is loaded
  document.getElementById("service").addEventListener("change", updatePrice);

  document.getElementById("paymentType").addEventListener("change", function () {
    const cardDetails = document.getElementById("cardDetails");
    const upiDetails = document.getElementById("upiDetails");

    cardDetails.style.display = this.value === "Card" ? "block" : "none";
    upiDetails.style.display = this.value === "UPI" ? "block" : "none";
  });

  document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const paymentType = document.getElementById("paymentType").value;
    const cardInfo =
      paymentType === "Card"
        ? `Card ending in ${document.getElementById("cardNumber").value.slice(-4)}`
        : paymentType;

    const bookingData = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      vehicleName: document.getElementById("vehicleName").value,
      vehicleNumber: document.getElementById("vehicleNumber").value,
      service: document.getElementById("service").value,
      price: document.getElementById("price").value,
      date: document.getElementById("date").value,
      time: document.getElementById("time").value,
      paymentType: paymentType,
      paymentDetail: cardInfo,
      message: document.getElementById("message").value,
    };

    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push(bookingData);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    window.location.href = "confirmation.html";
  });

  function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  }

  // Expose logout globally (so inline onclick works)
  window.logout = logout;
});
