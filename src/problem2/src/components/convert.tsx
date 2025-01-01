/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowLeftRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Button } from './ui/button';
import { useCallback, useEffect, useState } from 'react';
import { useToast } from '../hooks/use-toast';
import { cn, getConversion } from '../lib/utils';
import { ConvertLists } from './convert-lists';

function Convert() {
  const { toast } = useToast();
  const [token, setToken] = useState<TokenPrice[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingConvert, setLoadingConvert] = useState<boolean>(false);
  const [values, setValues] = useState<{
    amount: number | string | null;
    from: TokenPrice | null;
    to: TokenPrice | null;
  }>({
    amount: '',
    from: null,
    to: null,
  });
  const [result, setResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<{
    amount: string | null;
    from: string | null;
    to: string | null;
  }>({
    amount: null,
    from: null,
    to: null,
  });
  const [errorCount, setErrorCount] = useState<number>(1);

  const getToken = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://interview.switcheo.com/prices.json'
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setToken(result);
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description:
          err instanceof Error
            ? err.message
            : 'There was a problem with your request.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const handleChange = (value: string, key: string) => {
    const val =
      key !== 'amount'
        ? JSON.parse(value)
        : value.trim() === ''
          ? value
          : Number(value);
    setValues({
      ...values,
      [key]: val,
    });
    validation(key, val);
  };

  const convert = useCallback(() => {
    if (values.from?.price && values.to?.price && values.amount) {
      setLoadingConvert(true);
      const fromRate = values.from.price;
      const toRate = values.to.price;

      if (
        typeof values.amount === 'number' &&
        typeof fromRate === 'number' &&
        typeof toRate === 'number'
      ) {
        setTimeout(() => {
          setResult(getConversion(fromRate, toRate, values.amount as number));
          setLoadingConvert(false);
        }, 2000);
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'Invalid data type for amount, fromRate, or toRate',
        });
        setLoadingConvert(false);
      }
    }
  }, [values]);

  const validation = useCallback(
    (currentKey: string, value: string | object) => {
      let error = 0;
      const errorMessages: { [key: string]: string } = {};
      const valueKeys: Array<keyof typeof values> = ['amount', 'from', 'to'];

      for (const key of valueKeys) {
        const val = currentKey === key ? value : values[key];
        if (key === 'amount') {
          console.log(val, 'amount', Number(val));

          if (val === '') {
            if (currentKey === key) {
              errorMessages[key] = 'Please enter amount';
            }
            error += 1;
          } else if (isNaN(Number(val))) {
            if (currentKey === key) {
              errorMessages[key] = 'Invalid number';
            }
            error += 1;
          } else {
            errorMessages[key] = '';
          }
        } else {
          if (val === null) {
            if (currentKey === key) {
              errorMessages[key] = 'This field is required';
            }
            error += 1;
          } else {
            errorMessages[key] = '';
          }
        }
      }
      setErrors({
        ...errors,
        ...errorMessages,
      });
      setErrorCount(error);
    },
    [values]
  );

  useEffect(() => {
    if (
      !loadingConvert &&
      result &&
      values.amount &&
      values.from &&
      values.to
    ) {
      convert();
    }
  }, [values]);

  const swap = useCallback(() => {
    setValues({
      ...values,
      from: values.to,
      to: values.from,
    });
  }, [values]);

  return (
    <>
      <Card className="border-none mt-4 px-4s py-8 bg-white dark:bg-neutral-900 relative z-[2] shadow-lg w-full lg:w-[90%]">
        <CardContent>
          <div className="flex items-end w-full lg:gap-8 mt-4 flex-col lg:flex-row">
            <div className="flex flex-col items-start gap-1 w-full lg:w-auto">
              <div className="flex flex-col items-start gap-2 border p-4 rounded-lg border-neutral-300 focus-within:border-primary px-8 h-[92px] w-full lg:w-auto">
                <Label htmlFor="amount" className="text-muted-foreground">
                  Amount
                </Label>
                <div className="flex items-center border border-neutral-300 dark:border-neutral-300 rounded-md overflow-hidden border-none focus-within:border-none w-[90vw] lg:w-[400px]">
                  {values.from && (
                    <span className="flex items-center justify-center px-3 text-gray-500">
                      <img
                        src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${values.from.currency}.svg`}
                      />
                    </span>
                  )}
                  <Input
                    type="text"
                    placeholder="Enter amount"
                    className="flex-1 border-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none"
                    name="amount"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e.target.value, 'amount')
                    }
                  />
                </div>
              </div>
              <div className="text-red-500 h-4">{errors.amount}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 flex-1 relative w-full">
              {['From', 'To'].map((key, i) => (
                <div className="flex flex-col items-start gap-1 flex-1" key={i}>
                  <div className="flex flex-col items-start gap-2 flex-1 border py-4 rounded-lg border-neutral-300 focus-within:border-primary px-2 lg:px-8 w-full h-[92px]">
                    <Label
                      htmlFor={key.toLowerCase()}
                      className="text-muted-foreground pl-3"
                    >
                      {key}
                    </Label>
                    <Select
                      onValueChange={(e: string) =>
                        handleChange(
                          e,
                          key.toLowerCase() as keyof typeof values
                        )
                      }
                      value={
                        values[key.toLowerCase() as keyof typeof values]
                          ? JSON.stringify(
                              values[key.toLowerCase() as keyof typeof values]
                            )
                          : ''
                      }
                    >
                      <SelectTrigger className="w-full border-none focus-within:border-none focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none shadow-none px-4">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {loading ? (
                          <SelectItem value="null" disabled>
                            Loading...
                          </SelectItem>
                        ) : (
                          token?.map(
                            (data, i) =>
                              data.price && (
                                <SelectItem
                                  value={JSON.stringify(data)}
                                  key={i}
                                >
                                  <img
                                    src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${data.currency}.svg`}
                                    className="inline size-5 mr-3"
                                  />{' '}
                                  {data.currency}
                                </SelectItem>
                              )
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="text-red-500 h-4">
                    {errors[key.toLowerCase() as keyof typeof errors]}
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-center absolute inset-0 mx-auto w-fit pb-4">
                <button
                  className="flex items-center justify-center rounded-full border gap-2 p-4 cursor-pointer bg-primary disabled:bg-muted-foreground disabled:cursor-not-allowed"
                  onClick={swap}
                  disabled={!values.from?.price || !values.to?.price}
                >
                  <ArrowLeftRight className="size-6 text-white" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full mt-4">
            <div className="flex flex-col items-start">
              {!loadingConvert &&
                result &&
                values.amount &&
                values.from &&
                values.to && (
                  <>
                    <p className="text-sm text-muted-foreground">
                      {values.amount} {values.from.currency} =
                    </p>
                    <p className="text-xl">
                      <span className="text-primary">{result.toFixed(5)}</span>{' '}
                      {values.to.currency}
                    </p>
                  </>
                )}
            </div>
            <div
              className={cn(
                'flex flex-row items-end gap-4',
                loadingConvert && 'items-center'
              )}
            >
              {loadingConvert ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-loader-circle animate-spin"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              ) : (
                <>
                  {result && values.amount && values.from && values.to && (
                    <Button
                      className="text-white uppercase"
                      onClick={swap}
                      variant="destructive"
                    >
                      Swap
                    </Button>
                  )}
                  <Button
                    className="text-white uppercase"
                    onClick={convert}
                    disabled={errorCount > 0}
                  >
                    Convert
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 mt-10 lg:mt-16 mx-6 w-full lg:w-[90%]">
        {!loadingConvert && (
          <ConvertLists from={values.from} to={values.to} result={result} />
        )}
      </div>
    </>
  );
}

export default Convert;
