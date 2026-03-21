document.addEventListener("DOMContentLoaded", () => {
    /**
     * Updates the styling of a checkbox label and its icon based on the checked state.
     * @param {HTMLElement} label - The label element containing the checkbox.
     * @param {HTMLElement} icon - The icon element (SVG) indicating the checked state.
     * @param {boolean} isChecked - Whether the checkbox is checked.
     * @param {string} hoverClass - The Tailwind hover background class to apply/remove.
     */
    function updateCheckboxStyle(label, icon, isChecked, hoverClass) {
        if (isChecked) {
            icon.classList.remove('hidden');
            label.classList.add('bg-blue-500', 'border-blue-500');
            label.classList.remove('border-gray-300', hoverClass);
        } else {
            icon.classList.add('hidden');
            label.classList.remove('bg-blue-500', 'border-blue-500');
            label.classList.add('border-gray-300', hoverClass);
        }
    }

    const submitBtn = document.querySelector('#button');
    const center = document.getElementById('center-cont');
    const taskInput = document.getElementById('note-task');
    const timeInput = document.getElementById('note-time');
    const checkInput = document.getElementById('check');
    const mainCheckIcon = document.querySelector('.check-icon');

    submitBtn.addEventListener('click', () => {
        const nameofTask = taskInput.value.trim();
        const timeofTask = timeInput.value.trim();
        const isChecked = checkInput.checked;

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

        // Create Task Card Container
        const cardContRow = document.createElement('div');
        cardContRow.className = `group flex items-center justify-between p-2 rounded-md transition-all duration-200 ease-in-out border border-transparent ${isChecked ? 'opacity-50' : 'hover:bg-black/5'}`;

        // Left Side Content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'flex items-center gap-3 flex-1';

        // Custom Checkbox
        const checkboxLabel = document.createElement('label');
        checkboxLabel.className = 'flex items-center justify-center cursor-pointer shrink-0 w-5 h-5 border-2 border-gray-300 rounded hover:bg-gray-200 transition-colors relative';

        const toggleCheck = document.createElement('input');
        toggleCheck.type = 'checkbox';
        toggleCheck.checked = isChecked;
        toggleCheck.className = 'sr-only';

        const checkIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        checkIcon.setAttribute('class', `w-3 h-3 text-white absolute inset-0 m-auto ${isChecked ? 'block' : 'hidden'}`);
        checkIcon.setAttribute('fill', 'none');
        checkIcon.setAttribute('stroke', 'currentColor');
        checkIcon.setAttribute('viewBox', '0 0 24 24');
        checkIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>';

        checkboxLabel.appendChild(toggleCheck);
        checkboxLabel.appendChild(checkIcon);

        const textDiv = document.createElement('div');
        textDiv.className = 'flex flex-col gap-0.5';

        const titleHeading = document.createElement('h3');
        titleHeading.className = `text-[15px] font-medium transition-colors ${isChecked ? 'text-gray-400 line-through' : 'text-gray-900'}`;
        titleHeading.textContent = nameofTask;

        const timeSpan = document.createElement('span');
        timeSpan.className = `text-xs transition-colors ${isChecked ? 'text-gray-400' : 'text-gray-500 font-medium'}`;
        timeSpan.textContent = timeofTask;

        textDiv.appendChild(titleHeading);
        textDiv.appendChild(timeSpan);

        contentDiv.appendChild(checkboxLabel);
        contentDiv.appendChild(textDiv);

        // Right Side Controls
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'flex items-center ml-4 opacity-0 group-hover:opacity-100 transition-opacity';

        toggleCheck.addEventListener('change', (e) => {
            const checked = e.target.checked;
            if (checked) {
                cardContRow.className = 'group flex items-center justify-between p-2 rounded-md transition-all duration-200 ease-in-out border border-transparent opacity-50';
                titleHeading.className = 'text-[15px] font-medium transition-colors text-gray-400 line-through';
                timeSpan.className = 'text-xs transition-colors text-gray-400';
            } else {
                cardContRow.className = 'group flex items-center justify-between p-2 rounded-md transition-all duration-200 ease-in-out border border-transparent hover:bg-black/5';
                titleHeading.className = 'text-[15px] font-medium transition-colors text-gray-900';
                timeSpan.className = 'text-xs transition-colors text-gray-500 font-medium';
            }
            updateCheckboxStyle(checkboxLabel, checkIcon, checked, 'hover:bg-gray-200');
        });

        // Initial checkbox styling
        updateCheckboxStyle(checkboxLabel, checkIcon, isChecked, 'hover:bg-gray-200');

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        `;
        deleteBtn.className = 'text-gray-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-100';

        deleteBtn.addEventListener('click', () => {
            cardContRow.style.opacity = '0';
            cardContRow.style.transform = 'scale(0.98)';
            setTimeout(() => {
                if(cardContRow.parentNode) {
                    cardContRow.parentNode.removeChild(cardContRow);
                }
            }, 200);
        });

        controlsDiv.appendChild(deleteBtn);

        cardContRow.appendChild(contentDiv);
        cardContRow.appendChild(controlsDiv);

        center.appendChild(cardContRow);

        // Reset inputs
        taskInput.value = "";
        timeInput.value = "";
        checkInput.checked = false;

        // Reset main check icon if present
        if (mainCheckIcon) {
            updateCheckboxStyle(mainCheckIcon.parentElement, mainCheckIcon, false, 'hover:bg-gray-100');
        }

        taskInput.focus();
    });

    // Handle main input checkbox toggle
    if (checkInput && mainCheckIcon) {
        checkInput.addEventListener('change', (e) => {
            const icon = e.target.parentElement.querySelector('.check-icon');
            updateCheckboxStyle(e.target.parentElement, icon, e.target.checked, 'hover:bg-gray-100');
            if (e.target.checked) {
                mainCheckIcon.classList.remove('hidden');
                mainCheckIcon.parentElement.classList.add('bg-blue-500', 'border-blue-500');
                mainCheckIcon.parentElement.classList.remove('border-gray-300', 'hover:bg-gray-100');
            } else {
                mainCheckIcon.classList.add('hidden');
                mainCheckIcon.parentElement.classList.remove('bg-blue-500', 'border-blue-500');
                mainCheckIcon.parentElement.classList.add('border-gray-300', 'hover:bg-gray-100');
            }
        });
    }
});
