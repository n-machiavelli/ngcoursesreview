<?php
// Connect to test database
	$m = new MongoClient("mongodb://barry:barry@ds053310.mongolab.com:53310/coursereviews");
	echo "Connection to database successfully<br/>";
	
	$db = $m->coursereviews;
	echo "Database mydb selected<br/>";
	
 $collection = $db->review;
   echo "Collection selected successfully<br/>";

   $cursor = $collection->find();
   // iterate cursor to display title of documents
   
   foreach ($cursor as $document) {
     echo "<div>";
      echo "UID :" . $document['uid'] . "<br/>";
      echo "Title :" . $document['rtitle'] . "<br/>";
      echo "Book Title :" . $document['bktitle'] . "<br/>";
      echo "Title Body :" . $document['btitle'] . "<br/>";
      
      echo "</div><br/><br/>";
   }
   
?>