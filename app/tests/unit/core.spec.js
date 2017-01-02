'use strict'
let expect = require('expect')
//let whyNotEqual = require('is-equal/why')

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

let testEnv = require('./testHelper.js')(testContext, 'app/js/core.js')
let script = testEnv.script
let context = testEnv.context

describe('CORE', function() {

  let eventName = "DOMContentLoaded"
  let logInt = "moduleError"
  let evInt = "modelEventCreate"
  let spy = expect.spyOn(testContext.window.document, 'addEventListener').andCallThrough()
  script.runInContext(context)

  it('should init global app object', function(done) {
    expect(testContext.window.app).toBeA('object')
    done()
  })

	let app = context.window.app;

  it(`should add ${eventName} event listener to document`, function(done) {
    expect(spy).toHaveBeenCalled()
    expect(context.window.document[eventName]).toBeA('function')
    done()
  })

	describe('Process', function() {
		it('Should be "start up"', function(done) {
			expect(app.process).toEqual("start up")
			done()
		})
	})

	describe('Model', function() {
		it(`Should exist as object`, function(done) {
			expect(app.model).toBeA('object')
			done()
		})
	})

	describe('Event', function() {
		let events = ["newModel"]
		events.forEach(function(eventName) {
			it(`Should provide ${eventName} event`, function(done) {
				expect(app.event[eventName]).toBeA('string')
				done()
			})
		})
	})

  describe('Interface', function() {
  	let interfaces = {
			log: "log",
			inform: "inform"
		}

    for (let name in interfaces) {
      it(`should implement ${interfaces[name]} interface`, function(done) {
        expect(app[name]).toBeA('function')
        done()
      })
    }

    describe(interfaces.log, function() {
      let consoleSpy = expect.spyOn(testContext.console, 'log')
      let testMessage = "some message"
      let testModule = "testModule"
      let resultMessage = "[ERROR]: <"+testModule+">: "+testMessage
      app[interfaces.log](testModule, testMessage)
      it("should call 'console.log' method with modified message", function(done) {
        expect(consoleSpy).toHaveBeenCalledWith(resultMessage)
        done()
      })
    })
		describe(interfaces.inform, function() {
			let logSpy = expect.spyOn(app, interfaces.log)
			let unknownEvent = "unknown event"
			let someData = "some data"
			it('should log error in case of unknown event', function(done) {
				app[interfaces.inform](unknownEvent, someData)
				expect(logSpy).toHaveBeenCalled()
				done()
			})
			it(`should create new model in case of newModel event`, function(done) {
				let testModel = { name: "newModel"}
				app[interfaces.inform]("NEW_MODEL", testModel)
				expect(app.model.newModel).toExist()
				expect(app.model.newModel).toBe(testModel)
				done()
			})
		})
  })
})
