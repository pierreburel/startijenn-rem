export type Input = number | string | Input[] | { [key: string]: Input };

// Return same types as input but recursively cast number as string if unit !== false
export type Output<T, O> = T extends number ? O extends { unit: false } ? T : string : { [K in keyof T]: Output<T[K], O> }

export type To = 'rem' | 'em' | 'px';

export type Options = {
  baseline?: number;
  precision?: number;
  unit?: boolean;
}

export function convert<I extends Input, _, O extends Options>(value: I, to?: To, options?: O): Output<I, O>;

export function rem<I extends Input, O extends Options>(value: I, options?: O): Output<I, O>;

export function em<I extends Input, _, O extends Options>(value: I, baseline: Options['baseline'], options?: Omit<Options, 'baseline'>): Output<I, O>;

export function px<I extends Input, O extends Options>(value: I, options?: Options): Output<I, O>;

export default rem;
