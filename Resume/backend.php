<?php
include("functions/db.php");
$request = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

$restUrl = substr($request, 13); // cut off Resume/rest
if(strpos($restUrl,"?") > -1){
	$restUrl = substr($restUrl, 0, strpos($restUrl, "?")); // cut off everything after the ?
}
$restUrlSplit = preg_split ( "/\//" , $restUrl); // split it up

$firstParam = $restUrlSplit[0];
$secondParam = count($restUrlSplit) > 1 ? $restUrlSplit[1] : ''; 
$thirdParam = count($restUrlSplit) > 2 ? $restUrlSplit[2] : '';
$fourthParam = count($restUrlSplit) > 3 ? $restUrlSplit[3] : '';
$fifthParam = count($restUrlSplit) > 4 ? $restUrlSplit[4] : '';

if($requestMethod == "GET"){
	switch($firstParam){
		case "resume":
			if(!$thirdParam) {
				if(!$secondParam) {
					print(getResumes());
				} else {
					print(getResume($secondParam));
				}
			}
			switch($thirdParam){
				case "mission":
					print getMissionStatement($secondParam);
					break;
				case "skills":
					print getSkills($secondParam);
					break;
				case "jobs":
					print getJobs($secondParam);
					break;
				case "custom":
					print getCustom($secondParam);
					break;
				default:
					exit();
			}
		default:
			exit();
		
	}	
} else if($requestMethod == "POST") {
	switch($firstParam){
		case "resume":
			if(!$thirdParam) {
				print "{id:\"".insertResume($_POST["name"], $_POST["email"], $_POST["password"])."\"}";
			}
			switch ($thirdParam) {
				case "mission":
					insertMission($secondParam, $_POST["statement"]);
					break;
				case "skill":
					insertSkill($secondParam, $_POST["skill"], $_POST["proficiency"]);
					break;
				case "job":
					insertJob($secondParam, $_POST["companyName"], $_POST["beginDate"], $_POST["endDate"], $_POST["description"], $_POST["satisfaction"]);
					break;
				case "custom":
					insertCustom($secondParam, $_POST["title"], $_POST["text"]);
					break;
			}
	}
}
	
/*
$resumeId = insertResume("Seneca", "senecajustice@gmail.com", "password");
print("<br>".$resumeId."<br>");
insertMission($resumeId, "I want to work!");
insertSkill($resumeId, "PHP", 10);
insertJob($resumeId, "IBM", "10-APR-90", "10-APR-90", "great", 5);
insertCustom($resumeId, "MySex Lif", "Is GRrrrrrrrrrreat");
*/
?>

