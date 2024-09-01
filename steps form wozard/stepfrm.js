
        const form = document.getElementById('stepForm');
        const steps = document.querySelectorAll('.step');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        const summary = document.getElementById('summary');
        const progressBar = document.getElementById('progress-bar');
        let currentStep = 1;

        function showStep(stepNumber) {
            steps.forEach(step => {
                step.classList.add('hidden');
            });
            document.querySelector(`[data-step="${stepNumber}"]`).classList.remove('hidden');

            if (stepNumber === 1) {
                prevBtn.classList.add('hidden');
            } else {
                prevBtn.classList.remove('hidden');
            }

            if (stepNumber === steps.length) {
                nextBtn.classList.add('hidden');
                submitBtn.classList.remove('hidden');
                updateSummary();
            } else {
                nextBtn.classList.remove('hidden');
                submitBtn.classList.add('hidden');
            }

            // Update progress bar
            const progress = ((stepNumber - 1) / (steps.length - 1)) * 100;
            progressBar.style.width = `${progress}%`;
        }

        function validateStep(stepNumber) {
            const currentStepElement = document.querySelector(`[data-step="${stepNumber}"]`);
            const inputs = currentStepElement.querySelectorAll('input');
            let isValid = true;

            inputs.forEach(input => {
                if (input.required && !input.value) {
                    isValid = false;
                    showError(input, 'This field is required');
                } else {
                    switch (input.id) {
                        case 'cgpa':
                            if (input.value < 0 || input.value > 5) {
                                isValid = false;
                                showError(input, 'CGPA must be between 0 and 5');
                            } else {
                                hideError(input);
                            }
                            break;
                        case 'email':
                            if (!isValidEmail(input.value)) {
                                isValid = false;
                                showError(input, 'Please enter a valid email address');
                            } else {
                                hideError(input);
                            }
                            break;
                        case 'mobileNumber':
                            if (!isValidPhoneNumber(input.value)) {
                                isValid = false;
                                showError(input, 'Please enter a valid phone number');
                            } else {
                                hideError(input);
                            }
                            break;
                        case 'nin':
                            if (!isValidNIN(input.value)) {
                                isValid = false;
                                showError(input, 'Please enter a valid NIN (11 digits)');
                            } else {
                                hideError(input);
                            }
                            break;
                        default:
                            hideError(input);
                    }
                }
            });

            return isValid;
        }

        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function isValidPhoneNumber(phone) {
            const re = /^\d{11}$/;
            return re.test(phone);
        }

        function isValidNIN(nin) {
            const re = /^\d{11}$/;
            return re.test(nin);
        }

        function showError(input, message) {
            const errorElement = input.nextElementSibling;
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
            input.classList.add('border-red-500');
            input.classList.remove('border-green-500');
        }

        function hideError(input) {
            const errorElement = input.nextElementSibling;
            errorElement.classList.add('hidden');
            input.classList.remove('border-red-500');
            input.classList.add('border-green-500');
        }

        function updateSummary() {
            summary.innerHTML = '';
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
                if (input.type !== 'submit' && input.type !== 'file') {
                    const p = document.createElement('p');
                    p.innerHTML = `<strong>${input.name}:</strong> ${input.value}`;
                    summary.appendChild(p);
                }
            });
        }

        function checkStepCompletion() {
            if (validateStep(currentStep)) {
                if (currentStep < steps.length) {
                    currentStep++;
                    showStep(currentStep);
                }
            }
        }

        function goBack() {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        }

        // Add event listeners to buttons
        nextBtn.addEventListener('click', checkStepCompletion);
        prevBtn.addEventListener('click', goBack);
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (validateStep(currentStep)) {
                alert('Form submitted successfully!');
                form.reset();
                currentStep = 1;
                showStep(currentStep);
            }
        });

        // Initialize form
        showStep(currentStep);
