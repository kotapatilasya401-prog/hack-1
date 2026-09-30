# QuantumGuard

## Quantum-Enhanced Digital Payment Fraud Detection

QuantumGuard is a prototype concept for detecting potentially suspicious digital payment transactions before the transaction is completed.

## Problem Statement

Digital payment systems can be targeted by unauthorized or fraudulent transactions. A system is needed to analyze transaction information and provide an additional verification step before a payment is completed.

## Proposed Solution

QuantumGuard combines:

- Transaction analysis
- Classical machine learning
- Quantum computing
- Qiskit
- User verification
- Administrator alerts

## System Flow

User enters payment details.

↓

Transaction information is analyzed.

↓

Classical fraud analysis is performed.

↓

A Qiskit-based quantum component is used.

↓

A risk level is generated.

↓

The user verifies the transaction.

↓

YES:
The demonstration marks the transaction as verified.

NO:
The demonstration places the transaction on hold and records an administrator alert.

## Technology Stack

### Frontend

- HTML
- CSS
- JavaScript

### Backend

- Python
- Flask

### Machine Learning

- Python
- Scikit-learn

### Quantum Computing

- Qiskit

### Data

- CSV
- Synthetic practice transactions

## Project Structure

quantum-fraud-detection/

frontend/

- index.html
- user.html
- admin.html
- style.css
- script.js

backend/

- app.py
- fraud_model.py
- quantum_model.py
- requirements.txt

dataset/

- transactions.csv

results/

- results.txt

README.md

presentation/

- hackathon_presentation.pptx

## Current Status

This repository contains a practice prototype.

The classical fraud analysis currently uses a simple demonstration baseline.

The quantum component currently demonstrates a Qiskit circuit.

The final hackathon version should replace the demonstration components with the team's validated implementation and experimental results.

## Important Disclaimer

This prototype does not connect to a real bank, UPI network, card network, or payment gateway.

The "block" or "hold" action is only simulated inside the prototype.

No real financial transaction is performed.

## Future Development

- Use a suitable fraud dataset.
- Train and evaluate a classical model.
- Develop a validated quantum-enhanced model.
- Compare classical and quantum approaches.
- Connect the frontend to the Python backend.
- Improve transaction monitoring.
- Add authentication and secure APIs.
