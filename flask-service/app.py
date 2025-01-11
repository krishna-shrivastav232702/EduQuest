from flask import Flask,request,jsonify
import pdfplumber
import re
import requests
import io
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

number_map={
    'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
    'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
    'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14,
    'fifteen': 15, 'sixteen': 16, 'seventeen': 17, 'eighteen': 18,
    'nineteen': 19, 'twenty': 20
    }

roman_map = {
    'i': 1, 'ii': 2, 'iii': 3, 'iv': 4, 'v': 5,
    'vi': 6, 'vii': 7, 'viii': 8, 'ix': 9, 'x': 10
}

def get_number_value(text):
    text = text.lower().strip()
    if text.isdigit():
        return int(text)
    elif text in number_map:
        return number_map[text]
    elif text in roman_map:
        return roman_map[text]
    return None

def extract_section_text(pdf_stream,section_keyword,section_type="Chapter"):
    section_text=[]
    is_section_found=False
    next_patterns =[]
    content_started = False

    full_keyword = f"{section_type} {section_keyword}"
    number_pattern = r"(\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|i|ii|iii|iv|v|vi|vii|viii|ix|x|)"
    section_match = re.search(number_pattern,section_keyword.lower())

    if section_match:
        current_num = get_number_value(section_match.group(1))
        if current_num is not None:
            next_num = current_num+1

            next_patterns=[
                f"{section_type} {next_num}",
                f"{section_type} {next_num}.",
                f"{section_type.upper()}{ next_num}",
                f"{section_type[:2]} {next_num}"
            ]
            next_word = {v:k for k , v in number_map.items()}.get(next_num)  #reverse the dictionary
            if next_word:
                next_patterns.append(f"{section_type} {next_word.capitalize()}")

            if next_num<=10:
                roman = {v: k for k, v in roman_map.items()}.get(next_num)
                if roman:
                    next_patterns.append(f"{section_type} {roman.upper()}")

    with pdfplumber.open(pdf_stream) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if not text:
                continue

            if not content_started:
                if section_type in text and len(text.split('\n')) > 10:
                    content_started = True
                else:
                    continue                    
            
            if full_keyword in text and not is_section_found:
                is_section_found = True
                start_idx = text.find(full_keyword)
                section_text.append(text[start_idx:])
                continue

            if is_section_found:
                found_next = False
                end_idx = len(text)

                for pattern in next_patterns:
                    if pattern in text:
                        found_next = True
                        pattern_idx = text.find(pattern)
                        end_idx = min(end_idx, pattern_idx)
                
                if found_next:
                    section_text.append(text[:end_idx])
                    break
                section_text.append(text)

    return "\n".join(section_text) if section_text else None

@app.route('/extract-text', methods=['POST'])

def extract_text():
    data = request.json

    if not all(key in data for key in ("pdf_url", "section_type", "section_number")):
        return jsonify({"error": "Missing required fields"}), 400

    pdf_url = data["pdf_url"]
    section_type = data["section_type"]
    section_number = data["section_number"]

    try:
        response = requests.get(pdf_url)
        response.raise_for_status()
        pdf_stream = io.BytesIO(response.content)

        section_text = extract_section_text(pdf_stream, section_number, section_type)

        if section_text:
            return jsonify({"status": "success", "section_text": section_text}), 200
        else:
            return jsonify({"status": "error", "message": "Section not found"}), 404

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
if __name__ == "__main__":
    app.run(port=5000, debug=True)

