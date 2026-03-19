document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.querySelector('#button');
    const center = document.getElementById('center-cont');
    const taskInput = document.getElementById('note-task');
    const timeInput = document.getElementById('note-time');
    const checkInput = document.getElementById('check');

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
        cardContRow.className = `group flex items-center justify-between p-2 rounded-md transition-all duration-200 ease-in-out border-b border-transparent ${isChecked ? 'opacity-50' : 'hover:bg-gray-50'}`;

        // Left Side Content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'flex items-center gap-4 flex-1';

        // Checkbox Toggle
        const toggleCheck = document.createElement('input');
        toggleCheck.type = 'checkbox';
        toggleCheck.checked = isChecked;
        toggleCheck.className = 'w-5 h-5 text-gray-900 border-gray-300 rounded cursor-pointer focus:ring-gray-900 transition-colors shrink-0';

        const textDiv = document.createElement('div');
        textDiv.className = 'flex flex-col gap-0.5';

        const titleHeading = document.createElement('h3');
        titleHeading.className = `text-base font-medium transition-colors ${isChecked ? 'text-gray-400 line-through' : 'text-gray-900'}`;
        titleHeading.textContent = nameofTask;

        const timeSpan = document.createElement('span');
        timeSpan.className = `text-xs transition-colors ${isChecked ? 'text-gray-400' : 'text-gray-500 font-medium'}`;
        timeSpan.textContent = timeofTask;

        textDiv.appendChild(titleHeading);
        textDiv.appendChild(timeSpan);

        contentDiv.appendChild(toggleCheck);
        contentDiv.appendChild(textDiv);

        // Right Side Controls
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'flex items-center ml-4 opacity-0 group-hover:opacity-100 transition-opacity';

        toggleCheck.addEventListener('change', (e) => {
            const checked = e.target.checked;
            if (checked) {
                cardContRow.className = 'group flex items-center justify-between p-2 rounded-md transition-all duration-200 ease-in-out border-b border-transparent opacity-50';
                titleHeading.className = 'text-base font-medium transition-colors text-gray-400 line-through';
                timeSpan.className = 'text-xs transition-colors text-gray-400';
            } else {
                cardContRow.className = 'group flex items-center justify-between p-2 rounded-md transition-all duration-200 ease-in-out border-b border-transparent hover:bg-gray-50';
                titleHeading.className = 'text-base font-medium transition-colors text-gray-900';
                timeSpan.className = 'text-xs transition-colors text-gray-500 font-medium';
            }
        });

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
        taskInput.focus();
    });
});