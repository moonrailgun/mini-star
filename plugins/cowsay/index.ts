import cowsay from 'cowsay';

export function say(text: string) {
  cowsay({ text });
}
