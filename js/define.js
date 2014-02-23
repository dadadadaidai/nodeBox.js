var GL = {};
var Lines = [];
var Setting ={};

//Sample Texts
var lLipsum = "Lorem ipsum dolor sit amet, cu viris offendit per. Velit viderer moderatius mel ad, in sed detraxit quaestio expetenda, id vis nusquam pericula. Usu nostrud definitiones no. Ne recteque patrioque duo. Brute graeco numquam vix in, te est phaedrum omittantur. Nobis dissentias his no, eum dicunt sensibus te"
var sLipsum = "Lorem ipsum"

Setting = {
		Scale: 1,
		lineWidth: 1,
		strokeStyle: "rgba( 140, 140, 140,1)",
		handleLength: 400,
		LineColor: "#FFF",

		lineWidthonDrag: 2,
		strokeDragIn: "rgba( 246, 108, 0,1)",
		strokeDragOut: "rgba( 16, 100, 255, 1)",

};

//
///////////////////////////////////////////////////////////
GL.drag = [

	{
		// for define. Out of order.
		id: 0,
		title: "Node0",

		left: 0, // x Value. left-cornor of this box.
		top: 0,  // y Value. left corner of this box.
		width: 0,　// for extending nodeBox's Width(x axis) 
		height: 0, // for extending nodeBox's Height(y axis)
		midX: 0, // central point of this box.
		midY: 0, // central point of this box.

		flagDrag: 0, // During Dragging this Box, Value is 1. (otherwise 0)

		inNode: [0], // Number of input nodes in this Box.
		outNode: [0], // Number of output nodes in this Box.

		content: lLipsum
	},

	{
		id: 1,
		title: "Node1", 

		top: 100,
		left: 100,
		width: 200,
		height: 400,
		midY: 200,
		midX: 300,

		flagDrag: 0,

		inNode: [2], 
		outNode: [2,3,5],

		content: lLipsum
	},

	{
		id: 2,
		title: "Node2", 

		top: 400,
		left: 800,		
		width: 200,
		height: 200,
		midY: 500,
		midX: 900,
		
		flagDrag: 0,

		inNode: [1,3,6], 
		outNode: [4,1],

		content: sLipsum
	},

	{
		id: 3,
		title: "Node3", 

		top: 600,
		left: 1000,
		width: 200,
		height: 200,
		midY: 700,
		midX: 1100,
		
		flagDrag: 0,

		inNode: [1,4], 
		outNode: [6,2,4],

		content: lLipsum
	},

	{
		id: 4,
		title: "Node4", 

		top: 500,
		left: 400,		
		width: 200,
		height: 200,
		midY: 600,
		midX: 500,
		
		flagDrag: 0,

		inNode: [2,3], 
		outNode: [3],

		content: sLipsum
	},

	{
		id: 5,
		title: "Node5", 

		top: 100,
		left: 800,		
		width: 200,
		height: 200,
		midY: 200,
		midX: 900,
		
		flagDrag: 0,

		inNode: [1], 
		outNode: [6],

		content: lLipsum
	},

	{
		id: 6,
		title: "Node6", 

		top: 300,
		left: 1200,		
		width: 200,
		height: 200,
		midY: 400,
		midX: 1300,
		
		flagDrag: 0,

		inNode: [3,5,7], 
		outNode: [2],

		content: sLipsum
	},


	{
		id: 7,
		title: "Node7", 

		top: 800,
		left: 1200,		
		width: 200,
		height: 200,
		midY: 400,
		midX: 1300,
		
		flagDrag: 0,

		inNode: [4,3], 
		outNode: [6,6],

		content: lLipsum
	},

]

//List of NodeBox

// Lines.push({
// 		// for define. Out of order.
// 		start: 0,
// 		end: 0
// 	});


// Lines[0] ={	

// 	start: 0, //始点 
// 	end: 0    //終点

// };