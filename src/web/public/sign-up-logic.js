const signUpButton = document.getElementById("signup-btn");

signUpButton.addEventListener("click", (e) => {
   e.preventDefault();

   const firstName = document.getElementById("firstName").value;
   const lastName = document.getElementById("lastName").value;
   const email = document.getElementById("email").value;
   const password = document.getElementById("password").value;

   fetch("/register", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
         "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ firstName, lastName, email, password }),
   })
      .then((res) => res.json())
      .then((res) => {
         if (res.message) {
            document
               .getElementById("alert-label")
               .classList.replace("d-none", "d-block");

            document.getElementById("alert-message").textContent = res.message;
         } else window.location = "/main";
      })
      .catch((e) => {
         document
            .getElementById("alert-label")
            .classList.replace("d-none", "d-block");

         document.getElementById("alert-message").textContent =
            "Something went wrong. Try again";
      });
});
