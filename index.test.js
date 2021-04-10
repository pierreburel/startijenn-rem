const { rem, px, convert } = require('./index.cjs');

function run(input, output, options = {}, func = rem) {
  const result = func(input, options);
  expect(result).toEqual(output);
}

it('Unitless', () => run(
  24,
  '1.5rem'
));

it('Negative', () => run(
  -24,
  '-1.5rem',
));

it('Simple', () => run(
  '24px',
  '1.5rem'
));

it('Multiple values', () => run(
  '5px -10px 1.5rem',
  '0.3125rem -0.625rem 1.5rem'
));

it('Multiple mixed values', () => run(
  '1px solid black',
  '0.0625rem solid black'
));

it('Comma-separated values', () => run(
  '0 0 2px #ccc, inset 0 0 5px #eee',
  '0 0 0.125rem #ccc, inset 0 0 0.3125rem #eee'
));

const variable = '5px';
it('Variable', () => run(
  `${variable} 10px`,
  '0.3125rem 0.625rem'
));

it('Array', () => run(
  [24, '24px', '5px -10px 1.5rem', {a: 24}],
  ['1.5rem', '1.5rem', '0.3125rem -0.625rem 1.5rem', {a: '1.5rem'}]
));

it('Object', () => run(
  {fontSize: 24, margin: '24px', padding: '5px -10px 1.5rem', a: { b: [24] }},
  {fontSize: '1.5rem', margin: '1.5rem', padding: '0.3125rem -0.625rem 1.5rem', a: { b: ['1.5rem']}}
));

it('Changing baseline', () => run(
  '24px',
  '2.4rem',
  {
    baseline: 10
  }
));

it('Changing precision', () => run(
  '16px',
  '1.333rem',
  {
    baseline: 12,
    precision: 3
  }
));

it('Converting to pixels', () => run(
  '1.5rem 24px',
  '24px 24px',
  {},
  px
));

it('Converting to pixels (unitless)', () => run(
  -1.5,
  '-24px',
  {},
  px
));

it('Converting to em', () => run(
  '24px',
  '2em',
  { baseline: '12px' },
  (value, options) => convert(value, 'em', options),
));
