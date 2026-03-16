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
        cardContRow.className = `flex items-center justify-between p-4 rounded-xl shadow-sm border transition-all hover:shadow-md ${isChecked ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`;

        // Left Side Content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'flex flex-col gap-1';

        const titleHeading = document.createElement('h3');
        titleHeading.className = `text-lg font-semibold ${isChecked ? 'text-green-800 line-through' : 'text-gray-900'}`;
        titleHeading.textContent = nameofTask;

        const timeSpan = document.createElement('span');
        timeSpan.className = `text-sm font-medium ${isChecked ? 'text-green-600' : 'text-gray-500'}`;
        timeSpan.textContent = `Time: ${timeofTask}`;

        contentDiv.appendChild(titleHeading);
        contentDiv.appendChild(timeSpan);

        // Right Side Controls
        const controlsDiv = document.createElement('div');
        controlsDiv.className = 'flex items-center gap-3';

        // Checkbox Toggle
        const toggleCheck = document.createElement('input');
        toggleCheck.type = 'checkbox';
        toggleCheck.checked = isChecked;
        toggleCheck.className = 'w-5 h-5 text-blue-600 border-gray-300 rounded cursor-pointer focus:ring-blue-500';

        toggleCheck.addEventListener('change', (e) => {
            const checked = e.target.checked;
            if (checked) {
                cardContRow.className = 'flex items-center justify-between p-4 rounded-xl shadow-sm border transition-all hover:shadow-md bg-green-50 border-green-200';
                titleHeading.className = 'text-lg font-semibold text-green-800 line-through';
                timeSpan.className = 'text-sm font-medium text-green-600';
            } else {
                cardContRow.className = 'flex items-center justify-between p-4 rounded-xl shadow-sm border transition-all hover:shadow-md bg-white border-gray-200';
                titleHeading.className = 'text-lg font-semibold text-gray-900';
                timeSpan.className = 'text-sm font-medium text-gray-500';
            }
        });

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        `;
        deleteBtn.className = 'text-gray-400 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50 focus:outline-none';

        deleteBtn.addEventListener('click', () => {
            cardContRow.style.opacity = '0';
            setTimeout(() => {
                if(cardContRow.parentNode) {
                    cardContRow.parentNode.removeChild(cardContRow);
                }
            }, 300);
        });

        controlsDiv.appendChild(toggleCheck);
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