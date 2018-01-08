# 01 Advanced Typescript features

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


## Guard types

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
# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
