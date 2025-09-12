   const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (loggedInUser && loggedInUser.name) {
        document.getElementById("userNameDisplay").innerText =
          loggedInUser.name;
      } else {
        window.location.href = "index.html";
      }
      document
        .getElementById("contactForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();

          const name = document.getElementById("name").value;
          const email = document.getElementById("email").value;
          const subject = document.getElementById("subject").value;
          const message = document.getElementById("message").value;

          // For demo, we store messages in localStorage
          const contactMessages = JSON.parse(
            localStorage.getItem("contactMessages") || "[]"
          );
          contactMessages.push({
            name,
            email,
            subject,
            message,
            date: new Date().toLocaleString(),
          });
          localStorage.setItem(
            "contactMessages",
            JSON.stringify(contactMessages)
          );

          document.getElementById(
            "formMessage"
          ).innerHTML = `<div class="alert alert-success text-center">
        ✅ Thank you ${name}, your message has been sent successfully!
      </div>`;

          this.reset();
        });
      function logout() {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
      }