# Microcosm

## Presenters
Presenters are just special React components that are charged with higher levels of responsibility. There are a number of reasons why we make a distinction between them and dumb view components:

- Presenters provide an answer for where to _**keep data operations**_ and _**dispatch application actions**_
- Presenters are a gateway. They keep application concerns outside of the majority of the presentation layer.
- Testing and refactoring becomes a lot easier, because everything in the views path is isolated. Similar to dumb components.