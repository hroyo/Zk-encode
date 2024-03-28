import os
import subprocess
from flask_cors  import CORS
from flask import Flask, request, jsonify


app = Flask(__name__)
CORS(app)


@app.route('/generate-proof', methods=['POST'])
def generateproof():
    address = request.json.get('address')
    decimal_address = int(address, 16)

    # Change directory to ZoKrates directory
    zokrates_dir = r'C:\Users\chine\EncodeBootcamp\ZKBootcamp\Encode_ZKBootcamp_Homework\Pharmacy_v2'

    os.chdir(zokrates_dir)

    # Execute zokrates compute-witness command
    compute_witness_command = ['zokrates', 'compute-witness', '-a', str(decimal_address), str(decimal_address), '22', '2312', '1234', '4444', '3333', '1234']
    process = subprocess.Popen(compute_witness_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()

    if process.returncode != 0:
        print(f"Error executing compute-witness command: {stderr.decode()}")
        return jsonify({'error': 'Error generating proof'}), 500

    # Execute zokrates generate-proof command
    generate_proof_command = ['zokrates', 'generate-proof']
    process = subprocess.Popen(generate_proof_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()

    if process.returncode != 0:
        print(f"Error executing generate-proof command: {stderr.decode()}")
        return jsonify({'error': 'Error generating proof'}), 500

    proof_file_path = os.path.join(zokrates_dir, 'proof.json')
    with open(proof_file_path, 'r') as proof_file:
        proof = proof_file.read()

    return jsonify({'proof': proof})


if __name__  == '__main':
    app.run(debug=True)