/* ==========================================
   QUANTUMGUARD DEMO JAVASCRIPT
   ========================================== */


/*
   Generate a unique-looking transaction ID.
*/

function generateTransactionId() {

    const randomNumber =
        Math.floor(100000 + Math.random() * 900000);

    return "QG" + randomNumber;
}


/*
   Get transactions stored in the browser.
*/

function getTransactions() {

    const data =
        localStorage.getItem("quantumGuardTransactions");

    if (!data) {
        return [];
    }

    return JSON.parse(data);
}


/*
   Save transactions in the browser.
*/

function saveTransactions(transactions) {

    localStorage.setItem(
        "quantumGuardTransactions",
        JSON.stringify(transactions)
    );
}


/*
   Simple practice fraud-risk calculation.

   IMPORTANT:
   This is only a demo rule-based model.
   The real hackathon version should connect
   the backend ML/Qiskit component.
*/

function calculateDemoRisk(amount) {

    if (amount >= 50000) {

        return {
            level: "HIGH",
            score: 85
        };

    } else if (amount >= 20000) {

        return {
            level: "MEDIUM",
            score: 55
        };

    } else {

        return {
            level: "LOW",
            score: 20
        };
    }
}


/*
   USER PAYMENT FORM
*/

const paymentForm =
    document.getElementById("paymentForm");


if (paymentForm) {

    paymentForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const sender =
                document.getElementById("sender").value;

            const receiver =
                document.getElementById("receiver").value;

            const amount =
                Number(
                    document.getElementById("amount").value
                );

            const location =
                document.getElementById("location").value;

            const paymentMethod =
                document.getElementById("paymentMethod").value;


            const transactionId =
                generateTransactionId();


            const risk =
                calculateDemoRisk(amount);


            const transaction = {

                id: transactionId,

                sender: sender,

                receiver: receiver,

                amount: amount,

                location: location,

                paymentMethod: paymentMethod,

                riskLevel: risk.level,

                riskScore: risk.score,

                status: "Pending",

                date: new Date().toLocaleString()

            };


            /*
               Store the transaction temporarily
               for this browser-based practice demo.
            */

            const transactions =
                getTransactions();

            transactions.push(transaction);

            saveTransactions(transactions);


            /*
               Show transaction details in popup.
            */

            document.getElementById(
                "transactionId"
            ).textContent = transactionId;


            document.getElementById(
                "transactionAmount"
            ).textContent = amount.toLocaleString("en-IN");


            document.getElementById(
                "transactionReceiver"
            ).textContent = receiver;


            document.getElementById(
                "transactionLocation"
            ).textContent = location;


            document.getElementById(
                "transactionRisk"
            ).textContent =
                risk.level + " (" + risk.score + "/100)";


            document.getElementById(
                "verificationModal"
            ).classList.remove("hidden");

        }
    );
}


/*
   Close verification popup.
*/

function closeVerification() {

    const modal =
        document.getElementById("verificationModal");

    if (modal) {

        modal.classList.add("hidden");

    }
}


/*
   USER CONFIRMS TRANSACTION.
*/

function confirmTransaction() {

    const transactions =
        getTransactions();


    if (transactions.length === 0) {

        return;

    }


    const transaction =
        transactions[transactions.length - 1];


    transaction.status = "Verified";


    saveTransactions(transactions);


    closeVerification();


    alert(
        "Transaction verified successfully.\n\n" +
        "Demo status: PAYMENT PROCEEDS"
    );

}


/*
   USER REPORTS UNAUTHORIZED TRANSACTION.
*/

function blockTransaction() {

    const transactions =
        getTransactions();


    if (transactions.length === 0) {

        return;

    }


    const transaction =
        transactions[transactions.length - 1];


    transaction.status = "Blocked by User";


    saveTransactions(transactions);


    closeVerification();


    alert(
        "Transaction placed on hold.\n\n" +
        "Demo alert sent to bank administrator."
    );

}


/*
   ADMIN DASHBOARD
*/

function loadAdminDashboard() {

    const transactionTable =
        document.getElementById("transactionTable");


    if (!transactionTable) {

        return;

    }


    const transactions =
        getTransactions();


    /*
       Calculate statistics.
    */

    const total =
        transactions.length;


    const suspicious =
        transactions.filter(
            transaction =>
                transaction.riskLevel === "HIGH" ||
                transaction.riskLevel === "MEDIUM"
        ).length;


    const blocked =
        transactions.filter(
            transaction =>
                transaction.status === "Blocked by User"
        ).length;


    const verified =
        transactions.filter(
            transaction =>
                transaction.status === "Verified"
        ).length;


    document.getElementById(
        "totalTransactions"
    ).textContent = total;


    document.getElementById(
        "suspiciousTransactions"
    ).textContent = suspicious;


    document.getElementById(
        "blockedTransactions"
    ).textContent = blocked;


    document.getElementById(
        "verifiedTransactions"
    ).textContent = verified;


    /*
       If there are no transactions,
       show empty message.
    */

    if (transactions.length === 0) {

        transactionTable.innerHTML = `

            <div class="empty-state">

                <h3>No Transactions Yet</h3>

                <p>
                    Transactions submitted from the
                    user portal will appear here.
                </p>

            </div>

        `;

        return;

    }


    /*
       Display transactions.
    */

    transactionTable.innerHTML =
        transactions
            .slice()
            .reverse()
            .map(transaction => {


                let statusClass =
                    "status-suspicious";


                if (
                    transaction.status ===
                    "Blocked by User"
                ) {

                    statusClass =
                        "status-blocked";

                }


                if (
                    transaction.status ===
                    "Verified"
                ) {

                    statusClass =
                        "status-verified";

                }


                return `

                    <div class="transaction-row">

                        <div>

                            <h4>
                                ${transaction.id}
                            </h4>

                            <p>
                                ${transaction.date}
                            </p>

                        </div>


                        <div>

                            <strong>
                                ₹${Number(
                                    transaction.amount
                                ).toLocaleString("en-IN")}
                            </strong>

                            <p>
                                To:
                                ${transaction.receiver}
                            </p>

                        </div>


                        <div>

                            <strong>
                                ${transaction.riskLevel}
                            </strong>

                            <p>
                                Risk Score:
                                ${transaction.riskScore}/100
                            </p>

                        </div>


                        <div>

                            <span
                                class="status ${statusClass}"
                            >
                                ${transaction.status}
                            </span>

                        </div>

                    </div>

                `;

            })
            .join("");

}


/*
   CLEAR DEMO TRANSACTIONS.
*/

function clearTransactions() {

    const confirmClear =
        confirm(
            "Clear all demo transactions?"
        );


    if (!confirmClear) {

        return;

    }


    localStorage.removeItem(
        "quantumGuardTransactions"
    );


    loadAdminDashboard();

}


/*
   Automatically load the admin dashboard
   when admin.html is opened.
*/

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadAdminDashboard();

    }
);
