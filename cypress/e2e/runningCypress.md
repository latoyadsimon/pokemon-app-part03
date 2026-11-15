Front-End · Unit 3: End-to-End Testing · Lecture 2 of 2

# Test every feature, with tests that can fail.

pokemon.cy.js: searches, edge cases, and what must NOT happen.

## Run the tests on your laptop

| Command                                             | Does                                               | Use it                              |
| --------------------------------------------------- | -------------------------------------------------- | ----------------------------------- |
| `npm run cy:open`                                 | opens the Cypress app: pick E2E, a browser, a spec | while writing tests: watch them run |
| `npm run cy:run`                                  | runs every spec headless, results in the terminal  | before you push; in CI (unit 9)     |
| `npm run cy:run -- --spec cypress/e2e/home.cy.js` | just one file                                      | fast checks                         |

Green in cy:open, green in cy:run: same tests, two ways to watch.

## Reading a red test

| Cypress says                                         | Usually means                         |
| ---------------------------------------------------- | ------------------------------------- |
| Expected to find element: `#x`, but never found it | wrong selector, or forgot`cy.visit` |
| Not enough / Too many elements found                 | the count in`have.length`is off     |
| The chainer `…` was not found                     | a typo in the assertion name          |
| cy.visit() failed trying to load                     | app not running, or baseUrl wrong     |
| Timed out retrying after 4000ms                      | it never became true within 4 s       |

The first line of the error tells you which of these it is.

## Homework, Part I

1. **Pokémon Theme Team Tests** : "Go back to your Pokémon Theme Team project and add a Cypress test suite that will be capable of rendering the Home page and ensure it exists."

Part II comes with lecture 2. Links are on the class site.

## Test what the user sees, not how the code works

### Test this

"Search Bulbasaur → its card appears with its picture"

### Not this

"generateCard was called", "the div has class card"

Then the tests survive a rewrite: unit 4 replaces generateCard, and these tests stay green.

## Our features → our tests

| The app…                           | Test                                               |
| ----------------------------------- | -------------------------------------------------- |
| shows a card for a search           | should render a Pokemon card for the user's search |
| can show many cards                 | should render MULTIPLE Pokemon cards               |
| clears the box after a search       | clears the input after a search                    |
| ignores an empty search             | does nothing on an empty search                    |
| never draws a card twice            | does not add the same Pokemon twice                |
| tells you when a name doesn't exist | alerts when a Pokemon does not exist               |

One test per behaviour, named like a sentence.

## Anatomy of a test

| Piece                                         | Means                                           |
| --------------------------------------------- | ----------------------------------------------- |
| `beforeEach(() => { … })`                  | runs before**every**test                  |
| `it('should have a heading', () => { … })` | one test: a sentence about the app              |
| `cy.visit('/')`                             | open baseUrl + "/"                              |
| `cy.get('header')`                          | find elements (CSS selector), waiting up to 4 s |
| `.should('be.visible')`                     | what must be true (retried until it is)         |

## The commands and assertions we use

| Command                 | Does                | Assertion                                    | Checks          |
| ----------------------- | ------------------- | -------------------------------------------- | --------------- |
| `.type('x{enter}')`   | types, then Enter   | `be.visible`                               | on screen       |
| `.click()`            | clicks              | `have.length, n`                           | how many        |
| `.children()`         | the elements inside | `have.value, v`                            | an input's text |
| `cy.contains('text')` | finds by text       | `have.attr, 'src'`+`.and('include', …)` | an attribute    |

Find with ids we planned (#bulbasaur-card), not with styling classes.

## Reading a red test

1. **Which test?** The ✗ line names it
2. **Which line?** The message names the selector or assertion
3. **Test wrong or app wrong?** Do it by hand in the browser
4. Fix the one that is wrong, run again

A red test is information, not a disaster.

## Break it on purpose

| Delete this line in App.jsx                                    | This test must go red                |
| -------------------------------------------------------------- | ------------------------------------ |
| `if (!name) return`                                          | does nothing on an empty search      |
| `if (document.getElementById(`${data.name}-card`)) return` | does not add the same Pokemon twice  |
| `alert("Pokemon Does not Exist")`                            | alerts when a Pokemon does not exist |

## Homework, Part II

1. **Pokémon Theme Team Tests** : "Go back to your Pokémon Theme Team (or To-Do List React) project and add different spec files, each one dedicated to testing an independent feature of your project."

Keep the tests to what exists: rendering the page and interacting with forms/requests.



Front-End · Unit 4: React Hooks · Lecture 1 of 2

# State: React redraws the page for you.

The Pokemon page moves from DOM code to useState, and the tests prove nothing broke.





From today: red, green, then tidy

1. write the test: red
   →
2. build until green
   →
3. tidy, still green
   The test describes the feature before the code exists.


## Reading useState

```
const [heading, setHeading] = useState('Pokemon Project')
```

| Part                            | Means                                                  |
| ------------------------------- | ------------------------------------------------------ |
| `useState('Pokemon Project')` | make state; the first value is**'Pokemon Project'**    |
| `heading`                     | the value**now**(this render)                    |
| `setHeading`                  | the function that changes it and re-renders            |
| `[ , ]`                       | array destructuring: name the two things it gives back |

Pick the first value = what the page shows first: '' · 0 · [].



## Why setCount((count) => count + 1)?

| Code                          | Two updates before React renders | Result |
| ----------------------------- | -------------------------------- | ------ |
| `setCount(count + 1)`×2    | both read the same old count (0) | 1      |
| `setCount((c) => c + 1)`×2 | each gets the latest value       | 2      |

New value based on the old one? Pass a function.




## Never change state in place

| Want to…  | Not this (same array)  | This (a new array)                                         |
| ---------- | ---------------------- | ---------------------------------------------------------- |
| add        | `list.push(x)`       | `[...list, x]`                                           |
| remove     | `list.splice(i, 1)`  | `list.filter((p) => p.id !== id)`                        |
| change one | `list[0].name = 'x'` | `list.map((p) => p.id === id ? { ...p, name: 'x' } : p)` |

React notices a new array, not a changed old one.




## Mental model

* State is the  **truth** ; the page is drawn from it
* Events call setters; setters schedule a render
* Lists: `.map` with a `key`, new arrays to change them
* Tests describe what users see, so they survive rewrites

Change data, not the DOM.


## Homework, Part I

1. **Mute Button**
2. **React Vowels**

Practice: **Fix it** → Unit 4 · Lecture 1 ([fixit.html?lesson=hooks-usestate](https://kabeier.github.io/intro-react/fixit.html?lesson=hooks-usestate)), problems 1–6.

Part II comes with lecture 2. Links are on the class site.



Front-End · Unit 4: React Hooks · Lecture 2 of 2

# useEffect: work that happens after the page is drawn.

Logging, a side effect on the page, and loading Pikachu when the app opens.



## The dependency array decides when

| Array       | Runs after                                   | Use it for                          |
| ----------- | -------------------------------------------- | ----------------------------------- |
| `[]`      | the first render only                        | start-up work: load data            |
| `[count]` | the first render, and whenever count changes | keep something in sync with a value |
| (no array)  | every render                                 | rarely what you want                |

List every value the effect reads.



## Homework, Part II

1. **Reading: Beginning React.js** (Chapter 10)
2. **Refactor Previous Assignments** : "Refactor yesterday's assignments to utilize useState and useEffect"

Links are on the class site.
