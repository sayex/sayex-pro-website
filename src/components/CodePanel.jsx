const FOCUS_SNIPPET = [
  ['const', ' focus ', '= ', '"ship useful software";'],
  ['await', ' build({', ' product, api, mobile });'],
  ['return', ' clarity ', '+ ', 'momentum;'],
];

/** Keyword first, value last, everything between in neutral text. */
function tokenColor(index, tokenCount) {
  if (index === 0) return 'text-red';
  if (index === tokenCount - 1) return 'text-blue-soft';
  return 'text-white/76';
}

/** Decorative editor window under the hero photo. */
export function CodePanel() {
  return (
    <figure className="terminal-panel" aria-label="Developer focus code sample">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-red" />
          <span className="h-3 w-3 rounded-full bg-blue" />
          <span className="h-3 w-3 rounded-full bg-white" />
        </div>
        <span className="font-mono text-xs text-white/50">sayex.profile.js</span>
      </div>
      <pre className="overflow-hidden font-mono text-sm leading-7 text-white/78">
        {FOCUS_SNIPPET.map((tokens, row) => (
          <code key={tokens.join('')} className="block">
            <span className="mr-4 text-white/30" aria-hidden="true">
              {String(row + 1).padStart(2, '0')}
            </span>
            {tokens.map((token, index) => (
              <span
                key={`${token}-${index}`}
                className={`code-token ${tokenColor(index, tokens.length)}`}
              >
                {token}
              </span>
            ))}
          </code>
        ))}
      </pre>
    </figure>
  );
}
