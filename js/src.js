 var cy
$(function(){

    cy = window.cy = cytoscape({
      container: document.getElementById('cy'), 

      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#74b9ff',
            'label': 'data(name)',
            'width': 20,
            'height': 20,
            'text-valign': 'center',
            'text-halign': 'left',
            'font-size': 11
          }
        },

        {
          selector: 'edge',
          style: {
            'width':2,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'curve-style': 'bezier'
            //'target-arrow-shape': 'triangle'
          }
        },
        {
        selector: '.highlighted',
        style: {
          'background-color': '#61bffc',
          'line-color': '#61bffc',
          'target-arrow-color': '#61bffc',
          'transition-property': 'background-color, line-color, target-arrow-color',
          'transition-duration': '0.5s'
        }
        }
      ]
  
  });
  addNodes();

  
});

function ajustar() {
  cy.fit()
};
function addNodes(){

  $.getJSON( "js/data_nodos_grafo.json", function( data ) {
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      var node = cy.add([
        { group: 'nodes', data: { id: data[i].id, name: data[i].name } }
  ]);
  
    }

    $.getJSON( "js/data_edge_grafo.json", function( data ) {
      console.log(data)
       for (let k = 0; k< data.length; k++) {
         console.log(data[k].invrelacionado+" --> "+ data[k].invpricipal)
         cy.add([
           { group: 'edges', data: { id: k+"edges", source: data[k].invpricipal, 
           target: data[k].invrelacionado, proyecto: data[k].proyecto   } }
     ]);
       } 

       console.log(cy.edges());
       for (let index = 0; index < cy.nodes().length; index++) {
         console.log(cy.nodes()[index].degree());
       }

        layout = cy.layout({
        name: 'concentric',
        fit: true, // whether to fit the viewport to the graph
        padding: 30, // the padding on fit
        startAngle: 3 / 2 * Math.PI, // where nodes start in radians
        sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
        clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
        equidistant: false, // whether levels have an equal radial distance betwen them, may cause bounding box overflow
        minNodeSpacing: 80, // min spacing between outside of nodes (used for radius adjustment)
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
        nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
        height: undefined, // height of layout area (overrides container height)
        width: undefined, // width of layout area (overrides container width)
        spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
        concentric: function( node ){ // returns numeric value for each node, placing higher nodes in levels towards the centre
        return node.degree();
        },
        levelWidth: function( nodes ){ // the letiation of concentric values in each level
        return 10 
        },
        animate: false, // whether to transition the node positions
        animationDuration: 500, // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled
        animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
        ready: undefined, // callback on layoutready
        stop: undefined, // callback on layoutstop
        transform: function (node, position ){ return position; } 
      });
      layout.run();
    });
  });

  cy.panzoom({});
  cy.userZoomingEnabled( false )

}

function reset(){
  //cy.edges('[proyecto=5]').classList.remove('highlighted');
  layout.run(); 
  cy.fit();
}

function proy(){
  console.log(cy.edges())
  cy.edges('[proyecto=5]').addClass('highlighted')
}
function proy(){
  console.log(cy.edges())
  cy.edges('[proyecto=5]').addClass('highlighted')
}
function gradoDos(){
  var layout1 = cy.layout({
    name: 'concentric',
    fit: true, // whether to fit the viewport to the graph
    padding: 30, // the padding on fit
    startAngle: 3 / 2 * Math.PI, // where nodes start in radians
    sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
    clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
    equidistant: false, // whether levels have an equal radial distance betwen them, may cause bounding box overflow
    minNodeSpacing: 80, // min spacing between outside of nodes (used for radius adjustment)
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
    nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
    height: undefined, // height of layout area (overrides container height)
    width: undefined, // width of layout area (overrides container width)
    spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
    concentric: function( node ){ // returns numeric value for each node, placing higher nodes in levels towards the centre
    return node.degree();
    },
    levelWidth: function( nodes ){ // the letiation of concentric values in each level
    return 2 
    },
    animate: false, // whether to transition the node positions
    animationDuration: 500, // duration of animation in ms if enabled
    animationEasing: undefined, // easing of animation if enabled
    animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
    ready: undefined, // callback on layoutready
    stop: undefined, // callback on layoutstop
    transform: function (node, position ){ return position; } ,
  animate: true,
  radius: 120,
  animationDuration: 1000,
  animationEasing: 'ease-in-out'})
  layout1.run();
}
