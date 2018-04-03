# train-scheduler

A train scheduling app built with Firebase

## What Does the App Do?

This is a single page application that displays train schedules based on user inputs. User inputs are received via a form submission and stored in a Firebase database. Each train schedule object in the database is then displayed on the page.

The app also calculates the arrival time of the next train based on the current time, the train frequency and the train's first scheduled departure time.

## How Did You Make the App?

The app was made with:

* HTML and [Boostrap 4](https://getbootstrap.com/) to style the page elements
* The [jQuery](https://jquery.com/) library for Javascript to dynamically generate table elements to insert user generated content on the page
* [Firebase](https://firebase.google.com/) to store user submitted data
* [Moment.js](http://momentjs.com/) to display and run calculations for train times.

## What Challenges Did you Encounter?

Figuring out the best way to get the page to reguarly rerresh so that the current time, next arrival time and minutes away update without the user having to refresh the page themself.

Additionally, preventing form submission with no user data is the fields is not functioning in the Javascript as I expect when using `event.PreventDefault()` (user data still gets submitted if one of the fields is empty).

## What's Next?

* Find a method for refreshing numbers and times on the page without the user having to refresh the page themselves or reload the entire page
* Replace the alert with something more elegant like a modal to acknowledge that the information has been uploaded
* Make sure that user data does not get submitted when one of of the form fields is left blank
