<?php
// Connect to test database
	$m = new MongoClient();
	echo "Connection to database successfully<br/>";
	
	$db = $m->reviewdb;
	echo "Database mydb selected<br/>";
	
 $collection = $db->review;
   echo "Collection selected succsessfully<br/>";

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