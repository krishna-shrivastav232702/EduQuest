from flask import Flask, request, jsonify
import pdfplumber
import re
import requests
import io
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


class PDFSectionExtractor:
    def __init__(self):
        self.number_map = {
            'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
            'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
            'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14,
            'fifteen': 15, 'sixteen': 16, 'seventeen': 17, 'eighteen': 18,
            'nineteen': 19, 'twenty': 20, 'twenty-one': 21, 'twenty-two': 22,
            'twenty-three': 23, 'twenty-four': 24, 'twenty-five': 25
        }
        
        self.roman_map = {
            'i': 1, 'ii': 2, 'iii': 3, 'iv': 4, 'v': 5,
            'vi': 6, 'vii': 7, 'viii': 8, 'ix': 9, 'x': 10,
            'xi': 11, 'xii': 12, 'xiii': 13, 'xiv': 14, 'xv': 15,
            'xvi': 16, 'xvii': 17, 'xviii': 18, 'xix': 19, 'xx': 20
        }
    
    def get_number_value(self, text):
        """Convert text to numeric value"""
        text = text.lower().strip()
        if text.isdigit():
            return int(text)
        elif text in self.number_map:
            return self.number_map[text]
        elif text in self.roman_map:
            return self.roman_map[text]
        return None
    
    def generate_section_patterns(self, section_type, section_number):
        """Generate all possible patterns for a section"""
        patterns = []
        
        # Common section types and their variations
        section_variations = [
            section_type.lower(),
            section_type.upper(),
            section_type.capitalize(),
            section_type[:4].upper(),  # CHAP, UNIT, etc.
            section_type[:3].upper(),  # CHA, UNI, etc.
        ]
        
        # Number variations
        number_variations = [str(section_number)]
        
        # Add word form if exists
        word_form = {v: k for k, v in self.number_map.items()}.get(section_number)
        if word_form:
            number_variations.extend([word_form, word_form.capitalize(), word_form.upper()])
        
        # Add roman numeral if exists
        roman_form = {v: k for k, v in self.roman_map.items()}.get(section_number)
        if roman_form:
            number_variations.extend([roman_form, roman_form.upper()])
        
        # Generate all combinations
        for section_var in section_variations:
            for num_var in number_variations:
                patterns.extend([
                    f"{section_var} {num_var}",
                    f"{section_var} {num_var}:",
                    f"{section_var} {num_var}.",
                    f"{section_var}-{num_var}",
                    f"{section_var}{num_var}",
                    f"{section_var}. {num_var}",
                ])
        
        return list(set(patterns))  # Remove duplicates
    
    def find_section_boundaries(self, text, patterns):
        """Find start and end positions of section in text"""
        text_lower = text.lower()
        
        # Find all matches with their positions
        matches = []
        for pattern in patterns:
            pattern_lower = pattern.lower()
            start = 0
            while True:
                pos = text_lower.find(pattern_lower, start)
                if pos == -1:
                    break
                
                # Check if it's at word boundary (not part of another word)
                if (pos == 0 or not text[pos-1].isalnum()) and \
                   (pos + len(pattern) >= len(text) or not text[pos + len(pattern)].isalnum()):
                    matches.append((pos, pattern))
                start = pos + 1
        
        return sorted(matches, key=lambda x: x[0])
    
    def extract_section_text(self, pdf_stream, section_number, section_type="Chapter"):
        """Extract text for a specific section"""
        try:
            # Generate patterns for current and next section
            current_patterns = self.generate_section_patterns(section_type, section_number)
            next_patterns = self.generate_section_patterns(section_type, section_number + 1)
            
            print(f"Looking for patterns: {current_patterns[:5]}...")  # Debug
            
            all_text = ""
            section_text = []
            section_found = False
            
            with pdfplumber.open(pdf_stream) as pdf:
                # First pass: extract all text
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        all_text += page_text + "\n"
                
                if not all_text.strip():
                    return {"error": "No text could be extracted from PDF", "text": None}
                
                # Find section boundaries
                current_matches = self.find_section_boundaries(all_text, current_patterns)
                next_matches = self.find_section_boundaries(all_text, next_patterns)
                
                if not current_matches:
                    return {"error": f"Section '{section_type} {section_number}' not found", "text": None}
                
                # Use the first match as start position
                start_pos = current_matches[0][0]
                
                # Find end position (start of next section or end of document)
                if next_matches:
                    end_pos = next_matches[0][0]
                else:
                    end_pos = len(all_text)
                
                extracted_text = all_text[start_pos:end_pos].strip()
                
                return {
                    "error": None,
                    "text": extracted_text,
                    "found_pattern": current_matches[0][1],
                    "start_pos": start_pos,
                    "end_pos": end_pos
                }
                
        except Exception as e:
            return {"error": f"Extraction failed: {str(e)}", "text": None}


# Global extractor instance
extractor = PDFSectionExtractor()


@app.route('/extract-text', methods=['POST'])
def extract_text():
    data = request.json
    
    # Validate input
    if not data:
        return jsonify({"error": "No JSON data provided"}), 400
    
    required_fields = ["pdf_url", "section_type", "section_number"]
    missing_fields = [field for field in required_fields if field not in data]
    
    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400
    
    pdf_url = data["pdf_url"]
    section_type = data["section_type"]
    section_number = data["section_number"]
    
    # Validate section_number
    try:
        if isinstance(section_number, str):
            section_num = extractor.get_number_value(section_number)
            if section_num is None:
                return jsonify({"error": "Invalid section number format"}), 400
        else:
            section_num = int(section_number)
    except (ValueError, TypeError):
        return jsonify({"error": "Section number must be a valid number or word"}), 400
    
    try:
        # Download PDF
        print(f"Downloading PDF from: {pdf_url}")
        response = requests.get(pdf_url, timeout=30)
        response.raise_for_status()
        
        if len(response.content) == 0:
            return jsonify({"error": "PDF file is empty"}), 400
        
        pdf_stream = io.BytesIO(response.content)
        
        # Extract section
        result = extractor.extract_section_text(pdf_stream, section_num, section_type)
        
        if result["error"]:
            return jsonify({
                "status": "error",
                "message": result["error"],
                "section_text": None
            }), 404
        else:
            return jsonify({
                "status": "success",
                "section_text": result["text"],
                "found_pattern": result["found_pattern"],
                "metadata": {
                    "section_type": section_type,
                    "section_number": section_num,
                    "text_length": len(result["text"]),
                    "start_position": result["start_pos"],
                    "end_position": result["end_pos"]
                }
            }), 200
            
    except requests.exceptions.RequestException as e:
        return jsonify({"status": "error", "message": f"Failed to download PDF: {str(e)}"}), 400
    except Exception as e:
        print("Exception occurred:", str(e))
        return jsonify({"status": "error", "message": f"Processing failed: {str(e)}"}), 500


@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "PDF Text Extractor"}), 200


if __name__ == "__main__":
    app.run(port=5000, debug=True)
