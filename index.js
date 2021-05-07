/*
 * Add your JavaScript to this file to complete the assignment.  Don't forget
 * to add your name and @oregonstate email address below.
 *
 * Name: Alexander Prestwich
 * Email: prestwia@oregonstate.edu
 */

/* add event listener to create twit button that unhides modal*/
var newTwitButton = document.getElementById('create-twit-button')
newTwitButton.addEventListener('click', function() {
  toggleHiddenModal()
  clearInputFields()
})

/* add event listener to close modal button that hides modal and clears input*/
var closeModalButton = document.getElementsByClassName('modal-close-button')
closeModalButton[0].addEventListener('click', function() {
  toggleHiddenModal()
  clearInputFields()
})

/* add event listener to cancel twit button that hides modal and clears input */
var cancelTwitButton = document.getElementsByClassName('modal-cancel-button')
cancelTwitButton[0].addEventListener('click', function() {
  toggleHiddenModal()
  clearInputFields()
})

/* function to select and unhide new twit modal and backdrop */
function toggleHiddenModal() {
  /* unhide backdrop */
  var modalBackdrop = document.getElementById('modal-backdrop')
  modalBackdrop.classList.toggle('hidden')
  /* unhide new twit modal */
  var newTwitModal = document.getElementById('create-twit-modal')
  newTwitModal.classList.toggle('hidden')
}

/* function to clear all input text fields in new twit modal */
function clearInputFields() {
  var twitText = document.getElementById('twit-text-input')
  twitText.value = ''
  var twitAuthor = document.getElementById('twit-attribution-input')
  twitAuthor.value = ''
}

/* add event listener to submit twit button */
var submitTwitButton = document.getElementsByClassName('modal-accept-button')
submitTwitButton[0].addEventListener('click', function() {
  var twitText = document.getElementById('twit-text-input').value
  var twitAuthor = document.getElementById('twit-attribution-input').value
  if (twitText == '' || twitAuthor == '') {
    alert('Both Twit Text and Author must be provided.')
  }
  else {
    createNewTwit(twitText, twitAuthor)
    toggleHiddenModal()
    clearInputFields()
  }
})

/*
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
*/
/* function to take user input from modal and create a new twit and add to DOM */
function createNewTwit(twitText, twitAuthor) {
  /* create article twit */
  var article = document.createElement('article')
  article.classList.add('twit')

  /* create div for icon */
  var iconDiv = document.createElement('div')
  iconDiv.classList.add('twit-icon')
  /* create icon i and add to iconDiv */
  var icon = document.createElement('i')
  icon.classList.add('fa')
  icon.classList.add('fa-bullhorn')
  iconDiv.appendChild(icon)
  /* add iconDiv to article */
  article.appendChild(iconDiv)

  /* create div to hold content */
  var contentDiv = document.createElement('div')
  contentDiv.classList.add('twit-content')

  /* create p and text for twit content and add to contentDiv */
  var twitP = document.createElement('p')
  twitP.classList.add('twit-text')
  var twitText = document.createTextNode(twitText)
  twitP.appendChild(twitText)
  contentDiv.appendChild(twitP)

  /* create p and text for twit author and add to contentDiv */
  var authorP = document.createElement('p')
  authorP.classList.add('twit-author')
  var authorA = document.createElement('a')
  authorA.href = '#'
  var authorText = document.createTextNode(twitAuthor)
  authorA.appendChild(authorText)
  authorP.appendChild(authorA)
  contentDiv.appendChild(authorP)
  /* add contentDiv to twit article */
  article.appendChild(contentDiv)
  /* add new twit to twit container to display in DOM */
  var twitContainer = document.getElementsByClassName('twit-container')
  twitContainer[0].appendChild(article)
}


/* search functionality */
/* add event listener to search input field that is type input. this
will allow for live search */
var searchInput = document.getElementById('navbar-search-input')
searchInput.addEventListener('input', function() {
  /* add back deleted twits before next search */
  addBackTwits(deleted)
  /* get text in input field */
  var input = document.getElementById('navbar-search-input').value
  /* change input to lower case to add case insensitivity to search */
  var caseInsensitive = input.toLowerCase()
  /* search DOM and remove non-matching twits */
  searchDOM(caseInsensitive)
})

/* array to store all deleted twits */
var deleted = []

/* function to add deleted twits back to DOM */
function addBackTwits(deleted) {
  /* only do if deleted has elements */
  if (deleted != undefined) {
    /* get twit container */
    var parent = document.getElementsByClassName('twit-container')[0]
    for (i = deleted.length - 1; i >= 0; i--) {
      /* add back twit in previous location using inserBefore */
      var inserted = parent.insertBefore(deleted[i][1], parent.children[deleted[i][0]])
      deleted.pop()
    }
  }
}

/* function to search and remove twits that don't match */
function searchDOM(input) {
  /* get text and authors from dom */
  var texts = document.getElementsByClassName('twit-text')
  var authors = document.getElementsByClassName('twit-author')

  for (i = texts.length - 1; i >= 0; i--) {
    /* get text content within text and author [i] */
    var text = texts[i].textContent
    var author = authors[i].getElementsByTagName('a')[0].textContent
    /* get twit container (used to remove twit from DOM) */
    var twit = texts[i].parentNode.parentNode
    /* check if any text matches search input */
    /* change text to lower case for case insensitivity */
    /* search both text and author using the or-statement */
    if (text.toLowerCase().indexOf(input) > -1 || author.toLowerCase().indexOf(input) > -1) {
      /* twit matches do nothing */
    }
    else {
      /* remove from DOM */
      /* save twit in deleted array */
      var save = [i, twit]
      deleted.push(save)
      /* remove twit from twit container */
      var twitContainer = twit.parentNode
      twitContainer.removeChild(twit)
    }
  }
}
