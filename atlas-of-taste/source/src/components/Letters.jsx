// Splits a word into letter spans so each letter can be moved on its own.
export default function Letters({ text }) {
  return <>{[...text].map((c, i) => <span className="ch" key={i}>{c === ' ' ? ' ' : c}</span>)}</>
}
