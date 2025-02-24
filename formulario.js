const formElements = {
    userInput: document.querySelector('#username'),
    password: document.querySelector('#password'),
    textInput: document.querySelector('#textinput'),
    checkboxInput: document.querySelector('#remember'),
    sliderInput: document.querySelector('#slider'),
    radioButtons: document.querySelectorAll('input[name="selection"]'),
    dropdownSelected: document.querySelector('.dropdown-selected'),
    dropdownList: document.querySelector('.dropdown-list'),
    dropdownItems: document.querySelectorAll('.dropdown-item'),
    dropdown: document.querySelector('.dropdown'),
    saveButton: document.querySelector('.next-btn'),
    cancelButton: document.querySelector('.cancel-btn'),
    textSlider: document.querySelector('.text-slider'),
};

//--Dropdown style
formElements.dropdownSelected.addEventListener('click', () => {
    formElements.dropdownList.classList.toggle('show');
});


formElements.dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        formElements.dropdownSelected.textContent = item.textContent;
        formElements.dropdownList.classList.remove('show');
    });
});


document.addEventListener('click', (event) => {
    if (!formElements.dropdown.contains(event.target)) {
        formElements.dropdownList.classList.remove('show');
    }
});
//--Dropdown style

//slider-event
formElements.sliderInput.addEventListener('click', () => {
    if (formElements.sliderInput.checked) {
        formElements.textSlider.textContent = "On";
    } else {
        formElements.textSlider.textContent = "Off";
    }

});

function showError(input, message) {
    let errorMessage = input.nextElementSibling;

    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
        errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message');
        input.parentNode.insertBefore(errorMessage, input.nextSibling);
    }

    errorMessage.textContent = message;
    input.classList.add('error');
}

function removeError(input) {
    let errorMessage = input.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains('error-message')) {
        errorMessage.remove();
    }
    input.classList.remove('error');
}

function getFormValues() {
    let isValid = true;
    let formData = {};

    ['userInput', 'password', 'textInput'].forEach(field => {
        const input = formElements[field];

        if (input.hasAttribute('required') && input.value.trim() === "") {
            showError(input, `* Este campo é de preenchimento obrigatório.`);
            isValid = false;
        } else {
            removeError(input);
            formData[input.name] = input.value.trim();
        }
    });

    formData['remember'] = formElements.checkboxInput.checked;

    formData['slider'] = formElements.sliderInput.checked ? "On" : "Off";

    const selectedRadio = [...formElements.radioButtons].find(radio => radio.checked);
    formData['radioSelection'] = selectedRadio ? selectedRadio.id : "Nenhuma seleção";

    formData['dropdown'] = formElements.dropdownSelected.textContent.trim();

    return { formData, isValid };
}

function cleanValues(){
    formElements.userInput.value = "";
        formElements.password.value = "";
        formElements.textInput.value = "";
        formElements.checkboxInput.checked = false;
        formElements.sliderInput.checked = false;

        if (formElements.textSlider) {
            formElements.textSlider.textContent = "Off";
        }

        formElements.radioButtons.forEach(radio => radio.checked = false);

        if (formElements.dropdownSelected) {
            formElements.dropdownSelected.textContent = "Dropdown option";
        }
}

document.addEventListener('DOMContentLoaded', () => {
    formElements.saveButton.addEventListener('click', () => {
        const { formData, isValid } = getFormValues();

        if (isValid) {
            console.log("Dados do formulário:", formData);
            alert("Formulário enviado com sucesso!");
            cleanValues()
        }
    });

    Object.values(formElements).forEach(input => {
        if (input.tagName === "INPUT") {
            input.addEventListener('input', () => removeError(input));
        } else if (input.tagName === "DIV" && input.classList.contains('dropdown-selected')) {
            input.addEventListener('click', () => removeError(input));
        }
    });

    formElements.cancelButton.addEventListener('click', () => {
        cleanValues()
        const errorMessages = document.querySelectorAll('.error-message');
        if (errorMessages.length > 0) {
            errorMessages.forEach(error => error.remove());
        }

        Object.values(formElements).forEach(input => {
            if (input && input.classList) {
                input.classList.remove('error');
            }
        });

    });
});
