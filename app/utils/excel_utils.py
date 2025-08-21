import openpyxl

def extract_text_from_excel(file_path: str) -> str:
    """
    Extract text from an Excel (.xlsx) file.
    Returns all cell values as a single string.
    """
    wb = openpyxl.load_workbook(file_path, data_only=True)
    text = ""
    for sheet in wb.worksheets:
        for row in sheet.iter_rows(values_only=True):
            row_text = [str(cell) for cell in row if cell is not None]
            if row_text:
                text += "\t".join(row_text) + "\n"
    return text