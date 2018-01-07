# 00 Basics

# Starting to play

You don't need to install anything on your computer to get started with typescript, there are several
online sandboxes that let you play with it, we will use typescript playground.

https://www.typescriptlang.org/play/index.html

Let's start playing with the basics, what do you gain from just using Typescript?

```javascript
let myNumber = 3;

myNumber = "test";

console.log(myNumber);
```
As you can see typescript warns you, "myNumber" is a number and you are trying to assign an string.

You can as well expliclitly type a variable

```javascript
let myNumber : number = null;

myNumber = 3;
myNumber = 'test';

console.log(myNumber);
```

What if you need to accept both types? No prob...

```javascript
let myNumber : (number | string) = null;

myNumber = 3;
myNumber = 'test';

myNumber = {
  id: 2,
  name: 'pepe'
}

console.log(myNumber);
```

Let's define interfaces (yups like in C# or Java):

```
interface ContactInfo {
  email : string;
  phone : string;
}

interface ClientEntity {
  name : string;
  lastname : string;
  gotContactInformation : boolean;
  contactInfo : ContactInfo;
}

const myClient : ClientEntity = {
  name: 'John',
  lastname : 'Doe',
  gotContactInformation : true,
  contactInfo : {
    email : 'john@doe.com',
    phone: '+1348902038',
  }
};
```

What happens if we try to add a new property to myClient? We get an error

One interesting point to note down... javascript code generated, where are my interfaces?

Let's go one step forward, contactInfo is a field that won't be informed in some case (gotContactInformation === false).
In that case we can just add a question mark at the end of contactInfo and this field will be optional.

```diff
interface ClientEntity {
  name : string;
  lastname : string;
  gotContactInformation : boolean;
-  contactInfo : ContactInfo;
+  contactInfo? : ContactInfo;
}
```

Now we can create the following object

```javascript
const myOtherClient : ClientEntity = {
  name: 'John',
  lastname : 'Doe',
  gotContactInformation : false,
};
```

Another interesting topic to cover are classes in typescript we could define clientEntity as something like:

```javascript
class ClientEntity {
  name : string;
  lastname : string;
  gotContactInformation : boolean;
  contactInfo : ContactInfo;

  public constructor() {
    this.name = '';
    this.lastname = '';
    this.gotContactInformation = false;
    this.contactInfo = null;
  }  
}

const myClientEntity = new ClientEntity();
console.log(myClientEntity);
```

Now take a look at javascript generated code (es5), in this case the classes are adding some extra code.

On interesting thing is that we can define private and public members.

```javascript
class ClientEntity {
  name : string;
  private lastname : string;
  gotContactInformation : boolean;
  contactInfo : ContactInfo;

  public constructor() {
    this.name = '';
    this.lastname = '';
    this.gotContactInformation = false;
    this.contactInfo = null;
  }  
}

const myClientEntity = new ClientEntity();
console.log(myClientEntity.lastname);
```
Another interesting thing is that class can implement interfaces

```javascript
interface ContactInfo {
  email : string;
  phone : string;
}

interface IMarketing {
  gotContactInformation : boolean;
  contactInfo : ContactInfo;  
}

class ClientEntity implements IMarketing {
  name : string;
  private lastname : string;
  gotContactInformation : boolean;
  contactInfo : ContactInfo;

  public constructor() {
    this.name = '';
    this.lastname = '';
    this.gotContactInformation = false;
    this.contactInfo = null;
  }  
}
```

We can as well type callback parameters:

```javascript
type MyClickEventHanlder = (info : string) => void;

const clickHandler: MyClickEventHanlder = (info) => {};
```

One feature of typescript that will remind familiar for people that come from languages as
C# or Java are enums. Enums allow us to define a set of named constants. Using enums in our 
code can clarify our intentions.

```typescript
enum Force {
  Dark,
  Light
}

```

By default are numeric values starting in `0` and incrementing by `1`, to the end. We can use as 
well string values. 

```diff
enum Force {
  Dark,
  Light
}

+const jediOrSith = (forceType: Force): void => {
+  if (forceType === Force.Dark) {
+    console.log('Sith');
+  } else if (forceType === Force.Light) {
+    console.log('Jedi');  
+  }
+};

+jediOrSith(Force.Dark);
+console.log(Force.Dark);
``` 


# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
