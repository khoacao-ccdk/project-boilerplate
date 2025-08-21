from anthropic import Anthropic, AsyncAnthropic
from app.core.config import settings
import json
import re

client = Anthropic(api_key="")

fields_to_extract = [
    "Bill of lading number",
    "Container Number",
    "Consignee Name",
    "Consignee Address",
    "Date",
    "Line Items Count",
    "Average Gross Weight",
    "Average Price"
]

def extract_field_from_document(document_text):
    """
    Use Claude to extract specific field from document text and return as a structured JSON object.

    Args:
        document_text: Text from the document

    Returns:
        dict: Extracted fields as a JSON object
    """

    prompt = (
        f"Extract the following fields: {fields_to_extract} from the following document. "
        "Return the result as a JSON object with the field names as keys:\n\n"
        f"{document_text}"
    )

    response = client.messages.create(
        model="claude-3-opus-20240229",
        max_tokens=300,
        temperature=1,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    

    content = response.content[0].text.strip()
    return extract_field_from_LLM_response(content)
    


def extract_field_from_LLM_response(content): 
    json_match = re.search(r"\{.*\}", content, re.DOTALL)
    if json_match:
        try:
            extracted = json.loads(json_match.group())
            # Ensure all fields are present
            return {field: extracted.get(field, None) for field in fields_to_extract}
        except Exception:
            pass

    # Fallback: Try to extract fields line by line
    result = {}
    for field in fields_to_extract:
        pattern = rf"{re.escape(field)}\s*[:\-]\s*(.*)"
        match = re.search(pattern, content, re.IGNORECASE)
        result[field] = match.group(1).strip() if match else None

    return result