# Note-Taker App

## Overview
This Note-Taker App is a frontend web application designed with a modern, minimalist aesthetic inspired by trending note-taking platforms like Notion. It features a clean off-white and monochrome color palette, providing users with a distraction-free and visually appealing environment for managing tasks.

## Core Functionalities
The application provides the following core capabilities:
- **Task Creation:** Users can add new tasks by entering a task name and specifying an optional time.
- **Task Management (Check/Uncheck):** Each task card includes a custom checkbox. Checking a task grays it out and adds a strikethrough to the text, clearly indicating its completion status. Unchecking restores its active state.
- **Task Deletion:** Users can permanently delete tasks from the list using the delete button (trash/close icon) that appears on hover for each task card.

## Codebase Structure
The project is built entirely using frontend web technologies, keeping the architecture simple and easy to understand:
- **`index.html`:** The main structure of the application. It imports Tailwind CSS via CDN for styling and Google Fonts for typography. It sets up the layout (sidebar, header, input sections, and the main task list container).
- **`scripts/dom-ntake.js`:** The core logic of the application. It handles DOM manipulation, event listeners for the input form, dynamic generation of task cards, and the state management for checking and deleting tasks.
- **`test_script.py`:** A Python script used to run automated tests on the local application to verify its functionality and visual structure.

## How to Run Locally
1. You need Python 3 installed on your machine.
2. In the root directory of the project, start a local HTTP server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open your web browser and navigate to `http://localhost:8000/index.html`.

## How to Test
The project includes a Python test script to verify core functionalities and ensure the UI/UX remains intact. To run the tests:
1. Ensure no other service is using port 8000 (or the script will fail to start its test server).
2. Execute the test script:
   ```bash
   python3 test_script.py
   ```
3. The script will automatically spin up the server, run assertions against the HTML and JS code, and output the result.