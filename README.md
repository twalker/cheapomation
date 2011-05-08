#cheapoMation
Cheap in-browser automation for [QUnit](http://docs.jquery.com/Qunit) tests. 
It traverses a list of links on an index page, runs each associated QUnit page 
in an iframe, and reports the results back to the index page. If all tests pass, 
the page will go green, if not, red.

cheapoMation isn't meant to be a robust full test automation suite. It is meant 
to be a quick way to run a collection of in-browser unit tests while belaboring 
over which of the delightful js test automation tools to set up properly and use 
long term (JSTestDriver, Selenium, TestSwarm, etc).

Use cheapoMation right away, but discard it like a pair of smelly socks once 
you've found your true automation tools. 

###To add a QUnit test file to the collection:

* Add an existing or new QUnit test page that includes **cheapoMation.publishDone.js**
* Add a link to the list on the index page.

####For example, to test a file named **polyfills/function.js**

* Create a QUnit test file in **examples/function_test.js**
* Copy **_template.html** as an HTML stub to **examples/function.html**
* Update script references in function.html to the script and it's corresponding test file.
* Add a link to **index.html**
* Browse to **index.html** with your server of choice.
* Spend far too long choosing different red and green colors--since my choices sucked.



