'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
'use strict';

function formatDate(dateStr, fromFormat, toFormat) {
    if (dateStr === '') {
        return '';
    }

    const fromSeparator = fromFormat[3];
    const escapedSeparator = fromSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = dateStr.split(new RegExp(escapedSeparator));

    let parsedYear = { type: '', value: '' };
    let month = '';
    let day = '';

    for (let i = 0; i < 3; i++) {
        const part = parts[i];
        const formatPart = fromFormat[i];
        switch (formatPart) {
            case 'YYYY':
                parsedYear.type = 'YYYY';
                parsedYear.value = part;
                break;
            case 'YY':
                parsedYear.type = 'YY';
                parsedYear.value = part;
                break;
            case 'MM':
                month = part;
                break;
            case 'DD':
                day = part;
                break;
            default:
                break;
        }
    }

    const outputParts = [];
    for (let i = 0; i < 3; i++) {
        const formatPart = toFormat[i];
        let value;
        switch (formatPart) {
            case 'YYYY':
                if (parsedYear.type === 'YYYY') {
                    value = parsedYear.value;
                } else {
                    const paddedYY = parsedYear.value.padStart(2, '0');
                    const yyNum = parseInt(paddedYY, 10);
                    value = yyNum < 30 ? `20${paddedYY}` : `19${paddedYY}`;
                }
                break;
            case 'YY':
                if (parsedYear.type === 'YY') {
                    value = parsedYear.value;
                } else {
                    value = parsedYear.value.slice(-2);
                }
                break;
            case 'MM':
                value = month;
                break;
            case 'DD':
                value = day;
                break;
            default:
                break;
        }
        outputParts.push(value);
    }

    const toSeparator = toFormat[3];
    return outputParts.join(toSeparator);
}

module.exports = formatDate;
