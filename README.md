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
       <input v-autogrow-input="{ minWith: 150, maxWidth: 270, comfortZone: 30 }" /> 
    </div>
</template>

<script>
import AutogrowInput from 'vue-autogrowinput';

export default {
    directives: {
        AutogrowInput
    }
};
</script>
```
## Demo

https://goodies.pixabay.com/jquery/auto-grow-input/demo.html

## options

### minWidth
Minimum width of the input field.

### maxWidth
Maximum width of the input field. 

### comfortZone
Extra space after the last character in the input field. By default the width of one character is used.

