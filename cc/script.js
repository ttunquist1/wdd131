function isCardNumberValid(number) {
  // Only one test number is accepted for this example
  return number === '1234123412341234';
}

function displayError(msg) {
  document.querySelector('.errorMsg').innerText = msg;
}

function submitHandler(event) {
  event.preventDefault();
  let errorMsg = '';
  displayError('');

  const cardNumber = document.querySelector('#card-number').value.trim();
  const cardHolder = document.querySelector('#card-holder').value.trim();
  const expMonth = parseInt(document.querySelector('#card-month').value.trim());
  const expYear = parseInt('20' + document.querySelector('#card-year').value.trim()); // assuming "YY" format
  const cvc = document.querySelector('#card-cvc').value.trim();

  // Card number validation
  if (isNaN(cardNumber) || cardNumber.length !== 16) {
    errorMsg += 'Card number must be a 16-digit number.\n';
  } else if (!isCardNumberValid(cardNumber)) {
    errorMsg += 'Card number is not valid.\n';
  }

  // Card holder name validation
  if (!/^[a-zA-Z\s]+$/.test(cardHolder)) {
    errorMsg += 'Card holder name must only contain letters and spaces.\n';
  }

  // Expiration date validation
  const today = new Date();
  const expDate = new Date(expYear, expMonth - 1); // months are 0-based
  if (isNaN(expMonth) || isNaN(expYear) || expMonth < 1 || expMonth > 12) {
    errorMsg += 'Expiration month/year is invalid.\n';
  } else if (expDate < today) {
    errorMsg += 'Expiration date must be in the future.\n';
  }

  // CVC validation
  if (!/^\d{3}$/.test(cvc)) {
    errorMsg += 'CVC must be 3 digits.\n';
  }

  if (errorMsg !== '') {
    displayError(errorMsg);
    return false;
  }

  alert('Payment submitted successfully!');
  return true;
}

// Attach handler to the custom button
document.querySelector('#card-btn').addEventListener('click', submitHandler);
