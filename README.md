
# Stimulus Sticky Table Header

This is a simple [StimulusJS](https://stimulusjs.org) controller that keeps the header of a table at the top of window as you scroll through the page.

## Install

This assumes that [StimulusJS](https://stimulusjs.org) is already installed.

Add the `stimulus-sticky-table-header` module:

```bash
$ yarn add stimulus-sticky-table-header
```

or

```bash
$ npm install stimulus-sticky-table-header
```

## Basic Usage

First, register the controller with [StimulusJS](https://stimulusjs.org):

```Javascript
// application.js
import { Application } from 'stimulus';
import { StickyTableHeader } from 'stimulus-sticky-table-header';

const application = Application.start();
application.register("sticky-table-header", StickyTableHeader);
```

Next you need to add the controller's annotations to your table:

```html
<table data-controller="sticky-table-header" 
        data-target="sticky-table-header.table" 
        data-action="scroll@window->sticky-table-header#onScroll">
```

The controller will handle moving the header as your page scrolls.

The tutorial that this is extracted from can be found here: [https://johnbeatty.co/2018/03/20/stimulus-js-tutorial-listening-to-onscroll-events-for-a-sticky-table-header/](https://johnbeatty.co/2018/03/20/stimulus-js-tutorial-listening-to-onscroll-events-for-a-sticky-table-header/)

## Contributing

Bug reports and pull requests are welcome on GitHub at <https://github.com/johnbeatty/stimulus-sticky-table-header>.  This project is intended to be a safe, welcoming space for  collaboration, and contributors are expected to adhere to the  Contributor Covenant code of conduct.

## License

This package is available as open source under the terms of the MIT License.
