import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { navItems } from '../profileData.js';
import { SiteHeader } from './SiteHeader.jsx';

function renderHeader() {
  const { container } = render(<SiteHeader />);
  return {
    menuButton: screen.getByRole('button', { name: 'Site menu' }),
    panel: container.querySelector('#mobile-nav'),
  };
}

describe('SiteHeader mobile menu', () => {
  it('starts closed', () => {
    const { menuButton, panel } = renderHeader();
    expect(menuButton.getAttribute('aria-expanded')).toBe('false');
    expect(menuButton.getAttribute('aria-controls')).toBe('mobile-nav');
    expect(panel.hidden).toBe(true);
  });

  it('opens to a link for every section', () => {
    const { menuButton, panel } = renderHeader();
    fireEvent.click(menuButton);

    expect(menuButton.getAttribute('aria-expanded')).toBe('true');
    expect(panel.hidden).toBe(false);
    const links = within(panel).getAllByRole('link');
    expect(links.map((link) => link.getAttribute('href'))).toEqual(navItems.map((i) => i.href));
  });

  it('closes when a link is chosen', () => {
    const { menuButton, panel } = renderHeader();
    fireEvent.click(menuButton);
    fireEvent.click(within(panel).getByRole('link', { name: 'Contact' }));
    expect(panel.hidden).toBe(true);
  });

  it('closes on Escape and returns focus to the menu button', () => {
    const { menuButton, panel } = renderHeader();
    fireEvent.click(menuButton);
    within(panel).getByRole('link', { name: 'Work' }).focus();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(panel.hidden).toBe(true);
    expect(document.activeElement).toBe(menuButton);
  });

  it('closes on a press outside the header, but not inside it', () => {
    const { menuButton, panel } = renderHeader();
    fireEvent.click(menuButton);

    fireEvent.pointerDown(panel);
    expect(panel.hidden).toBe(false);

    fireEvent.pointerDown(document.body);
    expect(panel.hidden).toBe(true);
  });
});
