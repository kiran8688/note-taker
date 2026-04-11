document.addEventListener("DOMContentLoaded", () => {
    // DOM Element Selections
    const submitBtn = document.querySelector('#button'); // The 'Add' button to create a new task
    const center = document.getElementById('center-cont'); // The main container where task cards are appended
    const taskInput = document.getElementById('note-task'); // Input field for the task name
    const timeInput = document.getElementById('note-time'); // Input field for the task time
    const checkInput = document.getElementById('check'); // Checkbox to mark task as completed initially
    const mainCheckIcon = document.querySelector('.check-icon'); // Cached reference to the main check icon

    /**
     * Helper function to standardize checkbox styling across the application.
     * It manages the visual state by toggling tailwind classes on the label
     * and managing the visibility of the SVG check icon.
     *
     * @param {HTMLElement} labelElement - The <label> element wrapping the checkbox.
     * @param {HTMLElement} iconElement - The <svg> icon element inside the label.
     * @param {boolean} isChecked - The current checked state.
     * @param {string} hoverClass - The specific hover class to apply when unchecked (e.g., 'hover:bg-gray-100').
     */
    const updateCheckboxStyle = (labelElement, iconElement, isChecked, hoverClass) => {
        if (isChecked) {
            iconElement.classList.remove('hidden');
            iconElement.classList.add('block');
            labelElement.classList.add('bg-blue-500', 'border-blue-500');
            labelElement.classList.remove('border-gray-300', hoverClass);
        } else {
            iconElement.classList.remove('block');
            iconElement.classList.add('hidden');
            labelElement.classList.remove('bg-blue-500', 'border-blue-500');
            labelElement.classList.add('border-gray-300', hoverClass);
        }
    };

    /**
     * Function to handle task creation.
     */
    const createTask = () => {
        // Retrieve and trim input values
        const nameofTask = taskInput.value.trim();
        const timeofTask = timeInput.value.trim();
        const isChecked = checkInput.checked;

        // Validation Logic: Ensure both task name and time are provided before creation
        if (nameofTask === '' && timeofTask === '') {
            alert('Make sure the Name of the task & Time of the Task is entered');
            return;
        } else if (nameofTask === '') {
            alert("Enter name of the task");
            return;
        } else if (timeofTask === "") {
            alert('Enter time of the task');
            return;
        }

        // --- Dynamic DOM Element Creation for Task Card ---
        // Create the main wrapper for the individual task card
        const cardContRow = document.createElement('div');
        cardContRow.className = `group flex items-center justify-between p-4 sm:p-5 rounded-[1.5rem] transition-all duration-300 ease-out bg-white/70 backdrop-blur-md hover:bg-white/90 border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] mb-3 relative overflow-hidden ${isChecked ? 'opacity-60 scale-[0.99] grayscale-[30%]' : 'hover:-translate-y-1'}`;

        // Left Side Content: Contains the checkbox, task name, and time
        const contentDiv = document.createElement('div');
        contentDiv.className = 'flex items-center gap-4 flex-1 z-10';

        // Create Custom Checkbox for the task card
        const checkboxLabel = document.createElement('label');
        checkboxLabel.className = 'flex items-center justify-center cursor-pointer shrink-0 w-5 h-5 border-[1.5px] border-gray-300 rounded hover:bg-gray-100 transition-colors relative shadow-sm';

        const toggleCheck = document.createElement('input');
        toggleCheck.type = 'checkbox';
        toggleCheck.checked = isChecked;
        toggleCheck.className = 'sr-only';

        const checkIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        checkIcon.setAttribute('class', `w-3.5 h-3.5 text-white absolute inset-0 m-auto ${isChecked ? 'block' : 'hidden'}`);
        checkIcon.setAttribute('fill', 'none');
        checkIcon.setAttribute('stroke', 'currentColor');
        checkIcon.setAttribute('viewBox', '0 0 24 24');
        checkIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>';

        checkboxLabel.appendChild(toggleCheck);
        checkboxLabel.appendChild(checkIcon);

        const textDiv = document.createElement('div');
        textDiv.className = 'flex flex-col gap-0.5';

        const titleHeading = document.createElement('h3');
        titleHeading.className = `text-base font-semibold transition-all duration-300 ${isChecked ? 'text-gray-400 line-through' : 'text-gray-900'}`;
        titleHeading.textContent = nameofTask;

        const timeSpan = document.createElement('span');
        timeSpan.className = `text-xs transition-colors flex items-center gap-1 mt-0.5 ${isChecked ? 'text-gray-400' : 'text-gray-500 font-medium'}`;
        timeSpan.innerHTML = `<svg class="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>${timeofTask}`;

        textDiv.appendChild(titleHeading);
        textDiv.appendChild(timeSpan);

        contentDiv.appendChild(checkboxLabel);
        contentDiv.appendChild(textDiv);

        // Right Side Controls: Contains action buttons like Delete
        const controlsDiv = document.createElement('div');
        // Note: The visibility of this container is controlled by the 'group-hover:opacity-100' class.
        // This relies on the 'group' class being present on the parent 'cardContRow' element.
        // This pattern creates a cleaner, minimalist UI typical of trending note-taker applications.
        controlsDiv.className = 'flex items-center ml-4 opacity-0 group-hover:opacity-100 transition-opacity z-10';

        // --- State Management: Handling Check/Uncheck ---
        // Listens for changes on the task card's checkbox to toggle visual completion state
        toggleCheck.addEventListener('change', (e) => {
            const checked = e.target.checked;
            if (checked) {
                cardContRow.className = 'group flex items-center justify-between p-4 sm:p-5 rounded-[1.5rem] transition-all duration-300 ease-out bg-white/80 backdrop-blur-2xl hover:bg-white/90 border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.04)] mb-3 relative overflow-hidden opacity-60 scale-[0.99] grayscale-[30%]';
                titleHeading.className = 'text-base font-semibold transition-all duration-300 text-gray-400 line-through';
                timeSpan.className = 'text-xs transition-colors flex items-center gap-1 mt-0.5 text-gray-400';
            } else {
                cardContRow.className = 'group flex items-center justify-between p-4 sm:p-5 rounded-[1.5rem] transition-all duration-300 ease-out bg-white/80 backdrop-blur-2xl hover:bg-white/90 border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] mb-3 relative overflow-hidden hover:-translate-y-1';
                titleHeading.className = 'text-base font-semibold transition-all duration-300 text-gray-900';
                timeSpan.className = 'text-xs transition-colors flex items-center gap-1 mt-0.5 text-gray-500 font-medium';
            }
            updateCheckboxStyle(checkboxLabel, checkIcon, checked, 'hover:bg-gray-100');
        });

        // Apply initial checkbox styling if the task was created as 'completed'
        if (isChecked) {
            updateCheckboxStyle(checkboxLabel, checkIcon, true, 'hover:bg-gray-100');
        }

        // --- State Management: Handling Task Deletion ---
        // Create Delete Button with trash/close icon SVG
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        `;
        deleteBtn.className = 'text-gray-400 hover:text-red-500 transition-all duration-200 p-2 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-100 transform hover:scale-110 active:scale-95';

        // Event listener to animate and remove the task card from the DOM
        deleteBtn.addEventListener('click', () => {
            cardContRow.style.opacity = '0';
            cardContRow.style.transform = 'translateY(10px)';
            setTimeout(() => {
                if(cardContRow.parentNode) {
                    cardContRow.parentNode.removeChild(cardContRow); // Remove element after animation
                }
            }, 200);
        });

        // Assemble the final task card structure
        controlsDiv.appendChild(deleteBtn);
        cardContRow.appendChild(contentDiv);
        cardContRow.appendChild(controlsDiv);

        // Append the new task card to the main container
        center.appendChild(cardContRow);

        // --- Post-Creation Cleanup ---
        // Reset the input fields for the next task
        taskInput.value = "";
        timeInput.value = "";
        checkInput.checked = false;

        // Reset the visual state of the main input checkbox icon
        updateCheckboxStyle(mainCheckIcon.parentElement, mainCheckIcon, false, 'hover:bg-gray-100');

        // Set focus back to the task input for quick consecutive entry
        taskInput.focus();
    };

    // Event listener for adding a new task via button click
    submitBtn.addEventListener('click', createTask);

    // Event listener for adding a new task via Enter key in input fields
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') createTask();
    });
    timeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') createTask();
    });

    // --- State Management: Main Input Checkbox ---
    // Handle visual toggle for the custom checkbox on the main input form
    if (checkInput) {
        checkInput.addEventListener('change', (e) => {
            updateCheckboxStyle(e.target.parentElement, mainCheckIcon, e.target.checked, 'hover:bg-gray-100');
        });
    }
});
