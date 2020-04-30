# vue-autogrowinput
A Vue directive for making text input fields grow and shrink dynamically while typing

## Installation

``` sh
$ npm install vue-autogrowinput
```

## Example

``` web
<template>
    <div>
       <input v-autogrowinput="{ minWith: 150, maxWidth: 270, comfortZone: 30 }" /> 
    </div>
</template>
```

