/**
 * Numbers of decimal digits to round to
 */
const scale = 3;

// Default totalLevels fallback until JSON is loaded
let totalLevels = 150;

// Load levels list and update totalLevels dynamically
const List = '/chuddy-clan-demon-list/data/_list.json';

fetch(List)
  .then(res => {
    if (!res.ok) throw new Error(`Failed to fetch levels: ${res.status}`);
    return res.json();
  })
  .then(levelList => {
    totalLevels = levelList.length;
    console.log('Loaded totalLevels:', totalLevels);
  })
  .catch(err => {
    console.error('Failed to load level list:', err);
  });

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @returns {Number}
 */
export function score(rank, percent, minPercent) {
    if (rank > totalLevels) {
        return 0;
    }
    if (rank > totalLevels / 2 && percent < 100) {
        return 0;
    }

    let score = 250 * Math.exp(
      -Math.log(2500) / Math.pow(totalLevels - 1, 1.2) * Math.pow(rank - 1, 1.2)
    ) * (percent / 100);

    score = Math.max(0, score);

    if (percent != 100) {
        return round(score - score / 3);
    }

    return Math.max(round(score), 0);
}

export function round(num) {
    if (!('' + num).includes('e')) {
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
        );
    }
}
