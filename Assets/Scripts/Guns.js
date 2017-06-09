#pragma strict
var cameraObject : GameObject;
var targetXRotation : float;
var targetYRotation : float;
var targetXRotationV : float;
var targetYRotationV : float;
var rotateSpeed : float;
var holdX : float;
var holdY : float;
var holdZ : float;
var holdDown : float; 
var aimSpeed : float;
var holdDownV : float ;
var aimingIsTrue : float; 
var zoomAngle : float; 
var fireRate : float;
var	waitTilFire : float; 
var bullet : GameObject;
var spawnBullet : GameObject; 
var cScript : SixenseInput;
var leftX : float;
var rightX: float;
var leftY : float;
var rightY: float;
var difference :float;
var bulletSound: AudioSource;
var gunEmpty : AudioSource;
function Awake()
{
    cScript =  this.GetComponent("SixenseInput");
    bulletSound = GetComponent.<AudioSource>();

}

function Update () 
{
    leftX = Mathf.Abs(cScript.Controllers[0].Position.x );
    rightX = Mathf.Abs(cScript.Controllers[1].Position.x );
    leftY =cScript.Controllers[0].Position.z;
    rightY = cScript.Controllers[1].Position.z;
    if(leftX > rightX){
        difference = leftX - rightX;
    }else{
        difference = rightX - leftX;
    }

    if ( cScript.Controllers[1].Trigger)
    {
        if(this.transform.parent.GetComponent(Movement).getScore()>0){
            if(waitTilFire <=0)
            {
		    
                if(bullet)
                {
                        bulletSound.Play();
                Instantiate(bullet, spawnBullet.transform.position, spawnBullet.transform.rotation);
                this.transform.parent.GetComponent(Movement).updateScore(-1);
            }
            waitTilFire = 1;
        }
    }else{
        gunEmpty.Play();
    }
	}
	waitTilFire -= Time.deltaTime * fireRate;
	
	cameraObject.GetComponent(MouseLook).targetCamera = zoomAngle;
	if ((difference<50) && (leftY > rightY)){
	    holdDown = Mathf.SmoothDamp(holdDown,0, holdDownV, aimSpeed);
	    cameraObject.GetComponent(MouseLook).aimingTrue = aimingIsTrue;
	}
	else
		{
			holdDown = Mathf.SmoothDamp(holdDown,1, holdDownV, aimSpeed);
			cameraObject.GetComponent(MouseLook).aimingTrue = 1;
		}
	transform.position = cameraObject.transform.position + (Quaternion.Euler(0, targetYRotation, 0) * Vector3(holdDown * holdX, holdDown * holdY, holdDown * holdZ));
	targetXRotation = Mathf.SmoothDamp(targetXRotation, cameraObject.GetComponent(MouseLook).xRotation, targetXRotationV, rotateSpeed);
	targetYRotation = Mathf.SmoothDamp(targetYRotation, cameraObject.GetComponent(MouseLook).yRotation, targetYRotationV, rotateSpeed);
	
	transform.rotation = cScript.Controllers[1].Rotation;
}