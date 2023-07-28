function maskLicenseNumberValue(licenseNumber) {
    if (!licenseNumber) return ''; // Return empty string if license number is not provided
    const maskedNumber = licenseNumber.replace(/.(?=.{4})/g, '*');
    return maskedNumber;
}

module.exports = {
    maskLicenseNumber: maskLicenseNumberValue,
};