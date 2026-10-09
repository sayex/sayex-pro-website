import { describe, expect, it } from 'vitest';
import { displayUrl } from './displayUrl.js';

describe('displayUrl', () => {
  it.each([
    ['https://github.com/sayex', 'github.com/sayex'],
    ['https://www.linkedin.com/in/ericsayer', 'linkedin.com/in/ericsayer'],
    ['mailto:me@ericsayer.com', 'me@ericsayer.com'],
    ['https://avryq.app', 'avryq.app'],
    ['https://avryq.app/', 'avryq.app'],
    ['http://WWW.Example.com/path//', 'Example.com/path'],
  ])('shortens %s to %s', (href, expected) => {
    expect(displayUrl(href)).toBe(expected);
  });

  it('leaves relative paths alone', () => {
    expect(displayUrl('/Eric_Sayer_Software_Resume.pdf')).toBe('/Eric_Sayer_Software_Resume.pdf');
  });

  it('keeps "www" when it is not a leading subdomain', () => {
    expect(displayUrl('https://example.com/www.txt')).toBe('example.com/www.txt');
  });
});
