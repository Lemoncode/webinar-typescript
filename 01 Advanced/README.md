# 01 Advanced Typescript features

## typeof

`typeof` operator already exists in JavaScript that can be used with TypeScript as a guard type. See next example:

```ts
function repeatChar(charCode: string | number) {
    let char: string;
    if (typeof charCode === 'string') {
        char = charCode.charAt(0);
    } else {
        char = String.fromCharCode(charCode);
    }

    return char.repeat(5);
}

console.log(repeatChar(97)); // "aaaaa"
```

## instanceof

`typeof` operator already exists in JavaScript that can also be used with TypeScript as a guard type. See next example:

```ts
abstract class Animal {
  constructor(private type) {}
}

class Dog extends Animal {
  constructor() {
    super('dog');
  }

  woof() {
    return 'Woof! woof!';
  }
}

class Cat extends Animal {
  constructor() {
    super('cat');
  }

  meow() {
    return 'Meow! meow!';
  }
}

const cat = new Cat();
const dog = new Dog();

const sayHi = (animal: Animal) => {
  if (animal instanceof Dog) {
    return animal.woof();
  } else if (animal instanceof Cat) {
    return animal.meow();
  } else {
    return '';
  }
};

console.log(sayHi(dog)); // "Woof! woof!"
console.log(sayHi(cat)); // "Meow! meow!"
```


## keyof

Suppose we have a generic function that extract all properties of an object in a collection and we want to type it:

```js
const getPropFromCollection = (collection, prop) => {
  return collection.map((element) => element[prop]);
};
```

We can apply TypeScript generics to ensure first parameter:

```ts
const getPropFromCollection = <O>(collection: O[], prop) => {
  return collection.map((element) => element[prop]);
};
```

For `prop` we can use `keyof` operator to ensure that `prop` is a property of the passed object `O`:

```ts
const getPropFromCollection = <O>(collection: O[], prop: keyof O) => {
  return collection.map((element) => element[prop]);
};
```

See it in action:

```ts
interface Contributor {
  id: number;
  name: string;
  numberOfContributions: number;
  lastContributionDate: Date;
}

const contributors: Contributor[] = [
  { id: 18, name: 'jkalfred', numberOfContributions: 48, lastContributionDate: new Date('2018-01-03 10:06:46') },
  { id: 25, name: 'john01', numberOfContributions: 85, lastContributionDate: new Date('2018-01-08 05:11:32') },
  { id: 46, name: 'peter89', numberOfContributions: 19, lastContributionDate: new Date('2018-01-02 04:27:24') },
];

const getPropFromCollection = <O>(collection: O[], prop: keyof O) => {
  return collection.map((element) => element[prop]);
};

const allNames = getPropFromCollection(contributors, 'name'); // you can only pass 'id', 'name' or 'numberOfContributions' to the second parameter.

const allSurnames = getPropFromCollection(contributors, 'surname'); // this throws a compile error
```

To add the typing return we can use `K extends keyof O` to create a type `K` that we can use to access the type of the used prop:

```ts
const getPropFromCollection = <O, K extends keyof O>(collection: O[], prop: K): O[K][] => {
  return collection.map((element) => element[prop]);
};
```

This way we can know that passing `'id'` as second argument the returned value is a `number[]`:

```ts
const allIds = getPropFromCollection(contributors, 'id'); // allIds is number[]
const allNames = getPropFromCollection(contributors, 'name'); // allNames is string[]
```

## is

Suppose we have a function that returns a CSS `transform` property and we need to type it:

```js
function getCSSTranslateProperty(coords) {
  if (coords.hasOwnProperty('z')) {
    return `translate3d(${coords.x}px, ${coords.y}px, ${coords.z}px)`;
  } else {
    return `translate(${coords.x}px, ${coords.y}px)`;
  }
}
```

As you can see this function needs a coordinates object with `'x'`, `'y'` **and/or** `'z'` property. We can deduce two shapes here: a 2D coordinates object and a 3D coordinates object:

```ts
interface TwoDimensionalCoordinates {
  x: number;
  y: number;
}

interface ThreeDimensionalCoordinates extends TwoDimensionalCoordinates {
  z: number;
}
```

We can create now a new type (if we're going to use it in somewhere else) that represents a 2D or 3D object:

```ts
type CarthesianCoordinates = TwoDimensionalCoordinates | ThreeDimensionalCoordinates;
```

If we type `getCSSTranslateProperty` function we see an error: `z` property is not recognized as a member of CarthesianCoordinates:

```ts
function getCSSTranslateProperty(coords: CarthesianCoordinates): string {
  if (coords.hasOwnProperty('z')) {
    return `translate3d(${coords.x}px, ${coords.y}px, ${coords.z}px)`; // <-- error here
  } else {
    return `translate(${coords.x}px, ${coords.y}px)`;
  }
}
```

This happers because TypeScript can't interpret with that predicate than the True condition resolves to a ThreeDimensionalCoordinates object. Here's where type guards enter. TypeScripty introduces a new operator: `is` and we can use it in this case as a return type if we extract the condition to an other function:

```ts
function isThreeDimensionalCoordinates(coords: CarthesianCoordinates): coords is ThreeDimensionalCoordinates {
  return coords.hasOwnProperty('z');
}
 ```

In this case we say that if that condition is true then `coords` has typeThreeDimensionalCoordinates. We can see that if we implement `isThreeDimensionalCoordinates` method we can now use `z` property inside truthy part of the `if` statement and we get no errors:

```ts
function getCSSTranslateProperty(coords: CarthesianCoordinates): string {
  if (isThreeDimensionalCoordinates(coords)) {
    return `translate3d(${coords.x}px, ${coords.y}px, ${coords.z}px)`;
  } else {
    return `translate(${coords.x}px, ${coords.y}px)`;
  }
}
```

## Mapped Types

TypeScript provides us a set o generic types we can use:

### Partial

Suppose we need to create via JavaScript a new set of CSS rules and apply them via `applyCSSRules` function:

```ts
function applyCSSRules(element, styles) {
  // Some logic here
}
```

TypeScript already has a type with CSS named `CSSStyleDeclaration`, we can use it but there's a problem: we need to write all rules instead of some one:

```ts
function applyCSSRules(element, styles: CSSStyleDeclaration) {
  // Some logic here
}

const newStyles: CSSStyleDeclaration = {
  padding: '10px', // error here, missing property <x>
};
```

We can use generic type `Partial` to write a style declaration without having to write each and every property:

```ts
function applyCSSRules(element, styles: Partial<CSSStyleDeclaration>) {
  // Some logic here
}

const newStyles: Partial<CSSStyleDeclaration> = {
  display: 'flex',
  flexDirection: 'row',
}

applyCSSRules(null, newStyles);
```

### Readonly

Suppose we have an object that receives a config object with constants that we don't want to change:

```js
interface Config {
  VERSION: string;
  API_KEY: string;
}

class App implements IApp {
  config: Config;

  constructor(config: Config) {
    this.config = Object.freeze(config);
  }

  doSomething() { }
}

const App = new App({
  VERSION: '1.3.2',
  API_KEY: 'a4824a4b-e974-40d9-8f1b-fc12c1d738f7',
});
```

With this setup we could accidentally change variables in config:

```ts
class App implements IApp {
  config: Config;

  constructor(config: Config) {
    this.config = Object.freeze(config);
  }

  doSomething() {
    this.config.VERSION = '1'; // Oops! We need to avoid it!
  }
}
```

To avoid this we can use mapped type `Readonly<T>` to convert each property as readonly:

```ts
class App implements IApp {
  config: Readonly<Config>;

  constructor(config: Config) {
    this.config = Object.freeze(config);
  }

  doSomething() {
    this.config.VERSION = '1'; // We can't change it now. It's a readonly/constant property.
  }
}
```

### Pick

Pick is a generic type we can use to create partial objects **having only a set of properties of the original object type**. We can see it clearly in the next implementation:

```ts
interface User {
  id: number;
  name: string;
  surname: string;
}

const pick = <O, K extends keyof O>(keys: K[], obj: O): Pick<O, K> => {
  const copy: any = {};
  keys.forEach(k => {
    copy[k] = obj[k];
  });
  return copy;
}

const user: User = {
  id: 21,
  name: 'John',
  surname: 'Snow',
}

const partialWithOnlyName = pick(['name'], user);
console.log(partialWithOnlyName); // { "name": "John" }
```

The difference between `Pick` and `Partial` is that `Partial` gives us an object with **optional** properties (set to `undefined` by default) and `Pick` gives us an object with **only** the property we specify.

### Record

Record interface ensures the object we create/require has the specified keys **and all keys have the same specified value**.

```ts
const getProp = <O, P extends keyof O>(obj: O, prop: P): O[P] => obj[prop];
const currifiedGetProp = <P extends string>(prop: P) => <T>(obj: Record<P, T>): T => obj[prop];

interface User {
  id: number;
  name: string;
}

const user: User = { id: 33, name: 'John' };
const id = getProp(user, 'id');
console.log(id); // 33
const getId = currifiedGetProp('id');
const id1 = getId(user);
console.log(id1); // 33
```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
