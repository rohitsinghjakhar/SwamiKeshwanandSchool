// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// it is Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyA27oGhqWflsXL-NNkjXAX9Hu7JUNQActg",
    authDomain: "idctechsignuplogin.firebaseapp.com",
    projectId: "idctechsignuplogin",
    storageBucket: "idctechsignuplogin.appspot.com", 
    messagingSenderId: "722106100496",
    appId: "1:722106100496:web:c22458dff6c134712cd395",
    measurementId: "G-HY60W0J6QB"
};

//it will Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// it is Function to show messages
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// it will wait for DOM to load before adding event listeners
document.addEventListener("DOMContentLoaded", function () {

    // it will handle student registration (Sign-Up)
    const signUpButton = document.getElementById("submitSignUp");
    if (signUpButton) {
        signUpButton.addEventListener("click", async (event) => {
            event.preventDefault(); // this is prevent function,it will Prevent form from reloading

            // it will get form data
            const firstName = document.getElementById("fName").value.trim();
            const lastName = document.getElementById("lName").value.trim();
            const dob = document.getElementById("dob").value;
            const gender = document.getElementById("gender").value;
            const phone = document.getElementById("phone").value.trim();
            const address = document.getElementById("address").value.trim();
            const email = document.getElementById("rEmail").value.trim();
            const password = document.getElementById("rPassword").value.trim();
            const course = document.getElementById("course").value;
            const studentID = document.getElementById("studentID").value.trim() || "N/A"; // this can be empty or optional field.

            // it will check for empty fields
            if (!firstName || !lastName || !dob || !gender || !phone || !address || !email || !password || !course) {
                showMessage("Please fill in all required fields!", "signUpMessage");
                return;
            }

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // It will save Student details in firestore. we can see these details in our account
                await setDoc(doc(db, "students", user.uid), {
                    firstName,
                    lastName,
                    dob,
                    gender,
                    phone,
                    address,
                    email,
                    studentID,
                    course,
                    userId: user.uid,
                    createdAt: new Date().toISOString()
                });

                showMessage("Account Created Successfully!", "signUpMessage");

                // it will redirect to Login page or dashboard
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 2000);
            } catch (error) {
                if (error.code === "auth/email-already-in-use") {
                    showMessage("Email Address Already Exists!", "signUpMessage");
                } else {
                    showMessage("Unable to create account. Try again.", "signUpMessage");
                }
            }
        });
    }

    // it will handle Student Login (Sign-In)
    const signInButton = document.getElementById("submitSignIn");
    if (signInButton) {
        signInButton.addEventListener("click", async (event) => {
            event.preventDefault(); 

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!email || !password) {
                showMessage("Please enter email and password!", "signInMessage");
                return;
            }

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                showMessage("Login Successful!", "signInMessage");

                //it will store logged-in user in localStorage and redirect to dashboard
                localStorage.setItem("loggedInUserId", user.uid);
                setTimeout(() => {
                    window.location.href = "homepage.html";
                }, 2000);
            } catch (error) {
                if (error.code === "auth/invalid-credential") {
                    showMessage("Incorrect Email or Password", "signInMessage");
                } else {
                    showMessage("Account does not exist!", "signInMessage");
                }
            }
        });
    }
});
