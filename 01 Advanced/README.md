# 01 Advanced Typescript features

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
