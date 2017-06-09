#pragma strict
var lookSensitivity : float = 0.05;
var yRotation : float;
var xRotation : float;
var CurrentXRotation : float;
var CurrentYRotation : float;
var yRotationV : float;
var xRotationV : float;
var lookSmoothness : float = 0.1;
var bobSpeed : float = 1;
var stepCounter : float;
var bobAmountX : float =1;
var bobAmountY : float =1;
var lastPosition : Vector3;
var heightRatio : float =0.9;
var aimingTrue : float =1;
var cameraDefault : float = 60;
var targetCamera : float = 60;
var cameraZoom : float =1;
var cameraZoomV : float;
var cameraZoomSpeed : float = 0.1;
var cScript : SixenseInput;
var rotation:Quaternion;
function Awake()
	{
    lastPosition = transform.parent.position;
    cScript =  this.GetComponent("SixenseInput");
    
	}
function Update ()
	{
		if(aimingTrue == 1)
		{
			cameraZoom = Mathf.SmoothDamp(cameraZoom, 1, cameraZoomV, cameraZoomSpeed);
		}
		else
		{
			cameraZoom = Mathf.SmoothDamp(cameraZoom, 0, cameraZoomV, cameraZoomSpeed);
		}
		
		//GetComponent.<Camera>().fieldOfView = Mathf.Lerp(targetCamera, cameraDefault, cameraZoom);
		if(transform.parent.GetComponent(Movement).grounded)
		{
			stepCounter += Vector3.Distance(lastPosition, transform.parent.position) * bobSpeed;
		}
		transform.localPosition.x = Mathf.Sin(stepCounter) * bobAmountX;
		transform.localPosition.y = (Mathf.Sin(stepCounter * 2) * bobAmountY * -1) + (transform.parent.localScale.y * heightRatio) - (transform.parent.localScale.y/2);
		
		lastPosition = transform.parent.position;

        yRotation += Input.GetAxis("Horizontal") * lookSensitivity;
		//yRotation+= transform.parent.rotation.y * lookSensitivity;
		
		xRotation -= Input.GetAxis("Vertical") * lookSensitivity;
		
		xRotation = Mathf.Clamp(xRotation, -80, 100);
		
		CurrentXRotation = Mathf.SmoothDamp(CurrentXRotation, xRotation, xRotationV, lookSmoothness);
		CurrentYRotation = Mathf.SmoothDamp(CurrentYRotation, yRotation, yRotationV, lookSmoothness);
		
    //transform.rotation = cScript.Controllers[1].Rotation;
		//transform.rotation = Camera.main.transform.eulerAngles.y;
		rotation = Quaternion.Euler(0, Camera.main.transform.eulerAngles.y,0);
		//transform.position = cScript.Controllers[0].Position;//Quaternion.Euler(xRotation, yRotation, 0);
	}