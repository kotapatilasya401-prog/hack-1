from flask import Flask, request, jsonify
from flask_cors import CORS

from fraud_model import analyze_transaction
from quantum_model import quantum_analysis

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return jsonify({
        "message": "QuantumGuard backend is running",
        "status": "success"
    })


@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No transaction data received"
        }), 400

    amount = float(data.get("amount", 0))
    location = data.get("location", "Unknown")
    payment_method = data.get("payment_method", "Unknown")

    transaction = {
        "amount": amount,
        "location": location,
        "payment_method": payment_method
    }

    classical_result = analyze_transaction(transaction)
    quantum_result = quantum_analysis(amount)

    final_score = (
        classical_result["risk_score"] * 0.7
        + quantum_result["quantum_score"] * 0.3
    )

    if final_score >= 70:
        risk_level = "High"
    elif final_score >= 40:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    return jsonify({
        "classical_score": classical_result["risk_score"],
        "quantum_score": quantum_result["quantum_score"],
        "final_score": round(final_score, 2),
        "risk_level": risk_level
    })


if __name__ == "__main__":
    app.run(debug=True)
