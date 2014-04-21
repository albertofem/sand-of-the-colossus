#pragma strict
 
var compass: Texture2D; // compass image
var needle: Texture2D; // needle image
var r = Rect(10, 10, 200, 200); // rect where to draw compass
var angle: float; // angle to rotate the needle
var task : Transform; // Task Position
var player : Transform; //Player Position
var colossusImage : Texture2D;
 
function Start(){
 
}
 
function OnGUI(){
 
    GUI.DrawTexture(r, compass); // draw the compass...
    var p = Vector2(r.x+r.width/2,r.y+r.height/2); // find the center
    var svMat: Matrix4x4 = GUI.matrix; // save gui matrix
    GUIUtility.RotateAroundPivot(angle,p); // prepare matrix to rotate
    GUI.DrawTexture(r,needle); // draw the needle rotated by angle
    GUI.matrix = svMat; // restore gui matrix
    
    GUI.DrawTexture(Rect(Screen.width-300, Screen.height-300, 300, 300), colossusImage);
}
 
function Update(){
 
    var dir = task.position - player.position;
    dir.y = 0; // remove the vertical component, if any
    dir.Normalize();
 
    var forw:Vector3 = player.forward;
    forw.y = 0;
    forw.Normalize();
 
    angle = AngleOffAroundAxis(dir, forw, Vector3.up);
//my algorithm returned as radians, convert to degrees
angle *= 180 / Mathf.PI;
}
 
function AngleOffAroundAxis( v:Vector3, forward:Vector3, axis:Vector3):float
{
    var right:Vector3 = Vector3.Cross(axis, forward);
    forward = Vector3.Cross(right, axis);
    var v2:Vector2 = new Vector2(Vector3.Dot(v, forward), Vector3.Dot(v, right));
    v2.Normalize();
    return Mathf.Atan2(v2.y, v2.x);
}