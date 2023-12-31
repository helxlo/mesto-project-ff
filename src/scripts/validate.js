const showInputError = (form, input, config) => {
    input.classList.add(config.inputErrorClass)
    const span = form.querySelector(`.${input.id}-error`)
    span.textContent = input.dataset.errorMessage
    span.classList.add(config.errorClass)
}

const hideInputError = (form, input, config) => {
    input.classList.remove(config.inputErrorClass)
    const span = form.querySelector(`.${input.id}-error`)
    span.textContent = ''
    span.classList.remove(config.errorClass)
}

const isValid = (form, input, config) => {
    if (input.validity.patternMismatch) {
        showInputError(form, input, config)
    } else {
        hideInputError(form, input, config)
    }

}

const hasInvalidValue = (inputs) => {
    return inputs.some(input => !input.validity.valid)
}

const disableButton = (button, config) => {
    button.classList.add(config.inactiveButtonClass)
    button.disabled = true;
}

const toggleButtonState = (inputs, button, config) => {
    if (hasInvalidValue(inputs)) {
        disableButton(button, config)
    } else {
        button.classList.remove(config.inactiveButtonClass)
        button.disabled = false
    }
}
//setevent
const setEventListeners = (form, config) => {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector))
    const button = form.querySelector(config.submitButtonSelector)

    toggleButtonState(inputs, button, config);
    form.addEventListener('reset', () => {
        disableButton(button, config)

    })
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            isValid(form, input, config)
            toggleButtonState(inputs, button, config)
        })
    })
};
//main function po idee
const enableValidation = (config) => {

    const forms = Array.from(document.querySelectorAll(config.formSelector));

    forms.forEach((form) => {
        setEventListeners(form, config)
    });
};

export { enableValidation }