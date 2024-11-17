#

## Important note :
- the API you gave sometimes returns the wrong letter, for example, the letter 'J' is recognized as 'Ј' (Cyrillic) and the letter 'o' is recognized as 'о' (Cyrillic) and so on.
So Sometimes the result is not accurate and the user get a failed message even if the letter is correct.

```
console.log("ASCII of a real J letter:",'J'.charCodeAt()) // 74
console.log("ASCII of the letter recognized by the API:",'Ј'.charCodeAt()) // 1032 (Cyrillic)
```

```
console.log("ASCII of a real o letter:",'o'.charCodeAt()) // 74
console.log("ASCII of the letter recognized by the API:",'о'.charCodeAt()) // 1032 (Cyrillic)
```
## Todo :
- [ ] Add loading spinner
- [ ] Add error handling
- [ ] Add history
- [ ] test on android