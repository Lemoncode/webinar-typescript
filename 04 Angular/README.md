# 04 Angular

## We are going to create a basic Angular application, and watch what are the basic aspects that this framework use from TypeScricpt

### References:

* https://www.sitepoint.com/javascript-decorators-what-they-are/
* https://www.typescriptlang.org/docs/handbook/decorators.html
* http://www.sparkbit.pl/typescript-decorators/
* http://blog.wolksoftware.com/decorators-reflection-javascript-typescript

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

* In its simplest form, a decorator is simply a way of wrapping one piece of code with another – literally “decorating”.
* They are a pattern to make multiple diifferrent kingd of classes that are not related shared this common code without inherit from a common class.
* In JavaScript we can achieve this behavior by usin HOF. But we have to think about classes an properties, where apply this could be really tough.
* In Angular the decorators serve as well for meta-data purpose, this way Angular knows how to handle our code.
* Decorators are an experimental feature in TypeScript.

### 4. For exmaple lets create a simple service in Angular and watch how Angular deals with it.

* Place `bash` in `typescript-demo/src/app`

```bash
$ ng generate service lemoncoder
```

* Remove `lemoncoder.service.spec.ts`
* We have created a new service, notice that Angular-CLI creates the new service with a decorator over the class.

### 5. Lets edit this code, so give to us mock data.

```diff lemoncoder.service.ts
import { Injectable } from '@angular/core';

@Injectable()
export class LemoncoderService {
  constructor() { }
+  getCoder(name) {
+    return {
+      login: 'JaimeSalas'
+    };
+  }
}
```

* If we want to use this service we have to register this new service.

```diff app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

+import { LemoncoderService } from './lemoncoder.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
+    LemoncoderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

### 6. Now with this on place lets use it.

```diff app.component.ts
-import { Component } from '@angular/core';
+import { Component, OnInit } from '@angular/core';
+import { LemoncoderService } from './lemoncoder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
+  login: string;
+  constructor(private lemoncoderService: LemoncoderService) {}
-  title = 'app works!';
+  ngOnInit(): void {
-    throw new Error("Method not implemented.");
+    this.login = this.lemoncoderService.getCoder('').login;
+  }
}
```

```diff app.component.html
<h1>
-  {{title}}
+  Retrieve user: {{login}}
</h1>
```

* Angular will inject for us the service.
* The use of private `keyword` generates a private property so we can acces the service without declaring this variable. This syntactic sugar comes from TypeScript.

* We can run the application and watch if this works.

```bash
npm start
```

### 6. The interisting part is that if we remove `@Injectable()` from `lemoncoder.service.ts`, this still working.

```diff
import { Injectable } from '@angular/core';

-@Injectable()
export class LemoncoderService {
  constructor() { }

  getCoder(name: string) {
    return {
      login: 'JaimeSalas'
    };
  }
}

``` 
* What the hell? Angular use this decorator to get the track of dependencies that this service could have. It's using metadata.

### 7. Lets add a dependency with a external service.

```diff app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
-import { HttpModule } from '@angular/http';
+import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { LemoncoderService } from './lemoncoder.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
-    HttpModule
+    HttpClientModule
  ],
  providers: [
    LemoncoderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

```diff lemoncoder.service.ts
import { Injectable } from '@angular/core';
+import { HttpClient } from '@angular/common/http';
+import { Observable } from 'rxjs/Observable';
+import { map } from 'rxjs/operators';


// @Injectable()
export class LemoncoderService {
-  constructor() { }
+  constructor(private http: HttpClient) { }

-  getCoder(name: string) {
+  getCoder(name: string): Observable<string> {
+    return this.http.get(`https://api.github.com/users/${name}`)
+      .pipe(
+        map((result: any) => result.login)
+      );
-    return {
-       login: 'JaimeSalas'
-    };
  }
}

```

```diff app.component.ts
import { Component, OnInit } from '@angular/core';
import { LemoncoderService } from './lemoncoder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  login: string;
  constructor(private lemoncoderService: LemoncoderService) {}

  ngOnInit(): void {
-    this.login = this.lemoncoderService.getCoder('').login;
+    this.lemoncoderService.getCoder('JaimeSalas')
+      .subscribe((login) => this.login = login);
  }
}

```

* If we run this will get an error from `Angular`, because we have to use the `@Injectable()` decorator.

```diff lemoncoder.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';


+@Injectable()
export class LemoncoderService {
  constructor(private http: HttpClient) { }

  getCoder(name: string): Observable<string> {
    return this.http.get(`https://api.github.com/users/${name}`)
      .pipe(
        map((result: any) => result.login)
      );
  }
}

```

# About Lemoncode

We are a team of long-term experienced freelance developers, established as a group in 2010.
We specialize in Front End technologies and .NET. [Click here](http://lemoncode.net/services/en/#en-home) to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
