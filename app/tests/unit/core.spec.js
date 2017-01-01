'use strict'
let expect = require('expect')
let fs = require('fs')
let path = require('path')
let testModule = fs.readFileSync(path.resolve('app/js/core.js'))
const vm = require('vm')
const testContext = {
  window: {
    document: {
      //addEventListener: expect.createSpy()
      addEventListener: function(name, listener) {
        this[name] = listener
      }
    }
  },
  console: {
    log: function() {}
  }
}
const script = new vm.Script(testModule.toString())
const context = new vm.createContext(testContext)

describe('CORE', function() {

  let eventName = "DOMContentLoaded"
  let logInt = "moduleError"
  let evInt = "modelEventCreate"
  let interfaces = ["moduleError", "modelEventCreate"]
  let spy = expect.spyOn(testContext.window.document, 'addEventListener').andCallThrough()
  script.runInContext(context)

  it('should init global app object', function(done) {
    expect(testContext.window.app).toBeA('object')
    done()
  })

  it(`should add ${eventName} event listener to document`, function(done) {
    expect(spy).toHaveBeenCalled()
    expect(context.window.document[eventName]).toBeA('function')
    done()
  })

  describe('Interface', function() {

    interfaces.forEach(function(name) {
      it(`should implement ${name} interface`, function(done) {
        expect(context.window.app[name]).toBeA('function')
        done()
      })
    })

    describe(interfaces[0], function() {
      let consoleSpy = expect.spyOn(testContext.console, 'log')
      let testMessage = "some message"
      let testModule = "testModule"
      let resultMessage = "[ERROR]: <"+testModule+">: "+testMessage
      context.window.app[interfaces[0]](testModule, testMessage)
      it("should call 'console.log' method with modified message", function(done) {
        expect(consoleSpy).toHaveBeenCalledWith(resultMessage)
        done()
      })
    })

  })
  
})
