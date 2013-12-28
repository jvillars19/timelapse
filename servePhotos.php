<?

if(isset($_GET['date']) && isset($_GET['time']) && isset($_GET['limit'])){
  $date = $_GET['date'];
  $time = $_GET['time'];
  $limit = $_GET['limit'];
  $dir = "/assets/pictures/" . strval($date);
  $data = scandir($dir);
  $data = array_diff($data, array('..', '.'));
  $pics = array();
  foreach($data as $val){
    if($val>$time || $val == $time){  
      if(count($pics)<$limit + 1){
        $pics[] = $val;      
      }else{
        break;
      }
    }
  }
  

  if(count($pics)){
    // returns an object with the requested date and a list of the unique names for the pictures
    echo json_encode( (object) array('date'=>strval($date), 'pics'=>$pics));
  }
  else{
    error('Not enough results');
  }
}else{
  echo json_encode(array_diff(scandir("/assets/pictures/"), array("..", ".")));
}

function error($msg){
    $error = array();
    $error['error'] = "Error. Please enter valid data";
    echo json_encode($error);
}
?>