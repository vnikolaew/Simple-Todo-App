const loginButton = document.querySelector("button#login-btn");

loginButton.addEventListener("click", (e) => {
   e.preventDefault();
   const email = document.querySelector("input#email").value;
   const password = document.querySelector("input#password").value;

   // Make a POST request to the /login route:
   fetch(`/login`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
         "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ email, password }),
   })
      .then((res) => res.json())
      .then((res) => {
         if (res.message) {
            const label = document.getElementById("alert-label");
            label.classList.replace("d-none", "d-block");
         } else {
            window.location = "/main";
         }
      })
      .catch((e) => {});
});
