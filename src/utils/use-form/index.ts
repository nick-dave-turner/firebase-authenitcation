import React from "react";

type GenericObjectMap<ObjectType> = {
  [KeyType in keyof ObjectType]: ObjectType[KeyType];
};

interface UseFormProps<ObjectType> {
  callback: (
    inputs: GenericObjectMap<ObjectType>
  ) => Promise<{ error?: string }>;
  properties: GenericObjectMap<ObjectType>;
}

export interface UseForm<ObjectType> {
  errorMessage: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSubmit: () => void;
  inputs: GenericObjectMap<ObjectType>;
  isFormValid: boolean;
}

export function useForm<ObjectType>({
  callback,
  properties,
}: UseFormProps<ObjectType>): UseForm<ObjectType> {
  const [inputs, setInputs] = React.useState<ObjectType>(properties);
  const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  React.useEffect(() => {
    const isEmpty = !!Object.values(inputs).some((value) => value === "");
    setIsFormValid(isEmpty);
  }, [inputs]);

  const handleOnChange = React.useCallback(
    ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
      setInputs((prevState) => ({ ...prevState, [name]: value }));
    },
    [setInputs]
  );

  const handleOnSubmit = React.useCallback(() => {
    setErrorMessage("");
    callback(inputs)
      .then(() => setInputs(properties))
      .catch((error) => setErrorMessage(error));
  }, [callback, inputs, properties]);

  return {
    errorMessage,
    handleOnChange,
    handleOnSubmit,
    inputs,
    isFormValid,
  };
}
