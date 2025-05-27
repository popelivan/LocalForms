# ✅ Manual Test Cases for LocalForms

Ці тести перевіряють ключову функціональність локальної системи опитувань: створення, голосування, перегляд результатів і зміну тем.

---

## 📦 Upload functionality

| Test Case ID | Feature             | Steps to Execute                                | Expected Result                                | Status |
|--------------|---------------------|--------------------------------------------------|------------------------------------------------|--------|
| TC001        | Create Survey       | Enter title, add a question and 2+ options       | Survey saved and visible in vote tab          | ✅ Pass |
| TC002        | Empty Title         | Try to save a survey without a title             | Error shown: "Enter a survey title!"          | ✅ Pass |
| TC003        | Invalid Question    | Add question without options                     | Warning shown, not saved                       | ✅ Pass |
| TC004        | Add Multiple Qs     | Add 3 questions with valid options               | Survey saved correctly                         | ✅ Pass |
| TC005        | Special Characters  | Use special chars in question/answers            | Saved and displayed properly                   | ✅ Pass |

---

## 🎨 UI behavior

| Test Case ID | Feature                | Steps to Execute                                | Expected Result                                | Status |
|--------------|------------------------|--------------------------------------------------|------------------------------------------------|--------|
| TC006        | Navigation             | Switch between tabs (Survey, Vote, Results)      | Only current tab content visible               | ✅ Pass |
| TC007        | Theme Selection        | Choose different themes in Theme tab             | Background/style changes immediately           | ✅ Pass |
| TC008        | Vote UI                | Open voting form and make selections             | Form behaves correctly with radio buttons      | ✅ Pass |
| TC009        | Submit Without Choice  | Submit vote with unanswered question             | Unanswered recorded as -1 or ignored           | ✅ Pass |

## 📊 Results rendering

| Test Case ID | Feature            | Steps to Execute                       | Expected Result                              | Status |
|--------------|--------------------|----------------------------------------|----------------------------------------------|--------|
| TC010        | Results View        | Go to Results tab, pick a survey       | Questions with vote counts displayed clearly | ✅ Pass |
| TC011        | No Votes Yet        | View results of a fresh survey         | All options show "0" votes                   | ✅ Pass |