import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBgQJ6HsUFMK4YJOKMPPsMN0MVE3JDAxKw",
    authDomain: "beyond-bite-prod.firebaseapp.com",
    projectId: "beyond-bite-prod",
    storageBucket: "beyond-bite-prod.firebasestorage.app",
    messagingSenderId: "976865612814",
    appId: "1:976865612814:web:3da50b7763abbf13a7585f",
    measurementId: "G-93BGWJPEYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Helper: Convert Firestore Timestamp to readable date
function formatDate(ts) {
    if (!ts) return "";
    try {
        if (ts.toDate) {
            return ts.toDate().toLocaleString("en-IN", { 
                day: "2-digit", month: "short", year: "numeric", 
                hour: "2-digit", minute: "2-digit" 
            });
        }
        return String(ts); // fallback
    } catch (e) {
        console.error("Date format error:", e);
        return "";
    }
}

async function trackOrder() {
    let orderId = document.getElementById("order_id").value.trim();
    var errorMessage = document.getElementById("error-message");

    if (!orderId) {
        errorMessage.textContent = "Please enter a valid Order ID.";
        errorMessage.style.display = "block";
        return;
    }

    const docRef = doc(db, "orders", orderId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        errorMessage.textContent = "Order not found!";
        errorMessage.style.display = "block";
        return;
    }

    // Hide error message if found
    errorMessage.style.display = "none";
    let data = docSnap.data();

    // Update URL with the Order ID
    window.history.pushState({}, '', `?orderid=${orderId}`);

    // Show order details section & hide input section
    document.getElementById("orderInfo").style.display = "block";
    document.getElementById("container-orderID").style.display = "none";

    // Update order details
    document.getElementById("orderID").innerText = orderId;
    document.getElementById("orderStatus").innerText = data["Status"];
    document.getElementById("paymentMode").innerText = data["Payment Mode"];

    // Update customer details
    document.getElementById("customerName").innerText = data["Customer Name"];
    document.getElementById("orderedItems").innerText = data["Ordered Items"];
    document.getElementById("deliveryPostcode").innerText = data["Delivery Postcode"];

    // Update courier details
    let courierDetails = document.getElementById("courier-details");
    if (data["Status"] === "Shipped" || data["Status"] === "Delivered") {
        if (data?.Courier?.Agency === "BeyondBite") {
            courierDetails.innerHTML = `Fulfilled by BeyondBite`;
        } else if (data?.Courier) {
            courierDetails.innerHTML = `
                 Shipped by ${data.Courier.Agency || "Unknown"}
                 <a href="${data.Courier.TrackingURL || "#"}" target="_blank" style="color: blue;">&#8599;</a>
                 <div>AWD ID: ${data.Courier.AWD_ID || "N/A"}</div>`;
        }
    }

    // Tracking status updates
    let statusStages = ["Ordered", "Prepared", "Shipped", "Delivered"];

    // Estimated delivery (only if not yet delivered)
    if (data["Status"] !== "Delivered" && data?.Dates?.Delivered) {
        document.getElementById("estimatedDeliveryDate").innerText = formatDate(data.Dates.Delivered);
    }

    statusStages.forEach((stage, index) => {
        setTimeout(() => {
            let element = document.getElementById("status-" + stage.toLowerCase());
            let dateElement = document.getElementById("date-" + stage.toLowerCase());
            let iconElement = element?.querySelector(".tracking-icon");

            if (element && dateElement && iconElement) {
                element.classList.add("smooth-fade-in");

                setTimeout(() => {
                    if (statusStages.indexOf(stage) <= statusStages.indexOf(data["Status"])) {
                        // Active status - Full opacity after animation
                        element.classList.remove("inactive");
                        element.querySelector(".tracking-content").style.opacity = "1";
                        element.querySelector(".tracking-content").style.transform = "translateY(0)";
                        iconElement.style.opacity = "1";
                        iconElement.style.transform = "translateY(0)";
                        dateElement.innerText = formatDate(data?.Dates?.[stage]);
                    } else {
                        element.querySelector(".tracking-content").style.opacity = "0.5";
                        iconElement.style.opacity = "0.5";
                    }
                }, 1000);
            }
        }, index * 700);
    });
}


function loadFromURL() {
    let params = new URLSearchParams(window.location.search);
    let orderId = params.get("orderid");
    if (orderId) {
        document.getElementById("order_id").value = orderId;
        trackOrder();
    }
}

window.onload = loadFromURL;
window.trackOrder = trackOrder; // Make it available to HTML button onclick
