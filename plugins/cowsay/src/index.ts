import cowsay from 'cowsay';

export function say(text: string): string {
  return cowsay({ text });
}
