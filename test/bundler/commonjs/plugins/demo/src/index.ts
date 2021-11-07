import foo from 'foo';

declare module 'foo' {}

function bar() {
  console.log('Run bar');
  foo();
}
bar();
