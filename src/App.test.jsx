import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App.jsx';
import { workHighlights } from './profileData.js';

describe('App', () => {
  it('renders the page heading', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { level: 1, name: /eric sayer builds sharp product software/i }),
    ).toBeTruthy();
  });

  it('points every in-page link at a section that exists', () => {
    const { container } = render(<App />);
    const hashLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href').startsWith('#'));

    expect(hashLinks.length).toBeGreaterThan(0);
    for (const link of hashLinks) {
      const id = link.getAttribute('href').slice(1);
      expect(container.querySelector(`[id="${id}"]`), `no element with id "${id}"`).not.toBeNull();
    }
  });

  it('opens new-tab links without exposing window.opener', () => {
    render(<App />);
    const newTabLinks = screen.getAllByRole('link').filter((link) => link.target === '_blank');

    expect(newTabLinks.length).toBeGreaterThan(0);
    for (const link of newTabLinks) {
      expect(link.rel).toMatch(/\bnoreferrer\b/);
    }
  });

  it('gives every link an accessible name', () => {
    render(<App />);
    const allLinks = screen.getAllByRole('link');
    const namedLinks = screen.getAllByRole('link', { name: /\S/ });
    expect(namedLinks).toHaveLength(allLinks.length);
  });

  it('labels each work link with its own address', () => {
    render(<App />);
    const linkedRoles = workHighlights.filter((item) => item.href);

    expect(linkedRoles.length).toBeGreaterThan(0);
    for (const { href } of linkedRoles) {
      const host = new URL(href).hostname;
      const link = screen.getByRole('link', { name: new RegExp(host.replaceAll('.', '\\.')) });
      expect(link.getAttribute('href')).toBe(href);
    }
  });

  it('exposes the code sample as a labelled figure', () => {
    render(<App />);
    expect(screen.getByRole('figure', { name: /developer focus code sample/i })).toBeTruthy();
  });

  it('never nests scroll-reveal targets, so each block fades in once', () => {
    const { container } = render(<App />);
    expect(container.querySelectorAll('[data-reveal] [data-reveal]')).toHaveLength(0);
  });

  it('shows every reveal target immediately when reduced motion is preferred', () => {
    const { container } = render(<App />);
    const targets = [...container.querySelectorAll('[data-reveal]')];

    expect(targets.length).toBeGreaterThan(0);
    expect(targets.filter((el) => !el.classList.contains('is-visible'))).toHaveLength(0);
  });
});
