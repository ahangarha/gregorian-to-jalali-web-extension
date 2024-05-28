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
  const dateFormatRegex = /^[\S]+?[ /.-][\S]+?[ /.,-]\d{2,4}$/;

  if (/.{6,20}/.test(text)
    // regex to check different date format
    && dateFormatRegex.test(text)
  ) {
    return true;
  }

  return false;
}

function processSelection(selection) {
  const selectionContent = selection.toString().trim();

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
