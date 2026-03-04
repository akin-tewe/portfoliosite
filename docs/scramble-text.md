# ScrambleText Component

Character-by-character text reveal animation. Each character cycles through random glyphs before settling on the final letter.

## Usage

```tsx
<ScrambleText text="UX ENGINEER" delay={500} />
```

## Implementation

```tsx
function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState(text.replace(/[^ ]/g, '#'));
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const timeout = setTimeout(() => {
      let iteration = 0;
      intervalId = setInterval(() => {
        setDisplay(
          text.split('').map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
        );
        iteration += 1/3;
        if (iteration >= text.length) {
          clearInterval(intervalId!);
          intervalId = null;
        }
      }, 40);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, delay]);

  return <span>{display}</span>;
}
```

## Parameters

- `text` — The final string to reveal
- `delay` — ms before the animation starts (default: 0)

## Tuning

- `iteration += 1/3` — controls how many characters resolve per tick (lower = slower reveal)
- `40` (setInterval ms) — tick speed
- `chars` — character set used for randomization
