const TOOLTIP_ELEMENT_ID = 'gtjwe-tooltip';

function createTooltipElement() {
  const tooltipElement = document.createElement('div');
  tooltipElement.id = TOOLTIP_ELEMENT_ID;
  tooltipElement.style = 'position: absolute; background-color: black; color: white; padding: .1rem .5rem; border-radius: 3px; font-size: 1rem; line-height: 1rem z-index: 100; display: none;';
  tooltipElement.textContent = '';
  document.getElementsByTagName('body')[0].appendChild(tooltipElement);
}

function getTooltipCoordinate(selection) {
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  const x = rect.left + ((rect.right - rect.left) / 2) + window.scrollX;
  const y = rect.bottom + 5 + window.scrollY;
  return { x, y };
}

function processSelection(selection) {
  const selectionContent = selection.toString().trim();

  const theTimestamp = Date.parse(selectionContent);
  if (!theTimestamp) return null;

  return new Date(theTimestamp).toLocaleString('fa').toString().split(', ')[0];
}

createTooltipElement();

document.onselectionchange = () => {
  const selection = window.getSelection();
  const tooltipElement = document.getElementById(TOOLTIP_ELEMENT_ID);

  if (!selection.rangeCount || selection.isCollapsed) {
    tooltipElement.textContent = '';
    tooltipElement.style.display = 'none';
    return;
  }

  const tooltipContent = processSelection(selection);

  if (!tooltipContent) return;

  const { x, y } = getTooltipCoordinate(selection);

  tooltipElement.textContent = tooltipContent;
  tooltipElement.style.display = 'block';
  tooltipElement.style.left = `${x}px`;
  tooltipElement.style.top = `${y}px`;
};
