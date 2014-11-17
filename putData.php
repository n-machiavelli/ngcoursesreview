
<?php

 $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$uid = $request->uid;
    @$courseId = $request->courseId;
    @$rtitle = $request->reviewTitle;
    @$bktitle = $request->bookTitle;
    @$btitle = $request->reviewBody;
    
    

    $m = new MongoClient("mongodb://barry:barry@ds053310.mongolab.com:53310/coursereviews");
	echo "Connection to database successfully";
	
	$db = $m->coursereviews;
	echo "Database mydb selected";
	
	$collection = $db->coursereviews;
   echo "Collection selected succsessfully";
   $document = array( 
       "uid" => $uid, 
      "courseId" => $courseId,
      "rtitle" => $rtitle,
      "bktitle" => $bktitle,
      "btitle" => $btitle 
   );
   
   $collection->insert($document);
   echo "Document inserted successfully";
?>