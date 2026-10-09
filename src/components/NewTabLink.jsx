/** An anchor that opens in a new tab. `rel="noreferrer"` also implies `noopener`. */
export function NewTabLink(props) {
  return <a target="_blank" rel="noreferrer" {...props} />;
}
