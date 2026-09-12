import * as React from "react";

export function useToggle(defaultValue = false) {
  const [value, setValue] = React.useState(defaultValue);

  const toggle = React.useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const setTrue = React.useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = React.useCallback(() => {
    setValue(false);
  }, []);

  return { value, toggle, setTrue, setFalse, setValue };
}
