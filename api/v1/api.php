<?php
class API
{
    /**
     * Property: method
     * The HTTP method this request was made in, either GET, POST, PUT or DELETE
     */
    protected $method = '';
    /**
     * Property: endpoint
     * The Model requested in the URI. eg: /files
     */
    protected $endpoint = '';
    /**
     * Property: verb
     * An optional additional descriptor about the endpoint, used for things that can
     * not be handled by the basic methods. eg: /files/process
     */
    protected $verb = '';
    /**
     * Property: args
     * Any additional URI components after the endpoint and verb have been removed, in our
     * case, an integer ID for the resource. eg: /<endpoint>/<verb>/<arg0>/<arg1>
     * or /<endpoint>/<arg0>
     */
    protected $args = Array();
    /**
     * Property: file
     * Stores the input of the PUT request
     */
     protected $file = Null;

    /**
     * Constructor: __construct
     * Allow for CORS, assemble and pre-process the data
     */
    public function __construct($request) {
        //header("Access-Control-Allow-Origin: *");
        //header("Access-Control-Allow-Methods: *");
        //header("Content-Type: application/json");
             header('Access-Control-Allow-Origin: *');
             header("Access-Control-Allow-Credentials: true"); 
             header('Access-Control-Allow-Headers: X-Requested-With');
             header('Access-Control-Allow-Headers: Content-Type,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization');
             header('Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS, PUT'); // http://stackoverflow.com/a/7605119/578667
             header('Access-Control-Max-Age: 86400'); 
        $this->args = explode('/', rtrim($request, '/'));
        $this->endpoint = array_shift($this->args);
        if (array_key_exists(0, $this->args) && !is_numeric($this->args[0])) {
            $this->verb = array_shift($this->args);
        }

        $this->method = $_SERVER['REQUEST_METHOD'];
        if ($this->method == 'POST' && array_key_exists('HTTP_X_HTTP_METHOD', $_SERVER)) {
            if ($_SERVER['HTTP_X_HTTP_METHOD'] == 'DELETE') {
                $this->method = 'DELETE';
            } else if ($_SERVER['HTTP_X_HTTP_METHOD'] == 'PUT') {
                $this->method = 'PUT';
            } else {
                throw new Exception("Unexpected Header");
            }
        }

        switch($this->method) {
        case 'DELETE':
        case 'POST':
            //$this->request=$this->_cleanInputs($_POST);
            $this->request = $this->_cleanInputs(file_get_contents("php://input"));
            break;
        case 'GET':
            $this->request = $this->_cleanInputs($_GET);
            break;
        case 'PUT':
            $this->request = $this->_cleanInputs($_GET);
            $this->file = file_get_contents("php://input");
            break;
        default:
            $this->_response('Invalid Method', 405);
            break;
        }

    }

    public function processAPI() {
        if ((int)method_exists($this, $this->endpoint) > 0) {
            return $this->_response($this->{$this->endpoint}($this->args));
        }
        return $this->_response("No Endpoint: $this->endpoint", 404);
    }

    private function _response($data, $status = 200) {
        header("HTTP/1.1 " . $status . " " . $this->_requestStatus($status));
        return json_encode($data);
    }

    private function _cleanInputs($data) {
        $clean_input = Array();
        if (is_array($data)) {
            foreach ($data as $k => $v) {
                $clean_input[$k] = $this->_cleanInputs($v);
            }
        } else {
            $clean_input = trim(strip_tags($data));
        }
        return $clean_input;
    }

    private function _requestStatus($code) {
        $status = array(  
            200 => 'OK',
            404 => 'Not Found',   
            405 => 'Method Not Allowed',
            500 => 'Internal Server Error',
        ); 
        return ($status[$code])?$status[$code]:$status[500]; 
    }    

  protected function example() {
        if ($this->method == 'GET') {
            return $this->args;
            //put action for get here and return value
            //http://localhost:4040/api-logger-class/api/v1/example/fire/barry/uche : endpoint:example, verb:fire, args:barry,uche
            //return $this->verb;
            //return $this->args; // "Your name is Barry" . $this->args . $this->endpoint ;//. $this->User->name;
            //return $this->endpoint;
        }elseif ($this->method=='POST'){
            //return array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);
            //return $this->request["courseID"];
            return $this->request->courseID; //error : trying to get property of non object
            //return "POSTED to ".$this->endpoint;
        } else {
            return "Only accepts GET requests";
        }
     }
  protected function reviews(){
    // Connect to test database
    $m = new MongoClient("mongodb://barry:barry@ds053310.mongolab.com:53310/coursereviews");
    //echo "Connection to database successfully<br/>";
    
    $db = $m->coursereviews;
    //echo "Database mydb selected<br/>";
    
    $collection = $db->coursereviews;
    //echo "Collection selected successfully<br/>";
    if ($this->verb=="list"){
        $arr=[];
        //$coursetofind=json_decode($this->request);//$this->args;
        //$coursetofind=$this->request["courseID"]; //see comment on "add"
        $coursetofind=json_decode($this->request);
        //$coursetofind=$this->request->courseID;
        $coursetofind=$coursetofind->courseID;
        $cursor = $collection->find(array('courseID' => $coursetofind));
        //$cursor = $collection->find();
        // iterate cursor to display title of documents
        foreach ($cursor as $document) {
            $arr[]=$document;  //$cursor->getNext();
        }
        return $arr ; // json_encode($arr);
        //return json_encode($cursor);
        //return array('courseID' => $coursetofind);
        //return $coursetofind;
    }
    if ($this->verb=="add"){
        $request = json_decode($this->request);
        //$request = ($this->request);
        //$request=$_POST;
        /*
        BELOW will work for form urlencoded where the post data is actually in $_POST so array format. 
        changed because using json so json decode returns object 
        $uid = $request["uid"];
        $courseID = $request["courseID"];
        $reviewTitle = $request["reviewTitle"];
        $bookTitle = $request["bookTitle"];
        $reviewBody = $request["reviewBody"];
        $userlocation=$request["userlocation"];
        $email=$request["email"];
        */
        
        $uid = $request->uid;
        $email=$request->email;
        $courseID = $request->courseID;
        $reviewTitle = $request->reviewTitle;
        $bookTitle = $request->bookTitle;
        $reviewBody = $request->reviewBody;
        $userLocation=$request->userLocation;
        
        $m = new MongoClient("mongodb://barry:barry@ds053310.mongolab.com:53310/coursereviews");
        //echo "Connection to database successfully";
        
        $db = $m->coursereviews;
        //echo "Database coursereview selected";
        
        $collection = $db->coursereviews;
        //echo "Collection selected succsessfully";
        $document = array( 
            "uid" => $uid, 
            "email" => $email,
            "courseID" => $courseID,
            "reviewTitle" => $reviewTitle,
            "bookTitle" => $bookTitle,
            "reviewBody" => $reviewBody,
            "userLocation"=> $userLocation
        );
        $collection->insert($document);
        return "Inserted.";
    }
       
}
  protected function courses(){
    // Connect to test database
        $m = new MongoClient("mongodb://barry:barry@ds053310.mongolab.com:53310/coursereviews");
        //echo "Connection to database successfully<br/>";
        
        $db = $m->coursereviews;
        //echo "Database coursereviews selected<br/>";
        
        $collection = $db->courses;
        //echo "Collection selected successfully<br/>";
        if ($this->verb=="list"){
            $arr=[];
            //$coursetofind=json_decode($this->request);
            //$coursetofind=$coursetofind->courseID;
            $cursor = $collection->find();
            foreach ($cursor as $document) {
                $arr[]=$document;  //$cursor->getNext();
            }
            return $arr ; // json_encode($arr);
        }
        if ($this->verb=="add"){
            $request = json_decode($this->request);
            $courseName=$request->courseName;
            $courseID = $request->courseID;
            $bookTitle = $request->bookTitle;
            $bookAuthor = $request->bookAuthor;
            
            $m = new MongoClient("mongodb://barry:barry@ds053310.mongolab.com:53310/coursereviews");
            //echo "Connection to database successfully";
            
            $db = $m->coursereviews;
            //echo "Database coursereview selected";
            
            $collection = $db->courses;
            //echo "Collection selected succsessfully";
            $document = array( 
                "courseID" => $courseID, 
                "courseName" => $courseName,
                "bookTitle" => $bookTitle,
                "bookAuthor" => $bookAuthor
            );
            $collection->insert($document);
            return "Inserted.";
        }
        if ($this->verb=="delete"){
            $request = json_decode($this->request);
            $coursetodelete=$request->courseID;
            $m = new MongoClient("mongodb://barry:barry@ds053310.mongolab.com:53310/coursereviews");
            //echo "Connection to database successfully";
            $db = $m->coursereviews;
            //echo "Database coursereview selected";
            $collection = $db->courses;
            //echo "Collection selected succsessfully";
            $cursor = $collection->remove(array('courseID' => $coursetodelete));
            return "Deleted.";
        }
        if ($this->verb=="update"){
            $request = json_decode($this->request);
            $coursetoupdate=$request->courseID;
            $newcoursename=$request->newcoursename;
            $m = new MongoClient("mongodb://barry:barry@ds053310.mongolab.com:53310/coursereviews");
            //echo "Connection to database successfully";
            $db = $m->coursereviews;
            //echo "Database coursereview selected";
            $collection = $db->courses;
            //echo "Collection selected succsessfully";
            $retval = $collection->findAndModify(
                array('courseID' => $coursetoupdate)
                ,array('$set'=>array('courseName'=>$newcoursename)),
                null,
                null);

            return "Updated.";
        }


    }    
  
}

// Requests from the same server don't have a HTTP_ORIGIN header
if (!array_key_exists('HTTP_ORIGIN', $_SERVER)) {
    $_SERVER['HTTP_ORIGIN'] = $_SERVER['SERVER_NAME'];
}

try {
    $req=$_REQUEST['request'];
    $origin=$_SERVER['HTTP_ORIGIN'];
    //$API = new API($_REQUEST['request'], $_SERVER['HTTP_ORIGIN']);
    $API = new API($req,$origin);
    //print_r (json_decode($API->request));
    //print_r (json_decode('{"a":1,"b":2,"c":3,"d":4,"e":5}'));
    //echo ($API->request->uid);
    //echo ($API->request);
    //print_r(json_decode($API->request));
    //print_r (explode('/', rtrim($req, '/')));
    //echo array_shift(explode('/', rtrim($req, '/')));
    echo $API->processAPI();
    //print_r($API->processAPI());
    
} catch (Exception $e) {
    echo $req;
    echo json_encode(Array('error' => $e->getMessage()));
}
?>