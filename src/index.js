import _ from 'lodash';
import RAF from 'raf';
import ReactDOM from 'react-dom';

class ScrollAppearManager {

    constructor() {
        this.elements = [];
        this.run = this.run.bind(this);
        this.isRunning = false;
    }

    add(element, offset) {
        if (this.findElement(element)) {
            return false;
        }
        var object = {
            instance : element,
            el : ReactDOM.findDOMNode(element),
            offset : offset ? offset : 0,
            appear : false
        };
        console.log(object.offset);
        this.elements.push(object);

        if (this.elements.length > 0 && !this.isRunning) {
            this.isRunning = true;
            RAF.add(this.run);
        }
    }

    findElement(element) {
        return _.find(this.elements, function(o) {
            return o.instance === element;
        });
    }

    remove(element) {
        var object = this.findElement(element);

        if (!object) {
            return;
        }

        _.remove(this.elements, function(item) {
            return item.instance === element;
        });

        if (this.elements.length === 0) {
            this.isRunning = false;
            RAF.remove(this.run);
        }
    }

    isVisible(element, offset) {
        var bounds = element.getBoundingClientRect();
        if (bounds.top + offset <= window.innerHeight){
            return true;
        }
        else {
            return false;
        }
    }

    run() {
        var visible;
        _.forEach(this.elements, (element) => {
            if (element.appear) return true;
            visible = this.isVisible(element.el, element.offset);
            if (!visible) return true;

            if (this.isVisible(element.el) && !element.appear) {
                element.appear = true;
                element.instance.scrollAppear && element.instance.scrollAppear();
            }
        });
    }
}

var scrollAppearManager = new ScrollAppearManager();

var ScrollAppearDecorator = function ScrollAppearDecorator(offset) {
    var offset = offset || 0;
    return function decorator(target) {
        var componentDidMount = target.prototype.componentDidMount,
            componentWillUnmount = target.prototype.componentWillUnmount;
        // ComponentDidMount
        target.prototype.componentDidMount = function() {
            scrollAppearManager.add(this, offset);
            componentDidMount && componentDidMount.call(this);
        };

        // ComponentWillUnmount
        target.prototype.componentWillUnmount = function() {
            scrollAppearManager.remove(this);
            componentWillUnmount && componentWillUnmount.call(this);
        };
    }
};

export default {scrollAppearManager, ScrollAppearDecorator};