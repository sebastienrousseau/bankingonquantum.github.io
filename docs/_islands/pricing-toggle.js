/*!
 * Kinetic island: billing-period toggle.
 *
 * Progressive enhancement, not replacement. The table this enhances is
 * already complete and correct in the HTML — it shows monthly prices, which
 * is what a visitor without JavaScript sees and what a crawler indexes.
 * This module only adds the control that switches to annual pricing, so
 * there is never a dead control on the page: if the module fails to load,
 * the control was never rendered.
 *
 * Hydration is driven by `<ssg-island hydrate="visible">`, so nothing here
 * runs until the table scrolls into view.
 */

const PERIODS = {
  monthly: { key: 'monthly', label: 'Monthly', suffix: '/user/month' },
  annual: { key: 'annual', label: 'Annual', suffix: '/user/month, billed annually' },
};

/**
 * @param {HTMLElement} root  the <ssg-island> element
 * @param {{saving?: string}} props
 */
export default function hydrate(root, props) {
  const table = root.querySelector('[data-pricing-table]');
  if (!table) return;

  const cells = Array.from(table.querySelectorAll('[data-monthly][data-annual]'));
  if (cells.length === 0) return;

  const saving = (props && props.saving) || '';
  let current = 'monthly';

  /* ---- build the control ------------------------------------------------ */
  // A radiogroup rather than a switch: there are two named, equally valid
  // options, and "off" would not describe annual billing.
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'billing-toggle';

  const legend = document.createElement('legend');
  legend.textContent = 'Billing period';
  fieldset.appendChild(legend);

  const name = `billing-${Math.random().toString(36).slice(2, 8)}`;

  Object.values(PERIODS).forEach((period) => {
    const id = `${name}-${period.key}`;

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = name;
    input.id = id;
    input.value = period.key;
    input.checked = period.key === current;

    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.textContent = period.label;

    input.addEventListener('change', () => {
      if (input.checked) apply(period.key);
    });

    fieldset.append(input, label);
  });

  if (saving) {
    const note = document.createElement('p');
    note.className = 'billing-note';
    note.textContent = saving;
    fieldset.appendChild(note);
  }

  // A polite live region: the prices change without the focus moving, so a
  // screen-reader user gets no other signal that anything happened.
  const status = document.createElement('p');
  status.className = 'visually-hidden';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');

  /* ---- apply ------------------------------------------------------------ */
  function apply(periodKey) {
    const period = PERIODS[periodKey];
    if (!period || periodKey === current) return;
    current = periodKey;

    cells.forEach((cell) => {
      const value = cell.getAttribute(`data-${periodKey}`);
      const amount = cell.querySelector('[data-amount]');
      const suffix = cell.querySelector('[data-suffix]');
      if (amount) amount.textContent = value;
      if (suffix) suffix.textContent = period.suffix;
    });

    status.textContent = `Showing ${period.label.toLowerCase()} pricing.`;
    table.setAttribute('data-period', periodKey);
  }

  root.prepend(fieldset);
  root.appendChild(status);
  table.setAttribute('data-period', current);
}
