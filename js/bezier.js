// Drawing Bezier 
//////////////////////////////////////////////////////////////////

function BezierCurve(points) {
    this.carib = [ 0, 0]
    this.points = [ points[0], points[3], points[1], points[2] ];
    this.pointColors = ["rgb(0,150,0)", "rgb(0,150,0)", "rgb(0,0,255)", "rgb(0,0,255)"];
    this.selectedPoint = -1;
    this.movingPoint = -1;
}

BezierCurve.prototype.draw = function(nodeNum, ctx, mouse) {
    if(nodeNum != 0){
    if (this.movingPoint > -1) { // During Moving Points
            if (this.movingPoint < 2) { // 始点と終点のときは制御点1/2も同時に動かす
                var sub = [
                this.points[this.movingPoint][0] -  GL.drag[nodeNum].midX,
                this.points[this.movingPoint][1] -  GL.drag[nodeNum].midY
                ];
                // console.log(GL.drag[nodeNum].midX);
                this.points[this.movingPoint + 2][0] -= sub[0] ;
                this.points[this.movingPoint + 2][1] -= sub[1] ;
            }
            // Move points
            this.points[this.movingPoint] = [ GL.drag[nodeNum].midX ,  GL.drag[nodeNum].midY ];
            // console.log("nodeNum is" + i);
            // console.log("(GL.drag[this.movingPoint].midX,GL.drag[this.movingPoint].midY):  " + GL.drag[nodeNum].midX + GL.drag[nodeNum].midY);
        }
    }

    ctx.beginPath();
    ctx.moveTo(this.points[0][0], this.points[0][1]);
    ctx.bezierCurveTo(
        this.points[2][0] + Setting.handleLength, this.points[2][1], 
        this.points[3][0] - Setting.handleLength, this.points[3][1], 
        this.points[1][0], this.points[1][1]
        );
    ctx.stroke();
    
    // 制御点1/2操作用の線を描く
    // for (var i = 0; i < 2; i++) {
    //     ctx.beginPath();
    //     ctx.moveTo(this.points[i + 0][0], this.points[i + 0][1]);
    //     ctx.lineTo(this.points[i + 2][0], this.points[i + 2][1]);
    //     ctx.strokeStyle = "rgba(0,0,255,0.5)";
    //     ctx.lineWidth = 2;
    //     ctx.stroke();
    // }
    
    // 点操作用の●を描く
    for (var i = 1; i >= 0; i--) {
        ctx.beginPath();
        ctx.arc(this.points[i][0], this.points[i][1], 3, 0, Math.PI*2, false);
        ctx.fillStyle = this.pointColors[i];
        ctx.fill();
        if (this.selectedPoint == i) {
            ctx.beginPath();
            ctx.arc(this.points[i][0], this.points[i][1], 5, 0, Math.PI*2, false);
            ctx.strokeStyle = this.pointColors[i];
            ctx.lineWidth = this.lineWidth;
            ctx.stroke();
        }

    // Initilize strokeStyle
    ctx.lineWidth = Setting.lineWidth;
    ctx.strokeStyle = Setting.strokeStyle;

    }

    // console.log("bezier GL is " + GL.drag[0].width);
}


BezierCurve.prototype.hitTest = function(curveNum,ctx) {

    this.selectedPoint = -1;
    // 各点との当たり判定
    var hitTestP = function(mousePoint, i) {
        if (GL.drag[i].flagDrag == 1)
            { return true; }
        else { return false; }
    };

    for (var i = 1; i < GL.drag.length ; i++) {
        if (hitTestP(mouse, i)) {
            // this.selectedPoint = i;
                // this.movingPoint = i;
                console.log("current bezier movingPoint is " + i);
                console.log("current CurveNum is " + Lines[curveNum].start );
                if(Lines[curveNum].start == i){ 
                    console.log("hit!");
                    this.selectedPoint = 0;
                    this.movingPoint = 0; 
                    nodeNum = i;
                    console.log("nodeNum is" + i);

                    // on Dragging Style
                    ctx.lineWidth = Setting.lineWidthonDrag;
                    ctx.strokeStyle = Setting.strokeDragIn;

                    curves[curveNum].draw(nodeNum,ctx, mouse);
                    // this.draw(i, ctx, mouse);
                }
                if(Lines[curveNum].end == i){ 
                    console.log("hit!");
                    this.selectedPoint = 1;
                    this.movingPoint = 1; 
                    nodeNum = i;
                    console.log("nodeNum is" + i);

                    ctx.lineWidth = Setting.lineWidthonDrag;
                    ctx.strokeStyle = Setting.strokeDragOut;

                    curves[curveNum].draw(nodeNum,ctx, mouse);
                    // this.draw(i, ctx, mouse);
                }
                return true;
            }
        }
        return false;
    }


// Initilize mouse
var mouse = { x:0, y:0, down:false };
var HandleX = Setting.handleLength; // Handle Length
// Initilize curves
var curves = new Array();
var numCur = 0;
var nodeNum = 0;

window.onload = function() {
    var canvas = document.getElementById('c1');
    if ( ! canvas || ! canvas.getContext ) { return false; }
    var ctx = canvas.getContext('2d');
    canvas.onmousemove = function(e){  
        var rect = e.target.getBoundingClientRect();  
        mouse.x = (e.clientX - rect.left);
        mouse.y = (e.clientY - rect.top);
    };  
    canvas.onmouseout = function() { mouse.down = false; };
    canvas.onmousedown = function() { mouse.down = true; };
    canvas.onmouseup = function() { mouse.down = false; };    

    // 初期ノードを設置
    console.log(GL.drag.length);

    for(var i=1; i<GL.drag.length; i++){

        // INIT nodeBox
        var ID = i;
        var nodeID = "nodebox_" + ID.toString();
        $("#main").prepend("<div id='"+ nodeID +"' class='node draggable'><div class='nodeTitle'> </div><div class='nodeInContena'></div><div class='nodeOutContena'></div></div>");
        $("#" + nodeID + "> .nodeTitle").text( GL.drag[ID].title );
        $("#" + nodeID ).append( "<div class='nodeContent'>" + GL.drag[ID].content + "</div>");

        $("#" + nodeID ).css( "left", GL.drag[ID].left );
        $("#" + nodeID ).css( "top", GL.drag[ID].top );
        $("#" + nodeID ).css( "width", GL.drag[ID].width );
        $("#" + nodeID ).css( "height", GL.drag[ID].height );

        GL.drag[ID].midX = parseInt($("#" + nodeID ).css("left"))+$("#" + nodeID ).width()/2;
        GL.drag[ID].midY = parseInt($("#" + nodeID ).css("top"))+$("#" + nodeID ).height()/2;

        // for debug
        console.log("################INIT###################");
        console.log("nodeID is " + ID);
        console.log("nodeTitle is " + GL.drag[ID].title);
        console.log("This Box have "  + GL.drag[ID].inNode[0] + " Innodes.");
        console.log("#######################################");

        // Drawing Text in the Box


        // Drawing I/O code
        ////////////////////////////////////////////////////////////////////////////////////////

        // INPUT conector
        if(GL.drag[ID].inNode[0] != 0){

            for(var j=0; j<GL.drag[ID].inNode.length; j++){
                $("#"+ nodeID + " .nodeInContena" ).prepend("<div class='circle nodeIn'></div>");
            }

            //　Centering Container
            $("#"+ nodeID + " .nodeInContena" ).css("top", (GL.drag[ID].height - 50)/2 - (GL.drag[ID].inNode.length-1)*10 + "px")
        }

        // OUTPUT conector
        if(GL.drag[ID].outNode[0] != 0){

            var outLen = GL.drag[ID].outNode.length;
            console.log( "This Box have " + outLen + " Outnodes.");

            for( var j=0; j < outLen; j++ ){
                $("#"+ nodeID + " .nodeOutContena" ).prepend("<div class='circle nodeOut'></div>");

                // ノードの描画　… アウト(する)側、イン(される)側ノード 
                var outX  = GL.drag[ID].midX + 83;
                var outY  = GL.drag[ID].midY - 20*j; 
                var inX = GL.drag[GL.drag[ID].outNode[j]].midX - 87;       
                var inY = GL.drag[GL.drag[ID].outNode[j]].midY + 50 - 20*j; //Caribration

                // ノード座標の格納
                curves[numCur] = new BezierCurve([ [outX, outY], [outX + HandleX, outY], [inX - HandleX, inY], [inX, inY] ]);
                numCur++;

                // 始点と終点データをプッシュ
                Lines.push({start: ID, end: GL.drag[GL.drag[ID].outNode[j]].id});

                // for debug
                console.log( "(" + j + ") LineTo: "+ ID +" -> " +  GL.drag[GL.drag[ID].outNode[j]].id);
                console.log( outX, outY, inX, inY);
                console.log( "Canvas have " + numCur + " bezier.");
                console.log( "Lines["+ numCur +"] is ( start: " + Lines[numCur-1].start + ",end: " + Lines[numCur-1].end + ")");

            }

            //　Centering Container
            $("#"+ nodeID + " .nodeOutContena" ).css("top", (GL.drag[ID].height - 50)/2 - (outLen-1)*10 + "px")
        }

        // for(var j=0; j<GL.drag[].inNode.length; j++){
        //     $(nodeID).addClass("ClassName");
        //     for(var k=0; k<GL.drag[].outNode.length; k++){
        //     }
        // }
    }

            // DRAG ACTION
            /////////////////////////////////////////////////////////////////////////////////////

            var ID = "";

            $(".draggable").draggable({

                axis: "x,y",
                grid: [ 100, 100], 
                scroll: true,
                opacity: .6,

                start: function(e,ui){

                  var nodeID = $(this).attr("id");
                  ID = parseInt(nodeID.split("_")[1]);

                  GL.drag[ID].flagDrag = 1;
                  GL.drag[ID].id = $(this).attr("id"); 
                  console.log( "nodeBox"+ GL.drag[ID] +"dragFlag is " + GL.drag[ID].flagDrag );
                  console.log( "This ObjID is " + ID);

              },

              drag: function(e, ui){

                  GL.drag[ID].midX = parseInt($(this).css("left"))+$(this).width()/2;
                  GL.drag[ID].midY = parseInt($(this).css("top"))+$(this).height()/2;

                  // for debug
                  console.log(GL.drag[ID].id, GL.drag[ID].midX, GL.drag[ID].midY);
                  
              },

              stop: function(e,ui){

                  GL.drag[ID].flagDrag = 0;

                  // for debug
                  console.log( "nodeBox"+ ID + "'s dragFlag is " + GL.drag[ID].flagDrag );

              }

          });

    var timer;
    var loop = function() { // Main Loop

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(i=0;i<curves.length;i++){
            NodeNum = 0;
            curves[i].hitTest(i,ctx);
            curves[i].draw(NodeNum, ctx, mouse);
        }

        // ctx.fillText(mouse.x + ", " + mouse.y, 10, 10); 

        clearTimeout(timer);
        timer = setTimeout(loop, 5);

    }

    loop();
};