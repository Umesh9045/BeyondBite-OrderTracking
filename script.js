function trackOrder() {
    let orderId = document.getElementById("order_id").value.trim();
    var errorMessage = document.getElementById("error-message");

    let sampleData = {
        "BB001": {
            "Customer Name": "Rajesh Kumar",
            "Ordered Items": "Almond Kesar Kulfi, Nutri Balls",
            "Status": "Shipped",
            "Delivery Postcode": "560001",
            "Payment Mode": "COD",
            "Courier": {
                "Agency": "DTDC",
                "AWD_ID": "DTDC123456",
                "TrackingURL": "https://www.dtdc.in/tracking.asp?awb=DTDC123456"
            },
            "Dates": {
                "Ordered": "20 Feb 2025, 10:00 AM",
                "Prepared": "21 Feb 2025, 02:00 PM",
                "Shipped": "22 Feb 2025, 05:00 PM",
                "Delivered": "24 Feb 2025, 12:00 PM"
            }
        },
        "BB002": {
            "Customer Name": "Priya Shah",
            "Ordered Items": "Mix Fruit Raisins",
            "Status": "Delivered",
            "Delivery Postcode": "110001",
            "Payment Mode": "Prepaid",
            "Courier": {
                "Agency": "BeyondBite"
            },
            "Dates": {
                "Ordered": "18 Feb 2025, 11:00 AM",
                "Prepared": "19 Feb 2025, 01:30 PM",
                "Shipped": "20 Feb 2025, 04:00 PM",
                "Delivered": "21 Feb 2025, 09:00 AM"
            }
        },
        "BB003": {
            "Customer Name": "Priya Shah",
            "Ordered Items": "Mix Fruit Raisins",
            "Status": "Delivered",
            "Delivery Postcode": "110001",
            "Payment Mode": "Prepaid",
            "Courier": {
                "Agency": "BeyondBite"
            },
            "Dates": {
                "Ordered": "18 Feb 2025, 11:00 AM",
                "Prepared": "19 Feb 2025, 01:30 PM",
                "Shipped": "20 Feb 2025, 04:00 PM",
                "Delivered": "21 Feb 2025, 09:00 AM"
            }
        }
    };
    if (orderId === "" || orderId === null) {
        errorMessage.textContent = "Please enter a valid Order ID.";
        errorMessage.style.display = "block";
        return;
    }

    if (!sampleData[orderId]) {
        errorMessage.textContent = "Order not found!";
        errorMessage.style.display = "block";
        return;
    }

    // Hide error message if input is valid
    errorMessage.style.display = "none";

    let data = sampleData[orderId];

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
        if (data["Courier"]["Agency"] === "BeyondBite") {
            courierDetails.innerHTML = `Fulfilled by BeyondBite`;
        } else {
            courierDetails.innerHTML = `
                 Shipped by ${data["Courier"]["Agency"]}
                 <a href="${data["Courier"]["TrackingURL"]}" target="_blank" style="color: blue;">&#8599;</a>
                 <div>AWD ID: ${data["Courier"]["AWD_ID"]}</div>`;
        }
    }

    // Update tracking status
    let statusStages = ["Ordered", "Prepared", "Shipped", "Delivered"];
    statusStages.forEach((stage, index) => {
        setTimeout(() => {
            let element = document.getElementById("status-" + stage.toLowerCase());
            let dateElement = document.getElementById("date-" + stage.toLowerCase());
            let iconElement = element.querySelector(".tracking-icon");

            if (element && dateElement && iconElement) {
                element.classList.add("smooth-fade-in");

                // if (stage === "Delivered") {
                //     if (data["Status"] === "Delivered") {
                //         dateElement.innerText = data["Dates"][stage]; // Show actual delivery date
                //     } else {
                //         dateElement.innerText = `Estimated: ${data["Dates"][stage]}`; // Show estimated delivery date
                //     }
                // } 

                setTimeout(() => {
                    if (statusStages.indexOf(stage) <= statusStages.indexOf(data["Status"])) {
                        // Active status - Full opacity after animation
                        element.classList.remove("inactive");
                        element.querySelector(".tracking-content").style.opacity = "1";
                        element.querySelector(".tracking-content").style.transform = "translateY(0)";
                        iconElement.style.opacity = "1";
                        iconElement.style.transform = "translateY(0)";

                        dateElement.innerText = data["Dates"][stage];

                        // if (stage === "Delivered" && data["Status"] === "Delivered") {
                        //     dateElement.innerHTML = `  <div class="tracking-icon"><i class="bi bi-house-check-fill"></i></div>
                        //     <div class="tracking-content">Delivered on ${data["Dates"][stage]} </div>`;
                        //     dateElement.style.display = "none"; // Hide the span if delivered
                        // } 


                    } else {
                        // Inactive status - Slightly visible after animation
                        element.querySelector(".tracking-content").style.opacity = "0.5";
                        iconElement.style.opacity = "0.5";
                    }
                }, 1000); // Wait for animation to complete before showing content & icon
            }
        }, index * 700);
    });


}
