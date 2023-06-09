## Git 
### Commit structure 

Commit structure
```
    FRONT_BRANCHNAME_[TYPE][Module][ShortDescription]: Long description if needed 
```
- BACK : distinguish the commit category , all possible values are [FRONT, BACK, MIXED, DEVOPS, SYSADMIN]
- BRANCHNAME : the project will contain many branches that we intend to delete after merging them into the dev branch, but we need this information at commit level after branch deletion
- [TYPE]
    - ADD: add functionality
    - CLEAN: code cleanup (eslint - prettier like job)
    - DOC: CRUD on any documentation (>< comment expect javadoc like comment)
    - FIX: bug fix
    - IMP: code improvement (code refactoring, architecture change without functionality addition, ...)
    - TEST: CRUD on any test
- [Module] ex Horse, PascalCase
- [Short Description] ex model implemented
- [Optional Long Description] anything relevant

### Pre-hooks 
- precommit: eslint and prettier (via lint-staged)
- prepush : test
- "we're all consenting adults here" and so you can of course bypass pre-commit hooks

### Nice to have but not implemented
- github actions

## Setup
### Pre-commit configuration 
see front configuration as it very similar (husky)

### Translations 
installed and congigured [i18next](https://www.i18next.com/)

if translations are too time-consuming, we'll implement (or find a package for) translation via middleware

### Configuration 
2 configuration files (.env and .env.dev) to differentiate the production environment from the development environment. 

the configuration data is in these files, we've installed a package (dotenv) which takes the data from these files and puts it in string form in proccess.env (superglobal variable).

We'd like to have some protection in case of invalid data. If one or more configuration data are invalid, we want the application to crash.

The sequence is as follows:
EnvConfiguration -> retrieve .env OR .env.dev -> (dotenv package) -> process.env -> retrieve data from configuration classes (e.g. ServerConfiguration).

Note that these classes are singletons to avoid modifying process.env data, and that we won't be using process.env data, but configuration classes.

### Secure the app 
[See official express.js recommendations](https://expressjs.com/en/advanced/best-practice-security.html)
what are the keypoints 
- use tls (not for dev)
- use helmet 
- reduce fingerprinting 
- use cookies securely (we are not concerned as it is an api), same for sessions
- prevent brute-force 
- ensure dependencies are secure with npm audit
- others (sanitize, etc)


#### reduce fingerprinting : see server.js
- app.disable('x-powered-by')
- custom 404 
- custom error handler

#### prevent brute-force
We implemented generalExceptLoginRateLimiter which is a middlware which counts the nb of request per "temporal window" per ip address. 
Note that we have chosen an arbitrary value of 60 requests per minute.

We plan to create another more restrictive middleware on the login page for obvious security reasons.

#### other
not implemented yet as we are still in the project setup 

### Logger 

We want to have a log system that allows us to
- keep track of each request easily
- add logs manually
- save information in files while keeping messages in the console
- easily distinguish several levels of log severity (debug, info, warning, error, ...)

After a quick search on the subject, we chose the following packages
- winston (the package in charge of logs)
- express-winston (a package that lets you use winston as middleware)


Loggers are defined in shared/loggers/loggers.js
- logger for requests (used later as middleware) with levels ['info', 'warn', 'error'], each level has its own file and the files are in the logs/requests directory

- logger for errorHandler, which is also used as middleware, but must be declared separately (see documentation). Its purpose is not to log the requests that caused the errors, but rather the stack of errors in the logs/others directory.

- logger others (if we wish to debug, for example): levels ['debug', 'info', 'warn']. destination directory => same as errorHandler. One level one file as always

Finally, we've formatted each message to make it as readable as possible.

Note that there are a lot of files, and as there is a lot of information in each file, we may need to set up a task-cron to delete log files at regular intervals. 

Later, we're going to set up an smtp configuration and send an e-mail in the event of an unhandled error, with a log of the error and the associated request - only when we're in production, of course.
