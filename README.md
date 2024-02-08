# Assignment 3


## 1. Support inserting new twits

First, you'll add some functionality to the Tweeter page to allow the user to create new twits on the client.  This should work as follows:

1. Clicking on the red "create twit" button should display a modal that allows you to write a new twit.  The modal (along with a backdrop that goes behind it to shade the underlying page while the modal is displayed) are both already included in the HTML code, so you don't have to create them from scratch, but they are hidden when the page is first loaded.  Clicking the red "create twit" button should un-hide them.  You'll have to examine the HTML to figure out the relevant IDs/classes to use to accomplish this.

2. When the modal is open, clicking the modal close button (the small "X" in the upper-right corner) or the modal cancel button (the one in the modal footer that says "Cancel") should close the modal by re-hiding it and the backdrop.  When the modal is closed, the values of all of the input fields should be cleared so they don't appear the next time the modal is opened.

3. When the modal is open, clicking the modal accept button (the one in the modal footer that says "Create Twit") should close the modal and generate a new twit that is placed inside the twit container *after* all of the other existing ones.  The new twit should match the structure of the existing twits so it is styled correctly.  Here is what the structure of the twit should look like:

    ```
    <article class="twit">
      <div class="twit-icon">
        <i class="fa fa-bullhorn"></i>
      </div>
      <div class="twit-content">
        <p class="twit-text">
          <--! Put the twit text entered by the user here. -->
        </p>
        <p class="twit-author">
          <a href="#"><--! Put the twit author entered by the user here. --></a>
        </p>
      </div>
    </article>
    ```

    **Importantly, you should not use `innerHTML` to generate DOM content directly from user-input content, since this opens up a vulnerability to cross-site scripting attacks. You must ensure that user-input content is safely added into the DOM.**

    When the new twit is created and the modal is closed, the values of all of the input fields should be cleared so they don't appear the next time the modal is opened.

4. If the user clicks the modal accept button while either of the input fields is blank, the user should be alerted (using the [`alert()` function](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)), and the modal should be kept open until the user either closes/cancels it or provides values for both input fields.  A new twit should not be created if the user hasn't specified values for both fields.

## 2. Support twit searches

When the user enters a search query into the search box in the navbar and clicks the search button (the little magnifying glass in the navbar), any twits whose text or author don't contain the specified search query should be removed from the DOM (*completely* removed from the DOM, not just hidden), leaving only the ones that match the search query being displayed.  Importantly, your search should be case insensitive.  For example, if the user enters the string "abc" in the search box, twits containing all of the following substrings should be considered as matching the search query: "abc", "ABC", "Abc", "aBC", etc.  In addition, the search query should be matched all text within the twits, including both the twit text and the twit author.

In addition, for full credit, you must implement both of the following features:

  * **Enable re-searching** - If the user changes the search query and hits the search button, the search should be performed over all of the original twits and any newly added ones.  This means that twits that were removed from the DOM because of a previous search might have to be re-added back into the DOM.  If the user clears the search term completely, all of the original twits and any newly added ones should be displayed again.  In all cases, the twits should always remain in the same order relative to each other.

  * **Enable live search** - Hook the search box up so that the search results are updated with each character the user types, even without hitting the search button.  In this case, the search results should behave as described just above, with twits being re-added into and removed from the DOM as appropriate.  In other words, each new character inserted or deleted could potentially result in a change to the displayed twits.

