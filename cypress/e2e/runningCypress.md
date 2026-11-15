
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
