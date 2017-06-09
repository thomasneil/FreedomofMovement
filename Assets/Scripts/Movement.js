#pragma strict
var playerAcceleration : float = 500;
var cameraObject : GameObject;
var maxSpeed : float = 20;
var horizontalMovement : Vector3;
var deaceleration : float;
var deacelerationX : float;
var deacelerationZ : float;
var jumpSpeed : float = 20;
var maxSlope : float = 60;
var grounded : boolean = false;
var stopped : boolean = false;
var jumpControl : float = 0.01;
var cScript : SixenseInput;
var thrust : float = 2.0;
var right : Vector3; 
var horizontal : float;
var vertical : float;
var directionVector : Vector3;
var forward : Vector3;
var rigidBody : Rigidbody;
var dir : Transform;
var audioFile : AudioSource;
var ammoText : TextMesh;
var ammoCount : int;

function Start(){
    ammoCount = 5;
    updateScore(ammoCount);
}

function Awake()
{
    rigidBody = GetComponent.<Rigidbody>();
    cScript =  this.GetComponent("SixenseInput");
    audioFile = GetComponent.<AudioSource>();
}

function Update () 
{
    //horizontalMovement = Vector2(GetComponent.<Rigidbody>().velocity.x,GetComponent.<Rigidbody>().velocity.z);
    forward = Camera.main.transform.forward;
    forward.y = 0.0;
    right = new Vector3(forward.z, 0.0, -forward.x);
   // forward.normalized;
   
	    /*if (horizontalMovement.magnitude > maxSpeed)
		    {
			    horizontalMovement = horizontalMovement.normalized;
			    horizontalMovement *= maxSpeed;
	    }*/
		

		
	if (grounded)
	{
	    rigidBody.velocity.x = Mathf.SmoothDamp(rigidBody.velocity.x,0,deacelerationX, 0);
	    rigidBody.velocity.z = Mathf.SmoothDamp(rigidBody.velocity.z,0,deacelerationZ, 0);
	}
	
    
	transform.rotation = Quaternion.Euler(0, Camera.main.transform.eulerAngles.y,0);
	//rigidBody.MoveRotation(rigidBody.rotation *  Camera.main.transform.rotation) ;
   
    //Debug.Log("y Rotation " + transform.rotation.y);
	horizontal = cScript.Controllers[0].JoystickX;
	vertical = cScript.Controllers[0].JoystickY;
	directionVector = new Vector3(horizontal,0,vertical);
	GetComponent.<Rigidbody>().AddRelativeForce(cScript.Controllers[0].JoystickX *playerAcceleration * Time.deltaTime,0,cScript.Controllers[0].JoystickY *playerAcceleration * Time.deltaTime);
		
	if (grounded)
	{
	    //directionVector = (horizontal*right + vertical*forward);
	  directionVector = Camera.main.transform.rotation * directionVector;
	    directionVector = transform.InverseTransformDirection(directionVector);
	    transform.rotation = Quaternion.Euler(0, directionVector.y,0);
		if (directionVector.magnitude > maxSpeed)
		{
		    directionVector = directionVector.normalized;
		    directionVector *= maxSpeed;
		}
		//
		
		// transform.position = transform.position + Camera.main.transform.forward * playerAcceleration * Time.deltaTime;
		if(cScript.Controllers[0].JoystickX ||cScript.Controllers[0].JoystickY ){
		    
		    rigidBody.AddRelativeForce(directionVector*playerAcceleration * Time.deltaTime);
		    //GetComponent.<Rigidbody>().AddRelativeForce(cScript.Controllers[0].JoystickX * playerAcceleration * Time.deltaTime, 0 ,cScript.Controllers[0].JoystickY * playerAcceleration * Time.deltaTime);
		}
		
			
	}
	/*else
	{
	    //transform.rotation = Quaternion.Euler(0, cameraObject.GetComponent(MouseLook).CurrentYRotation,0);
	    // rigidBody.AddRelativeForce( playerAcceleration * jumpControl * Time.deltaTime, 0 ,  playerAcceleration * jumpControl * Time.deltaTime);
	    rigidBody.AddRelativeForce(directionVector*playerAcceleration * Time.deltaTime);
	}
	/*if(cScript.Controllers[0].Trigger && grounded )
	{
	    rigidBody.AddForce(0,jumpSpeed,0);

	}*/
		
}

/*function OnCollisionStay(collision : Collision)
{
	/*for(var contact : ContactPoint in collision.contacts)
	{
		if (Vector3.Angle(contact.normal, Vector3.up) < maxSlope)
		{
			grounded = true;
		}
	}
    
   
}

function OnCollisionExit()
{
	grounded = false;	
}	
*/
function OnTriggerEnter(other : Collider ) 
{
        if (other.gameObject.CompareTag ("Ammo"))
        {
            updateScore(5);
            Destroy(other.gameObject);
            audioFile.Play();
        }

        if (other.gameObject.CompareTag ("Restart"))
        {
            SceneManager.LoadSceneAsync(SceneManager.GetActiveScene().buildIndex);
        }

        
}

function updateScore(count : int)
    {
        ammoCount += count;
        ammoText.text = "Ammo : "+ammoCount;
    }

    function getScore()
    {
        return ammoCount;
    }