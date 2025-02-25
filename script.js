function trackOrder() {
    let orderId = document.getElementById("order_id").value.trim();

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
        }
    };

    if (!sampleData[orderId]) {
        alert("Order not found!");
        return;
    }

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
    if (data["Status"] === "Shipped") {
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

            if (element && dateElement) {
                if (statusStages.indexOf(stage) <= statusStages.indexOf(data["Status"])) {
                    element.classList.remove("inactive");
                    element.classList.add("smooth-fade-in"); // Updated class for smooth animation
                    dateElement.innerText = data["Dates"][stage];
                } 
            }
        }, index * 500); // Reduced delay for smoother effect
    });
}
