def analyze_transaction(
    amount,
    location,
    payment_method
):

    risk_score = 0


    # Amount-based demonstration feature

    if amount >= 50000:

        risk_score += 45

    elif amount >= 20000:

        risk_score += 25

    elif amount >= 10000:

        risk_score += 10


    # Location demonstration feature

    suspicious_locations = [
        "Unknown",
        "Unknown Location"
    ]

    if location in suspicious_locations:

        risk_score += 20


    # Payment-method demonstration feature

    if payment_method == "NETBANKING":

        risk_score += 5


    # Limit the score

    if risk_score > 100:

        risk_score = 100


    if risk_score >= 70:

        level = "HIGH"

    elif risk_score >= 40:

        level = "MEDIUM"

    else:

        level = "LOW"


    return {

        "risk_score": risk_score,

        "risk_level": level,

        "method": "Classical baseline"

    }
