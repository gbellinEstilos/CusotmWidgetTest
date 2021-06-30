(function () {
  let tmpl = document.createElement('template');
  tmpl.innerHTML = `<div id="chart"></div>`;

  customElements.define('com-sap-estilos-doubledonut', class HelloWorld extends HTMLElement {


    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
      this._init = true;
      this._firstUpdate = true;
      this._firstResize = true;
      this._selectionEvent = false;
    }

    //Fired when the widget is added to the html DOM of the page
    connectedCallback() {
      var shadow = this.shadowRoot;
      let LoadLibs = async function (host) {
        try {
          await host.loadScript("https://d3js.org/d3.v4.min.js", shadow);
        } catch (e) {
          console.log(JSON.stringify(e));
        } finally {
          host.draw();
        }
      };
      LoadLibs(this);
      this._init = false;
    }

    //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
    disconnectedCallback() {

    }

    //When the custom widget is updated, the Custom Widget SDK framework executes this function first
    onCustomWidgetBeforeUpdate(oChangedProperties) {

    }

    //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
    onCustomWidgetAfterUpdate(oChangedProperties) {
/*       var shadow = this.shadowRoot;
      let LoadLibsAfterUpdate = async function (host) {
        try {
          await host.loadScript("https://d3js.org/d3.v4.min.js", shadow);
        } catch (e) {
          console.log(JSON.stringify(e));
        } finally {
          host.draw();
        }
      };

      if (this._firstUpdate) {
        LoadLibsAfterUpdate(this);
        this._firstUpdate = false;
      } else {
        this.draw();
      } */
    }

    //When the custom widget is removed from the canvas or the analytic application is closed
    onCustomWidgetDestroy() {

    }


    //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
    // Commented out by default
    /*
    onCustomWidgetResize(width, height){
    
    }
    */

    //Getters and Setters
    get widgetText() {
      return this._tagType;
    }

    set widgetText(value) {
      this._tagText = value;
    }
    // End - Getters and Setters

    draw() {

      var dataset1 = [
        { count: 10 },
        { count: 20 },
        { count: 30 },
        { count: 40 }
      ];

      var dataset2 = [
        { count: 5 },
        { count: 15 },
        { count: 25 },
        { count: 35 },
        { count: 45 }
      ];

      var width = 400;
      var height = 400;
      var donutWidth = 75;
      var radius1 = Math.min(width, height) / 2;
      var radius2 = radius1 - donutWidth;

      var color1 = d3.scale.category20();
      var color2 = d3.scale.category20c();

      var svg = d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
      var svg1 = svg.append('g')
        .attr('transform', 'translate(' + (width / 2) +
          ',' + (height / 2) + ')');
      var svg2 = svg.append('g')
        .attr('transform', 'translate(' + (width / 2) +
          ',' + (height / 2) + ')');

      var arc1 = d3.svg.arc()
        .innerRadius(radius1 - donutWidth)
        .outerRadius(radius1);
      var arc2 = d3.svg.arc()
        .innerRadius(radius2 - donutWidth)
        .outerRadius(radius2);

      var pie = d3.layout.pie()
        .value(function (d) { return d.count; })
        .sort(null);

      var path1 = svg1.selectAll('path')
        .data(pie(dataset1))
        .enter()
        .append('path')
        .attr('d', arc1)
        .attr('fill', function (d, i) {
          return color1(i);
        });
      var path2 = svg2.selectAll('path')
        .data(pie(dataset2))
        .enter()
        .append('path')
        .attr('d', arc2)
        .attr('fill', function (d, i) {
          return color2(i);
        });

      /*          if (this._tagContainer){
                      this._tagContainer.parentNode.removeChild(this._tagContainer);
                  }  
                  var shadow = window.getSelection(this._shadowRoot);
                  this._tagContainer = document.createElement(this._tagType);
                  var theText = document.createTextNode(this._tagText);    
                  this._tagContainer.appendChild(theText); 
                  this._shadowRoot.appendChild(this._tagContainer); */
    }

    loadScript(src, shadowRoot) {
      return new Promise(function (resolve, reject) {
        let script = document.createElement('script');
        script.src = src;
        script.onload = () => {
          console.log("Load: " + src);
          resolve(script);
        };
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        shadowRoot.appendChild(script);
      });
    }


  });

})();
