const setValueForProps = <V, O extends { [key: string]: any }, K>(value: V) => (obj: O, ...keys: (keyof O)[]) => {
  return keys.reduce((newObj, key) => {
    newObj[key] = value;
  }, {})
}

interface State {
  x: number;
  y: number;
  z: number;
}

const setNull = setValueForProps(null);

