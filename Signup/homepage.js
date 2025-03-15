// here we will import firebase SDKs 
// firstly we will go to firebase console and create a project and after that we will get these details
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

// it will Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// it is function to Load Student Data
const loadStudentData = async (userId) => {
    try {
        const docRef = doc(db, "students", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            document.getElementById("loggedUserFName").innerText = userData.firstName;
            document.getElementById("loggedUserLName").innerText = userData.lastName;
            document.getElementById("loggedUserEmail").innerText = userData.email;
            document.getElementById("loggedUserDOB").innerText = userData.dob;
            document.getElementById("loggedUserGender").innerText = userData.gender;
            document.getElementById("loggedUserPhone").innerText = userData.phone;
            document.getElementById("loggedUserAddress").innerText = userData.address;
            document.getElementById("loggedUserID").innerText = userData.studentID || "N/A";
            document.getElementById("loggedUserCourse").innerText = userData.course;
        } else {
            console.log("No student data found for this user.");
        }
    } catch (error) {
        console.error("Error fetching student data:", error);
    }
};

// it will check if User is Logged In
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User logged in:", user.uid);
        loadStudentData(user.uid);
    } else {
        console.log("No user logged in. Redirecting to login page...");
        window.location.href = "login.html"; // it will redirect to login if not logged in
    }
});

// Logout Function
document.getElementById("logout").addEventListener("click", async () => {
    try {
        await signOut(auth);
        window.location.href = "index.html"; // it will redirect to login page
    } catch (error) {
        console.error("Error signing out:", error);
    }
});
// If we log out this then we need to log in again no one can go direct using homepage.html URL.
// Firstly we create account then we will go to login page and log in.
// After that successfully log in then we will go to home page.