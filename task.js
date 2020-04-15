// This is a coding test for JS Developer. You have to implement "renderer" function, configurable utility.
// We suggest you solve it using closures, considering them as a convenient analog to currying function arguments. Please avoid using bind/call/apply.
// Every console.log should return two equal strings.
// Suggested time limit is 30min.function renderer() {

function renderer() {
    var type = 'div';
    var attributes = [];

    function inner(innerHtml) {
        const attr = attributes.reduce((acc, [a, v]) => {
            return `${acc} ${a}="${v}"`
        }, '');

        return `<${type}${attr}>${!!innerHtml ? innerHtml : ''}</${type}>`;
    }

    inner.attr = (name, value) => {
        if (!value) {
            let a = attributes.find(a => a[0] == name);
            if (a) {
                return `${a[1]}`
            }
        }
        attributes.push([name, value])
        return inner;
    }

    inner.element = (tag) => {
        if (tag) {
            type = tag;
            return inner;
        }
        return type;
    }


    return inner;
}


var div = renderer();
// Level 1
console.log("div", div.element());
console.log("<div></div>", div());// Level 2

const p = renderer();
p.element("p")
console.log("p", p.element());
console.log("<p></p>", p());// Level 3
console.log("<p>Text</p>", p("Text"));// Level 4
console.log("<p>Another text</p>", renderer().element("p")("Another text"));// Level 5, optional

const body = renderer()
    .element("body")
    .attr("style", "background: red")
    .attr("class", "body");
console.log("background: red", body.attr("style"));
console.log('<body style="background: red" class="body"><p>Text</p></body>', body(
    p("Text")
));


