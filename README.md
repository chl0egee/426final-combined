# V2Final426

This was our old front end repo READme ignore this 



Current Functionality: Enter letters using onscreen keyboard Backspace letters Enter guess only once all 5 letters have an entry, green/yellow functionality



Needed Functionality: 
Refine yellow functionality - if already found needs to read as empty/wrong (check for greens first then yellows ig - prob a bit more complicated)

Need to check for completely right answer so user stops entering stuff (going to have to add functionality for next word when backend developed. Could get started on that but not sure exactly what direction to go)

Hint button for chatgpt generated hints (just needs to pop open a closable empty paragraph for right now, could also maybe do through an alert but the comp team seems to dislike alerts) We could use Duke Blue to indicate wrong letters just bc I think that would be funny



Potential Additions: Do we want to filter guesses to make sure they're real words - similar to wordle? Need to discuss how backend is going to see if there would be time Connect keyboard functionality - allow entry of letters, backspace, and enter from keyboard not just onscreen clicking



Notes about operation: Boxes were created through ngFor - their corresponding objects are in guesses.ts. They are labeled g ("guess") + guess # + l ("letter") + letter # The boxes are div elements - user input from keyboard are paragraph elements put into the div Paragraph elements corresponding to a certain box have the same id but with a "p" on the end You'll probably mostly be working with the paragraph elements - checking them against the goalword - but to change the background color you'll probably have to reference the divs

