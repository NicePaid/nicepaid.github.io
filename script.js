// Simulated balance value
let balance = 0;

// Function to refresh balance (simulated)
function refreshBalance() {
    // Simulated API call to get balance
    balance = Math.random() * 10; // Simulated balance value
    document.getElementById('balance').innerText = balance.toFixed(2);
}

// Function to handle transaction form submission
document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get recipient and amount values from form
    const recipient = document.getElementById('recipient').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // Simulated API call to send transaction
    if (!isNaN(amount) && amount > 0) {
        // Success message (simulated)
        document.getElementById('transaction-status').innerText = `Transaction sent: ${amount} BTC to ${recipient}`;
    } else {
        // Error message for invalid amount (simulated)
        document.getElementById('transaction-status').innerText = 'Invalid amount. Please enter a valid number.';
    }
});
