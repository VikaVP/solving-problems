'use client';

import { getConversion } from '../lib/utils';

export function ConvertLists({
  from,
  to,
  result,
}: {
  from: TokenPrice | null;
  to: TokenPrice | null;
  result: number | null;
}) {
  return (
    from &&
    to &&
    result &&
    ['from', 'to'].map((type, i) => (
      <div className="w-full" key={i}>
        <h3 className="text-primary font-semibold text-2xl my-4">
          Convert from {type === 'from' ? from.currency : to.currency} to{' '}
          {type === 'from' ? to.currency : from.currency}
        </h3>
        <div className="w-full border shadow-sm rounded-lg bg-muted p-0">
          <div className="grid grid-cols-2 p-4 bg-neutral-300 dark:bg-neutral-500 rounded-t-sm">
            <div className="font-bold">
              {type === 'from' ? from.currency : to.currency}
            </div>
            <div className="font-bold">
              {type === 'from' ? to.currency : from.currency}
            </div>
          </div>
          {new Array(10).fill(0).map((_val, iteration) => (
            <div className="grid grid-cols-2 p-4" key={iteration}>
              <div>{iteration === 0 ? 1 : iteration * 5}</div>
              <div className="italic text-primary">
                {getConversion(
                  type === 'from' ? from.price : to.price,
                  type === 'from' ? to.price : from.price,
                  iteration === 0 ? 1 : iteration * 5
                ).toFixed(5)}
              </div>
            </div>
          ))}
        </div>
      </div>
    ))
  );
}
