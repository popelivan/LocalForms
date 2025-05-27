# 🔥 Smoke Testing

The following smoke tests verify the critical functionality of the LocalForms application.  
These tests ensure that the application can start, load key UI components, and handle core actions like file upload, chart rendering, and error feedback.

---

## ✅ Test Cases

| Test Case ID | Feature            | Steps to Execute                                   | Expected Result                        | Status |
|--------------|--------------------|----------------------------------------------------|----------------------------------------|--------|
| SMK001       | App Load           | Visit the local app URL                            | Home screen loads without error        | ✅     |
| SMK002       | Upload Button      | Check if the "Browse" button is clickable          | File dialog opens                      | ✅     |
| SMK003       | Drag and Drop      | Drag a valid file into the drop area               | File is selected                       | ✅     |
| SMK004       | File Acceptance    | Upload a valid JSON file                           | File is accepted without error         | ✅     |
| SMK005       | Table Rendering    | Upload a poll with multiple questions              | Questions display in table             | ✅     |
| SMK006       | Chart Rendering    | Upload poll results with numeric data              | Results chart appears                  | ✅     |
| SMK007       | Upload Button UI   | Click Upload with valid input                      | Table/chart appear                     | ✅     |
| SMK008       | File Re-upload     | Upload second valid poll                           | Table/chart update accordingly         | ✅     |
| SMK009       | Unsupported File   | Upload unsupported file type                       | App shows error message                | ✅     |
| SMK010       | No File Selected   | Click Upload with no file selected                 | Alert shown to select a file           | ✅     |
