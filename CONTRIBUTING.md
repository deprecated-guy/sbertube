# For contributors

>**Important**
> It is the based starter kit for creating.

>**Important**
> Wee must crete beautiful candy from this starter-kit

>**Note**
> check the welcome.


>**Note**
> I install TailwindCSS for you. use tailwind if you need it.

>**Note**
> if you need ignore you some files - add this in .gitignore file

>**Important**
> Backend interaction needed link: https://github.com/deprecated-guy/sbertube-api


> **Note**
> read those guideline: https://angular.io/guide/styleguide

> **Note**
> I will add the base ui components. Use this with brain

>**Important**
> if you want to create routing, make this lazy and use guards, which contains in guards directory.

```typescript
	const routes: Routes = [
	{
        path: '',
		loadComonent: () => import('./components/welcome-page/welcome-page.components.ts').then(c => c.WelcomePageComponent), 
		// or if you nned load child routes
		// loadChildren: () => import('./components/routes').then(r => r.routes), 
		// use canActivate: [guardName] if you need the make it guarded
	}
]
```


## Global rules:
1. if you create private field, use the underscore syntax
2. do not use public keyword in fields naming, use protected keyword
3. write normal named methods in class
4. remove all unused fields and constants or unnecessary comments
5. don't be afraid eslint code style hint and not use //@eslint-ignore, use ignore flag eslint - is a very bad idea  
6. please run stylelint **/*.scss if  writing your authored styles
7. please unu constructor minimum times in all project - use inject(), if you need optional dependency providing - use inject(dep, {optional: true})
8. Write code and refactor it. 
9. please declare all newly created directories in tsconfig.json (paths section) and indexing it by creating index.ts

## Commit
1. read [those](https://www.conventionalcommits.org/en/v1.0.0/) 
2. use this convention in your projects and commits
3. I will set up commitlint for you, use this

## CI
I will set up based CI script, but you can modify him.

> **Note**
> if you want to create modal window(this needed in those project) - use Portal, I will already create portal.ts and pulled them in src/app/cdk. 
> if you wand to extend portal... You can do this.. Create outlets and other what you want. 


> **Note**
> git hooks is installed, eslint, lint-staged, prettier and style lint is installed. You can modify files for you best experience.


# Thanks for watching this necessary rules and helping me with creating this project.


# My based setting of eslint

> open .eslintrc.json

# Based prettier settings

> open .prettierrc


```typescript

export class TestClass {
	private _field: type;
}

export class Bar {
    private _httpClient = inject(HttpClient);
	// private _portal = inject(Portal);
    
    
    public gU() {
			return this._httpClient.get<User[]>(url);
		} // this name is don't understandable! What doing this method?
	
	public getAllUsers(): Observablr<User[]> {
        return this._httpClient.get<User[]>(url);
	} // this method return list of users it very simple fot understand
}
```

```typescript
// index.ts
export * from 'file'
// or
export { Some } from 'file'
// or if you need a different naming of your entity
export { Some as OtherName } from 'file'
```



## Extended explanation for public
Why not using public keyword?
because field is already public after creating

