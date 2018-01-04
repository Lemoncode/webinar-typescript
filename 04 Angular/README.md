# 04 Angular

## We are going to create a basic Angular application, and watch what are the basic aspects that this framework use from TypeScricpt

### 1. Create a new application using angular cli

* Previous we have to install `angular-cli` [install angular-cli](https://cli.angular.io/)

```bash
$ ng new typescript-demo
```

### 2. This will create a complete project structure for us. One of the principal features that we can notice when we satrt a new project in Angular, is that `everything` uses decorators.

```typescript app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
``` 

### 3. But what really are decorators? 

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
