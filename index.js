const TOOLTIP_ELEMENT_ID = 'gtjwe-tooltip';

function createTooltipElement() {
  const tooltipElement = document.createElement('div');
  tooltipElement.id = TOOLTIP_ELEMENT_ID;
  tooltipElement.style = 'position: absolute; background-color: black; color: white; padding: .1rem .5rem; border-radius: 3px; font-size: 1rem; line-height: 1rem z-index: 100; display: none; transform: translateX(-50%);';
  tooltipElement.textContent = '';
  tooltipElement.dir = 'auto';
  document.getElementsByTagName('body')[0].appendChild(tooltipElement);
}

function getTooltipCoordinate(selection) {
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  const x = rect.left + ((rect.right - rect.left) / 2) + window.scrollX;
  const y = rect.bottom + 5 + window.scrollY;
  return { x, y };
}

function canBeDate(text) {
  // remove extra spaces at the beginning or end:
  text = text.trim();

  if (!/^.{6,30}$/.test(text)) {
    return false;
  }

  const datePatterns = [
    // ISO format dates:
    // "Y-M-D" or "Y/M/D" or "Y.M.D"
    /^\d{4}[\/\-.]\d{1,2}[\/\-.]\d{1,2}$/,

    // Day or Month at first: 
    // "D/M/Y" or "D-M-Y" or "D.M.Y" or etc.
    /^\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4}$/,

    // Month name (full or short) followed by day and year:
    // "M D, Y" or "M D Y"
    /^(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{2,4}$/i,

    // Day followed by month name (full or short) and year:
    // "D M, Y" or "D M Y"
    /^\d{1,2}(?:st|nd|rd|th)?\s+(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?),?\s+\d{2,4}$/i,
  ];

  return datePatterns.some(regex => regex.test(text));
}

function processSelection(selection) {
  // trim, then remove st, nd, rd, th from day numbers if exist:
  const selectionContent = selection.toString().trim().replace(/\b(\d+)(st|nd|rd|th)\b/gi, '$1');

  if (!canBeDate(selectionContent)) return null;

  const theTimestamp = Date.parse(selectionContent);
  if (!theTimestamp) return null;

  const gregorianDate = new Date(theTimestamp);
  if (gregorianDate.getFullYear() < 0) return null;

  return gregorianDate.toLocaleString('fa-IR', { dateStyle: 'long' });
}

function removeTooltip(tooltip) {
  // eslint-disable-next-line no-param-reassign
  tooltip.textContent = '';
  // eslint-disable-next-line no-param-reassign
  tooltip.style.display = 'none';
}

createTooltipElement();

document.onselectionchange = () => {
  const selection = window.getSelection();
  const tooltipElement = document.getElementById(TOOLTIP_ELEMENT_ID);

  const tooltipContent = processSelection(selection);

  if (!tooltipContent) {
    removeTooltip(tooltipElement);
    return;
  }

  const { x, y } = getTooltipCoordinate(selection);

  tooltipElement.textContent = tooltipContent;
  tooltipElement.style.display = 'block';
  tooltipElement.style.left = `${x}px`;
  tooltipElement.style.top = `${y}px`;
};
