export type Input = number | string | Input[] | { [key: string]: Input };

// Return same types as input but recursively cast number as string
export type Output<T> = T extends number ? string : { [K in keyof T]: Output<T[K]> }

export type To = 'rem' | 'em' | 'px';

export type Options = {
  baseline?: number;
  precision?: number;
}

export function convert<Value extends Input>(value: Value, to?: To, options?: Options): Output<Value>;

export function rem<Value extends Input>(value: Value, options?: Options): Output<Value>;

export function em<Value extends Input>(value: Value, baseline: Options['baseline'], options?: Omit<Options, 'baseline'>): Output<Value>;

export function px<Value extends Input>(value: Value, options?: Options): Output<Value>;

export default rem;
