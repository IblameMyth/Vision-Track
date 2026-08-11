// Import Firebase ES Modules directly from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ==================================================================
// 1. Your Web App's Firebase Configuration
// ==================================================================
const firebaseConfig = {
  apiKey: "AIzaSyAPzQp_jUgs7I4d80SvAL4krs8J8wffozQ",
  authDomain: "visiontrack-6be5e.firebaseapp.com",
  projectId: "visiontrack-6be5e",
  storageBucket: "visiontrack-6be5e.firebasestorage.app",
  messagingSenderId: "495813089191",
  appId: "1:495813089191:web:1ecc21f5a69b082aef8882",
  measurementId: "G-78TTE9QTLC"
};

// Initialize Firebase & Services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ==================================================================
// 2. Theme Toggle & Google Sign-In Event Handlers
// ==================================================================
document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Switcher Logic (Yuno Light <-> Asta Dark) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const rootElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    rootElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const currentTheme = rootElement.getAttribute('data-theme');
            const newTheme = (currentTheme === 'dark') ? 'light' : 'dark';

            rootElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // --- Google Sign-In Button Handler ---
    const googleBtn = document.getElementById('google-btn');

    if (googleBtn) {
        googleBtn.addEventListener('click', async () => {
            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;

                // Save or update individual user profile in Firestore
                await setDoc(doc(db, "users", user.uid), {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    lastLogin: new Date()
                }, { merge: true });

                console.log("Logged in user ID:", user.uid);
                
                // Redirect to app interface
                window.location.href = "app.html";

            } catch (error) {
                console.error("Google Auth Error:", error.code, error.message);
                alert("Sign-in failed: " + error.message);
            }
        });
    }
});

// ==================================================================
// 3. Global Auth Observer
// ==================================================================
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Active user session:", user.uid);
        fetchUserData(user.uid);
    } else {
        console.log("No active user session.");
    }
});

// Function to safely pull individual user data from Firestore
async function fetchUserData(userId) {
    try {
        const userDocRef = doc(db, "users", userId);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            console.log("User Data loaded:", docSnap.data());
        }
    } catch (error) {
        console.error("Permission error fetching user data:", error);
    }
}