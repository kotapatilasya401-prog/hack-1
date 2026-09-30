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


    amount = float(
        data.get("amount", 0)
    )

    location = data.get(
        "location",
        "Unknown"
    )

    payment_method = data.get(
        "paymentMethod",
        "Unknown"
    )


    # Classical fraud analysis

    classical_result = analyze_transaction(
        amount=amount,
        location=location,
        payment_method=payment_method
    )


    # Quantum component

    quantum_result = quantum_analysis(
        amount=amount
    )


    # Combine the demonstration results

    final_score = round(
        (
            classical_result["risk_score"]
            +
            quantum_result["quantum_score"]
        ) / 2,
        2
    )


    if final_score >= 70:

        final_risk = "HIGH"

    elif final_score >= 40:

        final_risk = "MEDIUM"

    else:

        final_risk = "LOW"


    return jsonify({

        "status": "success",

        "classical_analysis": classical_result,

        "quantum_analysis": quantum_result,

        "final_risk_score": final_score,

        "final_risk_level": final_risk

    })


if __name__ == "__main__":

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )
