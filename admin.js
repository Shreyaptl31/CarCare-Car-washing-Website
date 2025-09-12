  // admin31@gmail.com (admin123)
    if (sessionStorage.getItem("isAdmin") !== "true") {
      window.location.href = "index.html";
    }

    const bookings = (JSON.parse(localStorage.getItem("bookings")) || []).map(b => {
      if (!b.id) b.id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
      if (!b.status) b.status = "Pending";
      return b;
    });
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Dashboard Summary
    document.getElementById("totalBookings").textContent = bookings.length;
    const uniqueEmails = new Set(bookings.map(b => b.email || b.name));
    document.getElementById("totalUsers").textContent = uniqueEmails.size;

    // Populate Tables
    const userTable = document.getElementById("userTable");
    const serviceTable = document.getElementById("serviceTable");
    const paymentTable = document.getElementById("paymentTable");

    bookings.forEach(b => {
      userTable.innerHTML += `
        <tr>
         <td>${b.name || b.fullName || b.firstName || '-'}</td>
          <td>${b.contact || b.phone || '-'}</td>
          <td>${b.email || '-'}</td>
          <td>${b.vehicleName || '-'}</td>
          <td>${b.vehicleNumber || '-'}</td>
          <td>${b.service || '-'}</td>
          <td>${b.date || '-'}</td>
          <td>${b.payment || b.paymentType || '-'}</td>
            <td>
      <span class="badge ${b.status === 'Completed' ? 'bg-success' : 'bg-warning text-dark'}">
        ${b.status}
      </span>
    </td>
    <td>
      <button class="btn btn-sm btn-${b.status === 'Pending' ? 'success' : 'secondary'}"
              onclick="toggleStatus('${b.id}')"
              ${b.status === 'Completed' ? 'disabled' : ''}>
        ${b.status === 'Pending' ? 'Mark Completed' : 'Completed'}
      </button> 
    </td>
      <td><button class="btn btn-sm btn-danger" onclick="deleteUser('${b.id}')">Delete</button></td>
        </tr>
      `;

      serviceTable.innerHTML += `
        <tr>
           <td>${b.name || b.fullName || b.firstName || '-'}</td>
          <td>${b.vehicleName || '-'}</td>
          <td>${b.service || '-'}</td>
          <td>${b.date || '-'}</td>
          <td>${b.time || '-'}</td>
        </tr>
      `;

      paymentTable.innerHTML += `
        <tr>
          <td>${b.name || b.fullName || b.firstName || '-'}</td>
          <td>${b.service || '-'}</td>
          <td>${b.price || '-'}</td>
          <td>${b.payment || b.paymentType || '-'}</td>
        </tr>
      `;
    });

    // Section Toggle
    function showSection(id, e) {
      ['dashboard', 'users', 'services', 'payments'].forEach(sec => {
        document.getElementById(sec).classList.add('d-none');
      });
      document.getElementById(id).classList.remove('d-none');
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      e.target.classList.add('active');
    }
    // delete 
    function deleteUser(id) {
      if (confirm("Are you sure you want to delete this booking?")) {
        const updatedBookings = bookings.filter(b => b.id !== id);
        localStorage.setItem("bookings", JSON.stringify(updatedBookings));
        location.reload(); 
      }
    }
    // pending or completed 
    function toggleStatus(id) {
      const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];

      const updatedBookings = allBookings.map(b => {
        if (b.id === id) {
          return { ...b, status: "Completed" };
        }
        return b;
      });
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
      location.reload();
    }
    const activeCount = bookings.filter(b => b.status !== "Completed").length;
    document.getElementById("activeServices").textContent = activeCount;

    // logout 
    function logout() {
      sessionStorage.removeItem("isAdmin");
      window.location.href = "index.html";
    }


    // Monthly income calculation
    const incomeByMonth = new Array(12).fill(0);
    let totalIncome = 0;

    bookings.forEach(b => {
      const price = parseFloat(b.price) || 0;
      const date = new Date(b.date);
      if (!isNaN(date.getTime())) {
        const monthIndex = date.getMonth();
        incomeByMonth[monthIndex] += price;
        totalIncome += price;
      }
    });

    document.getElementById("totalIncome").textContent = `₹ ${totalIncome.toFixed(2)}`;

    // Render income chart
    const incomeChart = document.getElementById("incomeChart").getContext("2d");
    new Chart(incomeChart, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Income (₹)",
          data: incomeByMonth,
          backgroundColor: "rgba(255, 193, 7, 0.7)",
          borderColor: "#ffc107",
          borderWidth: 1,
          borderRadius: 8,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => `₹ ${ctx.raw.toFixed(2)}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => `₹ ${value}`
            },
            title: {
              display: true,
              text: "Income (₹)"
            }
          }
        }
      }
    }); 