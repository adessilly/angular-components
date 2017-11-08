# Angular Components Lib

Custom UI Library for Angular, using : 
- JQuery Select2
- Bootstrap-datetimepicker
- iCheck2

## Build sources

(nb: The build process uses ng_packagr)

- git clone $REPO_URL
- npm i
- npm run build

## How to use

- npm i angular-components-lib
- edit your ngModule with these 2 lines :
- import {AngularComponentsModule} from 'angular-components-lib';
- @NgModule({ ... imports: [ ..., Angular2ComponentsModule, ...] ...)
