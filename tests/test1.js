
browser.driver.ignoreSynchronization = true

describe('angularjs homepage todo list', function() {
  it('should add a todo', function() {
    browser.driver.get ('http://joshferge.github.io/Defibrillator-Simulator/Tutorial.html?testnum=5&sess=-1&user=undefined');

    browser.driver.wait(function() {
     return browser.driver.findElement(by.id('OnOff'))
              .then(function(elem) {
                elem.click();
                return expect(browser.driver.findElement(by.id('OnOff')).src == "assets/LifePakOnOn.png")
                
              });
  }, 10000);

  });
});