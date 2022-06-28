# node-testing

## body parser 

https://semtax.tistory.com/7


## TDD (test driven development, first test code and then real code) 

    * Reducing debugging time 
    
    * Buidling more stable application 
    
    * Easy to advance and improve application without error or internal bug
    
## Testing category 

### 1. Unit Test 

> Unit test is performed by the developer and tests the units of code (components) 
they have made. It is a test method to test the individual units of the source code and check whether 
they are ready for use. Since bugs are identified in the early stages of the development life cycle, 
the cost of bug modification may be reduced. Simply put, a unit test is another method 
of testing a method.


**Unit Test prerequisite**

1. Independent (This is because the test results may vary depending on the condition of the target on which the test relies)
2. No tests should depend on other tests.
3. Isolated, When the test subject relies on other component such as AJAX, Axios, local storage, Database, should be replaced with **mock function**. 


**Why Unit Test ?**

1. If the program is large and other resources such as a database are needed, it is difficult to execute code easily in a local environment. Developers can quickly make unit tests to ensure that their code is working normally. 

2. Prevent bugs from occurring in other classes with dependencies.


In this project, **[Jest](https://jestjs.io/)** by Facebook will be used to execute Unit Test based on Node.js and Express.js for CRUD (Create, Read, Update, Delete) function 

Notice that since we are using **Jest** only for testing. So make sure that package.json has jest only in devdependencies. Also change the scripts file in package.json so that with command **npm test** should work like below. 

![package.json](https://user-images.githubusercontent.com/45092135/137321162-8b52fb43-c3ac-406c-9923-19b27aab6292.png)


**Basic Unit Test Structure** 

![Unit Test Structure](https://user-images.githubusercontent.com/45092135/137322803-690182be-40f7-4787-a4ac-0f66e0b2a681.png)

    * describe: grouping the testing with short description
    
    * beforeEach: before testing define global event or variable to each testing fields. Reducing repeated code. 
      It can also be in outside of describe field.
   
    * it: testing field
    
      * exepct: input expected value 
      
      * matcher function: toBe, toBetruthy, toStrictEqual, toContain ... 


**Mock function / Mocking**

Mock means fake or imitation. What the mock function does when writing a unit test, it fakes the part that the code depends on such as Ajax or Database. 
In jest there is a mocking event called jest.fn(). By generating mock function using jest.fn(), it is possible to solve the test situation affected by the dependent part. Jest.fn() remembers what happened to this function and how it is called by other codes, we can also verify how it is used internally lik a spy.

**Mock API (Request mocking)** 

When contributing to open source projects, one often uses several API calls. These calls work as an important bridge between the client and the user requesting various information through GET/POST methods which require a functioning server. But what happens when you do not have full back-end support yet, or no running APIs in the development stage? You end up back at square one & hence, not able to set up a server. For this situation we need Mock API 

      * Request handler: To define which requests in API should be mocked, we are going to use request handler functions. 
      They allow us to capture any request based on its method, URL, or other criteria, and specify which response to return.
    
When do we use Mock API ? 

      * Most of the client-side issues are related to data. Invalid API call, missing error handling, or receiving 
        an unexpected response—such scenarios happen daily during both development and production. API mocking 
        allows developers to model an exact API interaction that causes an issue. It's efficient in both debugging 
        and fixing the problem, as one can mock a successful scenario easily as well.

### 2. Integration Test 

An integration test is a test performed at the stage of integrating different test modules. 
If you have performed the unit test first to confirm that the modules are working well, the modules will now perform the test in conjunction.
This is what we called integration test. In this project **[SuperTests](https://www.npmjs.com/package/supertest)** will be used 


**Why Integration Test ?** 

1. Verifing whether each test modules integrate well 
2. Figuring out the error or bug while integration.
 
reference 
* https://www.section.io/engineering-education/guide-to-create-mock-server/
* https://mswjs.io/docs/getting-started/integrate/browser
