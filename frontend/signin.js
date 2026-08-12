// Import Firebase ES Modules directly from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ==================================================================
// 1. Your Web App's Firebase Configuration (FIXED API KEY)
// ==================================================================
const firebaseConfig = {
  apiKey: "AIzaSyAwFRPUd6ruF_UfdByihyQgQMZHj4h5MdU", // Fixed capital 'P'
  authDomain: "visiontrack-2cefe.firebaseapp.com",
  projectId: "visiontrack-2cefe",
  storageBucket: "visiontrack-2cefe.firebasestorage.app",
  messagingSenderId: "1018027173033",
  appId: "1:1018027173033:web:7cad65414b9d6c3e88b5b8",
  measurementId: "G-K9V37HL6DL"
};

// Initialize Firebase & Services
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();
// Force account picker prompt so users can switch accounts easily
provider.setCustomParameters({ prompt: 'select_account' });

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
                // Disable button to prevent double-clicks
                googleBtn.disabled = true;

                const result = await signInWithPopup(auth, provider);
                const user = result.user;

                // Save or update user profile in Firestore
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    lastLogin: serverTimestamp()
                }, { merge: true });

                console.log("Logged in user ID:", user.uid);
                
                // Redirect after database write completes
                window.location.href = "app.html";

            } catch (error) {
                console.error("Google Auth Error:", error.code, error.message);
                
                // Don't show alert if user simply closed the popup window
                if (error.code !== 'auth/popup-closed-by-user') {
                    alert("Sign-in failed: " + error.message);
                }
            } finally {
                googleBtn.disabled = false;
            }
        });
    }
});

// ==================================================================
// 3. Global Auth Observer
// ==================================================================
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("Active user session:", user.uid);
        await fetchUserData(user.uid);
        
        // Redirect to dashboard if currently on login/index page
        if (window.location.pathname.endsWith("login.html") || window.location.pathname === "/") {
            window.location.href = "app.html";
        }
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
            return docSnap.data();
        } else {
            console.log("No user profile found in Firestore yet.");
        }
    } catch (error) {
        console.error("Permission error fetching user data:", error);
    }
}