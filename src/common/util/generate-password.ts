const generatePassword = (length) => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numericChars = '0123456789';
    const specialChars = '!@#$%&';

    const lowercaseChar =
        lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    const uppercaseChar =
        uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    const numericChar =
        numericChars[Math.floor(Math.random() * numericChars.length)];
    const specialChar =
        specialChars[Math.floor(Math.random() * specialChars.length)];

    const allChars =
        lowercaseChars + uppercaseChars + numericChars + specialChars;

    const remainingChars = length - 4;
    let password = lowercaseChar + uppercaseChar + numericChar + specialChar;

    for (let i = 0; i < remainingChars; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    password = password
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');

    return password;
};

export default generatePassword;
