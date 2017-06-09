#pragma strict
import UnityEngine.SceneManagement;

var cScript : SixenseInput;
var lineRenderer: LineRenderer;
//var myLoadedAssetBundle: AssetBundle;
//var scenePaths: String[];
function Start () {
    cScript =  this.GetComponent("SixenseInput");
    lineRenderer = GetComponent.<LineRenderer>();
   // scenePaths = myLoadedAssetBundle.GetAllScenePaths();
}

function Update () {

    transform.rotation = cScript.Controllers[0].Rotation;
    var hit : RaycastHit;
    
    var fwd = transform.parent.TransformDirection(Vector3.forward);
    if(cScript.Controllers[0].Trigger){
        lineRenderer.SetVertexCount(2);
        if(Physics.Raycast(transform.position, fwd, hit,10))
        {
            Debug.Log("Hit Tag " + hit.transform.tag);
        
            //lineRenderer.SetPosition(0,hit.point + (hit.normal * 0.01));
            //lineRenderer.SetPosition(0,transform.position);
            
            lineRenderer.SetPosition(0, new Vector3(0,0,0));
            lineRenderer.SetPosition(1, hit.point);
            if(hit.transform.tag == "Restart"){
                //SceneManager.LoadScene(scenePaths[0], LoadSceneMode.Single);
                Debug.Log("Success " + hit.transform.tag);
            }
        }
    }else{
        lineRenderer.SetVertexCount(0);
    }
    
}

