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


