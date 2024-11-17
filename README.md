# Important note :
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
- [x] Add loading spinner
- [x] Add error handling
- [ ] Improve error handling
- [x] Add history
- [x] test on android
- [x] add refresh button on letter
- [x] rework navbar design