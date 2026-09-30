from qiskit import QuantumCircuit
from qiskit.primitives import StatevectorSampler


def quantum_analysis(amount):

    # Convert transaction amount
    # into a simple value between 0 and 1.

    normalized_amount = min(
        amount / 100000,
        1.0
    )


    # Create a 2-qubit quantum circuit.

    circuit = QuantumCircuit(2)


    # Apply a rotation based on
    # the transaction amount.

    angle = normalized_amount * 3.14159

    circuit.ry(angle, 0)


    # Create interaction between qubits.

    circuit.cx(0, 1)


    # Measure the circuit.

    circuit.measure_all()


    # Run the circuit locally.

    sampler = StatevectorSampler()

    result = sampler.run(
        [circuit],
        shots=256
    ).result()


    counts = result[0].data.meas.get_counts()


    # Calculate a simple demonstration
    # quantum score from measurement results.

    ones_count = 0

    for state, count in counts.items():

        if "1" in state:

            ones_count += count


    quantum_probability = (
        ones_count / 256
    )


    quantum_score = round(
        quantum_probability * 100,
        2
    )


    return {

        "quantum_score": quantum_score,

        "measurement_counts": counts,

        "circuit_qubits": 2,

        "method": "Qiskit quantum circuit"

    }
