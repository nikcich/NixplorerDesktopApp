function convertBytes(bytes) {
    const units = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
    let unitIndex = 0;
    let convertedValue = bytes;

    while (convertedValue >= 1024 && unitIndex < units.length - 1) {
        convertedValue /= 1024;
        unitIndex++;
    }

    return `${convertedValue.toFixed(2)} ${units[unitIndex]}`;
}

export default convertBytes;