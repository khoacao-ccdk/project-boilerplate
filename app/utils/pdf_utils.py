import os
from typing import Optional, List
from pdf2image import convert_from_path
import pytesseract

def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract text from a PDF file using OCR (pytesseract).
    
    Args:
        file_path: Path to the PDF file
        
    Returns:
        str: Extracted text from the PDF file
    """
    text = ""
    # Convert PDF pages to images
    images = convert_from_path(file_path)
    for image in images:
        page_text = pytesseract.image_to_string(image)
        if page_text:
            text += page_text + "\n"
    return text
